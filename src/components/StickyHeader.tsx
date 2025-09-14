import React, { useState, useEffect } from 'react';
import { ClinicalButton } from '@/components/ui/clinical-button';
import { CallbackModal } from '@/components/CallbackModal';
import { cn } from '@/lib/utils';
import { DoctorProfile } from '@/data/doctorProfile';

interface StickyHeaderProps {
  doctor: DoctorProfile;
}

export const StickyHeader: React.FC<StickyHeaderProps> = ({ doctor }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-50 transition-all duration-300",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              {doctor.name}
            </h1>
            <p className="text-sm text-muted-foreground">
              {doctor.title}
            </p>
          </div>
          
          <CallbackModal>
            <ClinicalButton variant="callback" size="sm">
              Get a Callback
            </ClinicalButton>
          </CallbackModal>
        </div>
      </div>
    </header>
  );
};