# CTechX - The Book of Student Growth

Welcome to CTechX, a modern web application designed for Gen-Z students and mentors. This platform features two main modules: the Student-Side (BookView) and the Admin-Side (Mentor Control Tower). 

## Project Structure

The project is divided into two main directories: `client` for the frontend and `server` for the backend.

### Client

- **Public**: Contains static files such as the favicon and robots.txt.
- **Src**: The main source code for the React application.
  - **Assets**: Image assets used in the application.
  - **Components**: Reusable components for both admin and student interfaces.
  - **Contexts**: Context providers for authentication and theme management.
  - **Hooks**: Custom hooks for Firebase functionalities.
  - **Pages**: Different pages for admin and student views.
  - **Utils**: Utility functions for animations and helpers.
  - **App.jsx**: Main application component.
  - **Index.jsx**: Entry point for the React application.
  - **Main.jsx**: Initializes the application.

### Server

- **Controllers**: Functions to handle requests for authentication, students, and admin operations.
- **Models**: Database models for User, Student, and Badge.
- **Routes**: API routes for authentication, student management, and admin functionalities.
- **Utils**: Utility functions for Firebase and other helpers.
- **Index.js**: Entry point for the server application.

## Features

### Student-Side (BookView)
- Personalized digital book reflecting academic and extracurricular journeys.
- Interactive UI with monthly pages showing attendance, XP, feedback, and badges.
- Gamified XP system and badges for engagement.
- Real-time notifications and alerts.

### Admin-Side (Mentor Control Tower)
- Dashboard for real-time student activity and statistics.
- Student management tools for tracking growth and providing feedback.
- Custom badge and XP control for student achievements.
- Announcement system for real-time communication with students.

## Tech Stack

- **Frontend**: React, TailwindCSS, Vite
- **Backend**: Node.js, Express, Firebase
- **State Management**: Zustand or Redux Toolkit
- **Animations**: GSAP or Framer Motion
- **Charts**: Recharts or Chart.js

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/ctechx-student-growth.git
   ```

2. Navigate to the client directory and install dependencies:
   ```
   cd client
   npm install
   ```

3. Navigate to the server directory and install dependencies:
   ```
   cd server
   npm install
   ```

4. Set up environment variables in the server/.env file.

5. Start the development servers:
   - For the client:
     ```
     cd client
     npm run dev
     ```
   - For the server:
     ```
     cd server
     npm start
     ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.#   C T E C H X  
 