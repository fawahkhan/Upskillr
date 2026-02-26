import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, ShoppingCart, CheckCircle } from 'lucide-react';
import { coursesAPI } from '../api/apiClient';
import { useAuth } from '../context/AuthContext';
import PaymentModal from '../components/PaymentModal';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await coursesAPI.getPreview();
        const found = (data.courses || data).find((c) => c._id === id);
        if (found) setCourse(found);
      } catch (err) {
        console.error('Failed to load course', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  // Check if already purchased
  useEffect(() => {
    if (!isAuthenticated) return;
    const checkPurchased = async () => {
      try {
        const data = await coursesAPI.getPurchased();
        const list = data.courses || data;
        if (list.some((c) => c._id === id)) setPurchased(true);
      } catch {
        // ignore
      }
    };
    checkPurchased();
  }, [id, isAuthenticated]);

  const handleEnroll = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setShowPayment(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-black/20 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-lg text-black/60">Course not found.</p>
        <Link to="/" className="text-black font-medium underline text-sm">Back to Home</Link>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Hero */}
        <div className="bg-black text-white py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All Courses
            </Link>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Left */}
              <div className="lg:col-span-2">
                <motion.h1
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white/100 text-3xl sm:text-4xl font-bold mb-4 leading-tight"
                >
                  {course.title}
                </motion.h1>
                <p className="text-white/70 text-lg leading-relaxed">{course.description}</p>
              </div>

              {/* Right - Mobile price card placeholder */}
              <div className="hidden lg:block" />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left - Course Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* What you'll learn */}
              <section>
                <h2 className="text-xl font-bold text-black mb-4">What you'll learn</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Hands-on projects and exercises',
                    'In-depth video lectures',
                    'Downloadable resources',
                    'Lifetime access to content',
                    'Certificate of completion',
                    'Community support',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-sm text-black/70">
                      <CheckCircle className="w-4 h-4 text-black mt-0.5 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </section>

              {/* Description */}
              <section>
                <h2 className="text-xl font-bold text-black mb-3">About this course</h2>
                <p className="text-black/70 leading-relaxed">{course.description}</p>
              </section>
            </div>

            {/* Right - Purchase Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-2xl border border-black/15 shadow-xl overflow-hidden"
                >
                  {/* Thumbnail */}
                  <div className="h-44 bg-black/5 overflow-hidden">
                    {course.image_url ? (
                      <img
                        src={course.image_url}
                        alt={course.title}
                        className="w-full h-full object-cover"
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-black/20" />
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="text-3xl font-bold text-black mb-5">₹{course.price}</div>

                    {purchased ? (
                      <div className="flex items-center gap-2 justify-center py-3 bg-green-50 border border-green-200 rounded-xl text-green-700 font-medium text-sm">
                        <CheckCircle className="w-4 h-4" />
                        Already Enrolled
                      </div>
                    ) : (
                      <motion.button
                        onClick={handleEnroll}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3.5 bg-black text-white rounded-xl font-semibold text-sm hover:bg-black/90 transition-colors flex items-center justify-center gap-2 shadow-sm"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        {isAuthenticated ? 'Enroll Now' : 'Login to Enroll'}
                      </motion.button>
                    )}

                    <ul className="mt-5 space-y-2 text-sm text-black/60">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-black/40 shrink-0" />
                        Full lifetime access
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-black/40 shrink-0" />
                        Access on mobile & desktop
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-black/40 shrink-0" />
                        Certificate of completion
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPayment && (
        <PaymentModal
          course={course}
          onClose={() => setShowPayment(false)}
          onSuccess={() => setPurchased(true)}
        />
      )}
    </>
  );
};

export default CourseDetail;
