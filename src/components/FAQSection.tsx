import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ClinicalButton } from '@/components/ui/clinical-button';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, ThumbsUp, Check } from 'lucide-react';
import { DoctorProfile } from '@/data/doctorProfile';

interface FAQSectionProps {
  id: string;
  doctor: DoctorProfile;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ id, doctor }) => {
  const [helpfulAnswers, setHelpfulAnswers] = useState<Set<number>>(new Set());

  // Load helpful answers from localStorage on component mount
  React.useEffect(() => {
    const stored = localStorage.getItem('faq-helpful-answers');
    if (stored) {
      setHelpfulAnswers(new Set(JSON.parse(stored)));
    }
  }, []);

  const markAsHelpful = (index: number) => {
    const newHelpfulAnswers = new Set(helpfulAnswers);
    newHelpfulAnswers.add(index);
    setHelpfulAnswers(newHelpfulAnswers);
    
    // Persist to localStorage
    localStorage.setItem('faq-helpful-answers', JSON.stringify(Array.from(newHelpfulAnswers)));
    
    // Analytics event (would be implemented in real app)
    console.log(`FAQ helpful event: question ${index}`);
  };

  return (
    <section id={id} className="clinical-card">
      <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
        <HelpCircle className="h-6 w-6 text-primary" />
        Frequently Asked Questions
      </h2>

      <Accordion type="single" collapsible className="space-y-4">
        {doctor.faq.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="clinical-card bg-muted/30 border-muted"
          >
            <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary px-6 py-4">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-4">
                <p className="text-foreground leading-relaxed">
                  {faq.answer}
                </p>
                
                {/* Helpful button */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm text-muted-foreground">
                    Was this answer helpful?
                  </span>
                  
                  {helpfulAnswers.has(index) ? (
                    <Badge variant="secondary" className="gap-2">
                      <Check className="h-3 w-3" />
                      Marked as helpful
                    </Badge>
                  ) : (
                    <ClinicalButton
                      variant="ghost"
                      size="sm"
                      onClick={() => markAsHelpful(index)}
                      className="gap-2 text-muted-foreground hover:text-primary"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      This helped
                    </ClinicalButton>
                  )}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {doctor.faq.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <HelpCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>FAQ section coming soon...</p>
        </div>
      )}

    </section>
  );
};