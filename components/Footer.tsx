import React from 'react';
import HeartIcon from './icons/HeartIcon';
import TwitterIcon from './icons/TwitterIcon';
import InstagramIcon from './icons/InstagramIcon';
import FacebookIcon from './icons/FacebookIcon';
import { WebsiteSettings, SocialLink as SocialLinkType } from '../types';

const FooterLink: React.FC<{href: string; children: React.ReactNode}> = ({href, children}) => (
    <li>
        <a href={href} className="text-theme-text-secondary hover:text-white transition-colors">{children}</a>
    </li>
);

const SocialLink: React.FC<{link: SocialLinkType}> = ({link}) => {
    const getIcon = () => {
        switch (link.platform) {
            case 'Facebook': return <FacebookIcon />;
            case 'Instagram': return <InstagramIcon />;
            case 'Twitter': return <TwitterIcon />;
            case 'LinkedIn': return (
                <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
            );
            default: return null;
        }
    };

    return (
     <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-theme-text-secondary hover:text-white transition-colors">
        {getIcon()}
    </a>
    );
}

const Footer: React.FC<{settings: WebsiteSettings}> = ({ settings }) => {
    return (
        <footer className="bg-theme-surface border-t border-theme-border">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    {/* Logo and About */}
                    <div className="col-span-2 lg:col-span-1">
                        <a href="#/" className="flex items-center space-x-2 mb-4">
                            <img src={settings.logoUrl} alt={settings.siteName} className="h-8 object-contain" />
                            <span className="text-2xl font-bold text-transparent bg-clip-text bg-theme-gradient">{settings.siteName}</span>
                        </a>
                        <p className="text-theme-text-secondary text-sm">{settings.footerContent}</p>
                    </div>
                    {/* Links */}
                    <div>
                        <h2 className="mb-4 text-sm font-semibold text-theme-text-primary uppercase">Company</h2>
                        <ul className="space-y-3">
                            <FooterLink href="#">About Us</FooterLink>
                            <FooterLink href="#/happy-stories">Happy Stories</FooterLink>
                            <FooterLink href="#/astrology">Astrology</FooterLink>
                        </ul>
                    </div>
                     <div>
                        <h2 className="mb-4 text-sm font-semibold text-theme-text-primary uppercase">Support</h2>
                        <ul className="space-y-3">
                            <FooterLink href="#/faq">FAQ</FooterLink>
                            <FooterLink href={`mailto:${settings.contactEmail}`}>Contact Us</FooterLink>
                            <FooterLink href="#">Help Center</FooterLink>
                        </ul>
                    </div>
                     <div>
                        <h2 className="mb-4 text-sm font-semibold text-theme-text-primary uppercase">Legal</h2>
                        <ul className="space-y-3">
                            <FooterLink href="#">Privacy Policy</FooterLink>
                            <FooterLink href="#">Terms of Service</FooterLink>
                            <FooterLink href="#">Cookie Policy</FooterLink>
                        </ul>
                    </div>
                </div>
                {/* Bottom Bar */}
                <div className="pt-8 mt-8 border-t border-theme-border flex flex-col sm:flex-row justify-between items-center">
                    <span className="text-sm text-theme-text-secondary">{settings.copyrightText}</span>
                    <div className="flex space-x-5 mt-4 sm:mt-0">
                        {settings.socialLinks.map(link => <SocialLink key={link.id} link={link} />)}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;