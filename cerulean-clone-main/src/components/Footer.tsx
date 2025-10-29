import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Instagram, Facebook, Twitter, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SubscribeModal from '@/components/modals/SubscribeModal';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const { toast } = useToast();

  const socialLinks = [
    { 
      icon: <Instagram className="w-5 h-5" />, 
      href: "https://www.instagram.com/thehouseofeventts", 
      label: "Instagram" 
    },
    { 
      icon: <Facebook className="w-5 h-5" />, 
      href: "https://facebook.com/thehouseofevents", 
      label: "Facebook" 
    },  
    { 
      icon: <Twitter className="w-5 h-5" />, 
      href: "https://twitter.com/thehouseofevents", 
      label: "Twitter" 
    },
    { 
      icon: <Mail className="w-5 h-5" />, 
      href: "mailto:hello@houseofevents.in", 
      label: "Email" 
    }
  ];

  const quickLinks = [
    { label: "About Us", href: "#about" },
    { label: "Our Philosophy", href: "#philosophy" },
    { label: "Upcoming Events", href: "#events" },
    { label: "Partner With Us", href: "#partner" },
    { label: "Community", href: "#community" }
  ];

  const handleQuickLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleFooterSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setShowSubscribeModal(true);
    }
  };

  const handleSocialClick = (href: string) => {
    if (href.startsWith('mailto:')) {
      window.location.href = href;
    } else {
      window.open(href, '_blank');
    }
  };

  return (
    <>
      <footer className="bg-card border-t border-border">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-hero mb-4">
                The House of Events
              </h3>
              <p className="text-body mb-6 leading-relaxed">
                Crafting unforgettable moments and meaningful experiences for the youth of Ahmedabad. 
                Every event is a story waiting to unfold.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <button
                    key={index}
                    onClick={() => handleSocialClick(social.href)}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-smooth group"
                  >
                    {social.icon}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity absolute translate-x-2 -translate-y-2" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-hero mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button 
                      onClick={() => handleQuickLinkClick(link.href)}
                      className="text-body hover:text-primary transition-smooth text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold text-hero mb-4">Stay Connected</h4>
              <p className="text-body mb-4 text-sm">
                Get updates about our latest events and initiatives.
              </p>
              <form onSubmit={handleFooterSubscribe} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background border-border text-foreground text-sm"
                  required
                />
                <Button type="submit" size="sm" className="w-full gradient-primary">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border mt-12 pt-8 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-muted text-sm">
                © 2024 The House of Events. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm">
                <button className="text-muted hover:text-primary transition-smooth">
                  Privacy Policy
                </button>
                <button className="text-muted hover:text-primary transition-smooth">
                  Terms of Service
                </button>
                <button className="text-muted hover:text-primary transition-smooth">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <SubscribeModal open={showSubscribeModal} onOpenChange={setShowSubscribeModal} />
    </>
  );
};

export default Footer;