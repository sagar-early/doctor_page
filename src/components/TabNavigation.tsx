import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  href: string;
}

const tabs: Tab[] = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'videos', label: 'Videos', href: '#videos' },
  { id: 'research-recognitions', label: 'Research & Recognitions', href: '#research-recognitions' },
  { id: 'find-doctor', label: 'Find a Doctor', href: '#find-doctor' },
  { id: 'faq', label: 'FAQ', href: '#faq' },
];

export const TabNavigation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsSticky(scrollY > 120);

      // Update active tab based on scroll position
      const sections = tabs.map(tab => document.getElementById(tab.id)).filter(Boolean);
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveTab(tabs[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabClick = (tab: Tab) => {
    const element = document.getElementById(tab.id);
    if (element) {
      const headerOffset = isSticky ? 140 : 80;
      const elementPosition = element.offsetTop - headerOffset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setActiveTab(tab.id);
  };

  return (
    <nav
      className={cn(
        "bg-background border-b border-border transition-all duration-300 z-40",
        isSticky ? "fixed top-0 left-0 right-0 shadow-sm" : "relative"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={cn(
                "flex-shrink-0 px-4 py-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap",
                activeTab === tab.id
                  ? "text-primary border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground hover:border-muted"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};