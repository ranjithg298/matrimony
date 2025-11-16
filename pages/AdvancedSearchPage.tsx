import React, { useState, useMemo } from 'react';
import { Profile } from '../types';
import ProfileCard from '../components/ProfileCard';
import VerifiedIcon from '../components/icons/VerifiedIcon';

interface AdvancedSearchPageProps {
    profiles: Profile[];
    onSelectProfile: (profile: Profile) => void;
    currentUser: Profile;
    onShortlistProfile: (profileId: string) => void;
}

const SearchField: React.FC<{label: string, children: React.ReactNode}> = ({label, children}) => (
    <div>
        <label className="block text-sm font-medium text-theme-text-secondary mb-1">{label}</label>
        {children}
    </div>
);

type SortByType = 'relevance' | 'newest' | 'oldest' | 'age_asc' | 'age_desc';

const AdvancedSearchPage: React.FC<AdvancedSearchPageProps> = ({ profiles, onSelectProfile, currentUser, onShortlistProfile }) => {
    const [filters, setFilters] = useState({
        ageFrom: '18',
        ageTo: '45',
        maritalStatus: [] as string[],
        religion: '',
        caste: '',
        occupation: '',
        isVerified: false,
        isOnline: false,
        withPhotos: false,
        mangalik: 'any',
        annualIncome: 'any'
    });
    const [sortBy, setSortBy] = useState<SortByType>('relevance');
    
    const maritalStatusOptions = ['Never Married', 'Divorced', 'Widowed'];

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const isCheckbox = type === 'checkbox';
        
        if (name === 'maritalStatus') {
            const checked = (e.target as HTMLInputElement).checked;
            setFilters(prev => ({
                ...prev,
                maritalStatus: checked 
                    ? [...prev.maritalStatus, value]
                    : prev.maritalStatus.filter(s => s !== value)
            }));
        } else {
            const checked = isCheckbox ? (e.target as HTMLInputElement).checked : undefined;
            setFilters(prev => ({...prev, [name]: isCheckbox ? checked : value}));
        }
    };

    const handleQuickFilter = (type: '90s' | 'doctors' | 'second-innings') => {
        if (type === '90s') {
            const currentYear = new Date().getFullYear();
            setFilters(prev => ({ ...prev, ageFrom: (currentYear - 1999).toString(), ageTo: (currentYear - 1990).toString() }));
        }
        if (type === 'doctors') {
             setFilters(prev => ({ ...prev, occupation: 'Doctor' }));
        }
        if (type === 'second-innings') {
             setFilters(prev => ({ ...prev, maritalStatus: ['Divorced', 'Widowed'] }));
        }
    }
    
    const results = useMemo(() => {
        let filteredProfiles = profiles.filter(p => {
             if (p.role !== 'user') return false;
             if (p.age < parseInt(filters.ageFrom) || p.age > parseInt(filters.ageTo)) return false;
             
             if (filters.maritalStatus.length > 0 && !filters.maritalStatus.includes(p.customFields.maritalStatus)) return false;
             
             const religion = (p.customFields.religion as string || '').toLowerCase();
             if (filters.religion && !religion.includes(filters.religion.toLowerCase())) return false;

             const caste = (p.customFields.caste as string || '').toLowerCase();
             if (filters.caste && !caste.includes(filters.caste.toLowerCase())) return false;

             const occupation = (p.customFields.occupation as string || '').toLowerCase();
             if (filters.occupation && !occupation.includes(filters.occupation.toLowerCase())) return false;
             
             if(filters.isVerified && !p.isVerified) return false;
             if(filters.isOnline && !p.isOnline) return false;
             if(filters.withPhotos && p.gallery.length === 0) return false;

             if (filters.mangalik !== 'any' && p.customFields.mangalik !== filters.mangalik) return false;
             if (filters.annualIncome !== 'any' && p.customFields.annualIncome !== filters.annualIncome) return false;

             return true;
        });

        // Sorting logic
        switch (sortBy) {
            case 'newest':
                filteredProfiles.sort((a, b) => parseInt(b.id.substring(1)) - parseInt(a.id.substring(1)));
                break;
            case 'oldest':
                filteredProfiles.sort((a, b) => parseInt(a.id.substring(1)) - parseInt(b.id.substring(1)));
                break;
            case 'age_asc':
                filteredProfiles.sort((a, b) => a.age - b.age);
                break;
            case 'age_desc':
                filteredProfiles.sort((a, b) => b.age - a.age);
                break;
        }

        return filteredProfiles;
    }, [profiles, filters, sortBy]);

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 text-theme-text-primary">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <aside className="lg:col-span-1">
                    <div className="sticky top-24 bg-theme-surface p-6 rounded-xl border border-theme-border space-y-6">
                        <h2 className="text-xl font-bold">Search Filters</h2>

                        {/* Quick Filters */}
                        <div>
                            <h3 className="text-sm font-semibold text-theme-text-secondary mb-2">Quick Filters</h3>
                            <div className="flex flex-wrap gap-2">
                                <button onClick={() => handleQuickFilter('90s')} className="text-xs bg-theme-border hover:bg-theme-border/80 text-theme-text-primary font-semibold py-1 px-3 rounded-full">❤️ 90s Kids</button>
                                <button onClick={() => handleQuickFilter('doctors')} className="text-xs bg-theme-border hover:bg-theme-border/80 text-theme-text-primary font-semibold py-1 px-3 rounded-full">🩺 Doctors Matrimony</button>
                                <button onClick={() => handleQuickFilter('second-innings')} className="text-xs bg-theme-border hover:bg-theme-border/80 text-theme-text-primary font-semibold py-1 px-3 rounded-full">🌅 Second Innings</button>
                            </div>
                        </div>

                        <SearchField label="Age Range">
                            <div className="flex items-center gap-2">
                               <input type="number" name="ageFrom" value={filters.ageFrom} onChange={handleFilterChange} className="w-full bg-theme-bg p-2 rounded-md border border-theme-border" />
                               <span className="text-theme-text-secondary">to</span>
                               <input type="number" name="ageTo" value={filters.ageTo} onChange={handleFilterChange} className="w-full bg-theme-bg p-2 rounded-md border border-theme-border" />
                            </div>
                        </SearchField>
                        <SearchField label="Marital Status">
                            <div className="space-y-2">
                                {maritalStatusOptions.map(status => (
                                    <label key={status} className="flex items-center gap-2 text-sm">
                                        <input type="checkbox" name="maritalStatus" value={status} checked={filters.maritalStatus.includes(status)} onChange={handleFilterChange} className="h-4 w-4 rounded border-gray-300 text-theme-accent-primary focus:ring-theme-accent-primary" />
                                        {status}
                                    </label>
                                ))}
                            </div>
                        </SearchField>
                        <SearchField label="Religion">
                            <input type="text" name="religion" value={filters.religion} onChange={handleFilterChange} className="w-full bg-theme-bg p-2 rounded-md border border-theme-border" />
                        </SearchField>
                        <SearchField label="Occupation">
                            <input type="text" name="occupation" placeholder="e.g. Doctor, Lawyer" value={filters.occupation} onChange={handleFilterChange} className="w-full bg-theme-bg p-2 rounded-md border border-theme-border" />
                        </SearchField>
                        
                        <div>
                             <label className="flex items-center gap-2 text-sm">
                                <input type="checkbox" name="isVerified" checked={filters.isVerified} onChange={handleFilterChange} className="h-4 w-4 rounded border-gray-300 text-theme-accent-primary focus:ring-theme-accent-primary" />
                                Verified Only <VerifiedIcon className="w-4 h-4 text-blue-400" />
                            </label>
                            <label className="flex items-center gap-2 text-sm mt-2">
                                <input type="checkbox" name="isOnline" checked={filters.isOnline} onChange={handleFilterChange} className="h-4 w-4 rounded border-gray-300 text-theme-accent-primary focus:ring-theme-accent-primary" />
                                Online Now
                            </label>
                             <label className="flex items-center gap-2 text-sm mt-2">
                                <input type="checkbox" name="withPhotos" checked={filters.withPhotos} onChange={handleFilterChange} className="h-4 w-4 rounded border-gray-300 text-theme-accent-primary focus:ring-theme-accent-primary" />
                                With Photos
                            </label>
                        </div>
                    </div>
                </aside>
                {/* Results */}
                <main className="lg:col-span-3">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">{results.length} Profiles Found</h2>
                        <div className="flex items-center gap-2">
                             <label htmlFor="sortBy" className="text-sm text-theme-text-secondary">Sort by:</label>
                             <select id="sortBy" value={sortBy} onChange={e => setSortBy(e.target.value as SortByType)} className="bg-theme-bg p-2 text-sm rounded-md border border-theme-border">
                                <option value="relevance">Relevance</option>
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="age_asc">Age (Low to High)</option>
                                <option value="age_desc">Age (High to Low)</option>
                            </select>
                        </div>
                    </div>
                    {results.length === 0 && <p className="text-theme-text-secondary text-center py-12">No profiles match your criteria. Try broadening your search.</p>}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {results.map(profile => (
                            <ProfileCard key={profile.id} profile={profile} onSelectProfile={onSelectProfile} currentUser={currentUser!} onShortlistProfile={onShortlistProfile} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdvancedSearchPage;