// API Configuration and Client
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';


interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  details?: Array<{
    field: string;
    message: string;
  }>;
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('auth_token');
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication
  async register(userData: { name: string; email: string; phone?: string }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(email: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  async updateProfile(profileData: { name: string; phone: string }) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Events
  async getEvents(params?: { status?: string; category?: string; upcoming?: boolean }) {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.append('status', params.status);
    if (params?.category) searchParams.append('category', params.category);
    if (params?.upcoming) searchParams.append('upcoming', 'true');
    
    const queryString = searchParams.toString();
    return this.request(`/events${queryString ? `?${queryString}` : ''}`);
  }

  async getEvent(id: string) {
    return this.request(`/events/${id}`);
  }

  async getEventCategories() {
    return this.request('/events/categories/all');
  }

  // Bookings
  async getMyBookings() {
    return this.request('/bookings/my-bookings');
  }

  async createBooking(bookingData: { event_id: number; number_of_tickets: number }) {
    return this.request('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  async getBooking(id: string) {
    return this.request(`/bookings/${id}`);
  }

  async cancelBooking(id: string) {
    return this.request(`/bookings/${id}/cancel`, {
      method: 'PATCH',
    });
  }

  // Partnerships
  async submitPartnership(partnershipData: {
    partner_name: string;
    contact_person?: string;
    email: string;
    phone?: string;
    organization?: string;
    partnership_type_id: number;
    proposal: string;
  }) {
    return this.request('/partnerships', {
      method: 'POST',
      body: JSON.stringify(partnershipData),
    });
  }

  async getPartnershipTypes() {
    return this.request('/partnerships/types');
  }

  // Newsletter
  async subscribeToNewsletter(email: string, name?: string) {
    return this.request('/subscribers', {
      method: 'POST',
      body: JSON.stringify({ email, name }),
    });
  }

  async unsubscribeFromNewsletter(email: string) {
    return this.request('/subscribers/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // Contact
  async submitContactMessage(messageData: {
    name: string;
    email: string;
    subject?: string;
    message: string;
  }) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;





