# Recipe Web Application - MERN Stack

## Overview
This project is a modern web application for recipes developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application allows users to search, browse, and save culinary content in an intuitive and organized way.

The client-side is built with **React.js**, providing a dynamic and responsive interface, while **Node.js** and **Express.js** serve as a stable backend communicating with **MongoDB Atlas** for data storage. Additional libraries include **Material UI (MUI)** for UI components, **Multer** for image uploads, and **JWT** with **bcrypt** for secure authentication.

---

## Features
- User registration and login
- Browse recipes by category or search term
- View recipe details with ingredients, steps, and images
- Save favorite recipes
- Add new recipes
- User profile management
- Delete recipes (admin only)
- Dark mode support
- Pagination and carousel for newest recipes

---

## Project Structure

### Frontend
```

frontend/
├─ public/            # Static assets (index.html, images)
├─ src/
│  ├─ assets/         # Images (screenshots, recipe images)
│  ├─ components/     # Reusable React components (RecipeCard, Navbar, FavoriteCard, Layout)
│  ├─ context/        # React context for global state management
│  ├─ hooks/          # Custom React hooks (e.g., useImage)
│  ├─ pages/          # Page components (Home, Favorites, RecipeDetails)
│  ├─ services/       # API calls using Axios
│  ├─ styles/         # CSS files for styling
│  ├─ App.jsx         # Main application component
│  └─ index.jsx       # Entry point
├─ package.json
└─ vite.config.js

```

### Backend
```

backend/
├─ models/            # Mongoose schemas for Users, Recipes, Categories
├─ routes/            # API endpoints
├─ middleware/        # Authentication (JWT)
├─ uploads/           # Uploaded recipe images
├─ server.js          # Express server entry point
├─ seedCategory.js    # Seed script for categories
└─ seedRecipes.js     # Seed script for recipes

````

---

## Technologies
- **MongoDB Atlas**: Cloud-based NoSQL database
- **Mongoose**: ODM for Node.js
- **Express.js**: Backend framework
- **React.js**: Frontend library
- **Node.js**: Server runtime
- **JWT**: Authentication
- **bcrypt**: Password hashing
- **Material UI (MUI)**: UI components
- **Multer**: File uploads

---

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
````

2. Install dependencies for frontend:

```bash
cd frontend
npm install
```

3. Install dependencies for backend:

```bash
cd ../backend
npm install
```

4. Create a `.env` file in `backend` with your MongoDB connection string and JWT secret:

```
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret-key>
PORT=5000
```

---

## Usage

1. Start the backend server:

```bash
cd backend
npm run dev
```

2. Start the frontend:

```bash
cd frontend
npm run dev
```

3. Open the app in your browser at `http://localhost:5173`.

---

## Screenshots


---

## License

This project is licensed under the MIT License.

