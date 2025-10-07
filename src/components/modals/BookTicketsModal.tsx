import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useBookings } from '@/hooks/useBookings';
import { Ticket, CheckCircle, Calendar, Clock, MapPin, Loader2 } from 'lucide-react';

interface BookTicketsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event?: any;
}

const BookTicketsModal = ({ open, onOpenChange, event }: BookTicketsModalProps) => {
  const [formData, setFormData] = useState({
    tickets: '1'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();
  const { createBooking } = useBookings();

  const ticketPrice = event?.price || 150;
  const totalPrice = parseInt(formData.tickets) * ticketPrice;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to book tickets.",
        variant: "destructive"
      });
      return;
    }

    if (!event) {
      toast({
        title: "Error",
        description: "Event information not available.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const booking = await createBooking(event.id, parseInt(formData.tickets));
      
      setIsSubmitting(false);
      setIsSuccess(true);
      
      toast({
        title: "Tickets booked successfully!",
        description: `Your ${formData.tickets} ticket(s) for ${event.title} have been confirmed.`,
      });

      setTimeout(() => {
        setIsSuccess(false);
        onOpenChange(false);
        setFormData({
          tickets: '1'
        });
      }, 3000);
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Booking Failed",
        description: error instanceof Error ? error.message : "Failed to book tickets. Please try again.",
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
            <h3 className="text-2xl font-bold text-hero mb-2">Tickets Confirmed!</h3>
            <p className="text-body mb-4">Check your email for ticket details and event instructions.</p>
            <div className="text-sm text-muted space-y-1">
              <p>Event: {event?.title || 'Event'}</p>
              <p>Tickets: {formData.tickets}</p>
              <p>Total: ₹{totalPrice}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gradient-card border-primary max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl text-hero flex items-center gap-2">
            <Ticket className="w-6 h-6 text-primary" />
            Book Your Tickets
          </DialogTitle>
          <DialogDescription className="text-body">
            {event?.title || 'Event'}
          </DialogDescription>
        </DialogHeader>

        {/* Event Details */}
        {event && (
          <div className="bg-background/50 rounded-lg p-4 space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-body">
                {new Date(event.event_date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-body">
                {new Date(`2000-01-01T${event.start_time}`).toLocaleTimeString('en-US', { 
                  hour: 'numeric', 
                  minute: '2-digit',
                  hour12: true 
                })} - {new Date(`2000-01-01T${event.end_time}`).toLocaleTimeString('en-US', { 
                  hour: 'numeric', 
                  minute: '2-digit',
                  hour12: true 
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-body">{event.venue}</span>
            </div>
          </div>
        )}

        {!isAuthenticated && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="text-yellow-800 text-sm">
              You need to be logged in to book tickets. Please log in or register first.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isAuthenticated && user && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="text-green-800 text-sm">
                Booking as: <strong>{user.name}</strong> ({user.email})
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="tickets" className="text-hero">Number of Tickets</Label>
            <Select value={formData.tickets} onValueChange={(value) => handleInputChange('tickets', value)}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Ticket</SelectItem>
                <SelectItem value="2">2 Tickets</SelectItem>
                <SelectItem value="3">3 Tickets</SelectItem>
                <SelectItem value="4">4 Tickets</SelectItem>
                <SelectItem value="5">5 Tickets</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Summary */}
          <div className="bg-background/50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-body">Tickets ({formData.tickets}x)</span>
              <span className="text-hero">₹{ticketPrice * parseInt(formData.tickets)}</span>
            </div>
            <div className="flex justify-between items-center font-semibold">
              <span className="text-hero">Total</span>
              <span className="text-primary text-lg">₹{totalPrice}</span>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full gradient-primary hover:shadow-glow transition-smooth"
            disabled={isSubmitting || !isAuthenticated}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing Booking...
              </>
            ) : (
              `Pay ₹${totalPrice} & Book Tickets`
            )}
          </Button>
        </form>

        <p className="text-xs text-muted text-center">
          All art supplies and refreshments included. No prior experience required.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default BookTicketsModal;