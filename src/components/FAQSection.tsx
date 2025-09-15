
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
    question: "What is included in this Plan?",
    answer: (
      <div className="space-y-2">
        <p>Your plan is a complete diagnostic package designed to give you clarity. It includes:</p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>A Full Body Blood Test (at home)</li>
          <li>A 1-on-1 Video Consultation with an Endocrinologist</li>
          <li>A Personal Counseling Session with a Nutritionist</li>
          <li>A 7-Day Starter Meal Plan</li>
        </ul>
      </div>
    )
  },
  {
    id: 2,
    question: "Who are Endocrinologists and why do I need one?",
    answer: "Endocrinologists are super-specialist doctors who are experts in hormones. Hormones control your metabolism, hunger, and how your body stores fat. Our endocrinologists will use your test results to find the hormonal root cause of your weight gain and create a medical plan that works with your body's biology."
  },
  {
    id: 3,
    question: "How do I get started after I pay?",
    answer: "The process is simple and we guide you every step of the way. After your purchase, one of our Care Coordinators will reach out to you on WhatsApp within a few hours to confirm your details and schedule a convenient time for your at-home blood test."
  },
  {
    id: 4,
    question: "What are the next steps after my diagnosis?",
    answer: (
      <div className="space-y-4">
        <p>Your diagnosis is the essential first step on your path to sustainable weight loss. It provides the medical blueprint for your journey. Based on your results, your doctor will recommend the best path forward.</p>
        
        <div>
          <h4 className="font-semibold mb-2">Step 1: Get Your Diagnosis</h4>
          <p>This plan helps you and your doctor find the real, biological reason behind your weight challenges. By analyzing your blood work and health history, we create a clear picture of your body's unique needs.</p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-2">Step 2: Start Your Personalized Program</h4>
          <p>After your diagnosis, the next step is to begin a full program tailored to you. This is typically a medically-guided program that may include lifestyle changes and, if appropriate, doctor-prescribed medication to help manage your body's biology for lasting results.</p>
        </div>
      </div>
    )
  },
  {
    id: 5,
    question: "Is this plan safe and trustworthy?",
    answer: "Absolutely. Every part of our plan is designed and overseen by our team of medical experts, including specialist doctors and senior nutritionists. We use only NABL-certified labs for all our tests to ensure the highest standards of accuracy and safety."
  }
];

export const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="py-6 px-4 lg:px-16" style={{ backgroundColor: '#FAF8F1' }}>
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