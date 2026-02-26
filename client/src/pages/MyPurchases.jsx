import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { coursesAPI } from '../api/apiClient';
import CourseCard from '../components/CourseCard';
import { CourseCardSkeleton, ErrorState, EmptyState } from '../components/common/LoadingStates';

const MyPurchases = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await coursesAPI.getPurchased();
        setCourses(data.courses || data);
      } catch (err) {
        console.error('Failed to fetch purchased courses:', err);
        setError(err.response?.data?.message || 'Failed to load your courses');
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedCourses();
  }, []);

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-black mb-3">My Courses</h1>
          <p className="text-lg text-black/70">Continue your learning journey</p>
        </motion.div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <ErrorState description={error} onRetry={() => window.location.reload()} />
        ) : courses.length === 0 ? (
          <EmptyState
            title="No courses yet"
            description="You haven't purchased any courses. Browse our catalog to get started!"
            action={{ label: 'Browse Courses', onClick: () => window.location.href = '/' }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <CourseCard key={course._id} course={course} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPurchases;
