
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQ {
  id: number;
  question: string;
  answer: string | React.JSX.Element;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: "Who is Dr. Saptarshi Bhattacharya?",
    answer: (
      <div className="space-y-2">
        <p>Dr. Saptarshi Bhattacharya is a highly experienced Endocrinologist with 15 years of expertise in the field. He is known for providing exceptional patient care and advanced medical treatments. He areas of expertise include Type 1 Diabetes Treatment. He also treats conditions such as Parathyroid Diseases, pituitary-diseases.</p>
        
      </div>
    )
  },
  {
    id: 2,
    question: "Why do patients choose Dr. Saptarshi Bhattacharya?",
    answer: "Patients trust Dr. Saptarshi Bhattacharya for he expertise, patient-centric approach, and commitment to providing the highest standard of care. He is well-versed in the latest medical advancements and ensures personalized treatment for every patient."
  },
  {
    id: 3,
    question: "What is Dr. Saptarshi Bhattacharya’s specialization?",
    answer: "The process is simple and we guide you every step of the way. After your purchase, one of our Care Coordinators will reach out to you on WhatsApp within a few hours to confirm your details and schedule a convenient time for your at-home blood test."
  },
  {
    id: 4,
    question: "What is Dr. Saptarshi Bhattacharya’s specialization?",
    answer: "Dr. Saptarshi Bhattacharya specializes in Endocrinology, with expertise in treatments for Type 1 Diabetes Treatment."
  },
  {
    id: 5,
    question: "What are Dr. Saptarshi Bhattacharya’s medical qualifications?",
    answer: "Dr. Saptarshi Bhattacharya holds prestigious qualifications, including Dr. DM Endocrinology (AIIMS, New Delhi) MD Medicine (MAMC, New Delhi) MBBS (Kolkata Medical College)."
  }
];

export const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="py-6 px-4 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="lg:flex lg:gap-12">
          {/* Left Column - 30% width on desktop */}
          <div className="lg:w-[30%] mb-8 lg:mb-0">
            <h2 className="font-unna text-3xl lg:text-4xl mb-4" style={{ color: '#798660' }}>
              Your Questions,<br />Answered.
            </h2>
            <p className="font-satoshi text-base" style={{ color: '#798660' }}>
              Need Help? <a 
                href="https://api.whatsapp.com/send?phone=919560997631&text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20Early%27s%20Metabolic%20Reset%20Program!" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                Get in touch with us here →
              </a>
            </p>
          </div>

          {/* Right Column - 70% width on desktop */}
          <div className="lg:w-[70%]">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={faq.id}>
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full flex justify-between items-center py-4 text-left group"
                  >
                    <span className="font-satoshi font-bold text-base lg:text-lg pr-4" style={{ color: '#393f2d' }}>
                      {faq.question}
                    </span>
                    <ChevronDown 
                      className={`w-5 h-5 transition-transform duration-200 flex-shrink-0 ${
                        openFAQ === faq.id ? 'rotate-180' : ''
                      }`}
                      style={{ color: '#393f2d' }}
                    />
                  </button>
                  
                  {openFAQ === faq.id && (
                    <div className="pb-4 font-satoshi text-base leading-relaxed" style={{ color: '#434a35' }}>
                      {faq.answer}
                    </div>
                  )}
                  
                  {index < faqs.length - 1 && (
                    <div className="border-b border-gray-200"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};