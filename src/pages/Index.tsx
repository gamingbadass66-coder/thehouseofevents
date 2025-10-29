import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Philosophy from '@/components/Philosophy';
import About from '@/components/About';
import Story from '@/components/Story';
import Events from '@/components/Events';
import Partner from '@/components/Partner';
import InstagramFeed from '@/components/InstagramFeed';
import Technology from '@/components/Technology';
import Community from '@/components/Community';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Philosophy />
      <About />
      <Story />
      <Events />
      <Partner />
      <InstagramFeed />
      <Technology />
      <Community />
      <Footer />
    </main>
  );
};

export default Index;
