import React, { useState, useRef } from 'react';
import { Profile, Attribute, AttributeType } from '../types';
import { generateBioSuggestion, analyzeProfilePhoto } from '../services/geminiService';
import SparklesIcon from './icons/SparklesIcon';
import DocumentTextIcon from './icons/DocumentTextIcon';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import TrashIcon from './icons/TrashIcon';
import PhotoAnalysisModal from './PhotoAnalysisModal';

interface ProfilePageProps {
  user: Profile;
  attributes: Attribute[];
  onUpdateProfile: (updatedProfile: Profile) => void;
  onStartVerification: () => void;
  onUpgradePlanRequest: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, attributes, onUpdateProfile, onStartVerification, onUpgradePlanRequest }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState<Profile>(user);
  const [newInterest, setNewInterest] = useState('');
  const [showSaved, setShowSaved] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const bioDataInputRef = useRef<HTMLInputElement>(null);
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);
  const [analysisState, setAnalysisState] = useState({ 
    isOpen: false, 
    photoUrl: '', 
    result: '', 
    isLoading: false 
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (['name', 'age', 'city', 'bio'].includes(name)) {
        setEditableUser(prev => ({ ...prev, [name]: name === 'age' ? parseInt(value) || 0 : value }));
    }
  };
  
  const handleCustomFieldChange = (attributeId: string, value: any, type: AttributeType) => {
    if (type === AttributeType.MULTISELECT) {
        const currentValues = editableUser.customFields[attributeId] || [];
        const newValues = currentValues.includes(value)
            ? currentValues.filter((v: string) => v !== value)
            : [...currentValues, value];
        setEditableUser(prev => ({ ...prev, customFields: { ...prev.customFields, [attributeId]: newValues } }));
    } else {
        setEditableUser(prev => ({ ...prev, customFields: { ...prev.customFields, [attributeId]: value } }));
    }
  };
  
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          const files = Array.from(e.target.files);
          const photoPromises = files.map((file: File) => {
              return new Promise<string>((resolve, reject) => {
                  const reader = new FileReader();
                  reader.onloadend = () => resolve(reader.result as string);
                  reader.onerror = reject;
                  reader.readAsDataURL(file);
              });
          });

          Promise.all(photoPromises).then(base64Photos => {
              const newPhotos = base64Photos.map(url => ({ url, status: 'pending' as 'pending' | 'approved' | 'rejected' }));
              setEditableUser(prev => ({ ...prev, gallery: [...prev.gallery, ...newPhotos] }));
          });
      }
  };

  const handleDeletePhoto = (url: string) => {
    setEditableUser(prev => ({ ...prev, gallery: prev.gallery.filter(p => p.url !== url)}));
  }

  const handleBioDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          // In a real app, you would upload this file and get a URL
          const file = e.target.files[0];
          const fakeUrl = `/uploads/${file.name}`; // Simulate upload
          setEditableUser(prev => ({ ...prev, bioDataUrl: fakeUrl }));
      }
  };

  const handleAddInterest = () => {
    if (newInterest && !editableUser.interests.includes(newInterest)) {
      setEditableUser(prev => ({ ...prev, interests: [...prev.interests, newInterest] }));
      setNewInterest('');
    }
  };
  
  const handleRemoveInterest = (interestToRemove: string) => {
    setEditableUser(prev => ({ ...prev, interests: prev.interests.filter(i => i !== interestToRemove) }));
  };

  const handleSave = () => {
    onUpdateProfile(editableUser);
    setIsEditing(false);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };
  
  const handleCancel = () => {
    setEditableUser(user);
    setIsEditing(false);
    setGeneratedImage(null);
  }

  const handleGenerateBio = async () => {
    setIsGeneratingBio(true);
    const suggestion = await generateBioSuggestion(editableUser);
    setEditableUser(prev => ({ ...prev, bio: suggestion }));
    setIsGeneratingBio(false);
  };

  const handleAnalyzePhoto = async (photoUrl: string) => {
    if (!user.isPremium) {
        onUpgradePlanRequest();
        return;
    }

    setAnalysisState({ isOpen: true, photoUrl, result: '', isLoading: true });

    try {
        const result = await analyzeProfilePhoto(photoUrl);
        setAnalysisState(prev => ({ ...prev, result, isLoading: false }));
    } catch (error) {
        console.error(error);
        const errorMessage = "Sorry, an error occurred while analyzing the photo.";
        setAnalysisState(prev => ({ ...prev, result: errorMessage, isLoading: false }));
    }
  };

  const renderField = (attr: Attribute) => {
    const value = editableUser.customFields[attr.id] || '';
    switch (attr.type) {
      case AttributeType.TEXTAREA:
        return <textarea value={value} onChange={e => handleCustomFieldChange(attr.id, e.target.value, attr.type)} rows={4} className="w-full bg-theme-border text-theme-text-primary rounded-md p-2" />;
      case AttributeType.DROPDOWN:
        return (
          <select value={value} onChange={e => handleCustomFieldChange(attr.id, e.target.value, attr.type)} className="w-full bg-theme-border text-theme-text-primary rounded-md p-2">
            <option value="">Select...</option>
            {attr.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        );
      case AttributeType.MULTISELECT:
        return (
            <div className="flex flex-wrap gap-2 p-2 bg-theme-border rounded-md">
                {attr.options?.map(opt => (
                    <label key={opt} className="flex items-center gap-2 text-sm">
                        <input type="checkbox" checked={(value || []).includes(opt)} onChange={() => handleCustomFieldChange(attr.id, opt, attr.type)} />
                        {opt}
                    </label>
                ))}
            </div>
        );
      default: // TEXT, NUMBER, DATE
        return <input type={attr.type} value={value} onChange={e => handleCustomFieldChange(attr.id, e.target.value, attr.type)} className="w-full bg-theme-border text-theme-text-primary rounded-md p-2" />;
    }
  };
  
  const getStatusBadge = (status: 'approved' | 'pending' | 'rejected') => {
      const styles = {
          approved: 'bg-green-500/20 text-green-500',
          pending: 'bg-yellow-500/20 text-yellow-500',
          rejected: 'bg-red-500/20 text-red-500',
      };
      return <span className={`absolute top-1 right-1 text-xs font-semibold px-1.5 py-0.5 rounded-full ${styles[status]}`}>{status}</span>
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 text-theme-text-primary">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <div className="flex items-center gap-4">
            {showSaved && <span className="text-green-400 transition-opacity duration-300">Saved!</span>}
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="bg-theme-accent-primary text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity">Edit Profile</button>
            ) : (
              <div className="flex gap-2">
                <button onClick={handleCancel} className="bg-theme-border text-theme-text-primary px-4 py-2 rounded-lg font-semibold hover:bg-theme-border/80 transition-colors">Cancel</button>
                <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors">Save Changes</button>
              </div>
            )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Photo & Core Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-theme-surface p-6 rounded-xl">
             <div className="relative w-48 h-48 mx-auto">
              <img src={editableUser.photo} alt={editableUser.name} className="w-48 h-48 rounded-full mx-auto object-cover border-4 border-theme-accent-secondary" />
             </div>
            <div className="text-center mt-4">
              {isEditing ? ( <input type="text" name="name" value={editableUser.name} onChange={handleInputChange} className="w-full text-center bg-theme-border text-2xl font-bold rounded-md p-1" /> ) : ( <h2 className="text-2xl font-bold">{editableUser.name}</h2> )}
               <div className="flex justify-center items-baseline gap-2 mt-1">
                 {isEditing ? (
                     <>
                        <input type="number" name="age" value={editableUser.age} onChange={handleInputChange} className="w-16 text-center bg-theme-border text-lg text-theme-text-secondary rounded-md p-1" />
                        <input type="text" name="city" value={editableUser.city} onChange={handleInputChange} className="bg-theme-border text-lg text-theme-text-secondary rounded-md p-1" />
                     </>
                 ) : ( <p className="text-lg text-theme-text-secondary">{editableUser.age}, {editableUser.city}</p> )}
               </div>
            </div>
          </div>

          <div className="bg-theme-surface p-6 rounded-xl">
             <h3 className="font-semibold text-xl mb-3">Bio-data</h3>
              {isEditing ? (
                  <div>
                      <input type="file" ref={bioDataInputRef} onChange={handleBioDataChange} accept=".pdf,.doc,.docx" className="hidden" />
                      <button type="button" onClick={() => bioDataInputRef.current?.click()} className="w-full text-sm bg-theme-border hover:bg-theme-border/80 text-theme-text-primary font-semibold py-2 px-3 rounded-md border border-theme-border">
                          Upload Document
                      </button>
                      {editableUser.bioDataUrl && <p className="text-xs text-center mt-2 text-theme-text-secondary truncate">Current: {editableUser.bioDataUrl.split('/').pop()}</p>}
                  </div>
              ) : (
                  editableUser.bioDataUrl ? (
                      <a href={editableUser.bioDataUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-theme-accent-primary hover:underline">
                          <DocumentTextIcon className="h-5 w-5" />
                          <span>View Bio-data</span>
                      </a>
                  ) : (
                      <p className="text-sm text-theme-text-secondary">No bio-data uploaded.</p>
                  )
              )}
          </div>

          <div className="bg-theme-surface p-6 rounded-xl">
              <h3 className="font-semibold text-xl mb-3">Verification</h3>
              {user.isPhotoVerified ? (
                  <div className="flex items-center gap-2 text-green-500">
                    <ShieldCheckIcon className="w-6 h-6" />
                    <span className="font-semibold">Photo Verified</span>
                  </div>
              ) : (
                  <div>
                      <p className="text-sm text-theme-text-secondary mb-3">Verify your photos with a live selfie to get a 'Photo Verified' badge and increase trust.</p>
                      <button onClick={onStartVerification} className="w-full text-sm bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-3 rounded-md">
                          Get Photo Verified
                      </button>
                  </div>
              )}
          </div>

        </div>

        {/* Right Column - Dynamic Fields */}
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-theme-surface p-6 rounded-xl">
                <h3 className="font-semibold text-xl mb-3">About Me</h3>
                {isEditing ? (
                <div>
                    <textarea name="bio" value={editableUser.bio} onChange={handleInputChange} rows={5} className="w-full bg-theme-border text-theme-text-primary rounded-md p-2" />
                     <button 
                        type="button" 
                        onClick={handleGenerateBio}
                        disabled={isGeneratingBio}
                        className="mt-2 flex items-center gap-2 text-sm bg-theme-accent-secondary/20 text-theme-accent-secondary font-semibold py-2 px-3 rounded-md hover:bg-theme-accent-secondary/30 disabled:opacity-50"
                    >
                        <SparklesIcon className={`h-4 w-4 ${isGeneratingBio ? 'animate-spin' : ''}`} />
                        {isGeneratingBio ? 'Generating...' : 'Generate with AI'}
                    </button>
                </div>
                ) : (
                <p className="text-theme-text-secondary whitespace-pre-wrap">{editableUser.bio}</p>
                )}
            </div>

            {isEditing && (
              <div className="bg-theme-surface p-6 rounded-xl">
                <h3 className="font-semibold text-xl mb-3">Manage My Gallery</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                    {editableUser.gallery.map((photo, index) => (
                      <div key={index} className="relative aspect-square group">
                          <img src={photo.url} alt={`Gallery photo ${index + 1}`} className="w-full h-full object-cover rounded-md" />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-md" />
                          {getStatusBadge(photo.status)}
                           <div className="absolute top-1 right-1 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                    onClick={() => handleAnalyzePhoto(photo.url)} 
                                    className="bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600 shadow" 
                                    title="Analyze with AI"
                                >
                                    <SparklesIcon className="w-4 h-4"/>
                                </button>
                                <button 
                                    onClick={() => handleDeletePhoto(photo.url)} 
                                    className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 shadow" 
                                    title="Delete Photo"
                                >
                                    <TrashIcon className="w-4 h-4"/>
                                </button>
                            </div>
                      </div>
                    ))}
                    <button type="button" onClick={() => photoInputRef.current?.click()} className="aspect-square flex items-center justify-center bg-theme-border rounded-md hover:bg-theme-border/80">
                      <span className="text-2xl text-theme-text-secondary">+</span>
                    </button>
                </div>
                <input type="file" ref={photoInputRef} onChange={handlePhotoChange} multiple accept="image/*" className="hidden" />
              </div>
            )}

            {attributes.map(attr => (
                 <div key={attr.id} className="bg-theme-surface p-6 rounded-xl">
                    <h3 className="font-semibold text-xl mb-3">{attr.label}</h3>
                     {isEditing ? (
                        renderField(attr)
                    ) : (
                        <p className="text-theme-text-secondary whitespace-pre-wrap">{Array.isArray(editableUser.customFields[attr.id]) ? editableUser.customFields[attr.id].join(', ') : editableUser.customFields[attr.id] || 'Not specified'}</p>
                    )}
                 </div>
            ))}
        </div>
      </div>
      <PhotoAnalysisModal 
        isOpen={analysisState.isOpen}
        onClose={() => setAnalysisState({ ...analysisState, isOpen: false })}
        photoUrl={analysisState.photoUrl}
        analysisResult={analysisState.result}
        isLoading={analysisState.isLoading}
      />
    </div>
  );
};

export default ProfilePage;