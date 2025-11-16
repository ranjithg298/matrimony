import React, { useState, useMemo } from 'react';
import { Profile, WebsiteSettings } from '../types';
import Footer from '../components/Footer';

interface VendorCardProps {
    vendor: Profile;
}

const VendorCard: React.FC<VendorCardProps> = ({ vendor }) => (
    <a href={`#/vendors/${vendor.id}`} className="bg-theme-surface rounded-xl overflow-hidden border border-theme-border group transform transition-all duration-300 hover:shadow-2xl hover:shadow-theme-accent-primary/10 hover:-translate-y-1">
        <div className="relative h-64">
            <img src={vendor.photo} alt={vendor.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
        <div className="p-4">
            <p className="text-sm font-semibold text-theme-accent-primary">{vendor.serviceCategory}</p>
            <h3 className="text-lg font-bold text-theme-text-primary">{vendor.name}</h3>
            <p className="text-sm text-theme-text-secondary mt-1 line-clamp-2">{vendor.vendorBio || vendor.bio}</p>
        </div>
    </a>
);


interface PublicVendorsPageProps {
    vendors: Profile[];
    isPublic?: boolean;
    websiteSettings?: WebsiteSettings;
}

const PublicVendorsPage: React.FC<PublicVendorsPageProps> = ({ vendors, isPublic = false, websiteSettings }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const categories = useMemo(() => {
        const cats = new Set(vendors.map(v => v.serviceCategory).filter(Boolean));
        return ['all', ...Array.from(cats)] as string[];
    }, [vendors]);

    const filteredVendors = useMemo(() => {
        if (selectedCategory === 'all') {
            return vendors;
        }
        return vendors.filter(v => v.serviceCategory === selectedCategory);
    }, [vendors, selectedCategory]);

    const mainContent = (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-theme-text-primary mb-2">Our Trusted Wedding Vendors</h1>
                <p className="text-lg text-theme-text-secondary max-w-2xl mx-auto">Find the perfect professionals to make your special day unforgettable.</p>
            </div>
            
            <div className="flex justify-center flex-wrap gap-2 mb-8">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${selectedCategory === category ? 'bg-theme-accent-primary text-white' : 'bg-theme-surface hover:bg-theme-border text-theme-text-secondary'}`}
                    >
                        {category === 'all' ? 'All Vendors' : category}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVendors.length > 0 ? (
                    filteredVendors.map(vendor => <VendorCard key={vendor.id} vendor={vendor} />)
                ) : (
                    <p className="text-center text-theme-text-secondary col-span-full">No vendors found for this category.</p>
                )}
            </div>
        </div>
    );
    
     if (isPublic && websiteSettings) {
        return (
            <div className="bg-theme-bg min-h-screen">
                 <header className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <a href="#/" className="flex items-center space-x-2 focus:outline-none">
                         <img src={websiteSettings.logoUrl} alt={websiteSettings.siteName} className="h-8 object-contain" />
                        <span className="text-2xl font-bold text-transparent bg-clip-text bg-theme-gradient">{websiteSettings.siteName}</span>
                    </a>
                    <div className="space-x-4">
                        <a href="#/happy-stories" className="text-theme-text-secondary hover:text-theme-text-primary transition-colors">Happy Stories</a>
                        <a href="#/login" className="bg-theme-surface hover:bg-theme-border text-theme-text-primary font-semibold py-2 px-4 rounded-lg transition-colors">
                            Login
                        </a>
                    </div>
                </header>
                {mainContent}
                <Footer settings={websiteSettings}/>
            </div>
        );
    }

    return mainContent;
};

export default PublicVendorsPage;