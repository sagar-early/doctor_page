import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Stethoscope } from 'lucide-react';
import { DoctorProfile } from '@/data/doctorProfile';

interface FindADoctorSectionProps {
  id: string;
  doctor: DoctorProfile;
}

interface DoctorCard {
  id: string;
  name: string;
  designation: string;
  photo: string;
  profileUrl: string;
  department?: string;
}

export const FindADoctorSection: React.FC<FindADoctorSectionProps> = ({ id, doctor }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});

  // Sample doctors data
  const doctors: DoctorCard[] = [
    {
      id: "2", 
      name: "Dr. Ankita Aneja",
      designation: "Consultant Endocrinologist",
      photo: "/src/assets/Dr. Ankita-min.png",
      profileUrl: "/doctors/ankita-aneja",
      department: "Endocrinology"
    },
    {
      id: "3",
      name: "Dr. Savita Jain", 
      designation: "Senior Consultant, Endocrinology",
      photo: "/src/assets/Dr. Savita-min.png",
      profileUrl: "/doctors/savita-jain",
      department: "Endocrinology"
    },
    {
      id: "4",
      name: "Dr. Rini Yadav",
      designation: "Consultant Endocrinologist",
      photo: "/src/assets/Dr. Rini Yadav.png",
      profileUrl: "/doctors/rini-yadav",
      department: "Endocrinology"
    }
  ];

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const cardWidth = 300; // Card width + gap
      const scrollAmount = cardWidth;
      const currentScroll = carouselRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      carouselRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const handleImageLoad = (doctorId: string) => {
    setIsLoading(prev => ({ ...prev, [doctorId]: false }));
  };

  const handleImageError = (doctorId: string) => {
    setIsLoading(prev => ({ ...prev, [doctorId]: false }));
  };


  return (
    <section id={id} className="w-full bg-[#798660] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Stethoscope className="h-6 w-6 text-white" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Meet Our Specialists
            </h2>
          </div>
          <p className="text-base text-[#DBDFD2] font-medium">
            Browse our specialists and view their profiles.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scrollCarousel('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-[#E4E7DF] flex items-center justify-center text-[#434A35] hover:text-[#2E3523] hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#939F79] focus:ring-offset-2"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scrollCarousel('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-[#E4E7DF] flex items-center justify-center text-[#434A35] hover:text-[#2E3523] hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#939F79] focus:ring-offset-2"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Carousel */}
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 px-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {doctors.map((doctorCard) => (
              <div
                key={doctorCard.id}
                className="flex-shrink-0 snap-start"
                style={{ width: '280px' }}
              >
                <div className="bg-white border border-[#E4E7DF] rounded-2xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-2xl hover:border-[#939F79] transition-all duration-200 focus-within:ring-2 focus-within:ring-[#939F79] focus-within:ring-offset-2 group cursor-pointer relative">
                  {/* Photo */}
                  <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
                    {/* Department Badge - Fixed positioning */}
                    {doctorCard.department && (
                      <div className="absolute top-3 left-3 z-20">
                        <span className="bg-[#DBDFD2] text-[#939F79] text-xs font-semibold px-3 py-1 rounded-full shadow-sm border border-[#939F79]/20">
                          {doctorCard.department}
                        </span>
                      </div>
                    )}
                    {isLoading[doctorCard.id] !== false && (
                      <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                        <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                      </div>
                    )}
                    <img
                      src={doctorCard.photo}
                      alt={`Dr. ${doctorCard.name} portrait`}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                      onLoad={() => handleImageLoad(doctorCard.id)}
                      onError={() => handleImageError(doctorCard.id)}
                      loading="lazy"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 h-20 flex flex-col justify-center">
                    <h3 className="font-bold text-[#2E3523] text-lg mb-1 truncate">
                      {doctorCard.name}
                    </h3>
                    <p className="text-[#6B6F66] text-sm leading-relaxed line-clamp-2">
                      {doctorCard.designation}
                    </p>
                  </div>

                  {/* Clickable Overlay */}
                  <a
                    href={doctorCard.profileUrl}
                    className="absolute inset-0 z-20"
                    aria-label={`Open profile: ${doctorCard.name}, ${doctorCard.designation}`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Edge Gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#798660] to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#798660] to-transparent pointer-events-none"></div>
        </div>

        {/* Empty State (if no doctors) */}
        {doctors.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-50 border border-[#E4E7DF] rounded-2xl p-8 max-w-md mx-auto">
              <Stethoscope className="h-12 w-12 text-[#939F79] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#2E3523] mb-2">
                No doctors found
              </h3>
              <p className="text-[#6B6F66] mb-4">
                We're working on adding more specialists to our team.
              </p>
              <a
                href="/doctors"
                className="inline-flex items-center text-[#4CAF50] hover:text-[#45a049] font-medium transition-colors"
              >
                Browse all specialists
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
