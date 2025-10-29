# The House of Events - Backend API

A comprehensive backend API for The House of Events website, built with Node.js, Express, and SQLite.

## Features

- **Event Management**: Create, read, update, and delete events
- **User Management**: User registration, authentication, and profile management
- **Booking System**: Event booking and cancellation functionality
- **Partnership Management**: Partnership proposal submission and management
- **Newsletter Subscription**: Email subscription and unsubscription
- **Contact System**: Contact form submission and management
- **Admin Dashboard**: Administrative functions for all entities

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite3
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi
- **Security**: Helmet, CORS, Rate Limiting

## Installation

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   PORT=3001
   NODE_ENV=development
   DB_PATH=./database/events.db
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=https://thehouseofevents.onrender.com
   ```

4. **Initialize the database**:
   ```bash
   npm run migrate
   ```

5. **Seed the database with sample data**:
   ```bash
   npm run seed
   ```

6. **Start the development server**:
   ```bash
   npm run dev
   ```

The API will be available at `https://thehouseofevents.onrender.com`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create event (admin)
- `PUT /api/events/:id` - Update event (admin)
- `DELETE /api/events/:id` - Delete event (admin)
- `GET /api/events/categories/all` - Get event categories

### Bookings
- `GET /api/bookings/my-bookings` - Get user's bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/:id` - Get single booking
- `PATCH /api/bookings/:id/cancel` - Cancel booking
- `GET /api/bookings/admin/all` - Get all bookings (admin)

### Partnerships
- `POST /api/partnerships` - Submit partnership proposal
- `GET /api/partnerships/types` - Get partnership types
- `GET /api/partnerships/admin/all` - Get all partnerships (admin)
- `GET /api/partnerships/admin/:id` - Get single partnership (admin)
- `PATCH /api/partnerships/admin/:id/status` - Update partnership status (admin)

### Subscribers
- `POST /api/subscribers` - Subscribe to newsletter
- `POST /api/subscribers/unsubscribe` - Unsubscribe from newsletter
- `GET /api/subscribers/admin/all` - Get all subscribers (admin)
- `GET /api/subscribers/admin/count` - Get subscriber count (admin)

### Contact
- `POST /api/contact` - Submit contact message
- `GET /api/contact/admin/all` - Get all messages (admin)
- `GET /api/contact/admin/:id` - Get single message (admin)
- `PATCH /api/contact/admin/:id/status` - Update message status (admin)
- `GET /api/contact/admin/counts` - Get message counts (admin)

### Users (Admin)
- `GET /api/users/admin/all` - Get all users (admin)
- `GET /api/users/admin/stats` - Get user statistics (admin)
- `PATCH /api/users/admin/:id/status` - Update user status (admin)
- `GET /api/users/admin/:id/details` - Get user with bookings (admin)

## Database Schema

The database includes the following main tables:

- **users** - User information and authentication
- **events** - Event details and management
- **bookings** - Event booking records
- **partnerships** - Partnership proposals and management
- **subscribers** - Newsletter subscription data
- **contact_messages** - Contact form submissions
- **event_categories** - Event categorization
- **partnership_types** - Partnership type definitions
- **team_members** - Team member information
- **social_links** - Social media links

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "details": [] // Optional validation details
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse:
- 100 requests per 15 minutes per IP address
- Configurable via environment variables

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing configuration
- **Input Validation**: Joi schema validation
- **SQL Injection Protection**: Parameterized queries
- **Rate Limiting**: Request rate limiting

## Development

### Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run migrate` - Initialize database schema
- `npm run seed` - Seed database with sample data
- `npm test` - Run tests

### Database Management

The database is automatically initialized when the server starts. You can also run migrations and seeding manually:

```bash
# Initialize database schema
npm run migrate

# Add sample data
npm run seed
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3001 |
| `NODE_ENV` | Environment | development |
| `DB_PATH` | Database file path | ./database/events.db |
| `JWT_SECRET` | JWT secret key | Required |
| `JWT_EXPIRES_IN` | JWT expiration | 7d |
| `FRONTEND_URL` | Frontend URL for CORS | https://thehouseofevents.onrender.com |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details





