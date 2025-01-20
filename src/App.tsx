import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
        <div className="max-w-7xl mx-auto flex justify-between">
          <div>
            {isAuthenticated && (
              <>
                <Link to="/" className="text-blue-600 font-medium hover:underline mr-4">
                  Dashboard
                </Link>
                <Link to="/analytics" className="text-blue-600 font-medium hover:underline">
                  Analytics
                </Link>
              </>
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
              <>
                <Link to="/login" className="text-blue-600 font-medium hover:underline mr-4">
                  Login
                </Link>
                <Link to="/register" className="text-blue-600 font-medium hover:underline">
                  Register
                </Link>
              </>
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