import aboutImage from '@/assets/image.jpg';

const About = () => {
  return (
    <section id="about" className="py-20 bg-card/30">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-hero">
                About Us: Curating Meaningful Experiences
              </h2>
            </div>
            
            <div className="space-y-6 text-lg text-body leading-relaxed">
              <p>
                The House of Events is dedicated to crafting creative and meaningful 
                events specifically tailored for the youth of Ahmedabad. We envision a 
                vibrant community where every event serves as a platform for self-expression, learning, and genuine connection.
              </p>
              
              <p>
                We don't just organise events; we orchestrate narratives. Each gathering is 
                meticulously designed to be a unique story, an immersive journey that 
                engages the senses and touches the soul. From concept to execution, our 
                focus remains on delivering an experience that transcends the conventional.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-elegant">
              <img 
                src={aboutImage}
                alt="Creative art workshop with young people"
                className="w-full h-[600px] object-cover hover:scale-105 transition-smooth"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;