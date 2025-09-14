import React from 'react';
import { ClinicalButton } from '@/components/ui/clinical-button';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  BookOpen, 
  Heart, 
  Mail, 
  Shield,
  ExternalLink 
} from 'lucide-react';

const footerLinks = [
  {
    icon: Search,
    label: 'Find a Doctor',
    href: '/doctors',
    description: 'Browse our directory of specialists'
  },
  {
    icon: BookOpen,
    label: 'Research',
    href: '/research',
    description: 'Latest medical research and studies'
  },
  {
    icon: Heart,
    label: 'Programs',
    href: '/programs',
    description: 'Health and wellness programs'
  },
  {
    icon: Mail,
    label: 'Contact',
    href: '/contact',
    description: 'Get in touch with our team'
  },
  {
    icon: Shield,
    label: 'Privacy',
    href: '/privacy',
    description: 'Privacy policy and data protection'
  }
];

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Links */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {footerLinks.map((link) => (
            <div key={link.label} className="group">
              <ClinicalButton
                variant="ghost"
                asChild
                className="w-full justify-start p-4 h-auto flex-col items-start gap-3 hover:bg-background"
              >
                <a href={link.href} className="text-left">
                  <div className="flex items-center gap-3 w-full">
                    <link.icon className="h-5 w-5 text-primary group-hover:text-primary-hover transition-colors" />
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {link.label}
                    </span>
                    <ExternalLink className="h-3 w-3 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {link.description}
                  </p>
                </a>
              </ClinicalButton>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Early.fit</p>
              <p className="text-xs text-muted-foreground">
                Personalized healthcare solutions
              </p>
            </div>
          </div>

          {/* Copyright & Links */}
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
            <p>
              © {currentYear} Early.fit. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="/terms" 
                className="hover:text-foreground transition-colors"
              >
                Terms of Service
              </a>
              <Separator orientation="vertical" className="h-4" />
              <a 
                href="/privacy" 
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </a>
              <Separator orientation="vertical" className="h-4" />
              <a 
                href="/accessibility" 
                className="hover:text-foreground transition-colors"
              >
                Accessibility
              </a>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-8 p-4 bg-muted/50 rounded-xl border border-border">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Medical Disclaimer:</strong> The information provided on this platform is for educational purposes only and should not be considered as medical advice. Always consult with qualified healthcare professionals before making any medical decisions or starting new treatments.
          </p>
        </div>
      </div>
    </footer>
  );
};