import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import SignUp from './components/signup/signup';
import SignIn from './components/signIn/signIn';
import Calendar from './components/calendar/calendar';

const App = () => {
  return (
    <AuthProvider>
      <Router>
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;


