import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Handshake, Palette, Building2, Mail, Phone, MapPin } from 'lucide-react';

interface LearnMoreModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPartnerClick: () => void;
}

const LearnMoreModal = ({ open, onOpenChange, onPartnerClick }: LearnMoreModalProps) => {
  const partnershipDetails = [
    {
      icon: <Handshake className="w-8 h-8 text-primary mb-4" />,
      title: "Collaboration Opportunities",
      description: "Work with us as an artist, performer, educator, or creative visionary. Share your talents and inspire our community through workshops, performances, and interactive sessions."
    },
    {
      icon: <Palette className="w-8 h-8 text-primary mb-4" />,
      title: "Cultural Sponsorship",
      description: "Support local talent and the arts by sponsoring our events. Your contribution helps us create meaningful experiences that enrich Ahmedabad's cultural landscape."
    },
    {
      icon: <Building2 className="w-8 h-8 text-primary mb-4" />,
      title: "Brand Partnerships",
      description: "Align your brand with creativity, community, and meaningful engagement. Partner with us to reach a vibrant, engaged audience of young creatives and culture enthusiasts."
    }
  ];

  const handleGetStarted = () => {
    onOpenChange(false);
    onPartnerClick();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gradient-card border-primary max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl text-hero">Partnership Opportunities</DialogTitle>
          <DialogDescription className="text-body text-lg">
            Discover how you can collaborate with The House of Events to create impactful experiences.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8">
          {/* Partnership Types */}
          <div className="grid md:grid-cols-3 gap-6">
            {partnershipDetails.map((type, index) => (
              <div key={index} className="bg-background/50 rounded-lg p-6 text-center">
                <div className="flex justify-center">
                  {type.icon}
                </div>
                <h3 className="text-xl font-bold text-hero mb-3">
                  {type.title}
                </h3>
                <p className="text-body leading-relaxed text-sm">
                  {type.description}
                </p>
              </div>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="bg-background/30 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-hero mb-4">Why Partner With Us?</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-primary">Community Impact</h4>
                <p className="text-body text-sm">Make a tangible difference in Ahmedabad's creative community and help foster the next generation of artists and cultural enthusiasts.</p>
              </div>
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-primary">Brand Exposure</h4>
                <p className="text-body text-sm">Connect with an engaged audience of young creatives, professionals, and culture lovers through meaningful event experiences.</p>
              </div>
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-primary">Creative Collaboration</h4>
                <p className="text-body text-sm">Work alongside passionate individuals who share your vision for creating memorable, purpose-driven experiences.</p>
              </div>
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-primary">Long-term Relationships</h4>
                <p className="text-body text-sm">Build lasting partnerships that grow with each successful event and contribute to a vibrant cultural ecosystem.</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-background/30 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-hero mb-4">Get In Touch</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-body">partnerships@houseofevents.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-body">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-body">Ahmedabad, Gujarat</span>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center space-y-4">
            <h3 className="text-xl text-hero">Ready to Create Something Amazing Together?</h3>
            <Button 
              size="lg" 
              className="gradient-primary hover:shadow-glow transition-smooth"
              onClick={handleGetStarted}
            >
              Start Partnership Conversation
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LearnMoreModal;