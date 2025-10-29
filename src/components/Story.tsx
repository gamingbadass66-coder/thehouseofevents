const Story = () => {
  const storySteps = [
    {
      number: "1",
      title: "The Spark",
      description: "What began as a casual conversation between friends Anish Saherwala, Samya Gandhi, and Nirmal Moryani blossomed into a shared vision for Ahmedabad's youth."
    },
    {
      number: "2", 
      title: "A Shared Passion",
      description: "United by their passion for culture and community, they identified a need for more engaging and intentional youth events in the city."
    },
    {
      number: "3",
      title: "The Birth of The House",
      description: "Driven by this insight, they founded The House of Events, a platform dedicated to fostering creativity and connection through unique experiences."
    }
  ];

  return (
    <section id="story" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-hero mb-8">
              Our Story: From Casual Conversation to Creative Platform
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {storySteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connection Line */}
                {index < storySteps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-primary/30 z-0"></div>
                )}
                
                <div className="relative z-10 gradient-card rounded-2xl p-8 border border-border hover:shadow-glow transition-smooth">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-xl mb-6 mx-auto">
                    {step.number}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-hero mb-4 text-center">
                    {step.title}
                  </h3>
                  
                  <p className="text-body leading-relaxed text-center">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-xl text-body leading-relaxed max-w-4xl mx-auto">
              Their collective expertise and shared commitment to enriching the lives of young people laid the foundation for a company that 
              truly understands the pulse of its audience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;