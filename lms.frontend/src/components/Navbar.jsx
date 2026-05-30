import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActiveRoute = (path) => location.pathname === path;

  return (
    <>
      <nav className="nav-surface border-b border-transparent fixed w-full top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="font-bold text-xl text-gray-900">LearnPro</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`font-medium transition-colors ${
                  isActiveRoute("/")
                    ? "text-purple-700"
                    : "text-gray-700 hover:text-purple-700 glow-link"
                }`}
              >
                Home
              </Link>
              <Link
                to="/#featured-courses"
                className={`font-medium transition-colors ${
                  isActiveRoute("/courses")
                    ? "text-purple-700"
                    : "text-gray-700 hover:text-purple-700 glow-link"
                }`}
              >
                Courses
              </Link>

              {user && (
                <Link
                  to={`/${user.role}/dashboard`}
                  className="glow-btn font-medium"
                >
                  Dashboard
                </Link>
              )}
            </div>

            {/* User Section */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  {/* User Info */}
                  <div className="hidden sm:flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name || user.username}
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        {user.role}
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {(user.name || user.username).charAt(0).toUpperCase()}
                    </div>
                  </div>

                  {/* Logout */}
              <button
                onClick={handleLogout}
                    className="text-gray-700 hover:text-red-600 font-medium text-sm transition-colors glow-link"
              >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-purple-700 font-medium text-sm transition-colors glow-link"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="glow-btn text-sm font-medium"
                  >
                    Sign Up
                  </Link>
                </>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-white/70 hover:shadow-glow-purple transition-all"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      isMobileMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-purple-100">
            <div className="px-4 py-6 space-y-4">
              <Link
                to="/"
                className="block py-2 font-medium text-gray-700 hover:text-purple-700 glow-link"
              >
                Home
              </Link>
              <Link
                to="/courses"
                className="block py-2 font-medium text-gray-700 hover:text-purple-700 glow-link"
              >
                Courses
              </Link>

              {user ? (
                <>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-3 py-2">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {(user.name || user.username).charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {user.name || user.username}
                        </div>
                        <div className="text-sm text-gray-500 capitalize">
                          {user.role}
                        </div>
                      </div>
                    </div>
                    <Link
                      to={`/${user.role}/dashboard`}
                      className="block w-full glow-btn text-center py-2 rounded-lg font-medium mt-3"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-red-600 text-center py-2 font-medium hover:bg-red-50 rounded-lg mt-2"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <Link
                    to="/login"
                    className="block w-full text-center py-2 text-gray-700 font-medium border border-purple-100 rounded-lg hover:bg-purple-50 hover:shadow-glow-purple transition-all"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block w-full text-center py-2 glow-btn font-medium rounded-lg"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}
