

import React, { useState } from 'react';
import { WebsiteSettings, HappyStory, PricingPlan, Service, ContactQuery } from '../types';
import FacebookIcon from '../components/icons/FacebookIcon';
import TwitterIcon from '../components/icons/TwitterIcon';
import InstagramIcon from '../components/icons/InstagramIcon';
import YoutubeIcon from '../components/icons/YoutubeIcon';
import PhoneIcon from '../components/icons/PhoneIcon';
import WhatsappIcon from '../components/icons/WhatsappIcon';
import EnvelopeIcon from '../components/icons/EnvelopeIcon';
import HeartIcon from '../components/icons/HeartIcon';

interface LandingPageProps {
    websiteSettings: WebsiteSettings;
    pricingPlans: PricingPlan[];
    happyStories: HappyStory[];
    services: Service[];
    onAddContactQuery: (query: Omit<ContactQuery, 'id' | 'date' | 'status'>) => void;
}

// Sub-components for better organization

const LandingPageHeader: React.FC<{ settings: WebsiteSettings }> = ({ settings }) => (
    <header className="bg-theme-surface/80 backdrop-blur-sm sticky top-0 z-50 border-b border-theme-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-2 text-sm">
                <div className="flex items-center gap-4">
                    <a href={`tel:${settings.contactPhonePrimary}`} className="text-theme-text-secondary hover:text-theme-accent-primary transition-colors">{settings.contactPhonePrimary}</a>
                </div>
                <div className="flex items-center gap-4">
                    {settings.socialLinks.map(link => (
                        <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="text-theme-text-secondary hover:text-theme-accent-primary transition-colors">
                            {link.platform === 'Facebook' && <FacebookIcon className="w-4 h-4" />}
                            {link.platform === 'Twitter' && <TwitterIcon className="w-4 h-4" />}
                            {link.platform === 'Instagram' && <InstagramIcon className="w-4 h-4" />}
                            {link.platform === 'Youtube' && <YoutubeIcon className="w-4 h-4" />}
                        </a>
                    ))}
                    <a href={`tel:${settings.contactPhonePrimary}`} className="bg-theme-accent-primary text-white text-xs font-bold px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
                        Call Us: {settings.contactPhonePrimary}
                    </a>
                </div>
            </div>
            <hr className="border-theme-border" />
            <div className="flex justify-between items-center py-4">
                <a href="#/" className="flex items-center gap-2">
                    <img src={settings.logoUrl} alt={settings.siteName} className="h-12" />
                    <div>
                        <h1 className="font-serif text-2xl font-bold text-theme-text-primary">{settings.siteName}</h1>
                    </div>
                </a>
                <nav className="hidden lg:flex items-center gap-6">
                    {settings.headerLinks.map(link => (
                        <a key={link.id} href={link.url} className="font-semibold text-theme-text-primary hover:text-theme-accent-primary transition-colors">{link.text}</a>
                    ))}
                </nav>
            </div>
        </div>
    </header>
);

