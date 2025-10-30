# Mental Health Backend

This is the backend API for the Mental Health application, a comprehensive platform designed to provide inspirational quotes and mental health support. The backend is built with Node.js, Express, and MongoDB, providing a robust foundation for the frontend application.

## Why We Created This Project

Mental health is a critical aspect of overall well-being, yet it often goes overlooked in our fast-paced world. We created this project with the following goals:

1. **Accessibility**: Make mental health support easily accessible to everyone through a simple, digital platform
2. **Daily Inspiration**: Provide users with daily motivational quotes to boost their mental wellness journey
3. **Minimalist Approach**: Offer a clean, distraction-free environment for reflection and mindfulness
4. **Community Support**: Create a space where users can find solace in shared experiences and wisdom
5. **Integration with Wellness**: Combine inspirational content with calming elements like music to enhance mental well-being

This project serves as a gentle reminder that mental health matters, and sometimes, a few words of encouragement can make a significant difference in someone's day.

## Project Overview

The Mental Health application aims to provide users with:
- Inspirational quotes for mental wellness
- A minimalist interface for focused reading
- Integration with music (Spotify) for enhanced relaxation
- Past quotes tracking and history
- Copyright information and attributions

## Features

- **RESTful API** for managing mental health quotes
- **MongoDB database** integration with Mongoose ODM
- **Google Gemini AI** integration for generating personalized quotes
- **Environment-based configuration** for secure deployment
- **CORS support** for frontend integration
- **Error handling** and validation
- **Modular architecture** with separate services, models, and routes

## API Endpoints

### Quotes

- `GET /api/quotes` - Get all quotes from the database
- `GET /api/quotes/:id` - Get a specific quote by ID
- `POST /api/quotes` - Create a new quote (requires authentication in production)
- `PUT /api/quotes/:id` - Update a quote (requires authentication in production)
- `DELETE /api/quotes/:id` - Delete a quote (requires authentication in production)

### Generate Quote

- `POST /api/quotes/generate` - Generate a new quote using Gemini AI
  - Request body: `{ "theme": "mental wellness", "mood": "calm" }`
  - Returns: Generated quote with metadata

### Response Format

All quote responses follow this structure:
```json
{
  "_id": "string",
  "text": "string",
  "author": "string",
  "category": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

## Project Structure

```
backend/
├── config/
│   └── db.js          # Database configuration and connection setup
├── models/
│   └── Quote.js       # Mongoose schema and model for quotes
├── routes/
│   └── quotes.js      # Express routes for quote endpoints
├── services/
│   └── quoteService.js # Business logic for quote operations
├── .env              # Environment variables (not tracked by git)
├── .gitignore        # Git ignore file to exclude sensitive files
├── index.js          # Main application entry point with Express setup
├── list-models.js    # Utility script to list MongoDB models
├── test-api-endpoints.js  # Script to test API endpoints
├── test-gemini-api.js     # Script to test Gemini AI integration
├── package.json      # Project dependencies and npm scripts
└── README.md         # This file
```

## Technology Stack

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework for API
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB
- **Google Gemini AI**: AI service for generating quotes
- **CORS**: Cross-Origin Resource Sharing for frontend integration
- **dotenv**: Environment variable management
- **nodemon**: Development utility for auto-restarting server

## Database Schema

The Quote model includes the following fields:
- `text`: The quote content (required)
- `author`: The quote author (optional)
- `category`: Quote category (optional)
- `source`: Source of the quote (optional)
- `createdAt`: Timestamp when quote was created
- `updatedAt`: Timestamp when quote was last updated

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas for production)
- npm or yarn
- Google Gemini API key (for quote generation)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nimausername/mentalhealth-backend.git
   cd mentalhealth-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3001
   MONGODB_URI=your_mongodb_connection_string
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. Start the server:
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon for auto-reload
- `node test-api-endpoints.js` - Test API endpoints locally
- `node test-gemini-api.js` - Test Gemini AI integration

## Development

### Running Tests

To test API endpoints:
```bash
node test-api-endpoints.js
```

To test Gemini AI integration:
```bash
node test-gemini-api.js
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/mentalhealth
GEMINI_API_KEY=your_gemini_api_key_here
```

### Deployment Considerations

1. **Security**: Ensure all API keys and sensitive data are stored in environment variables
2. **Database**: Use MongoDB Atlas for production deployment
3. **CORS**: Configure CORS appropriately for your frontend domain
4. **Rate Limiting**: Implement rate limiting for AI generation endpoints
5. **Authentication**: Add JWT or similar authentication for production use

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.