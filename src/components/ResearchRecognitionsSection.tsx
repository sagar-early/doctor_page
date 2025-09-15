import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Award, GraduationCap, ChevronDown, ChevronUp } from 'lucide-react';
import { DoctorProfile } from '@/data/doctorProfile';

interface ResearchRecognitionsSectionProps {
  id: string;
  doctor: DoctorProfile;
}

interface TimelineEntry {
  year: number;
  type: 'publication' | 'certification' | 'award';
  title: string;
  subtitle: string;
  source: string;
  citation?: string;
  credentialId?: string;
  description?: string;
  url?: string;
}

export const ResearchRecognitionsSection: React.FC<ResearchRecognitionsSectionProps> = ({ id, doctor }) => {
  const [expandedCitation, setExpandedCitation] = useState<string | null>(null);

  // Combine and organize all entries by year
  const timelineEntries: TimelineEntry[] = [
    // 2023 Publications
    {
      year: 2023,
      type: 'publication',
      title: 'Case Series: Successful Weight Loss with Tirzepatide in Indian Patients',
      subtitle: 'Research • Obesity',
      source: 'Obesity Medicine • 2023',
      citation: 'Bhattacharya, S. et al. (2023). Case Series: Successful Weight Loss with Tirzepatide in Indian Patients. Obesity Medicine, 8(3), 123-129.',
      url: '#'
    },
    {
      year: 2023,
      type: 'publication',
      title: 'Efficacy of GLP-1 Receptor Agonists in Indian Population: A Real-World Study',
      subtitle: 'Research • Diabetes',
      source: 'Indian Journal of Endocrinology • 2023',
      citation: 'Bhattacharya, S. et al. (2023). Efficacy of GLP-1 Receptor Agonists in Indian Population: A Real-World Study. Indian Journal of Endocrinology, 27(4), 245-252.',
      url: '#'
    },
    // 2022 Publications and Awards
    {
      year: 2022,
      type: 'publication',
      title: 'Metabolic Syndrome Management in Urban India: Challenges and Solutions',
      subtitle: 'Review • Metabolism',
      source: 'Diabetes Care India • 2022',
      citation: 'Bhattacharya, S. (2022). Metabolic Syndrome Management in Urban India: Challenges and Solutions. Diabetes Care India, 15(2), 89-96.',
      url: '#'
    },
    {
      year: 2022,
      type: 'award',
      title: 'Best Research Paper in Diabetes Management',
      subtitle: 'Award • Research Excellence',
      source: 'Diabetes Association of India • 2022',
      description: 'Recognized for outstanding contribution to diabetes research and management strategies.'
    },
    // 2020 Certifications
    {
      year: 2020,
      type: 'certification',
      title: 'Fellowship in Obesity Medicine (FOM)',
      subtitle: 'Certification • Obesity Medicine',
      source: 'World Obesity Federation • 2020',
      credentialId: 'FOM-2020-789',
      description: 'Specialized training in comprehensive obesity management and treatment protocols.'
    },
    // 2019 Certifications
    {
      year: 2019,
      type: 'certification',
      title: 'Certified Diabetes Educator (CDE)',
      subtitle: 'Certification • Diabetes Education',
      source: 'International Diabetes Federation • 2019',
      credentialId: 'CDE-2019-001245',
      description: 'Advanced certification in diabetes education and management strategies.'
    }
  ];

  const toggleCitation = (entryId: string) => {
    setExpandedCitation(expandedCitation === entryId ? null : entryId);
  };


  // Group entries by year
  const entriesByYear = timelineEntries.reduce((acc, entry) => {
    if (!acc[entry.year]) {
      acc[entry.year] = [];
    }
    acc[entry.year].push(entry);
    return acc;
  }, {} as Record<number, TimelineEntry[]>);

  const sortedYears = Object.keys(entriesByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <section id={id} className="w-full bg-gradient-to-b from-[#434a35] to-[#393f2d] py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Research & Recognitions
          </h2>
          <p className="text-lg text-[#DBDFD2] font-medium">
            Key publications, credentials, and awards by Dr. Saptarshi Bhattacharya
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Spine */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#939F79] hidden md:block"></div>

          {/* Timeline Entries */}
          <div className="space-y-12">
            {sortedYears.map((year, yearIndex) => (
              <div key={year} className="relative">
                {/* Entries for this year */}
                <div className="space-y-8">
                  {entriesByYear[year].map((entry, entryIndex) => {
                    const isLeft = entryIndex % 2 === 0; // Alternate left-right for zigzag pattern
                    const entryId = `${year}-${entryIndex}`;
                    return (
                      <div key={entryId} className={`flex flex-col md:flex-row items-center md:items-start gap-6 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                        {/* Timeline left icon and year badge removed as requested */}

                        {/* Entry Card */}
                        <div className={`w-full md:w-[45%] ${isLeft ? 'md:order-3' : 'md:order-1'}`}>
                          <div className={`bg-white rounded-xl shadow-lg p-5 border border-[#E4E7DF] relative hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group`}>
                            {/* Accent Stripe */}
                            <div className={`absolute top-0 ${isLeft ? 'left-0' : 'right-0'} h-full w-1 rounded-l-xl ${entry.type === 'publication' ? 'bg-[#4CAF50] group-hover:shadow-lg group-hover:shadow-[#4CAF50]/30' : 'bg-[#FF9800] group-hover:shadow-lg group-hover:shadow-[#FF9800]/30'}`}></div>
                            
                            <div className="flex items-start gap-4 pl-2">
                              {/* Icon/Logo */}
                              <div className="flex-shrink-0">
                                {entry.type === 'publication' ? (
                                  <BookOpen className="h-6 w-6 text-[#939F79]" />
                                ) : (
                                  <div className="w-12 h-12 rounded-full bg-[#939F79]/10 flex items-center justify-center">
                                    <Award className="h-6 w-6 text-[#939F79]" />
                                  </div>
                                )}
                              </div>

                              {/* Content */}
                              <div className="flex-1">
                                <h4 className="font-bold text-[#2E3523] text-xl mb-1">
                                  {entry.title}
                                </h4>
                                <p className="text-[#6B6F66] text-sm mb-1">
                                  {entry.subtitle}
                                </p>
                                <p className="text-[#6B6F66] text-sm mb-3">
                                  {entry.source}
                                </p>

                                {/* Expandable Citation for Publications */}
                                {entry.citation && (
                                  <div className="relative">
                                    <div className={`text-[#4A4F46] text-sm leading-relaxed transition-all duration-250 overflow-hidden ${
                                      expandedCitation === entryId ? 'max-h-96 opacity-100' : 'max-h-12 opacity-100'
                                    }`}>
                                      <p className={expandedCitation === entryId ? '' : 'line-clamp-2'}>
                                        {entry.citation}
                                      </p>
                                    </div>
                                    <button
                                      onClick={() => toggleCitation(entryId)}
                                      className="mt-2 flex items-center gap-1 text-[#4CAF50] hover:text-[#45a049] font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:ring-offset-2 rounded"
                                    >
                                      {expandedCitation === entryId ? (
                                        <><span>Show Less</span><ChevronUp className="h-4 w-4" /></>
                                      ) : (
                                        <><span>Show More</span><ChevronDown className="h-4 w-4" /></>
                                      )}
                                    </button>
                                  </div>
                                )}

                                {/* Description for Certifications/Awards */}
                                {entry.description && (
                                  <p className="text-[#4A4F46] text-sm leading-relaxed mb-2 italic">
                                    {entry.description}
                                  </p>
                                )}

                                {/* Credential ID */}
                                {entry.credentialId && (
                                  <div className="inline-block">
                                    <Badge variant="secondary" className="text-xs bg-gray-100 text-[#6B6F66] rounded-full px-3 py-1">
                                      ID: {entry.credentialId}
                                    </Badge>
                                  </div>
                                )}

                                {/* Actions removed as requested */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
