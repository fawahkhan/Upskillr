import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const CourseCard = ({ course, index = 0, onEnroll }) => {
  const { isAuthenticated } = useAuth();
  const [imageError, setImageError] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      window.location.href = '#signup';
      return;
    }

    setIsEnrolling(true);
    try {
      await onEnroll?.(course._id);
    } catch (error) {
      console.error('Enrollment failed:', error);
    } finally {
      setIsEnrolling(false);
    }
  };

  // Fallback background if thumbnail fails or doesn't exist
  const fallbackBg = 'bg-black/5';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group h-full"
    >
      <div className="h-full bg-white rounded-xl border border-black/10 overflow-hidden hover:border-black/20 hover:shadow-lg transition-all duration-300">
        {/* Course Thumbnail */}
        <div className="relative h-44 overflow-hidden bg-black/5">
          {course.image_url && !imageError ? (
            <img
              src={course.image_url}
              alt={course.title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className={`w-full h-full ${fallbackBg}`} />
          )}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Course Content */}
        <div className="p-5">
          {/* Title */}
          <h3 className="text-lg font-semibold text-black mb-2.5 line-clamp-2 leading-snug group-hover:text-black/70 transition-colors duration-200">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-black/60 text-sm mb-6 line-clamp-2 leading-relaxed">
            {course.description}
          </p>

          {/* Price & CTA */}
          <div className="flex items-center justify-between gap-3 pt-5 border-t border-black/10">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-black">₹{course.price}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleEnroll}
              disabled={isEnrolling}
              className="px-5 py-2.5 bg-black text-white rounded-lg text-sm font-medium hover:bg-black/90 active:bg-black/80 transition-colors shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isEnrolling ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Enrolling...</span>
                </>
              ) : (
                <>
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Enroll</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
