# NilRentTrack

## Introduction
NilRentTrack is a simplified web application that enables property owners to track their rental properties, manage rent details, and receive notifications for due rent payments. This application is designed as a technical assessment for full-stack software developer candidates.

## Features
### 1. Authentication & Authorization
- User authentication with secure login and registration.
- Authorization to control access to different parts of the application.

### 2. Property Management
- **Create Property:** Add rental properties with details such as address, number of units, monthly rent amount, and rent due date.
- **View Properties:** Display a list of all added properties with key details.
- **Edit Property:** Modify property details.
- **Delete Property:** Remove properties from the system.

### 3. Rent Tracking
- **Record Rent Payment:** Log rent payments with payment date, amount paid, and payment method.
- **View Rent History:** Track past payments with details.

### 4. Rent Due Notifications
- **Upcoming Rent Due List:** Display properties with rent due within the next 7 days.

## Technical Stack
### Frontend
- Next.js for server-side rendering and frontend development.
- TailwindCSS for styling.
- State management using React Context API.

### Backend & API
- RESTful API built with Next.js API routes.
- Authentication using JWT.
- Secure credential storage and session management.

### Database
- SQL database MySQL.
- Data storage for user authentication, properties, and rent payments.

## Installation & Setup
### Prerequisites
- Node.js installed on your system
- MySQL or Supabase database setup

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/nilrenttrack.git
   cd nilrenttrack
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables:
   Create a `.env.local` file and add the necessary database credentials and API keys.
4. Run the development server:
   ```sh
   npm run dev
   ```
5. Open the application in the browser at `http://localhost:3000`


## Scripts
- `npm run dev` - Start the development server.
- `npm run build` - Build the application for production.
- `npm run start` - Start the application in production mode.
- `npm run lint` - Run the linter.

## Dependencies
The project uses the following dependencies:
- **Frontend:** Next.js, TailwindCSS, React, React Icons, React Toastify, Framer Motion
- **Backend:** NextAuth.js, bcrypt, JWT, Axios
- **Database:** MySQL , MongoDB (optional)
- **Other:** Mapbox for mapping

## Future Enhancements
- Tenant management with detailed information.
- Automated email/WhatsApp notifications for due rent.
- Reporting dashboard for rent collection and outstanding payments.


