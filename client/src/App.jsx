import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyPurchases from './pages/MyPurchases';
import CourseDetail from './pages/CourseDetail';
import UserProfile from './pages/UserProfile';
import AdminLogin from './pages/admin/AdminLogin';
import AdminSignup from './pages/admin/AdminSignup';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateCourse from './pages/admin/CreateCourse';
import EditCourse from './pages/admin/EditCourse';
import ProtectedRoute from './components/ProtectedRoute';

// Main site layout (with Navbar + Footer)
const MainLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 pt-16">{children}</main>
    <Footer />
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); }, [pathname]);
  return null;
};

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Instructor routes — use their own topbar */}
            <Route path="/instructor/login" element={<AdminLogin />} />
            <Route path="/instructor/signup" element={<AdminSignup />} />
            <Route
              path="/instructor/dashboard"
              element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/instructor/courses/create"
              element={
                <ProtectedRoute adminOnly>
                  <CreateCourse />
                </ProtectedRoute>
              }
            />
            <Route
              path="/instructor/courses/edit/:id"
              element={
                <ProtectedRoute adminOnly>
                  <EditCourse />
                </ProtectedRoute>
              }
            />

            {/* User routes — wrapped in Navbar + Footer */}
            <Route
              path="/"
              element={
                <MainLayout>
                  <Home />
                </MainLayout>
              }
            />
            <Route
              path="/login"
              element={
                <MainLayout>
                  <Login />
                </MainLayout>
              }
            />
            <Route
              path="/signup"
              element={
                <MainLayout>
                  <Signup />
                </MainLayout>
              }
            />
            <Route
              path="/courses/:id"
              element={
                <MainLayout>
                  <CourseDetail />
                </MainLayout>
              }
            />
            <Route
              path="/my-purchases"
              element={
                <MainLayout>
                  <ProtectedRoute>
                    <MyPurchases />
                  </ProtectedRoute>
                </MainLayout>
              }
            />
            <Route
              path="/profile"
              element={
                <MainLayout>
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                </MainLayout>
              }
            />
          </Routes>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
