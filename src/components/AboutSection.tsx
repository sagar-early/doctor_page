import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Award, GraduationCap, Calendar, Stethoscope, BookOpen, Mic, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { DoctorProfile } from '@/data/doctorProfile';

interface AboutSectionProps {
  id: string;
  doctor: DoctorProfile;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ id, doctor }) => {
  const [expandedQual, setExpandedQual] = useState<number | null>(null);

  // Extract key information from the about text
  const aboutPoints = [
    {
      icon: Calendar,
      title: "Experience",
      content: `${doctor.experience_years}+ years of specialized endocrinology practice`,
      highlight: `${doctor.experience_years}+ years`
    },
    {
      icon: Stethoscope,
      title: "Specialties",
      content: "Diabetes, thyroid disorders, obesity, PCOS, and metabolic conditions",
      highlight: "Comprehensive care"
    },
    {
      icon: BookOpen,
      title: "Research & Publications",
      content: "100+ scientific publications in peer-reviewed journals",
      highlight: "100+ publications"
    },
    {
      icon: Award,
      title: "Recognition",
      content: "Excellence in Endocrinology Award and Best Research Paper recognition",
      highlight: "Award-winning",
      highlightColor: "#FF9800"
    },
    {
      icon: Mic,
      title: "Public Awareness",
      content: "Regular TV appearances and newspaper contributions for health education",
      highlight: "Media expert"
    },
    {
      icon: Users,
      title: "Leadership",
      content: "Executive roles in Endocrine Society of India and International Society of Endocrinology",
      highlight: "Industry leader"
    }
  ];

  return (
    <section id={id} className="clinical-card">
      <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
        <GraduationCap className="h-8 w-8 text-primary" />
        About Dr. {doctor.name.split(' ').pop()}
      </h2>
      
      {/* Short intro */}
      <p className="text-lg text-foreground mb-8 font-medium">
        A senior endocrinologist committed to delivering evidence-based, compassionate care with a focus on patient education and long-term outcomes.
      </p>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {aboutPoints.map((point, index) => {
          const IconComponent = point.icon;
          return (
            <div
              key={index}
              className="bg-[#dbdfd2] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <IconComponent className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2 text-lg">
                    {point.title}
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    {point.content.split(point.highlight).map((part, i) => (
                      <span key={i}>
                        {part}
                        {i < point.content.split(point.highlight).length - 1 && (
                          <span 
                            className="font-bold"
                            style={{ color: point.highlightColor || '#4CAF50' }}
                          >
                            {point.highlight}
                          </span>
                        )}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Educational Qualifications - Clean LinkedIn Style */}
      <div className="bg-white rounded-xl p-6 space-y-8">
        <h3 className="font-bold text-[#2E3523] flex items-center gap-3 text-xl">
          <GraduationCap className="h-6 w-6 text-[#939F79]" />
          Educational Qualifications
        </h3>
        
        <div className="space-y-8">
          {/* Entry 1 - AIIMS DM */}
          <div className="bg-white border border-[#E4E7DF] rounded-xl shadow-sm p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              {/* Left - Logo Column (64px fixed width) */}
              <div className="w-full md:w-16 flex-shrink-0 flex items-center justify-center md:justify-start">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-white border border-[#E4E7DF] flex items-center justify-center">
                  <img 
                    src="/src/assets/AIIMS_logo.png" 
                    alt="AIIMS logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right - Details Column */}
              <div className="flex-1 min-w-0 text-center md:text-left">
                <div className="space-y-3">
                  {/* Degree */}
                  <h4 className="font-bold text-[#2E3523] text-lg leading-tight">
                    Doctorate in Medicine (DM), Endocrinology
                  </h4>
                  
                  {/* Institution */}
                  <p className="font-semibold text-[#4A4F46] text-base">
                    All India Institute of Medical Sciences (AIIMS), New Delhi
                  </p>
                  
                  {/* Duration */}
                  <p className="text-[#6B6F66] text-sm font-medium">
                    Jan 2008 – Dec 2010
                  </p>

                  {/* Short Blurb */}
                  <p className="text-[#4A4F46] text-base leading-relaxed">
                    A 3-year super-specialty program for MD (Internal Medicine) physicians, providing advanced training in diagnosis and management of endocrine disorders.
                  </p>

                  {/* Expandable Details */}
                  <div className="mt-4">
                    <div className={`transition-all duration-250 overflow-hidden ${
                      expandedQual === 0 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <ul className="space-y-2 text-[#4A4F46] text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-[#939F79] mt-1">•</span>
                          <span>Disorders of pituitary, thyroid, parathyroid, and adrenal glands</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#939F79] mt-1">•</span>
                          <span>Diabetes mellitus: type 1, type 2, monogenic, secondary, gestational</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#939F79] mt-1">•</span>
                          <span>Obesity and metabolic syndrome</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#939F79] mt-1">•</span>
                          <span>Calcium & bone metabolism: osteoporosis, rickets, osteomalacia</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#939F79] mt-1">•</span>
                          <span>Disorders of sexual development and reproduction</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#939F79] mt-1">•</span>
                          <span>Endocrine hypertension</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#939F79] mt-1">•</span>
                          <span>Endocrine tumors (e.g., pheochromocytoma, paraganglioma, MEN syndromes)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#939F79] mt-1">•</span>
                          <span>Genetic & syndromic endocrine disorders</span>
                        </li>
                      </ul>
                    </div>
                    
                    {/* Show More/Less Toggle */}
                    <button
                      onClick={() => setExpandedQual(expandedQual === 0 ? null : 0)}
                      className="mt-3 flex items-center gap-1 text-[#4CAF50] hover:text-[#45a049] font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:ring-offset-2 rounded"
                    >
                      {expandedQual === 0 ? (
                        <>
                          <span>Show Less</span>
                          <ChevronUp className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          <span>Show More</span>
                          <ChevronDown className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};