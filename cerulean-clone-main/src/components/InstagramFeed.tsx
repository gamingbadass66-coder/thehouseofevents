import gallery1 from '@/assets/image1.jpg';
import gallery2 from '@/assets/image3.jpg';
import gallery3 from '@/assets/image2.jpg';
import gallery4 from '@/assets/image4.jpg';
import { ExternalLink } from 'lucide-react';

const InstagramFeed = () => {
  const galleryImages = [
    { src: gallery1, alt: "Young people socializing at creative event" },
    { src: gallery2, alt: "Colorful art supplies and paintbrushes" },
    { src: gallery3, alt: "Group of diverse young people at evening event" },
    { src: gallery4, alt: "Modern event venue with blue lighting" },
    { src: gallery1, alt: "Young people socializing at creative event" },
    { src: gallery2, alt: "Colorful art supplies and paintbrushes" }
  ];

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/thehouseofeventts', '_blank');
  };

  return (
    <section id="instagram" className="py-20 bg-card/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-hero mb-8">
              A Glimpse into Our World: Instagram Feed
            </h2>
            <p className="text-xl text-body leading-relaxed max-w-4xl mx-auto">
              Follow our journey and immerse yourself in the vibrant energy of our past events. Our Instagram feed is a curated collection of 
              moments, showcasing the creativity, joy, and connections fostered at The House of Events.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <button
                key={index} 
                onClick={handleInstagramClick}
                className="relative overflow-hidden rounded-xl shadow-elegant aspect-square group cursor-pointer"
              >
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                  <div className="text-white text-center">
                    <ExternalLink className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm font-medium">View on Instagram</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={handleInstagramClick}
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-smooth text-lg font-semibold group"
            >
              Follow us @thehouseofevents
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;