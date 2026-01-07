# Project Context: Expenses Tracker Talenlio

## 1. Project Overview
This project is a full-stack web application, likely an expenses tracker, built using the MERN stack (MongoDB, Express, React, Node.js).

## 2. Directory Structure

```
js-bootcamp-assignment-1/
├── client/                 # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.js          # Main React Component
│   │   └── ...
│   └── package.json
├── server/                 # Express Backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── index.js            # Server Entry Point
│   └── package.json
├── package.json            # Root Scripts (concurrently)
└── README.md
```

## 3. Configuration & Dependencies

### Root `package.json`
Manages concurrent execution of client and server.
- **Scripts**: `start`, `server`, `client`, `dev`
- **DevDependencies**: `concurrently`

### Client (`client/package.json`)
React application with Material UI.
- **Dependencies**:
    - `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled` (UI Library)
    - `axios` (HTTP Client)
    - `react-router-dom` (Routing)
    - `chart.js`, `react-chartjs-2` (Charts)
    - `react`, `react-dom`

### Server (`server/package.json`)
Node.js/Express server connecting to MongoDB.
- **Dependencies**:
    - `express` (Web Framework)
    - `mongoose` (MongoDB ODM)
    - `dotenv` (Environment Variables)
    - `cors` (Cross-Origin Resource Sharing)
    - `bcryptjs` (Password Hashing)
    - `jsonwebtoken` (Authentication)
- **DevDependencies**: `nodemon`

## 4. Key File Contents

### `server/index.js` (Backend Entry Point)
```javascript
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/expenses', require('./routes/expenseRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### `client/src/App.js` (Frontend Routing)
```javascript
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Categories from './pages/Categories';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
```
