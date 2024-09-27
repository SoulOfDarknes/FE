## Frontend

### Tech Stack

This project uses the following technologies: React.js, Next.js, TypeScript, Redux Toolkit, and RTK Query.

### Installation

To get started with the frontend part of the project, follow these steps:
1. Navigate to the frontend directory: `cd frontend`
2. Install all required frontend dependencies: `npm install`

### Running the Frontend Application

Before starting the frontend, ensure that the backend server is running. Once it's ready, you can start the frontend application by executing the following command: `npm run dev`. The frontend will be available at `http://localhost:3000`.

### Environment Variables

To configure the frontend application, create a `.env.local` file in the `frontend` directory with the following content:
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001

If your backend is running on a different port, make sure to update the port number accordingly.

### Available Scripts

Below are the scripts you can run in the frontend project:
- Start the development server: `npm run dev`
- Start the production server: `npm run start`
- Linting: `npm run lint`
