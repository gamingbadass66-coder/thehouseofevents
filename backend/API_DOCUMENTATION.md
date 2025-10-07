# The House of Events - API Documentation

## Base URL
```
fetch("https://your-backend-render-url.onrender.com/api/...")
```

## Authentication
Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Response Format
All API responses follow this format:
```json
{
  "success": true|false,
  "message": "Optional message",
  "data": {} // Response data
}
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+91 98765 43210",
      "created_at": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt-token-here"
  },
  "message": "User registered successfully"
}
```

### Login User
**POST** `/auth/login`

Login with email (simplified authentication).

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+91 98765 43210"
    },
    "token": "jwt-token-here"
  },
  "message": "Login successful"
}
```

### Get Current User
**GET** `/auth/me`

Get current user profile (requires authentication).

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 98765 43210",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

### Update Profile
**PUT** `/auth/profile`

Update user profile (requires authentication).

**Request Body:**
```json
{
  "name": "John Smith",
  "phone": "+91 98765 43211"
}
```

---

## Events Endpoints

### Get All Events
**GET** `/events`

Get all events with optional filtering.

**Query Parameters:**
- `status` - Filter by event status (upcoming, ongoing, completed, cancelled)
- `category` - Filter by category ID
- `upcoming` - Show only upcoming events (true/false)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "SIP — Share. Inspire. Paint.",
      "description": "Join us for our signature event...",
      "event_date": "2024-09-12",
      "start_time": "16:00",
      "end_time": "18:30",
      "venue": "Creative Studio",
      "price": 150.00,
      "max_capacity": 30,
      "current_bookings": 5,
      "category_name": "Art & Creativity",
      "calculated_status": "upcoming"
    }
  ]
}
```

### Get Single Event
**GET** `/events/:id`

Get details of a specific event.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "SIP — Share. Inspire. Paint.",
    "description": "Join us for our signature event...",
    "event_date": "2024-09-12",
    "start_time": "16:00",
    "end_time": "18:30",
    "venue": "Creative Studio",
    "venue_address": "Ahmedabad, Gujarat",
    "price": 150.00,
    "max_capacity": 30,
    "current_bookings": 5,
    "category_name": "Art & Creativity",
    "calculated_status": "upcoming"
  }
}
```

### Create Event (Admin)
**POST** `/events`

Create a new event (requires authentication).

**Request Body:**
```json
{
  "title": "New Event",
  "description": "Event description...",
  "short_description": "Short description",
  "event_date": "2024-12-01",
  "start_time": "18:00",
  "end_time": "20:00",
  "venue": "Event Venue",
  "venue_address": "Address",
  "price": 200.00,
  "max_capacity": 50,
  "category_id": 1,
  "image_url": "https://example.com/image.jpg"
}
```

### Get Event Categories
**GET** `/events/categories/all`

Get all event categories.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Art & Creativity",
      "description": "Painting, drawing, and creative workshops"
    }
  ]
}
```

---

## Booking Endpoints

### Get My Bookings
**GET** `/bookings/my-bookings`

Get current user's bookings (requires authentication).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "event_id": 1,
      "number_of_tickets": 2,
      "total_amount": 300.00,
      "booking_status": "confirmed",
      "payment_status": "paid",
      "booking_reference": "HOE-1234567890-ABC12345",
      "event_title": "SIP — Share. Inspire. Paint.",
      "event_date": "2024-09-12",
      "start_time": "16:00",
      "end_time": "18:30",
      "venue": "Creative Studio",
      "price": 150.00,
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Create Booking
**POST** `/bookings`

Create a new booking (requires authentication).

**Request Body:**
```json
{
  "event_id": 1,
  "number_of_tickets": 2
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "event_id": 1,
    "number_of_tickets": 2,
    "total_amount": 300.00,
    "booking_status": "pending",
    "payment_status": "pending",
    "booking_reference": "HOE-1234567890-ABC12345",
    "event_title": "SIP — Share. Inspire. Paint.",
    "event_date": "2024-09-12",
    "start_time": "16:00",
    "end_time": "18:30",
    "venue": "Creative Studio"
  },
  "message": "Booking created successfully"
}
```

