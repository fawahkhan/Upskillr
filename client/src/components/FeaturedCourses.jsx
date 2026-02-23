import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import CourseCard from './CourseCard';
import { CourseCardSkeleton, ErrorState } from './common/LoadingStates';
import { coursesAPI } from '../api/apiClient';

const FeaturedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await coursesAPI.getPreview();
      setCourses(data.courses || data);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
      setError(err.response?.data?.message || 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      await coursesAPI.purchase(courseId);
      // Handle success (e.g., show toast, redirect to course)
      console.log('Enrolled successfully');
    } catch (error) {
      console.error('Enrollment failed:', error);
      throw error;
    }
  };

  return (
    <section id="courses" className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-5 tracking-tight">
              Featured Courses
            </h2>
            <p className="text-lg sm:text-xl text-black/70 max-w-2xl mx-auto leading-relaxed">
              Handpicked courses from industry experts. Start learning and transform your career.
            </p>
          </motion.div>
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[...Array(6)].map((_, index) => (
              <CourseCardSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <ErrorState
            title="Failed to Load Courses"
            description={error}
            onRetry={fetchCourses}
          />
        ) : courses.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-black/70">No courses available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {courses.map((course, index) => (
              <CourseCard
                key={course._id}
                course={course}
                index={index}
                onEnroll={handleEnroll}
              />
            ))}
          </div>
        )}

        {/* View All Button */}
        {!loading && !error && courses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-14"
          >
            <motion.a
              href="#all-courses"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center px-8 py-4 bg-white text-black rounded-xl font-medium hover:bg-black/5 transition-all duration-200 border border-black/20 shadow-sm hover:shadow-md hover:border-black/30"
            >
              View All Courses
            </motion.a>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCourses;
