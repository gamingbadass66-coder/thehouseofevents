const Philosophy = () => {
  return (
    <section id="philosophy" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h3 className="text-lg text-muted uppercase tracking-wider">Our Philosophy</h3>
            <h2 className="text-5xl lg:text-6xl font-bold text-hero">
              Events with Intention
            </h2>
          </div>
          
          <p className="text-xl lg:text-2xl text-body leading-relaxed max-w-5xl mx-auto">
            At The House of Events, we believe that true magic happens when gatherings are infused with purpose. Our philosophy revolves 
            around creating experiences that go beyond mere attendance; they are designed to leave a lasting emotional imprint, sparking 
            joy, inspiration, and connection.
          </p>
          
          <div className="border-l-4 border-primary pl-8 py-8 bg-card/50 rounded-r-lg shadow-elegant">
            <blockquote className="text-2xl lg:text-3xl font-light text-hero italic leading-relaxed">
              "An event is not just a gathering; it's a story waiting to be told, a memory waiting to be made."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;