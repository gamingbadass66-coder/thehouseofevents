import { Monitor, Smartphone, Heart } from 'lucide-react';

const Technology = () => {
  const features = [
    {
      icon: <Monitor className="w-12 h-12 text-primary mb-6" />,
      title: "Intuitive Navigation",
      description: "Our website is meticulously designed for a fluid and intuitive user experience. Clean layouts and artistic typography ensure that information is easily accessible, reflecting our elegant and modern aesthetic."
    },
    {
      icon: <Smartphone className="w-12 h-12 text-primary mb-6" />,
      title: "Responsive & Fast", 
      description: "Engineered for optimal performance across all devices, the website offers seamless navigation whether on a desktop, tablet, or mobile phone. Fast loading times ensure a smooth and engaging journey for every visitor."
    },
    {
      icon: <Heart className="w-12 h-12 text-primary mb-6" />,
      title: "Emotional Flow",
      description: "Subtle scroll animations and graceful transitions are woven throughout the site, enhancing the emotional resonance and creating an immersive experience that mirrors the intention behind our events."
    }
  ];

  return (
    <section id="technology" className="py-20 bg-card/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-hero mb-8">
              Seamless Experience: Design & Technology
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-hero">
                  {feature.title}
                </h3>
                <p className="text-body leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-xl text-body leading-relaxed max-w-5xl mx-auto">
              Every element is crafted to reflect the essence of The House of Events: thoughtful design, youthful energy, and a deep emotional 
              connection.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology;