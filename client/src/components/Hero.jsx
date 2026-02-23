import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-28 pb-24 lg:pt-36 lg:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">

      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white backdrop-blur-sm border border-black/20 rounded-full shadow-sm mb-8 lg:mb-10"
          >
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
              <span className="text-sm font-medium text-black">
                Join 10,000+ learners building their future
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-7xl text-black mb-7 lg:mb-10 tracking-tight leading-[1.1] text-balance"
          >
            Master skills that{' '}
            <span className="text-black">
              matter
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-lg sm:text-xl lg:text-2xl text-black/70 mb-10 lg:mb-15 max-w-3xl mx-auto leading-relaxed"
          >
            Build expertise with world-class instructors. Learn at your own pace with 
            hands-on projects and real-world applications.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 lg:mb-20"
          >
            <motion.a
              href="#courses"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group px-8 py-4 lg:px-9 lg:py-5 bg-black text-white rounded-xl font-semibold hover:bg-black/90 active:bg-black/80 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2.5 w-full sm:w-auto justify-center text-base lg:text-lg"
            >
              Explore Courses
              <ArrowRight className="w-5 h-5 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.a>
            
            <motion.a
              href="#how-it-works"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group px-8 py-4 lg:px-9 lg:py-5 bg-white text-black rounded-xl font-semibold hover:bg-black/5 transition-all duration-200 border border-black/20 shadow-sm hover:shadow-md hover:border-black/30 w-full sm:w-auto text-center flex items-center gap-2.5 justify-center text-base lg:text-lg"
            >
              <Play className="w-4 h-4 lg:w-4 lg:h-4" />
              See How It Works
            </motion.a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 lg:gap-8 text-sm text-black/70"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-black" />
              <span className="font-medium">500+ courses</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-black" />
              <span className="font-medium">Expert instructors</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-black" />
              <span className="font-medium">Lifetime access</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
