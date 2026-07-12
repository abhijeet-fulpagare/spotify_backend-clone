# Spotify Backend Clone

This project is a Node.js and Express-based backend for a simple Spotify-like music platform. It supports user authentication, role-based access control, music uploads, and album management.

## Features

- User registration, login, and logout
- JWT-based authentication stored in cookies
- Role-based access for users and artists
- Music upload support with ImageKit storage
- Album creation and retrieval
- MongoDB integration with Mongoose

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT + bcrypt
- Multer for file uploads
- ImageKit for media storage
- Nodemon for development

## Project Structure

- src/app.js - Main Express app setup
- src/controllers/ - Request handlers for auth and music
- src/routes/ - API route definitions
- src/models/ - Mongoose models for users, music, and albums
- src/middlewares/ - Authentication and authorization middleware
- src/services/ - External service integrations
- server.js - Server entry point

## Prerequisites

Before running the project, make sure you have:

- Node.js installed
- A MongoDB database (MongoDB Atlas or local MongoDB)
- An ImageKit account for storing uploaded music files

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the project root and add the following variables:

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

4. Start the development server:

```bash
npm run dev
```

The server will run on the port specified in the environment variables.

## API Endpoints

### Authentication

- POST /api/auth/register
  - Registers a new user
  - Body: username, email, password, role(optional)

- POST /api/auth/login
  - Logs in an existing user
  - Body: username or email, password

- POST /api/auth/logout
  - Clears the authentication cookie

### Music and Albums

- POST /api/music/upload
  - Uploads a music file (artist only)
  - Requires multipart form-data with:
    - Music_file
    - title

- POST /api/music/create-album
  - Creates a new album (artist only)
  - Body: title, musics

- GET /api/music/
  - Fetches recent music items
  - Requires authentication

- GET /api/music/album
  - Fetches album titles
  - Requires authentication

- GET /api/music/album/:id
  - Fetches a single album by ID
  - Requires authentication

## Notes

- Authentication uses a cookie named token.
- Upload and album creation routes are restricted to artists.
- Regular users can access music and album retrieval endpoints.

## License

This project is licensed under ISC.
