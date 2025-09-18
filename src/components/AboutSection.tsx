import React from 'react';
import { Calendar, Stethoscope, BookOpen, Users } from 'lucide-react';
import { DoctorProfile } from '@/data/doctorProfile';

interface AboutSectionProps {
  id: string;
  doctor: DoctorProfile;
}

type IconComponentType = React.ComponentType<React.SVGProps<SVGSVGElement>>;
interface AboutPoint {
  icon: IconComponentType;
  title: string;
  content: string;
  highlight: string;
  highlightColor?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ id, doctor }) => {

  // Extract key information from the about text
  const aboutPoints: AboutPoint[] = [
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
      icon: Users,
      title: "Leadership",
      content: "Executive roles in Endocrine Society of India and International Society of Endocrinology",
      highlight: "Industry leader"
    }
  ];

  return (
    <section id={id} className="clinical-card bg-[#faf8f1]">
      <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-3 ">
        <Stethoscope className="h-6 w-6" />
        About Dr. {doctor.name.split(' ').pop()}
      </h2>

      {/* Short intro */}
      <p className="text-lg text-foreground mb-8 font-medium">
        Dr. Saptarshi Bhattacharya is a highly experienced endocrinologist, currently consulting at Apollo Hospitals (Delhi), and previously at Max Super Speciality Hospitals (Delhi). He did his residency in AIIMS (DM in Endocrinology) and Maulana Azad Medical College (MD). He is a Fellow of the American College of Endocrinology, and has received accolades for authoring 120+ research publications in diabetes, thyroid disorders, PCOS, and metabolic syndromes. As Early’s Director of Medicine, he architects our clinical protocols that combine advanced diagnostics, individualized drug titration, and coordinated multidisciplinary support—all anchored in compassionate, patient-first care. His leadership in various endocrine societies, 20+ years of experience and academic credentials ensure that Early delivers medical oversight that is rigorous, safe, and built to scale.
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

      {/* Educational Qualifications section removed */}
    </section>
  );
};