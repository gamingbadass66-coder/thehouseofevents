import { useState, useEffect } from 'react';
import apiClient from '@/lib/api';

export interface Booking {
  id: number;
  user_id: number;
  event_id: number;
  number_of_tickets: number;
  total_amount: number;
  booking_status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  payment_status: 'pending' | 'paid' | 'refunded';
  booking_reference: string;
  created_at: string;
  updated_at: string;
  event_title?: string;
  event_date?: string;
  start_time?: string;
  end_time?: string;
  venue?: string;
  price?: number;
}

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getMyBookings();
      if (response.success && response.data) {
        setBookings(response.data);
      } else {
        setError(response.message || 'Failed to fetch bookings');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const createBooking = async (eventId: number, numberOfTickets: number) => {
    try {
      const response = await apiClient.createBooking({
        event_id: eventId,
        number_of_tickets: numberOfTickets,
      });
      
      if (response.success) {
        // Refresh bookings after successful creation
        await fetchBookings();
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to create booking');
      }
    } catch (err) {
      throw err;
    }
  };

  const cancelBooking = async (bookingId: number) => {
    try {
      const response = await apiClient.cancelBooking(bookingId.toString());
      
      if (response.success) {
        // Refresh bookings after successful cancellation
        await fetchBookings();
        return true;
      } else {
        throw new Error(response.message || 'Failed to cancel booking');
      }
    } catch (err) {
      throw err;
    }
  };

  return {
    bookings,
    loading,
    error,
    refetch: fetchBookings,
    createBooking,
    cancelBooking,
  };
};




