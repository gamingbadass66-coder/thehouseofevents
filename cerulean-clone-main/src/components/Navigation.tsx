import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import PartnerModal from '@/components/modals/PartnerModal';
import AuthModal from '@/components/modals/AuthModal';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#philosophy', label: 'Philosophy' },
    { href: '#about', label: 'About' },
    { href: '#story', label: 'Story' },
    { href: '#events', label: 'Events' },
    { href: '#community', label: 'Community' }
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => handleNavClick('#home')}
              className="text-2xl font-bold text-hero hover:text-primary transition-smooth"
            >
              The House of Events
            </button>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-body hover:text-primary transition-smooth"
                >
                  {item.label}
                </button>
              ))}
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-body text-sm">
                    Welcome, {user?.name}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={logout}
                    className="flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Login
                </Button>
              )}
              
              <Button 
                variant="default" 
                size="sm" 
                className="gradient-primary hover:shadow-glow transition-smooth"
                onClick={() => setShowPartnerModal(true)}
              >
                Get Involved
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="block text-body hover:text-primary transition-smooth"
                >
                  {item.label}
                </button>
              ))}
              
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="text-body text-sm py-2">
                    Welcome, {user?.name}
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={logout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setShowAuthModal(true)}
                >
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              )}
              
              <Button 
                variant="default" 
                className="gradient-primary w-full"
                onClick={() => setShowPartnerModal(true)}
              >
                Get Involved
              </Button>
            </div>
          )}
        </div>
      </nav>

      <PartnerModal open={showPartnerModal} onOpenChange={setShowPartnerModal} />
      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </>
  );
};

export default Navigation;