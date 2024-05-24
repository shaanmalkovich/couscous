// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import GroceryList from './components/GroceryList';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

const App: React.FC = () => {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <GroceryList /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
};

export default App;
