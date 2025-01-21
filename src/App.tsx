import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const handleLogin = (token:any) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      {/* Navigation Bar */}
      <nav className="p-4 bg-gray-100 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="Company Logo"
              className="w-40 h-10 mr-6 border border-gray-300 rounded shadow-sm mr-4"
            />
            {isAuthenticated && (
              <div className="flex space-x-4">
                <Link to="/" className="text-blue-600 font-medium hover:underline">
                  Dashboard
                </Link>
                <Link to="/analytics" className="text-blue-600 font-medium hover:underline">
                  Analytics
                </Link>
              </div>
            )}
          </div>
          <div>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="text-red-600 font-medium hover:underline"
              >
                Logout
              </button>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="text-blue-600 font-medium hover:underline">
                  Login
                </Link>
                <Link to="/register" className="text-blue-600 font-medium hover:underline">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
  
      <main className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            {/* Private Routes */}
            <Route
              path="/"
              element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/analytics"
              element={
                isAuthenticated ? <Analytics /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;