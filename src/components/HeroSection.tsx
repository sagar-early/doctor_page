import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Calendar, Globe, Award } from 'lucide-react';
import { DoctorProfile } from '@/data/doctorProfile';
import drSaptarshiImage from '@/assets/doctor1.png';
import portraitHeroImage from '@/assets/potrait_hero.png';
import officeBackground from '@/assets/background_image.png'; // Add your image here
import aiims from '@/assets/AIIMS_logo.png';
import maxHealthcare from '@/assets/max_logo.jpg';
import fortis from '@/assets/fortis_logo.png';

interface HeroSectionProps {
  doctor: DoctorProfile;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ doctor }) => {
  const logoMap: { [key: string]: string } = {
    'AIIMS': aiims,
    'Max Healthcare': maxHealthcare,
    'Fortis Healthcare': fortis,
  };

  return (
    <section className="relative overflow-hidden w-full -mx-4">
      {/* Desktop Version */}
      <div className="hidden lg:block relative min-h-screen w-full bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
        {/* Blurred Background Image - Full Width */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat filter blur-sm"
          style={{
            backgroundImage: `url(${officeBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-slate-900/50"></div>
        
        {/* Main Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[500px]">
            
            {/* Left Side - Doctor Details */}
            <div className="text-white space-y-8">
              {/* Main Heading */}
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight" style={{ color: '#fff4e2' }}>
                  {doctor.name}
                </h1>
                <p className="text-2xl font-semibold mb-6" style={{ color: '#efd7b5' }}>
                  {doctor.title}
                </p>
              </div>

              {/* Experience */}
              <div className="flex items-center gap-3 text-lg">
                <Calendar className="h-5 w-5" style={{ color: '#fff4e2' }} />
                <span style={{ color: '#fff4e2' }}>{doctor.experience_years}+ years experience</span>
              </div>

              {/* Languages */}
              <div>
                <h3 className="text-lg font-medium mb-3" style={{ color: '#fff4e2' }}>Languages Spoken</h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.languages.map((language) => (
                    <Badge
                      key={language}
                      variant="secondary"
                      className="border border-white/30 hover:bg-white/30 transition-all backdrop-blur-sm"
                      style={{ backgroundColor: '#dbdfd2', color: '#434a35' }}
                    >
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Award */}
              {doctor.awards.length > 0 && (
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5" style={{ color: '#faf8f1' }} />
                  <span className="text-lg font-medium" style={{ color: '#faf8f1' }}>
                    Awarded {doctor.awards[0].name}, {doctor.awards[0].year}
                  </span>
                </div>
              )}

            </div>

            {/* Right Side - Doctor Photo */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Photo with depth effect */}
                <div className="relative z-20">
                  <img
                    src={drSaptarshiImage}
                    alt={`${doctor.name} - Profile Photo`}
                    className="w-[456px] h-[456px] object-cover"
                  />
                </div>
                {/* Background blur effect for depth */}
                
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Hospital Affiliation Bar - Desktop Only */}
        <div className="absolute bottom-0 left-0 right-0 w-full">
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20">
              {doctor.affiliations.map((affiliation, index) => {
                const shades = ['#939f79','#abb597','#dbdfd2']; // New Early green shades
                const textColors = ['text-white', 'text-white', 'text-[#2C3E50]']; // White text for dark/medium, dark for light
                const backgroundColor = shades[index];
                const textColor = textColors[index];
                
                return (
                  <div 
                    key={affiliation.hospital} 
                    className="flex flex-col md:flex-row items-center md:items-center p-6 min-h-[200px] md:min-h-[160px]"
                    style={{ backgroundColor }}
                  >
                    {/* Hospital logo */}
                    <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                      <div className={`w-20 h-20 rounded-xl overflow-hidden shadow-lg ${affiliation.hospital === 'Fortis Healthcare' ? 'bg-white' : ''}`}>
                        <img
                          src={logoMap[affiliation.hospital] || affiliation.logo}
                          alt={`${affiliation.hospital} logo`}
                          className={`w-full h-full ${affiliation.hospital === 'Fortis Healthcare' ? 'object-contain p-2' : 'object-cover'}`}
                        />
                      </div>
                    </div>
                    
                    {/* Hospital details */}
                    <div className={`flex-1 text-center md:text-left ${textColor}`}>
                      <h3 className="font-bold text-lg mb-1">{affiliation.hospital}</h3>
                      <p className="text-sm mb-2">{affiliation.role}</p>
                      {affiliation.current && (
                        <Badge 
                          variant="secondary" 
                          className="bg-green-600 text-white text-xs px-2 py-1 rounded-full"
                        >
                          Current
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="lg:hidden relative min-h-screen w-full">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${portraitHeroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        {/* Mobile Content */}
        <div className="relative z-10 w-full h-screen flex flex-col justify-between px-6 py-8">
          {/* Top Content */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Doctor Name */}
            <h1 className="text-white text-3xl md:text-4xl font-bold mb-4 leading-tight text-left">
              {doctor.name}
            </h1>
            
            {/* Doctor Title */}
            <p className="text-white text-lg mb-6 text-left opacity-90">
              {doctor.title}
            </p>
          </div>
          
          {/* Doctor Image Overlay */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-8">
            <img
              src={drSaptarshiImage}
              alt={`${doctor.name} - Profile Photo`}
              className="w-48 h-48 object-cover rounded-lg shadow-2xl"
            />
          </div>
        </div>

        {/* Mobile Affiliations Bar */}
        <div className="absolute bottom-0 left-0 right-0 w-full">
          <div className="w-full">
            <div className="grid grid-cols-1 divide-y divide-white/20">
              {doctor.affiliations.map((affiliation, index) => {
                const shades = ['#939f79','#abb597','#dbdfd2']; // Early green shades
                const textColors = ['text-white', 'text-white', 'text-[#2C3E50]']; // White text for dark/medium, dark for light
                const backgroundColor = shades[index];
                const textColor = textColors[index];
                
                return (
                  <div 
                    key={affiliation.hospital} 
                    className="flex items-center p-4 min-h-[120px]"
                    style={{ backgroundColor }}
                  >
                    {/* Hospital logo */}
                    <div className="flex-shrink-0 mr-4">
                      <div className={`w-16 h-16 rounded-xl overflow-hidden shadow-lg ${affiliation.hospital === 'Fortis Healthcare' ? 'bg-white' : ''}`}>
                        <img
                          src={logoMap[affiliation.hospital] || affiliation.logo}
                          alt={`${affiliation.hospital} logo`}
                          className={`w-full h-full ${affiliation.hospital === 'Fortis Healthcare' ? 'object-contain p-2' : 'object-cover'}`}
                        />
                      </div>
                    </div>
                    
                    {/* Hospital details */}
                    <div className={`flex-1 ${textColor}`}>
                      <h3 className="font-bold text-lg mb-1">{affiliation.hospital}</h3>
                      <p className="text-sm mb-2">{affiliation.role}</p>
                      {affiliation.current && (
                        <Badge 
                          variant="secondary" 
                          className="bg-green-600 text-white text-xs px-2 py-1 rounded-full"
                        >
                          Current
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};