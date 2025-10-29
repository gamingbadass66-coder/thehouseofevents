import { useState } from 'react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-event.jpg';
import PartnerModal from '@/components/modals/PartnerModal';

const Hero = () => {
  const [showPartnerModal, setShowPartnerModal] = useState(false);

  const handleExploreEvents = () => {
    const element = document.querySelector('#events');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroImage}
            alt="Elegant event gathering"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-7xl font-bold text-hero leading-tight">
                The House of Events:
                <span className="block text-4xl lg:text-6xl mt-2 gradient-primary bg-clip-text text-transparent">
                  Crafting Unforgettable Moments
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-body max-w-2xl leading-relaxed">
                Welcome to The House of Events, where we transform ordinary 
                gatherings into extraordinary experiences. Based in Ahmedabad, we 
                specialise in curating events that resonate deeply, fostering connections 
                and igniting creativity. Join us on a journey where every event is a story 
                waiting to unfold.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="gradient-primary hover:shadow-glow transition-smooth text-lg px-8 py-6"
                  onClick={handleExploreEvents}
                >
                  Explore Our Events
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth text-lg px-8 py-6"
                  onClick={() => setShowPartnerModal(true)}
                >
                  Partner With Us
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button 
          onClick={handleExploreEvents}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hover:scale-110 transition-smooth"
        >
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </button>
      </section>

      <PartnerModal open={showPartnerModal} onOpenChange={setShowPartnerModal} />
    </>
  );
};

export default Hero;