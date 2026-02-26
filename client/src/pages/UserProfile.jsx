import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Mail, BookOpen, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { coursesAPI } from '../api/apiClient';

const UserProfile = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchased = async () => {
      try {
        const data = await coursesAPI.getPurchased();
        setCourses(data.courses || data);
      } catch {
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPurchased();
  }, []);

  const initials =
    user?.firstName && user?.lastName
      ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
      : user?.firstName
      ? user.firstName[0].toUpperCase()
      : '?';

  return (
    <div className="min-h-screen bg-white pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-black/10 p-8 mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-6"
        >
          {/* Avatar */}
          <div className="w-20 h-20 rounded-2xl bg-black flex items-center justify-center text-white text-2xl font-bold shrink-0">
            {initials}
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-black">
              {user?.firstName && user?.lastName
                ? `${user.firstName} ${user.lastName}`
                : user?.firstName || 'User'}
            </h1>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-black/60 text-sm mt-1">
              <Mail className="w-4 h-4" />
              {user?.email || '—'}
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-4 mt-4">
              <div className="text-center sm:text-left">
                <p className="text-2xl font-bold text-black">{courses.length}</p>
                <p className="text-xs text-black/50 font-medium">Courses Enrolled</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard icon={<BookOpen className="w-5 h-5" />} label="Courses Enrolled" value={courses.length} />
          <StatCard icon={<Award className="w-5 h-5" />} label="Certificates" value={0} />
          <StatCard icon={<User className="w-5 h-5" />} label="Account Type" value={user?.role === 'admin' ? 'Admin' : 'Learner'} />
        </div>

        {/* Enrolled Courses */}
        <div className="bg-white rounded-2xl border border-black/10 overflow-hidden">
          <div className="px-6 py-4 border-b border-black/10 flex items-center justify-between">
            <h2 className="font-semibold text-black">Enrolled Courses</h2>
            <Link to="/my-purchases" className="text-sm text-black/60 hover:text-black transition-colors">
              View All
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-12 px-4">
              <BookOpen className="w-10 h-10 text-black/20 mx-auto mb-3" />
              <p className="text-black/50 font-medium text-sm">No courses yet</p>
              <Link
                to="/"
                className="inline-block mt-3 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-black/85 transition-colors"
              >
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-black/5">
              {courses.slice(0, 5).map((course, i) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 px-6 py-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-black/5 overflow-hidden shrink-0">
                    {course.image_url ? (
                      <img src={course.image_url} alt={course.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-black/30" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-black text-sm truncate">{course.title}</p>
                    <p className="text-xs text-black/50 mt-0.5 truncate">{course.description}</p>
                  </div>
                  <span className="shrink-0 text-xs px-2.5 py-1 bg-green-50 text-green-700 rounded-full font-medium border border-green-200">
                    Enrolled
                  </span>
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
  <div className="bg-white rounded-xl border border-black/10 px-5 py-4 flex items-center gap-3">
    <div className="w-9 h-9 rounded-lg bg-black/5 flex items-center justify-center text-black/60 shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-xs text-black/50 font-medium">{label}</p>
      <p className="text-xl font-bold text-black">{value}</p>
    </div>
  </div>
);

export default UserProfile;
