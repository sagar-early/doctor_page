import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClinicalButton } from "@/components/ui/clinical-button";
import { Phone, Clock, CheckCircle } from "lucide-react";

interface CallbackModalProps {
  children: React.ReactNode;
}

export const CallbackModal: React.FC<CallbackModalProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    preferredTime: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
      setIsOpen(false);
      setFormData({ name: '', phone: '', preferredTime: '' });
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <Phone className="h-5 w-5 text-primary" />
            Request a Callback
          </DialogTitle>
        </DialogHeader>
        
        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+91 99999 99999"
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="preferredTime">Preferred Time</Label>
              <Select value={formData.preferredTime} onValueChange={(value) => handleInputChange('preferredTime', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select preferred time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                  <SelectItem value="evening">Evening (5 PM - 8 PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-3 pt-4">
              <ClinicalButton
                type="button"
                variant="secondary"
                onClick={() => setIsOpen(false)}
                className="flex-1"
              >
                Cancel
              </ClinicalButton>
              <ClinicalButton
                type="submit"
                variant="callback"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Submitting...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Request Callback
                  </div>
                )}
              </ClinicalButton>
            </div>
          </form>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Request Submitted Successfully!
            </h3>
            <p className="text-muted-foreground">
              Our team will call you back within 24 hours during your preferred time slot.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};