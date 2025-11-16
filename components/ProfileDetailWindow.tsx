import React from 'react';
import { Profile, Attribute } from '../types';

interface ProfileDetailWindowProps {
  profile: Profile;
  currentUser: Profile;
  attributes: Attribute[];
}

const ProfileDetailWindow: React.FC<ProfileDetailWindowProps> = (props) => {
    const { profile, attributes } = props;

    return (
        <div className="p-1 bg-[#C0C0C0] text-black h-full overflow-y-auto font-sans">
            <div className="flex gap-4 items-center mb-4 p-2">
                <img src={profile.photo} alt={profile.name} className="w-24 h-24 object-cover border-outset" />
                <div>
                    <h2 className="text-2xl font-bold">{profile.name}, {profile.age}</h2>
                    <p>{profile.city}</p>
                     <p className="text-sm">{profile.customFields.occupation}</p>
                </div>
            </div>
             <div className="sunken-panel p-2">
                <div className="mb-2">
                    <label className="text-sm font-bold">Bio</label>
                    <div className="w-full mt-1 p-1 border-inset bg-white text-sm break-words min-h-[60px]">
                        {profile.bio}
                    </div>
                </div>
                 <div className="h-px bg-[#808080] my-2 border-t border-white" />
                 <h3 className="text-sm font-bold mb-2">Details</h3>
                  {attributes.map(attr => {
                        const value = profile.customFields[attr.id];
                        if (!value) return null;
                        return (
                             <div className="flex items-baseline mb-2 text-sm" key={attr.id}>
                                <label className="w-1/3 text-right pr-2 shrink-0">{attr.label}:</label>
                                <div className="w-2/3 p-1 border-inset bg-white break-words">
                                    {Array.isArray(value) ? value.join(', ') : String(value)}
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default ProfileDetailWindow;