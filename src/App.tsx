import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <Router>
      {/* Navigation Bar */}
      <nav className="p-4 bg-gray-100 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between">
          <div>
            <Link to="/" className="text-blue-600 font-medium hover:underline mr-4">
              Dashboard
            </Link>
            <Link to="/analytics" className="text-blue-600 font-medium hover:underline">
              Analytics
            </Link>
          </div>
        </div>
      </nav>

      {/* Content Wrapper */}
      <main className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;