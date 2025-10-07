import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import apiClient from '@/lib/api';
import { Mail, CheckCircle, Loader2 } from 'lucide-react';

interface SubscribeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SubscribeModal = ({ open, onOpenChange }: SubscribeModalProps) => {
  const [formData, setFormData] = useState({
    email: '',
    name: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await apiClient.subscribeToNewsletter(formData.email, formData.name);
      
      if (response.success) {
        setIsSubmitting(false);
        setIsSuccess(true);
        
        toast({
          title: "Successfully subscribed!",
          description: "You'll receive updates about our upcoming events and news.",
        });

        setTimeout(() => {
          setIsSuccess(false);
          onOpenChange(false);
          setFormData({
            email: '',
            name: ''
          });
        }, 2000);
      } else {
        throw new Error(response.message || 'Failed to subscribe');
      }
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Subscription Failed",
        description: error instanceof Error ? error.message : "Failed to subscribe. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSuccess) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="gradient-card border-primary">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle className="w-16 h-16 text-primary mb-4" />
            <h3 className="text-2xl font-bold text-hero mb-2">Welcome to our community!</h3>
            <p className="text-body">You're now subscribed to our newsletter and will receive updates about upcoming events.</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gradient-card border-primary max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-hero flex items-center gap-2">
            <Mail className="w-6 h-6 text-primary" />
            Subscribe to Our Newsletter
          </DialogTitle>
          <DialogDescription className="text-body">
            Get exclusive invitations, early bird offers, and news about our upcoming events.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-hero">Name (Optional)</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="bg-background border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-hero">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              className="bg-background border-border"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full gradient-primary hover:shadow-glow transition-smooth"
            disabled={isSubmitting || !formData.email}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Subscribing...
              </>
            ) : (
              "Subscribe to Newsletter"
            )}
          </Button>
        </form>

        <p className="text-xs text-muted text-center">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default SubscribeModal;