### Cancel Booking
**PATCH** `/bookings/:id/cancel`

Cancel a booking (requires authentication).

**Response:**
```json
{
  "success": true,
  "message": "Booking cancelled successfully"
}
```

---

## Partnership Endpoints

### Submit Partnership Proposal
**POST** `/partnerships`

Submit a partnership proposal.

**Request Body:**
```json
{
  "partner_name": "Creative Studio",
  "contact_person": "Jane Doe",
  "email": "jane@creativestudio.com",
  "phone": "+91 98765 43210",
  "organization": "Creative Studio Pvt Ltd",
  "partnership_type_id": 1,
  "partnership_type_name": "Collaborator (Artist/Performer/Educator)"
  "proposal": "We would like to collaborate on art workshops..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "partner_name": "Creative Studio",
    "contact_person": "Jane Doe",
    "email": "jane@creativestudio.com",
    "phone": "+91 98765 43210",
    "organization": "Creative Studio Pvt Ltd",
    "partnership_type_id": 1,
    "proposal": "We would like to collaborate on art workshops...",
    "status": "pending",
    "partnership_type_name": "Collaborator (Artist/Performer/Educator)",
    "created_at": "2024-01-01T00:00:00.000Z"
  },
  "message": "Partnership proposal submitted successfully"
}
```

### Get Partnership Types
**GET** `/partnerships/types`

Get all partnership types.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Collaborator (Artist/Performer/Educator)",
      "description": "Creative professionals and educators"
    }
  ]
}
```

---

## Newsletter Endpoints

### Subscribe to Newsletter
**POST** `/subscribers`

Subscribe to the newsletter.

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter"
}
```

### Unsubscribe from Newsletter
**POST** `/subscribers/unsubscribe`

Unsubscribe from the newsletter.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully unsubscribed from newsletter"
}
```

---

## Contact Endpoints

### Submit Contact Message
**POST** `/contact`

Submit a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry about events",
  "message": "I would like to know more about your upcoming events..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully. We will get back to you soon!"
}
```

---

## Admin Endpoints

### Get All Bookings (Admin)
**GET** `/bookings/admin/all`

Get all bookings with user and event details (requires authentication).

**Query Parameters:**
- `status` - Filter by booking status
- `event_id` - Filter by event ID

### Get All Partnerships (Admin)
**GET** `/partnerships/admin/all`

Get all partnership proposals (requires authentication).

**Query Parameters:**
- `status` - Filter by partnership status

### Update Partnership Status (Admin)
**PATCH** `/partnerships/admin/:id/status`

Update partnership status (requires authentication).

**Request Body:**
```json
{
  "status": "approved"
}
```

### Get All Subscribers (Admin)
**GET** `/subscribers/admin/all`

Get all newsletter subscribers (requires authentication).

**Query Parameters:**
- `active` - Filter by subscription status (true/false)

### Get All Contact Messages (Admin)
**GET** `/contact/admin/all`

Get all contact form messages (requires authentication).

**Query Parameters:**
- `status` - Filter by message status

### Update Message Status (Admin)
**PATCH** `/contact/admin/:id/status`

Update contact message status (requires authentication).

**Request Body:**
```json
{
  "status": "read"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error",
  "details": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Access token required"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 409 Conflict
```json
{
  "success": false,
  "message": "Resource already exists"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

## Rate Limiting

The API implements rate limiting:
- **Limit**: 100 requests per 15 minutes per IP address
- **Headers**: Rate limit information is included in response headers
- **Exceeded**: Returns 429 Too Many Requests when limit is exceeded

---

## CORS

The API supports CORS for the configured frontend URL:
- **Allowed Origin**: Configured via `FRONTEND_URL` environment variable
- **Credentials**: Supported for authenticated requests
