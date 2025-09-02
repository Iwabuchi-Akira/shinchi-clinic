# Admin Frontend

This is a [Next.js](https://nextjs.org) project for the clinic admin dashboard.

## Getting Started

### Local Development Setup

1. **Environment Variables**
   ```bash
   cp .env.example .env.local
   ```
   
2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Access the Application**
   Open [http://localhost:3000](http://localhost:3000) with your browser.

### Development Mode

The application includes a development mode that allows you to work locally without a backend server:

- Set `NEXT_PUBLIC_DEV_MODE=true` in `.env.local`
- The app will use dummy data and skip real API calls
- Default credentials: `admin` / `password123`
- Auto-login is enabled in development mode

### Development vs Production

- **Development Mode** (`NEXT_PUBLIC_DEV_MODE=true`)
  - Uses dummy data and mock API responses
  - Auto-login with dummy credentials
  - No real backend connection required

- **Production Mode** (`NEXT_PUBLIC_DEV_MODE=false`)
  - Connects to real backend API
  - Requires proper authentication
  - Used for Docker deployment

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # Reusable React components
├── contexts/         # React contexts (Auth, etc.)
└── lib/              # Utility functions and API client
```

## Features

- Authentication with JWT tokens
- News management
- Blog management  
- Settings configuration
- Responsive design with Tailwind CSS

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
