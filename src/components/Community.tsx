import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Users, Instagram } from 'lucide-react';
import SubscribeModal from '@/components/modals/SubscribeModal';
import PartnerModal from '@/components/modals/PartnerModal';
import LearnMoreModal from '@/components/modals/LearnMoreModal';

const Community = () => {
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [showLearnMoreModal, setShowLearnMoreModal] = useState(false);

  const handleFollowUs = () => {
    window.open('https://www.instagram.com/thehouseofeventts', '_blank');
  };

  const communitySteps = [
    {
      number: "1",
      title: "Stay Updated",
      description: "Receive exclusive invitations, early bird offers, and news about our upcoming events straight to your inbox.",
      action: "Subscribe",
      icon: <Mail className="w-8 h-8 text-primary mb-4" />,
      onClick: () => setShowSubscribeModal(true)
    },
    {
      number: "2", 
      title: "Become a Partner",
      description: "Collaborate with us to bring your creative vision to life and make a tangible impact on the community.",
      action: "Learn More",
      icon: <Users className="w-8 h-8 text-primary mb-4" />,
      onClick: () => setShowLearnMoreModal(true)
    },
    {
      number: "3",
      title: "Follow Our Journey",
      description: "Connect with us on social media for daily doses of inspiration and behind-the-scenes glimpses.",
      action: "Follow Us",
      icon: <Instagram className="w-8 h-8 text-primary mb-4" />,
      onClick: handleFollowUs
    }
  ];

  return (
    <>
      <section id="community" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-hero mb-8">
                Join The House of Events Community
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {communitySteps.map((step, index) => (
                <div key={index} className="gradient-card rounded-2xl p-8 border border-border hover:shadow-glow transition-smooth text-center">
                  <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-2xl mb-6 mx-auto">
                    {step.number}
                  </div>
                  
                  <div className="flex justify-center mb-4">
                    {step.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-hero mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-body leading-relaxed mb-6">
                    {step.description}
                  </p>
                  
                  <Button 
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
                    onClick={step.onClick}
                  >
                    {step.action}
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <p className="text-xl text-body leading-relaxed max-w-4xl mx-auto">
                At The House of Events, we're building more than just gatherings; we're cultivating a community where creativity thrives, 
                connections deepen, and every moment is imbued with intention.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SubscribeModal open={showSubscribeModal} onOpenChange={setShowSubscribeModal} />
      <PartnerModal open={showPartnerModal} onOpenChange={setShowPartnerModal} />
      <LearnMoreModal 
        open={showLearnMoreModal} 
        onOpenChange={setShowLearnMoreModal}
        onPartnerClick={() => setShowPartnerModal(true)}
      />
    </>
  );
};

export default Community;