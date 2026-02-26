import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit2, BookOpen, DollarSign, Layers, LogOut } from 'lucide-react';
import { adminCoursesAPI } from '../../api/apiClient';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { logout } = useAuth();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await adminCoursesAPI.getBulk();
      setCourses(data.courses || []);
    } catch (err) {
      addToast(err.response?.data?.msg || 'Failed to load courses', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/instructor/login');
  };

  const totalRevenue = courses.reduce((sum, c) => sum + Number(c.price || 0), 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Admin Topbar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-black text-white h-16 flex items-center px-6 justify-between shadow">
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5" />
          <span className="font-bold text-lg">UpSkillr Instructor</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="pt-24 pb-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-black">Dashboard</h1>
            <p className="text-black/60 mt-1 text-sm">Manage your courses and content</p>
          </div>
          <Link
            to="/instructor/courses/create"
            className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-lg text-sm font-medium hover:bg-black/85 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            New Course
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <StatCard icon={<Layers className="w-5 h-5" />} label="Total Courses" value={courses.length} />
          <StatCard icon={<BookOpen className="w-5 h-5" />} label="Published" value={courses.length} />
          <StatCard
            icon={<DollarSign className="w-5 h-5" />}
            label="Combined Price"
            value={`₹${totalRevenue.toLocaleString()}`}
          />
        </div>

        {/* Courses Table */}
        <div className="bg-white rounded-2xl border border-black/10 overflow-hidden">
          <div className="px-6 py-4 border-b border-black/10 flex items-center justify-between">
            <h2 className="font-semibold text-black">Your Courses</h2>
            <span className="text-sm text-black/50">{courses.length} course{courses.length !== 1 ? 's' : ''}</span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-16 px-4">
              <BookOpen className="w-12 h-12 text-black/20 mx-auto mb-3" />
              <p className="text-black/50 font-medium">No courses yet</p>
              <p className="text-black/40 text-sm mt-1">Create your first course to get started</p>
            </div>
          ) : (
            <div className="divide-y divide-black/5">
              {courses.map((course, i) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-black/[0.02] transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="w-14 h-14 rounded-lg bg-black/5 overflow-hidden shrink-0">
                    {course.image_url ? (
                      <img src={course.image_url} alt={course.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-black/30" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-black truncate">{course.title}</p>
                    <p className="text-sm text-black/50 truncate mt-0.5">{course.description}</p>
                  </div>

                  {/* Price */}
                  <div className="shrink-0 text-right">
                    <span className="font-semibold text-black">₹{course.price}</span>
                  </div>

                  {/* Edit */}
                  <Link
                    to={`/instructor/courses/edit/${course._id}`}
                    state={{ course }}
                    className="shrink-0 p-2 rounded-lg hover:bg-black/10 transition-colors text-black/60 hover:text-black"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white rounded-xl border border-black/10 px-6 py-5 flex items-center gap-4">
    <div className="w-10 h-10 rounded-lg bg-black/5 flex items-center justify-center text-black/70 shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-sm text-black/50 font-medium">{label}</p>
      <p className="text-2xl font-bold text-black mt-0.5">{value}</p>
    </div>
  </div>
);

export default AdminDashboard;
