import { motion } from 'framer-motion';

export const CourseCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-black/10 overflow-hidden">
      {/* Image Skeleton */}
      <div className="h-48 bg-black/5 animate-pulse" />
      
      {/* Content Skeleton */}
      <div className="p-6 space-y-4">
        <div className="h-6 bg-black/5 rounded animate-pulse w-3/4" />
        <div className="space-y-2">
          <div className="h-4 bg-black/5 rounded animate-pulse" />
          <div className="h-4 bg-black/5 rounded animate-pulse w-5/6" />
        </div>
        <div className="flex items-center gap-3 pt-4">
          <div className="w-8 h-8 rounded-full bg-black/5 animate-pulse" />
          <div className="h-4 bg-black/5 rounded animate-pulse w-24" />
        </div>
        <div className="flex items-center justify-between pt-4">
          <div className="h-8 bg-black/5 rounded animate-pulse w-20" />
          <div className="h-10 bg-black/5 rounded-lg animate-pulse w-28" />
        </div>
      </div>
    </div>
  );
};

export const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
  };

  return (
    <div
      className={`${sizeClasses[size]} border-black border-t-transparent rounded-full animate-spin ${className}`}
    />
  );
};

export const EmptyState = ({ title, description, action }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16 px-4"
    >
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-black/5 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-black/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-black mb-2">{title}</h3>
        <p className="text-black/70 mb-6">{description}</p>
        {action && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={action.onClick}
            className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-black/90 transition-colors shadow-sm"
          >
            {action.label}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export const ErrorState = ({ title, description, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16 px-4"
    >
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-black mb-2">
          {title || 'Something went wrong'}
        </h3>
        <p className="text-black/70 mb-6">
          {description || 'We encountered an error loading this content.'}
        </p>
        {onRetry && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRetry}
            className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-black/90 transition-colors shadow-sm"
          >
            Try Again
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};
