'use client'

import { useState, useEffect, useRef } from "react";
import { Check, X } from "lucide-react";

interface FormData {
  name: string;
  mobile: string;
  timeSlot: string;
}

const GetCallbackSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [state, setState] = useState<'compact' | 'form' | 'success' | 'error'>('compact');
  const [hasSubmittedOnce, setHasSubmittedOnce] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: '',
    timeSlot: ''
  });
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (hasSubmittedOnce) return; // Don't show if user has already submitted
      
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setIsVisible(scrollPercentage >= 60);
    };

    // Keyboard detection for mobile
    const handleViewportChange = () => {
      if (window.visualViewport) {
        const keyboardHeight = window.innerHeight - window.visualViewport.height;
        console.log('GetCallback - Visual Viewport - Keyboard Height:', keyboardHeight);
        
        if (keyboardHeight > 50) {
          setKeyboardHeight(keyboardHeight);
        } else {
          setKeyboardHeight(0);
        }
      }
    };

    const handleResize = () => {
      if (window.visualViewport) {
        const keyboardHeight = window.innerHeight - window.visualViewport.height;
        console.log('GetCallback - Resize - Keyboard Height:', keyboardHeight);
        
        if (keyboardHeight > 50) {
          setKeyboardHeight(keyboardHeight);
        } else {
          setKeyboardHeight(0);
        }
      } else {
        const currentHeight = window.innerHeight;
        const heightDifference = Math.max(0, window.screen.height - currentHeight);
        console.log('GetCallback - Fallback - Height Difference:', heightDifference);
        
        if (heightDifference > 100) {
          setKeyboardHeight(heightDifference);
        } else {
          setKeyboardHeight(0);
        }
      }
    };

    // Focus/blur detection for better keyboard handling
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'SELECT') {
        console.log('GetCallback - Focus detected on:', target.tagName);
        setTimeout(() => {
          if (window.visualViewport) {
            handleViewportChange();
          } else {
            handleResize();
          }
        }, 300);
      }
    };

    const handleFocusOut = () => {
      console.log('GetCallback - Focus lost');
      setTimeout(() => {
        if (window.visualViewport) {
          handleViewportChange();
        } else {
          handleResize();
        }
      }, 300);
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);
    
    // Use visual viewport API if available
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportChange);
    } else {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleViewportChange);
      } else {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [hasSubmittedOnce]);

  // Auto-focus name input when form opens
  useEffect(() => {
    if (state === 'form' && window.innerWidth < 1024) {
      const timer = setTimeout(() => {
        if (nameInputRef.current) {
          console.log('GetCallback - Focusing name input');
          nameInputRef.current.focus();
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [state]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateMobile = (mobile: string) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateMobile(formData.mobile)) {
      setState('error');
      setTimeout(() => {
        setState('form');
      }, 3000);
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('mobile', formData.mobile);
      formDataToSend.append('timeSlot', formData.timeSlot);

      const response = await fetch('https://usebasin.com/f/6eb15177c7ef', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setState('success');
        setHasSubmittedOnce(true);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
          setIsVisible(false);
          setState('compact');
          setFormData({ name: '', mobile: '', timeSlot: '' });
        }, 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setState('error');
      
      // Show error for 3 seconds then return to form
      setTimeout(() => {
        setState('form');
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setState('compact');
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed left-0 right-0 z-50 transition-all duration-400 ease-in-out lg:bottom-0" 
      style={{ 
        bottom: keyboardHeight > 0 && state === 'form' ? `${keyboardHeight}px` : (window.innerWidth < 1024 ? '80px' : '0px'),
        transition: 'bottom 0.3s ease'
      }}
    >
      {state === 'compact' && (
        <div 
          className="px-6 py-3 shadow-2xl cursor-pointer lg:bottom-0"
          style={{ backgroundColor: '#dbdfd2' }}
          onClick={() => setState('form')}
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div>
              <h3 className="font-satoshi font-bold text-base" style={{ color: '#393f2d' }}>
                Still have questions?
              </h3>
              <p className="font-satoshi text-sm" style={{ color: '#393f2d' }}>
                Connect with an expert to get them answered.
              </p>
            </div>
            <button 
              className="px-6 py-2 rounded-full font-satoshi font-medium transition-all hover:shadow-lg"
              style={{ backgroundColor: '#FFFFFF', color: '#393f2d' }}
            >
              Get a Callback
            </button>
          </div>
        </div>
      )}

      {state === 'form' && (
        <div className="bg-white px-6 py-6 shadow-2xl relative">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" style={{ color: '#393f2d' }} />
          </button>

          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-satoshi text-sm font-medium mb-2" style={{ color: '#393f2d' }}>
                  Your Name
                </label>
                <input
                  ref={nameInputRef}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#393f2d] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block font-satoshi text-sm font-medium mb-2" style={{ color: '#393f2d' }}>
                  Your Mobile Number
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-100 font-satoshi text-sm">
                    +91
                  </span>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:border-[#393f2d] transition-colors"
                    placeholder="Enter 10 digit number"
                    maxLength={10}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-satoshi text-sm font-medium mb-2" style={{ color: '#393f2d' }}>
                  Preferred Callback Time
                </label>
                <select
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={(e) => handleInputChange('timeSlot', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#393f2d] transition-colors"
                  required
                >
                  <option value="">Select a time slot</option>
                  <option value="8AM-12PM">8AM-12PM</option>
                  <option value="12PM-4PM">12PM-4PM</option>
                  <option value="4PM-8PM">4PM-8PM</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-lg font-satoshi font-medium text-white transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#393f2d' }}
              >
                {isSubmitting ? 'Submitting...' : 'Request My Callback'}
              </button>
            </form>
          </div>
        </div>
      )}

      {state === 'success' && (
        <div 
          className="px-6 py-4 shadow-2xl"
          style={{ backgroundColor: '#d4f57f' }}
        >
          <div className="max-w-6xl mx-auto flex items-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full mr-4" style={{ backgroundColor: '#5CB85C' }}>
              <Check className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <h3 className="font-satoshi font-bold text-lg" style={{ color: '#393f2d' }}>
                Thank you!
              </h3>
              <p className="font-satoshi" style={{ color: '#393f2d' }}>
                One of our Nutrition Expert will call you in your preferred slot.
              </p>
            </div>
          </div>
        </div>
      )}

      {state === 'error' && (
        <div 
          className="px-6 py-4 shadow-2xl"
          style={{ backgroundColor: '#ffebee' }}
        >
          <div className="max-w-6xl mx-auto flex items-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full mr-4" style={{ backgroundColor: '#f44336' }}>
              <X className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-satoshi font-bold text-lg" style={{ color: '#d32f2f' }}>
                Failed to capture your data
              </h3>
              <p className="font-satoshi" style={{ color: '#d32f2f' }}>
                Please try again or check your internet connection.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetCallbackSection;

