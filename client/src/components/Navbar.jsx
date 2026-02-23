import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-black/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-18">
          {/* Logo */}
          <div className="shrink-0">
            <Link to="/" className="text-2xl lg:text-2xl font-bold text-black hover:text-black/80 transition-all duration-200">
              UpSkillr
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              to="/#courses" 
              className="px-4 py-2 text-black/70 hover:text-black hover:bg-black/5 rounded-lg transition-all duration-200 text-sm font-medium"
            >
              Courses
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/my-purchases" 
                  className="px-4 py-2 text-black/70 hover:text-black hover:bg-black/5 rounded-lg transition-all duration-200 text-sm font-medium"
                >
                  My Courses
                </Link>
                <div className="relative group">
                  <button className="flex items-center gap-2 px-4 py-2 text-black/70 hover:text-black hover:bg-black/5 rounded-lg transition-all duration-200 text-sm font-medium">
                    <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center text-white text-xs font-semibold">
                      {user?.firstName?.charAt(0).toUpperCase() || <User size={14} />}
                    </div>
                    <span className="max-w-24 truncate">{user?.firstName || 'Account'}</span>
                  </button>
                  
                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-black/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-2">
                      <a href="#profile" className="block px-4 py-2 text-sm text-black/70 hover:bg-black/5">
                        Profile
                      </a>
                      <a href="#settings" className="block px-4 py-2 text-sm text-black/70 hover:bg-black/5">
                        Settings
                      </a>
                      <div className="border-t border-black/10 my-1" />
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-black hover:bg-black/5 flex items-center gap-2"
                      >
                        <LogOut size={14} />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-black/70 hover:text-black hover:bg-black/5 rounded-lg transition-all duration-200 text-sm font-medium"
                >
                  Login
                </Link>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/signup"
                    className="ml-2 px-5 py-2.5 bg-black text-white rounded-lg text-sm font-semibold hover:bg-black/90 active:bg-black/80 transition-colors duration-200 shadow-sm hover:shadow inline-block"
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-black/70 hover:text-black hover:bg-black/5 rounded-lg transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-black/10"
            >
              <div className="py-4 space-y-1">
                <Link 
                  to="/#courses" 
                  className="block px-4 py-3 text-black/70 hover:text-black hover:bg-black/5 rounded-lg transition-colors text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Courses
                </Link>
                
                {isAuthenticated ? (
                  <>
                    <Link 
                      to="/my-purchases" 
                      className="block px-4 py-3 text-black/70 hover:text-black hover:bg-black/5 rounded-lg transition-colors text-sm font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      My Courses
                    </Link>
                    <a 
                      href="#profile" 
                      className="block px-4 py-3 text-black/70 hover:text-black hover:bg-black/5 rounded-lg transition-colors text-sm font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Profile
                    </a>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-black hover:bg-black/5 rounded-lg transition-colors text-sm font-medium"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      className="block px-4 py-3 text-black/70 hover:text-black hover:bg-black/5 rounded-lg transition-colors text-sm font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="block mx-4 px-4 py-3 bg-black text-white rounded-lg text-sm font-semibold hover:bg-black/90 transition-colors text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
