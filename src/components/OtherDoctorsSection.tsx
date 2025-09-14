import React, { useRef } from 'react';
import { ClinicalButton } from '@/components/ui/clinical-button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Users, Globe } from 'lucide-react';
import { DoctorProfile } from '@/data/doctorProfile';

interface OtherDoctorsSectionProps {
  id: string;
  doctor: DoctorProfile;
}

export const OtherDoctorsSection: React.FC<OtherDoctorsSectionProps> = ({ id, doctor }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Card width + gap
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? scrollLeft - scrollAmount 
        : scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id={id} className="clinical-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          Meet Other Doctors
        </h2>
        
        {/* Navigation buttons */}
        <div className="hidden md:flex items-center gap-2">
          <ClinicalButton
            variant="ghost"
            size="icon"
            onClick={() => scroll('left')}
            className="h-10 w-10"
          >
            <ChevronLeft className="h-5 w-5" />
          </ClinicalButton>
          <ClinicalButton
            variant="ghost"
            size="icon"
            onClick={() => scroll('right')}
            className="h-10 w-10"
          >
            <ChevronRight className="h-5 w-5" />
          </ClinicalButton>
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {doctor.other_doctors.map((otherDoctor, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-80 clinical-card bg-muted/30 border-muted snap-start hover:shadow-lg transition-all group"
          >
            {/* Doctor Photo */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <img
                  src={otherDoctor.portrait}
                  alt={`${otherDoctor.name} - Profile Photo`}
                  className="w-24 h-24 rounded-full object-cover shadow-md"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 to-transparent"></div>
              </div>
            </div>

            {/* Doctor Info */}
            <div className="text-center space-y-3">
              <div>
                <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
                  {otherDoctor.name}
                </h3>
                <p className="text-primary font-medium text-sm">
                  {otherDoctor.specialty}
                </p>
              </div>

              {/* Languages */}
              <div className="flex flex-wrap justify-center gap-1">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Globe className="h-3 w-3" />
                  <span>{otherDoctor.languages.join(', ')}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <ClinicalButton
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  asChild
                >
                  <a href={`/doctor/${otherDoctor.slug}`}>
                    View Profile
                  </a>
                </ClinicalButton>
                <ClinicalButton
                  variant="secondary"
                  size="sm"
                  className="flex-1"
                >
                  Compare
                </ClinicalButton>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile navigation dots */}
      <div className="flex md:hidden justify-center gap-2 mt-6">
        {doctor.other_doctors.map((_, index) => (
          <button
            key={index}
            className="w-2 h-2 rounded-full bg-muted hover:bg-primary transition-colors"
            onClick={() => {
              if (scrollContainerRef.current) {
                const cardWidth = 320;
                scrollContainerRef.current.scrollTo({
                  left: index * cardWidth,
                  behavior: 'smooth'
                });
              }
            }}
          />
        ))}
      </div>

      {doctor.other_doctors.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Other doctor profiles coming soon...</p>
        </div>
      )}

      {/* Call to action */}
      <div className="mt-8 text-center">
        <ClinicalButton variant="secondary" asChild>
          <a href="/doctors" className="gap-2">
            <Users className="h-4 w-4" />
            View All Doctors
          </a>
        </ClinicalButton>
      </div>
    </section>
  );
};