# Frontend-Backend Integration Guide

This guide will help you set up and run the complete "The House of Events" application with both frontend and backend integrated.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 1. Backend Setup

```bash
# Navigate to backend directory
cd cerulean-clone-main/backend

# Install dependencies
npm install

# Set up environment variables
cp env.example .env

# Edit .env file with your configuration
# The default values should work for development

# Initialize database and seed with sample data
node setup.js

# Start the backend server
npm run dev
```

The backend will be available at `http://localhost:3001`

### 2. Frontend Setup

```bash
# Navigate to frontend directory (root of the project)
cd cerulean-clone-main

# Install dependencies
npm install

# Set up environment variables
cp env.example .env

# Edit .env file if needed (default should work)
# VITE_API_URL=http://localhost:3001/api

# Start the frontend development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 🔧 What's Integrated

### ✅ Authentication System
- **User Registration**: Users can create accounts with name, email, and phone
- **User Login**: Simplified login with email verification
- **JWT Tokens**: Secure authentication with automatic token management
- **Auth Context**: Global authentication state management
- **Auth Modal**: Login/Register modal with form validation

### ✅ Events Management
- **Dynamic Events**: Events are loaded from the backend API
- **Real-time Data**: Event details, pricing, and availability from database
- **Event Categories**: Dynamic category loading
- **Loading States**: Proper loading indicators and error handling
- **Responsive Design**: Events display beautifully on all devices

### ✅ Booking System
- **Real-time Booking**: Users can book tickets for events
- **Authentication Required**: Users must be logged in to book
- **Dynamic Pricing**: Ticket prices and totals calculated from API data
- **Capacity Management**: Shows available spots and sold-out status
- **Booking Confirmation**: Success feedback with booking details

### ✅ Partnership System
- **Dynamic Partnership Types**: Partnership types loaded from API
- **Form Validation**: Complete form validation with error handling
- **API Integration**: Partnership proposals submitted to backend
- **Success Feedback**: Confirmation messages and form reset

### ✅ Newsletter Subscription
- **Email Subscription**: Users can subscribe to newsletter
- **API Integration**: Subscriptions stored in backend database
- **Success Feedback**: Confirmation messages

### ✅ Navigation & UI
- **Authentication State**: Navigation shows login/logout based on auth state
- **User Information**: Displays user name when logged in
- **Responsive Design**: Mobile-friendly navigation
- **Loading States**: Proper loading indicators throughout

## 🗄️ Database Features

The backend includes a complete SQLite database with:

- **Users**: User accounts and profiles
- **Events**: Event management with categories
- **Bookings**: Ticket booking system
- **Partnerships**: Partnership proposal management
- **Subscribers**: Newsletter subscription management
- **Contact Messages**: Contact form submissions
- **Team Members**: Team/founder information
- **Social Links**: Social media links

## 🔌 API Endpoints Used

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get single event
- `GET /api/events/categories/all` - Get event categories

### Bookings
- `GET /api/bookings/my-bookings` - Get user's bookings
- `POST /api/bookings` - Create booking
- `PATCH /api/bookings/:id/cancel` - Cancel booking

### Partnerships
- `POST /api/partnerships` - Submit partnership proposal
- `GET /api/partnerships/types` - Get partnership types

### Newsletter
- `POST /api/subscribers` - Subscribe to newsletter

## 🎨 Frontend Features

### Components Updated
- **Events.tsx**: Now loads events from API with loading states
- **BookTicketsModal.tsx**: Integrated with booking API
- **PartnerModal.tsx**: Integrated with partnership API
- **Navigation.tsx**: Added authentication UI
- **AuthModal.tsx**: New login/register modal

### New Hooks
- **useAuth**: Authentication state management
- **useEvents**: Event data fetching
- **useBookings**: Booking management

### New Context
- **AuthContext**: Global authentication state

## 🚦 Testing the Integration

### 1. Test User Registration
1. Click "Login" in navigation
2. Switch to "Sign up" tab
3. Fill in details and create account
4. Verify you're logged in (name shows in navigation)

### 2. Test Event Booking
1. Scroll to Events section
2. Click "Book Tickets" on any event
3. Verify booking modal shows event details
4. Select number of tickets and book
5. Check success message

### 3. Test Partnership Submission
1. Click "Get Involved" in navigation
2. Fill partnership form
3. Submit and verify success message

### 4. Test Newsletter Subscription
1. Scroll to Community section
2. Click "Subscribe" button
3. Fill email and subscribe
4. Verify success message

## 🔧 Configuration

### Backend Configuration (.env)
```env
PORT=3001
NODE_ENV=development
DB_PATH=./database/events.db
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

### Frontend Configuration (.env)
```env
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=The House of Events
VITE_APP_DESCRIPTION=Crafting Unforgettable Moments in Ahmedabad
```

## 🐛 Troubleshooting

### Backend Issues
- **Database not found**: Run `node setup.js` in backend directory
- **Port already in use**: Change PORT in .env file
- **CORS errors**: Check FRONTEND_URL in backend .env

### Frontend Issues
- **API connection failed**: Check VITE_API_URL in frontend .env
- **Authentication not working**: Verify backend is running on correct port
- **Events not loading**: Check backend API endpoints

### Common Solutions
1. **Restart both servers** after making changes
2. **Check console logs** for error messages
3. **Verify environment variables** are set correctly
4. **Clear browser cache** if issues persist

## 📱 Mobile Responsiveness

The integration maintains full mobile responsiveness:
- **Touch-friendly buttons** and forms
- **Responsive navigation** with mobile menu
- **Optimized modals** for mobile screens
- **Proper form layouts** on all devices

## 🔒 Security Features

- **JWT Authentication** with secure token storage
- **Input Validation** on both frontend and backend
- **CORS Protection** configured for frontend domain
- **Rate Limiting** to prevent abuse
- **SQL Injection Protection** with parameterized queries

## 🎉 Success!

Your "The House of Events" website is now fully integrated with a complete backend system! Users can:

- ✅ Register and login
- ✅ View dynamic events from database
- ✅ Book tickets for events
- ✅ Submit partnership proposals
- ✅ Subscribe to newsletter
- ✅ Manage their bookings

The system is production-ready with proper error handling, loading states, and responsive design.




