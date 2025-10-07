import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import apiClient from '@/lib/api';
import { Handshake, CheckCircle, Loader2 } from 'lucide-react';

interface PartnerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PartnerModal = ({ open, onOpenChange }: PartnerModalProps) => {
  const [formData, setFormData] = useState({
    partner_name: '',
    contact_person: '',
    email: '',
    phone: '',
    organization: '',
    partnership_type_id: '',
    proposal: ''
  });
  const [partnershipTypes, setPartnershipTypes] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPartnershipTypes = async () => {
      try {
        const response = await apiClient.getPartnershipTypes();
        if (response.success && response.data) {
          setPartnershipTypes(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch partnership types:', error);
      }
    };

    if (open) {
      fetchPartnershipTypes();
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await apiClient.submitPartnership({
        partner_name: formData.partner_name,
        contact_person: formData.contact_person,
        email: formData.email,
        phone: formData.phone,
        organization: formData.organization,
        partnership_type_id: parseInt(formData.partnership_type_id),
        proposal: formData.proposal
      });

      if (response.success) {
        setIsSubmitting(false);
        setIsSuccess(true);
        
        toast({
          title: "Partnership inquiry submitted!",
          description: "We'll review your proposal and get back to you within 48 hours.",
        });

        setTimeout(() => {
          setIsSuccess(false);
          onOpenChange(false);
          setFormData({
            partner_name: '',
            contact_person: '',
            email: '',
            phone: '',
            organization: '',
            partnership_type_id: '',
            proposal: ''
          });
        }, 2000);
      } else {
        throw new Error(response.message || 'Failed to submit partnership proposal');
      }
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Failed to submit partnership proposal. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSuccess) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="gradient-card border-primary">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle className="w-16 h-16 text-primary mb-4" />
            <h3 className="text-2xl font-bold text-hero mb-2">Thank You!</h3>
            <p className="text-body">We're excited about the possibility of partnering with you and will be in touch soon.</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gradient-card border-primary max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-hero flex items-center gap-2">
            <Handshake className="w-6 h-6 text-primary" />
            Partner With Us
          </DialogTitle>
          <DialogDescription className="text-body">
            Let's collaborate to create impactful experiences that resonate with our mission to enrich Ahmedabad's creative landscape.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="partner_name" className="text-hero">Partner Name *</Label>
              <Input
                id="partner_name"
                type="text"
                placeholder="Your full name or organization name"
                value={formData.partner_name}
                onChange={(e) => handleInputChange('partner_name', e.target.value)}
                required
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-hero">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                className="bg-background border-border"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact_person" className="text-hero">Contact Person</Label>
              <Input
                id="contact_person"
                type="text"
                placeholder="Contact person name"
                value={formData.contact_person}
                onChange={(e) => handleInputChange('contact_person', e.target.value)}
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-hero">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 12345 67890"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="bg-background border-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="organization" className="text-hero">Organization/Company</Label>
            <Input
              id="organization"
              type="text"
              placeholder="Your organization name"
              value={formData.organization}
              onChange={(e) => handleInputChange('organization', e.target.value)}
              className="bg-background border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="partnership_type_id" className="text-hero">Partnership Type *</Label>
            <Select value={formData.partnership_type_id} onValueChange={(value) => handleInputChange('partnership_type_id', value)}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Select partnership type" />
              </SelectTrigger>
              <SelectContent>
                {partnershipTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id.toString()}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="proposal" className="text-hero">Partnership Proposal *</Label>
            <Textarea
              id="proposal"
              placeholder="Tell us about your idea for collaboration, your goals, and how we can work together to create meaningful experiences..."
              value={formData.proposal}
              onChange={(e) => handleInputChange('proposal', e.target.value)}
              required
              className="bg-background border-border min-h-[120px]"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full gradient-primary hover:shadow-glow transition-smooth"
            disabled={isSubmitting || !formData.partnership_type_id || !formData.proposal}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Partnership Proposal"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PartnerModal;