const HeroSection: React.FC<{ settings: WebsiteSettings }> = ({ settings }) => (
    <section className="relative h-[60vh] overflow-hidden">
        <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300"
            style={{
                backgroundImage: `url('${settings.heroImageUrl}')`,
                transform: `scale(${(settings.heroImageZoom || 100) / 100})`
            }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
            <h1 className="font-serif text-5xl md:text-7xl font-bold">{settings.heroTitle}</h1>
            <p className="text-xl md:text-2xl mt-4">{settings.heroSubtitle}</p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full">
                <a href={`tel:${settings.contactPhonePrimary}`} className="bg-theme-accent-secondary/80 p-4 rounded-lg text-left flex items-center gap-4 hover:bg-theme-accent-secondary/90 transition-colors">
                    <PhoneIcon className="w-8 h-8 flex-shrink-0" />
                    <div>
                        <p className="font-bold">{settings.contactPhonePrimary}</p>
                        <p>Click on the Number Below to Call</p>
                    </div>
                </a>
                 <a href={`mailto:${settings.contactEmail}`} className="bg-theme-accent-secondary/80 p-4 rounded-lg text-left flex items-center gap-4 hover:bg-theme-accent-secondary/90 transition-colors">
                    <EnvelopeIcon className="w-8 h-8 flex-shrink-0" />
                    <div>
                        <p className="font-bold">Email Us</p>
                        <p>{settings.contactEmail}</p>
                    </div>
                </a>
            </div>
        </div>
    </section>
);

const StatsSection: React.FC = () => {
    const stats = [
        { value: '50,000+', label: 'Premium Profiles' },
        { value: '2,000+', label: 'Weddings' },
        { value: '300+', label: 'International and Domestic Locations' },
        { value: '7,000+', label: 'Active Customers' },
    ];
    return (
        <section className="py-16 bg-theme-bg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="font-serif text-3xl font-bold text-theme-accent-primary">PERFECT DESTINATION FOR</h2>
                <h3 className="text-2xl font-semibold text-theme-text-primary mb-12">ELITE MATRIMONIAL SERVICES</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map(stat => (
                        <div key={stat.label} className="bg-theme-accent-primary/10 border border-theme-accent-primary/20 p-8 rounded-lg">
                            <p className="text-4xl font-bold text-theme-accent-primary">{stat.value}</p>
                            <p className="text-theme-text-secondary mt-2">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ServicesSection: React.FC<{ services: Service[] }> = ({ services }) => (
    <section className="py-16 bg-theme-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl font-bold text-theme-text-primary mb-12">Our Elite Matrimonial Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map(service => (
                    <a href={`#/services/${service.slug}`} key={service.id} className="bg-theme-surface p-8 rounded-lg text-center border border-theme-border hover:shadow-xl hover:-translate-y-1 transition-all">
                        <h3 className="font-bold text-lg text-theme-text-primary">{service.title}</h3>
                        <p className="text-sm text-theme-text-secondary mt-2">{service.description}</p>
                    </a>
                ))}
            </div>
        </div>
    </section>
);


const PackagesSection: React.FC<{ plans: PricingPlan[] }> = ({ plans }) => {
    const [activeTab, setActiveTab] = useState('standard');
    
    return (
        <section className="py-16 bg-theme-accent-secondary text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="font-serif text-3xl font-bold">Our Standard Packages</h2>
                <div className="flex justify-center my-8">
                     <div className="bg-white/20 rounded-lg p-1 flex gap-1">
                        <button onClick={() => setActiveTab('standard')} className={`px-6 py-2 rounded-md font-semibold ${activeTab === 'standard' ? 'bg-white text-theme-accent-secondary' : ''}`}>Standard Packages</button>
                        <button onClick={() => setActiveTab('elite')} className={`px-6 py-2 rounded-md font-semibold ${activeTab === 'elite' ? 'bg-white text-theme-accent-secondary' : ''}`}>Elite Packages</button>
                        <button onClick={() => setActiveTab('late')} className={`px-6 py-2 rounded-md font-semibold ${activeTab === 'late' ? 'bg-white text-theme-accent-secondary' : ''}`}>Second/Late Marriage</button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.filter(p => p.planType === 'standard').map(plan => (
                        <div key={plan.id} className="bg-theme-surface p-8 rounded-lg text-theme-text-primary border-4 border-theme-accent-primary">
                             <div className="w-16 h-16 bg-theme-accent-primary/20 rounded-full mx-auto mb-4 border-4 border-theme-accent-primary"></div>
                             <h3 className="font-serif text-xl font-bold uppercase">{plan.name}</h3>
                             <p className="text-3xl font-bold my-2">{plan.price}</p>
                             <p className="text-sm text-theme-text-secondary">{plan.duration}</p>
                             <p className="text-sm mt-2">{plan.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const HappyClientsSection: React.FC<{ stories: HappyStory[] }> = ({ stories }) => (
    <section className="py-16 bg-theme-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl font-bold text-theme-text-primary mb-12">Meet Our Happy Clients</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stories.slice(0, 4).map((story, i) => (
                    <img key={i} src={story.imageUrl} alt={story.coupleNames} className="w-full h-auto aspect-square object-cover rounded-full border-4 border-theme-accent-primary p-1" />
                ))}
            </div>
        </div>
    </section>
);


const ContactSection: React.FC<{ onAddContactQuery: LandingPageProps['onAddContactQuery'] }> = ({ onAddContactQuery }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim()) {
            alert('Name and Email are required.');
            return;
        }
        onAddContactQuery({
            name,
            email,
            message: `Enquiry from landing page. Phone: ${phone || 'Not provided'}.`,
            subject: 'Landing Page Enquiry',
        });
        // Clear form
        setName('');
        setEmail('');
        setPhone('');
    };
    
    return (
    <section className="py-16 bg-theme-accent-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <h3 className="font-serif text-3xl font-bold text-theme-text-primary">Our Recent Articles & Posts</h3>
                     <div className="grid sm:grid-cols-2 gap-4 mt-8">
                        <div className="bg-theme-surface rounded-lg overflow-hidden border border-theme-border">
                            <img src="https://plus.unsplash.com/premium_photo-1679865293444-c5a6104c35b8?q=80&w=2070&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="article" className="h-40 w-full object-cover"/>
                            <div className="p-4">
                                <h4 className="font-bold text-theme-text-primary">Sharadiya Navratri</h4>
                                <p className="text-sm text-theme-text-secondary mt-1">23 Sep</p>
                                <a href="#" className="text-sm text-theme-accent-primary font-semibold mt-4 inline-block">Read more</a>
                            </div>
                        </div>
                         <div className="bg-theme-surface rounded-lg overflow-hidden border border-theme-border">
                            <img src="https://images.unsplash.com/photo-1597157639199-8742464a93f5?q=80&w=1887&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="article" className="h-40 w-full object-cover"/>
                            <div className="p-4">
                                <h4 className="font-bold text-theme-text-primary">Brahmin Matrimony UK</h4>
                                 <p className="text-sm text-theme-text-secondary mt-1">05 Sep</p>
                                <a href="#" className="text-sm text-theme-accent-primary font-semibold mt-4 inline-block">Read more</a>
                            </div>
                        </div>
                    </div>
                </div>
                 <div className="bg-theme-accent-primary p-8 rounded-lg text-white">
                    <h3 className="font-serif text-2xl font-bold flex items-center gap-2"><HeartIcon className="w-6 h-6" /> Contact Us</h3>
                    <p className="mb-6">Make An Enquiry</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-white/20 p-3 rounded-md placeholder-white/70" />
                        <input type="email" placeholder="E-mail Id" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-white/20 p-3 rounded-md placeholder-white/70" />
                        <input type="text" placeholder="Your Phone No." value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-white/20 p-3 rounded-md placeholder-white/70" />
                        <button type="submit" className="bg-white text-theme-accent-primary font-bold px-8 py-3 rounded-md hover:bg-gray-200">Send</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
)};


const LandingPageFooter: React.FC<{ settings: WebsiteSettings }> = ({ settings }) => (
    <footer className="bg-theme-accent-secondary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
             <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="font-bold mb-4 border-b-2 border-theme-accent-primary pb-2 inline-block">Social Link</h3>
                    <div className="flex gap-4 mt-4">
                         {settings.socialLinks.map(link => (
                            <a key={link.id} href={link.url} className="hover:opacity-80">{
                                {'Facebook': <FacebookIcon />, 'Twitter': <TwitterIcon />, 'Instagram': <InstagramIcon />, 'Youtube': <YoutubeIcon />, 'LinkedIn': <span>LI</span>}[link.platform]
                            }</a>
                        ))}
                    </div>
                     <div className="mt-6 space-y-2 text-sm">
                        <p className="flex gap-2"><PhoneIcon className="w-4 h-4 mt-1"/> {settings.address}</p>
                        <p className="flex gap-2"><PhoneIcon className="w-4 h-4 mt-1"/> {settings.contactPhonePrimary}</p>
                        <p className="flex gap-2"><EnvelopeIcon className="w-4 h-4 mt-1"/> {settings.contactEmail}</p>
                    </div>
                </div>
                <div>
                    <h3 className="font-bold mb-4 border-b-2 border-theme-accent-primary pb-2 inline-block">Quick Link</h3>
                    <ul className="space-y-2 mt-4 text-sm">
                        <li><a href="#/about" className="hover:underline">About Us</a></li>
                        <li><a href="#/privacy" className="hover:underline">Privacy Policy</a></li>
                        <li><a href="#/packages" className="hover:underline">Our Packages</a></li>
                        <li><a href="#/register" className="hover:underline">Register Now</a></li>
                    </ul>
                </div>
                <div>
                     <h3 className="font-bold mb-4 border-b-2 border-theme-accent-primary pb-2 inline-block">Services</h3>
                     <ul className="space-y-2 mt-4 text-sm">
                        <li><a href="#/services/usa-matrimony" className="hover:underline">USA Matrimony</a></li>
                        <li><a href="#/services/doctors-matrimony" className="hover:underline">UK Matrimony</a></li>
                        <li><a href="#/services/canada-matrimony" className="hover:underline">Canada Matrimony</a></li>
                        <li><a href="#/services/lawyers-matrimony" className="hover:underline">Doctors Matrimony</a></li>
                    </ul>
                </div>
                 <div>
                    {/* FB Widget Placeholder */}
                     <div className="bg-white/10 p-2 rounded-lg h-full">
                        <p className="text-sm">Facebook Page Widget</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-black/20 py-4 text-center text-sm">
            <p>{settings.copyrightText}</p>
        </div>
    </footer>
);

const FloatingCtaBar: React.FC = () => (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-1">
        <a href="#" className="bg-blue-600 text-white p-3 rounded-l-md hover:bg-blue-700"><PhoneIcon className="w-6 h-6"/></a>
        <a href="#" className="bg-red-600 text-white p-3 hover:bg-red-700"><YoutubeIcon className="w-6 h-6"/></a>
        <a href="#" className="bg-pink-500 text-white p-3 hover:bg-pink-600"><InstagramIcon className="w-6 h-6"/></a>
        <a href="#" className="bg-green-500 text-white p-3 rounded-l-md hover:bg-green-600"><WhatsappIcon className="w-6 h-6"/></a>
    </div>
);


const LandingPage: React.FC<LandingPageProps> = ({ websiteSettings, pricingPlans, happyStories, services, onAddContactQuery }) => {
  return (
    <div className={`bg-theme-bg text-theme-text-primary min-h-screen font-sans ${websiteSettings.typography === 'classic' ? 'font-serif' : 'font-sans'}`}>
      <LandingPageHeader settings={websiteSettings} />
      <main>
          <HeroSection settings={websiteSettings} />
          <StatsSection />
          <ServicesSection services={services} />
          <PackagesSection plans={pricingPlans} />
          <HappyClientsSection stories={happyStories} />
          <ContactSection onAddContactQuery={onAddContactQuery} />
      </main>
      <LandingPageFooter settings={websiteSettings} />
      <FloatingCtaBar />
    </div>
  );
};

export default LandingPage;