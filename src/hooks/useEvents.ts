import { useState, useEffect } from 'react';
import apiClient from '@/lib/api';

export interface Event {
  id: number;
  title: string;
  description: string;
  short_description?: string;
  event_date: string;
  start_time: string;
  end_time: string;
  venue: string;
  venue_address?: string;
  price: number;
  max_capacity?: number;
  current_bookings: number;
  category_id?: number;
  category_name?: string;
  image_url?: string;
  status: string;
  calculated_status: string;
  created_at: string;
  updated_at: string;
}

export interface EventCategory {
  id: number;
  name: string;
  description?: string;
  created_at: string;
}

export const useEvents = (params?: { status?: string; category?: string; upcoming?: boolean }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getEvents(params);
      const fetchEvents = async () => {
  try {
    setLoading(true);
    setError(null);
    const response = await apiClient.getEvents(params);

    // TEMPORARY fallback event (so something always appears even if backend fails)
    const staticEvent = [
      {
        id: 1,
        title: "SIP — Share. Inspire. Paint.",
        description: "An evening of art, music, and creativity with The House of Events.",
        short_description: "Paint, connect, and express yourself.",
        event_date: "2025-12-07",
        start_time: "18:00",
        end_time: "22:00",
        venue: "The House of Events Studio",
        venue_address: "Ahmedabad, India",
        price: 499,
        current_bookings: 0,
        status: "active",
        calculated_status: "upcoming",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        image_url: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Abstract_paint_art.jpg",
        booking_url: "https://allevents.in/ahmedabad/80002540244918?aff_id=udwkf0&ref=sharer"
      }
    ];

    // If backend fails or returns empty, show this fallback
    if (!response.success || !response.data || response.data.length === 0) {
      console.log("⚠️ Using static fallback event");
      setEvents(staticEvent);
      return;
    }

    if (response.success && response.data) {
      setEvents(response.data);
    } else {
      setError(response.message || 'Failed to fetch events');
    }
  } catch (err) {
    setError(err instanceof Error ? err.message : 'An error occurred');
  } finally {
    setLoading(false);
  }
};

      if (response.success && response.data) {
        setEvents(response.data);
      } else {
        setError(response.message || 'Failed to fetch events');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [params?.status, params?.category, params?.upcoming]);

  return { events, loading, error, refetch: fetchEvents };
};

export const useEvent = (id: string) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getEvent(id);
      if (response.success && response.data) {
        setEvent(response.data);
      } else {
        setError(response.message || 'Event not found');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchEvent();
    }
  }, [id]);

  return { event, loading, error, refetch: fetchEvent };
};

export const useEventCategories = () => {
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getEventCategories();
      if (response.success && response.data) {
        setCategories(response.data);
      } else {
        setError(response.message || 'Failed to fetch categories');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading, error, refetch: fetchCategories };
};




