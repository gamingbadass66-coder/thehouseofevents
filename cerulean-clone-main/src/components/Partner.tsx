import { Handshake, Palette, Building2 } from 'lucide-react';

const Partner = () => {
  const partnerTypes = [
    {
      icon: <Handshake className="w-12 h-12 text-primary mb-6" />,
      title: "Collaborators",
      description: "Artists, performers, educators, and visionaries eager to share their craft and inspire our audience."
    },
    {
      icon: <Palette className="w-12 h-12 text-primary mb-6" />,
      title: "Cultural Sponsors", 
      description: "Organisations and individuals passionate about nurturing local talent and supporting the arts."
    },
    {
      icon: <Building2 className="w-12 h-12 text-primary mb-6" />,
      title: "Brands",
      description: "Companies aligning with our values of creativity, community, and meaningful engagement."
    }
  ];

  return (
    <section id="partner" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-hero mb-8">
              Partner With Us: Co-create Impactful Experiences
            </h2>
            <p className="text-xl text-body leading-relaxed max-w-4xl mx-auto">
              The House of Events is always seeking vibrant collaborations that resonate with our mission to enrich Ahmedabad's creative 
              and cultural landscape. We invite you to join our journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {partnerTypes.map((type, index) => (
              <div key={index} className="gradient-card rounded-2xl p-8 border border-border hover:shadow-glow transition-smooth text-center">
                <div className="flex justify-center">
                  {type.icon}
                </div>
                <h3 className="text-2xl font-bold text-hero mb-4">
                  {type.title}
                </h3>
                <p className="text-body leading-relaxed">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-xl text-body leading-relaxed max-w-4xl mx-auto">
              Together, we can create impactful events that leave a lasting legacy in the community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partner;