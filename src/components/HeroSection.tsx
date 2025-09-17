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
    <section className="relative overflow-hidden w-full ">
      {/* Desktop Version */}
      <div className="hidden lg:block relative w-full bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
        {/* Blurred Background Image - Full Width */}

        {/* Overlay for better text readability */}

        {/* Main Content */}
        <div className="relative z-10 w-full px-8">

          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[375px]">
            <div
              className="absolute inset-0 w-full bg-cover bg-center bg-no-repeat filter blur-sm z-0"
              style={{
                backgroundImage: `url(${officeBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
            <div className="absolute inset-0 bg-slate-900/50 z-0"></div>

            {/* Left Side - Doctor Details */}
            <div className="text-white space-y-8 z-10 h-full flex flex-col justify-center min-w-1/2 mx-auto">
              {/* Main Heading */}
              <div className='lg:text-start w-full'>
                <h1 className="text-3xl w-full font-bold mb-4 leading-tight" style={{ color: '#fff4e2' }}>
                  {doctor.name?.toUpperCase()}
                </h1>
                <p className="text-2xl font-semibold mb-6" style={{ color: '#efd7b5' }}>
                  {doctor.title?.toUpperCase()}
                </p>
              </div>

              {/* Experience */}
              {/* <div className="flex items-center gap-3 text-lg">
                <Calendar className="h-5 w-5" style={{ color: '#fff4e2' }} />
                <span style={{ color: '#fff4e2' }}>{doctor.experience_years}+ years experience</span>
              </div> */}

              {/* Languages */}
              {/* <div>
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
              </div> */}

              {/* Award */}
              {/* {doctor.awards.length > 0 && (
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5" style={{ color: '#faf8f1' }} />
                  <span className="text-lg font-medium" style={{ color: '#faf8f1' }}>
                    Awarded {doctor.awards[0].name}, {doctor.awards[0].year}
                  </span>
                </div>
              )} */}

            </div>

            {/* Right Side - Doctor Photo */}
            <div className="flex justify-center lg:justify-center lg:h-full lg:items-end">
              <div className="relative">
                {/* Photo with depth effect */}
                <div className="relative z-20">
                  <img
                    src={drSaptarshiImage}
                    alt={`${doctor.name} - Profile Photo`}
                    className="w-[356px] h-[356px] object-cover"
                  />
                </div>
                {/* Background blur effect for depth */}

              </div>
            </div>
          </div>
        </div>

        {/* Hospital Affiliations Section - Desktop Only */}
        <div className="w-full bg-white py-4">
          <div className="container mx-auto px-6">
            {/* Heading */}
            <h3 className="text-center text-lg font-bold text-gray-900 mb-4">
              Hospital Affiliations
            </h3>
            
            {/* Hospital Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {doctor.affiliations.map((affiliation, index) => (
                <div
                  key={affiliation.hospital}
                  className="bg-white rounded-md p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                >
                  {/* Hospital Logo */}
                  <div className="flex justify-center mb-2">
                    <div className={`w-10 h-10 rounded-md overflow-hidden shadow-sm bg-white p-1 ${affiliation.hospital === 'Fortis Healthcare' ? 'bg-white' : ''}`}>
                      <img
                        src={logoMap[affiliation.hospital] || affiliation.logo}
                        alt={`${affiliation.hospital} logo`}
                        className={`w-full h-full ${affiliation.hospital === 'Fortis Healthcare' ? 'object-contain' : 'object-cover'}`}
                      />
                    </div>
                  </div>

                  {/* Hospital Details */}
                  <div className="text-center">
                    <h4 className="font-bold text-gray-900 text-xs mb-1 leading-tight">
                      {affiliation.hospital}
                    </h4>
                    <p className="text-gray-600 text-xs">
                      {affiliation.role}
                    </p>
                    {affiliation.current && (
                      <Badge className="bg-green-100 text-green-700 text-xs mt-1 px-1.5 py-0.5 rounded-full">
                        Current
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="lg:hidden relative w-full">
        {/* Mobile Content */}
        <div className="relative z-10 w-full grid grid-cols-2 items-end px-6 min-h-[40vh]">
          {/* Top Content */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
            style={{
              backgroundImage: `url(${portraitHeroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60 z-0"></div>
          <div className="flex-1 flex flex-col justify-center z-10">
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
          <div className="z-10">
            <img
              src={drSaptarshiImage}
              alt={`${doctor.name} - Profile Photo`}
              className="w-52 h-52 object-cover rounded-lg"
            />
          </div>
        </div>

         {/* Mobile Hospital Affiliations */}
         <div className="w-full bg-white py-4">
           <div className="px-4">
             {/* Heading */}
             <h3 className="text-center text-lg font-bold text-gray-900 mb-4">
               Hospital Affiliations
             </h3>
             
             {/* Hospital Cards Grid - Always 3 columns */}
             <div className="grid grid-cols-3 gap-2 max-w-2xl mx-auto">
               {doctor.affiliations.map((affiliation, index) => (
                 <div
                   key={affiliation.hospital}
                   className="bg-white rounded-md p-2 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                 >
                   {/* Hospital Logo */}
                   <div className="flex justify-center mb-1.5">
                     <div className={`w-8 h-8 rounded-md overflow-hidden shadow-sm bg-white p-0.5 ${affiliation.hospital === 'Fortis Healthcare' ? 'bg-white' : ''}`}>
                       <img
                         src={logoMap[affiliation.hospital] || affiliation.logo}
                         alt={`${affiliation.hospital} logo`}
                         className={`w-full h-full ${affiliation.hospital === 'Fortis Healthcare' ? 'object-contain' : 'object-cover'}`}
                       />
                     </div>
                   </div>

                   {/* Hospital Details */}
                   <div className="text-center">
                     <h4 className="font-bold text-gray-900 text-xs mb-0.5 leading-tight">
                       {affiliation.hospital}
                     </h4>
                     <p className="text-gray-600 text-xs">
                       {affiliation.role}
                     </p>
                     {affiliation.current && (
                       <Badge className="bg-green-100 text-green-700 text-xs mt-0.5 px-1 py-0.5 rounded-full">
                         Current
                       </Badge>
                     )}
                   </div>
                 </div>
               ))}
             </div>
           </div>
         </div>
      </div>
    </section>
  );
};