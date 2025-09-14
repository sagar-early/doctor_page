import React from 'react';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { VideosSection } from '@/components/VideosSection';
import { ResearchRecognitionsSection } from '@/components/ResearchRecognitionsSection';
import { FindADoctorSection } from '@/components/FindADoctorSection';
import { FAQSection } from '@/components/FAQSection';
import { drSaptarshiProfile } from '@/data/doctorProfile';

const DoctorProfile: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="space-y-0">
        {/* Hero Section */}
        <HeroSection doctor={drSaptarshiProfile} />
        
        {/* About Section */}
        <div className="container mx-auto px-4 py-8">
          <AboutSection id="about" doctor={drSaptarshiProfile} />
        </div>
        
        {/* Videos Section */}
        <div className="container mx-auto px-4 py-8">
          <VideosSection id="videos" doctor={drSaptarshiProfile} />
        </div>
        
        {/* Research & Recognitions Section */}
        <ResearchRecognitionsSection id="research-recognitions" doctor={drSaptarshiProfile} />
        
        {/* Find a Doctor Section */}
        <FindADoctorSection id="find-doctor" doctor={drSaptarshiProfile} />
        
        {/* FAQ Section */}
        <div className="container mx-auto px-4 py-8">
          <FAQSection id="faq" doctor={drSaptarshiProfile} />
        </div>
        
      </main>
    </div>
  );
};

export default DoctorProfile;