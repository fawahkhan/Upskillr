import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, ChevronDown, GraduationCap, BookOpen } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Reusable dropdown hook: closes when clicking outside
const useDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return { open, setOpen, ref };
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const loginDropdown = useDropdown();
  const signupDropdown = useDropdown();
  const userDropdown = useDropdown();

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    userDropdown.setOpen(false);
    navigate('/');
  };

  const close = () => {
    setMobileOpen(false);
    loginDropdown.setOpen(false);
    signupDropdown.setOpen(false);
    userDropdown.setOpen(false);
  };

  const displayName = user?.firstName
    ? `${user.firstName}${user.lastName ? ' ' + user.lastName : ''}`
    : isAdmin
    ? 'Instructor'
    : 'Account';

  const initials = user?.firstName
    ? (user.firstName[0] + (user.lastName?.[0] || '')).toUpperCase()
    : '?';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-black/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            onClick={close}
            className="text-2xl font-bold text-black hover:text-black/80 transition-colors shrink-0"
          >
            UpSkillr
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/#courses"
              className="px-4 py-2 text-black/70 hover:text-black hover:bg-black/5 rounded-lg transition-colors text-sm font-medium"
            >
              Courses
            </Link>

            {isAuthenticated ? (
              <>
                {/* User: My Courses link; Instructor: Dashboard link */}
                {isAdmin ? (
                  <Link
                    to="/instructor/dashboard"
                    className="px-4 py-2 text-black/70 hover:text-black hover:bg-black/5 rounded-lg transition-colors text-sm font-medium flex items-center gap-1.5"
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/my-purchases"
                    className="px-4 py-2 text-black/70 hover:text-black hover:bg-black/5 rounded-lg transition-colors text-sm font-medium"
                  >
                    My Courses
                  </Link>
                )}

                {/* User avatar dropdown */}
                <div ref={userDropdown.ref} className="relative ml-1">
                  <button
                    onClick={() => userDropdown.setOpen((o) => !o)}
                    className="flex items-center gap-2 px-3 py-2 text-black/70 hover:text-black hover:bg-black/5 rounded-lg transition-colors text-sm font-medium"
                  >
                    <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center text-white text-xs font-semibold shrink-0">
                      {initials}
                    </div>
                    <span className="max-w-28 truncate">{displayName.split(' ')[0]}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${userDropdown.open ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {userDropdown.open && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-black/10 overflow-hidden"
                      >
                        {/* User info header */}
                        <div className="px-4 py-3 bg-black/[0.02] border-b border-black/10">
                          <p className="text-sm font-semibold text-black truncate">{displayName}</p>
                          <p className="text-xs text-black/50 mt-0.5 truncate">{user?.email}</p>
                          {isAdmin && (
                            <span className="inline-block mt-1.5 text-xs font-medium bg-black text-white px-2 py-0.5 rounded-full">
                              Instructor
                            </span>
                          )}
                        </div>

                        <div className="py-1.5">
                          {isAdmin ? (
                            <Link
                              to="/instructor/dashboard"
                              onClick={close}
                              className="flex items-center gap-2.5 px-4 py-2 text-sm text-black/70 hover:bg-black/5 transition-colors"
                            >
                              <GraduationCap className="w-4 h-4" />
                              Instructor Dashboard
                            </Link>
                          ) : (
                            <>
                              <Link
                                to="/profile"
                                onClick={close}
                                className="flex items-center gap-2.5 px-4 py-2 text-sm text-black/70 hover:bg-black/5 transition-colors"
                              >
                                <User className="w-4 h-4" />
                                Profile
                              </Link>
                              <Link
                                to="/my-purchases"
                                onClick={close}
                                className="flex items-center gap-2.5 px-4 py-2 text-sm text-black/70 hover:bg-black/5 transition-colors"
                              >
                                <BookOpen className="w-4 h-4" />
                                My Courses
                              </Link>
                            </>
                          )}
                          <div className="border-t border-black/10 my-1" />
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-black/70 hover:bg-black/5 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                {/* Login dropdown */}
                <div ref={loginDropdown.ref} className="relative">
                  <button
                    onClick={() => {
                      loginDropdown.setOpen((o) => !o);
                      signupDropdown.setOpen(false);
                    }}
                    className="flex items-center gap-1 px-4 py-2 text-black/70 hover:text-black hover:bg-black/5 rounded-lg transition-colors text-sm font-medium"
                  >
                    Login
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${loginDropdown.open ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {loginDropdown.open && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-black/10 overflow-hidden"
                      >
                        <div className="p-1.5">
                          <p className="px-3 py-1.5 text-xs font-medium text-black/40 uppercase tracking-wide">Sign in as</p>
                          <Link
                            to="/login"
                            onClick={close}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-black/80 hover:bg-black/5 transition-colors font-medium"
                          >
                            <div className="w-7 h-7 rounded-lg bg-black/5 flex items-center justify-center shrink-0">
                              <User className="w-3.5 h-3.5 text-black/60" />
                            </div>
                            Login as User
                          </Link>
                          <Link
                            to="/instructor/login"
                            onClick={close}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-black/80 hover:bg-black/5 transition-colors font-medium"
                          >
                            <div className="w-7 h-7 rounded-lg bg-black/5 flex items-center justify-center shrink-0">
                              <GraduationCap className="w-3.5 h-3.5 text-black/60" />
                            </div>
                            Login as Instructor
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Sign Up dropdown */}
                <div ref={signupDropdown.ref} className="relative ml-1">
                  <button
                    onClick={() => {
                      signupDropdown.setOpen((o) => !o);
                      loginDropdown.setOpen(false);
                    }}
                    className="flex items-center gap-1 px-5 py-2.5 bg-black text-white rounded-lg text-sm font-semibold hover:bg-black/90 transition-colors shadow-sm"
                  >
                    Sign Up
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${signupDropdown.open ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {signupDropdown.open && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-black/10 overflow-hidden"
                      >
                        <div className="p-1.5">
                          <p className="px-3 py-1.5 text-xs font-medium text-black/40 uppercase tracking-wide">Create account as</p>
                          <Link
                            to="/signup"
                            onClick={close}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-black/80 hover:bg-black/5 transition-colors font-medium"
                          >
                            <div className="w-7 h-7 rounded-lg bg-black/5 flex items-center justify-center shrink-0">
                              <User className="w-3.5 h-3.5 text-black/60" />
                            </div>
                            Sign Up as User
                          </Link>
                          <Link
                            to="/instructor/signup"
                            onClick={close}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-black/80 hover:bg-black/5 transition-colors font-medium"
                          >
                            <div className="w-7 h-7 rounded-lg bg-black/5 flex items-center justify-center shrink-0">
                              <GraduationCap className="w-3.5 h-3.5 text-black/60" />
                            </div>
                            Sign Up as Instructor
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="p-2 text-black/70 hover:text-black hover:bg-black/5 rounded-lg transition-colors"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-black/10"
            >
              <div className="py-3 space-y-0.5">
                <Link
                  to="/#courses"
                  onClick={close}
                  className="block px-4 py-3 text-black/70 hover:text-black hover:bg-black/5 rounded-lg transition-colors text-sm font-medium"
                >
                  Courses
                </Link>

                {isAuthenticated ? (
                  <>
                    {/* User info strip */}
                    <div className="mx-2 my-1 px-3 py-2.5 bg-black/[0.03] rounded-xl flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white text-sm font-semibold shrink-0">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-black truncate">{displayName}</p>
                        {isAdmin && (
                          <p className="text-xs text-black/50 font-medium">Instructor</p>
                        )}
                      </div>
                    </div>

                    {isAdmin ? (
                      <Link
                        to="/instructor/dashboard"
                        onClick={close}
                        className="block px-4 py-3 text-black/70 hover:text-black hover:bg-black/5 rounded-lg transition-colors text-sm font-medium"
                      >
                        Instructor Dashboard
                      </Link>
                    ) : (
                      <>
                        <Link
                          to="/my-purchases"
                          onClick={close}
                          className="block px-4 py-3 text-black/70 hover:text-black hover:bg-black/5 rounded-lg transition-colors text-sm font-medium"
                        >
                          My Courses
                        </Link>
                        <Link
                          to="/profile"
                          onClick={close}
                          className="block px-4 py-3 text-black/70 hover:text-black hover:bg-black/5 rounded-lg transition-colors text-sm font-medium"
                        >
                          Profile
                        </Link>
                      </>
                    )}

                    <div className="mx-2 my-1 h-px bg-black/10" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-black/70 hover:text-black hover:bg-black/5 rounded-lg transition-colors text-sm font-medium flex items-center gap-2.5"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    {/* Mobile role-separated options */}
                    <div className="mx-2 my-1 p-1 bg-black/[0.02] rounded-xl">
                      <p className="px-3 py-1.5 text-xs font-medium text-black/40 uppercase tracking-wide">Login</p>
                      <Link
                        to="/login"
                        onClick={close}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-black/80 hover:bg-white transition-colors font-medium"
                      >
                        <User className="w-4 h-4 text-black/40 shrink-0" />
                        Login as User
                      </Link>
                      <Link
                        to="/instructor/login"
                        onClick={close}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-black/80 hover:bg-white transition-colors font-medium"
                      >
                        <GraduationCap className="w-4 h-4 text-black/40 shrink-0" />
                        Login as Instructor
                      </Link>
                    </div>

                    <div className="mx-2 my-1 p-1 bg-black/[0.02] rounded-xl">
                      <p className="px-3 py-1.5 text-xs font-medium text-black/40 uppercase tracking-wide">Sign Up</p>
                      <Link
                        to="/signup"
                        onClick={close}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-black/80 hover:bg-white transition-colors font-medium"
                      >
                        <User className="w-4 h-4 text-black/40 shrink-0" />
                        Sign Up as User
                      </Link>
                      <Link
                        to="/instructor/signup"
                        onClick={close}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-black/80 hover:bg-white transition-colors font-medium"
                      >
                        <GraduationCap className="w-4 h-4 text-black/40 shrink-0" />
                        Sign Up as Instructor
                      </Link>
                    </div>
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
