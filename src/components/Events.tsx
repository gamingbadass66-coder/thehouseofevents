import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, Loader2 } from 'lucide-react';
import { useEvents } from '@/hooks/useEvents';
import BookTicketsModal from '@/components/modals/BookTicketsModal';

const Events = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const { events, loading, error } = useEvents({ upcoming: true });

  const handleBookTickets = (event: any) => {
    setSelectedEvent(event);
    setShowBookingModal(true);
  };

  if (loading) {
    return (
      <section id="events" className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p className="text-body">Loading events...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="events" className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-red-500 mb-4">Error loading events: {error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const upcomingEvents = events.filter(event => event.calculated_status === 'upcoming');
  const featuredEvent = upcomingEvents[0];

  if (!featuredEvent) {
    return (
      <section id="events" className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-hero mb-8">
              Upcoming Events
            </h2>
            <p className="text-xl text-body">No upcoming events at the moment. Check back soon!</p>
          </div>
        </div>
      </section>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <>
      <section id="events" className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-hero mb-8">
                Upcoming Events: {featuredEvent.title}
              </h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <p className="text-xl text-body leading-relaxed">
                  {featuredEvent.short_description || featuredEvent.description}
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-lg">
                    <Calendar className="text-primary w-6 h-6" />
                    <span className="text-body">
                      <strong className="text-hero">Date:</strong> {formatDate(featuredEvent.event_date)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-lg">
                    <Clock className="text-primary w-6 h-6" />
                    <span className="text-body">
                      <strong className="text-hero">Time:</strong> {formatTime(featuredEvent.start_time)} — {formatTime(featuredEvent.end_time)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-lg">
                    <Users className="text-primary w-6 h-6" />
                    <span className="text-body">
                      <strong className="text-hero">Venue:</strong> {featuredEvent.venue}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-lg">
                    <span className="text-body">
                      <strong className="text-hero">Price:</strong> ₹{featuredEvent.price}
                    </span>
                  </div>

                  {featuredEvent.max_capacity && (
                    <div className="flex items-center gap-4 text-lg">
                      <span className="text-body">
                        <strong className="text-hero">Available:</strong> {featuredEvent.max_capacity - featuredEvent.current_bookings} of {featuredEvent.max_capacity} spots
                      </span>
                    </div>
                  )}
                </div>
                
                <Button 
                  size="lg" 
                  className="gradient-primary hover:shadow-glow transition-smooth text-lg px-8 py-3"
                  onClick={() => handleBookTickets(featuredEvent)}
                  disabled={featuredEvent.max_capacity && featuredEvent.current_bookings >= featuredEvent.max_capacity}
                >
                  {featuredEvent.max_capacity && featuredEvent.current_bookings >= featuredEvent.max_capacity 
                    ? 'Sold Out' 
                    : 'Book Tickets'
                  }
                </Button>
              </div>
              
              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl shadow-elegant">
                  <img 
                    src={featuredEvent.image_url || '/assets/sip-event.jpg'}
                    alt={featuredEvent.title}
                    className="w-full h-[500px] object-cover hover:scale-105 transition-smooth"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Show other upcoming events if any */}
            {upcomingEvents.length > 1 && (
              <div className="mt-16">
                <h3 className="text-2xl font-bold text-hero mb-8 text-center">More Upcoming Events</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.slice(1).map((event) => (
                    <div key={event.id} className="gradient-card rounded-2xl p-6 border border-border hover:shadow-glow transition-smooth">
                      <h4 className="text-xl font-bold text-hero mb-3">{event.title}</h4>
                      <p className="text-body mb-4 line-clamp-3">{event.short_description || event.description}</p>
                      <div className="space-y-2 text-sm text-body mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          {formatDate(event.event_date)}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          {formatTime(event.start_time)} - {formatTime(event.end_time)}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">₹{event.price}</span>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleBookTickets(event)}
                        disabled={event.max_capacity && event.current_bookings >= event.max_capacity}
                      >
                        {event.max_capacity && event.current_bookings >= event.max_capacity 
                          ? 'Sold Out' 
                          : 'Book Now'
                        }
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <BookTicketsModal 
        open={showBookingModal} 
        onOpenChange={setShowBookingModal}
        event={selectedEvent}
      />
    </>
  );
};

export default Events;