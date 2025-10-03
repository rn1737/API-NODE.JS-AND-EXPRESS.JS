import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Services from './pages/Services.jsx';
import BookService from './pages/BookService.jsx';
import Tracking from './pages/Tracking.jsx';
import Reviews from './pages/Reviews.jsx';
import TechDashboard from './pages/tech/TechDashboard.jsx';
import TechBookings from './pages/tech/TechBookings.jsx';
import TechEarnings from './pages/tech/TechEarnings.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';

function NavBar() {
  const { user, role, logout } = useAuth();
  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl text-primary">QuickMistri</Link>
        <div className="flex gap-3 items-center">
          <Link to="/services" className="text-sm">Services</Link>
          {role === 'customer' && <Link to="/book" className="text-sm">Book</Link>}
          {role === 'customer' && <Link to="/tracking" className="text-sm">Tracking</Link>}
          {role === 'technician' && <Link to="/tech" className="text-sm">Tech</Link>}
          {user ? (
            <button onClick={logout} className="btn-secondary text-sm">Logout</button>
          ) : (
            <>
              <Link to="/login" className="btn-secondary text-sm">Login</Link>
              <Link to="/signup" className="btn-primary text-sm">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

function ProtectedRoute({ children, allow }) {
  const { role } = useAuth();
  if (!allow.includes(role)) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <NavBar />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/services" element={<Services />} />
          <Route path="/book" element={
            <ProtectedRoute allow={["customer"]}>
              <BookService />
            </ProtectedRoute>
          } />
          <Route path="/tracking" element={
            <ProtectedRoute allow={["customer"]}>
              <Tracking />
            </ProtectedRoute>
          } />
          <Route path="/reviews" element={<Reviews />} />

          <Route path="/tech" element={
            <ProtectedRoute allow={["technician"]}>
              <TechDashboard />
            </ProtectedRoute>
          } />
          <Route path="/tech/bookings" element={
            <ProtectedRoute allow={["technician"]}>
              <TechBookings />
            </ProtectedRoute>
          } />
          <Route path="/tech/earnings" element={
            <ProtectedRoute allow={["technician"]}>
              <TechEarnings />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </AuthProvider>
  );
}
