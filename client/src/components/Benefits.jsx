import { motion } from 'framer-motion';
import { Award, BookOpen, Infinity, TrendingUp } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: BookOpen,
      title: 'Expert-Led Curriculum',
      description: 'Learn from industry professionals with years of real-world experience and proven track records.'
    },
    {
      icon: Infinity,
      title: 'Lifetime Access',
      description: 'Access your courses anytime, anywhere. Learn at your own pace with no expiration dates.'
    },
    {
      icon: Award,
      title: 'Verified Certificates',
      description: 'Earn recognized certificates upon completion to showcase your new skills to employers.'
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Advance your career with in-demand skills that companies are actively seeking.'
    }
  ];

  const stats = [
    { value: '500+', label: 'Courses Available' },
    { value: '10k+', label: 'Active Learners' },
    { value: '95%', label: 'Satisfaction Rate' },
    { value: '50+', label: 'Expert Instructors' }
  ];

  return (
    <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white">
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
              Why Choose UpSkillr
            </h2>
            <p className="text-lg sm:text-xl text-black/70 max-w-2xl mx-auto leading-relaxed">
              We provide everything you need to master new skills and achieve your goals.
            </p>
          </motion.div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-20 lg:mb-24">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="group relative"
              >
                <div className="relative h-full">
                  {/* Icon Container */}
                  <div className="w-14 h-14 rounded-xl bg-black/5 flex items-center justify-center mb-5 group-hover:bg-black group-hover:shadow-lg transition-all duration-300">
                    <Icon className="w-7 h-7 text-black group-hover:text-white transition-colors duration-300" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-black mb-3 leading-snug">
                    {benefit.title}
                  </h3>
                  <p className="text-black/60 leading-relaxed text-[15px]">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 p-10 lg:p-12 bg-black/5 rounded-2xl border border-black/10 backdrop-blur-sm">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold text-black mb-2">
                  {stat.value}
                </div>
                <div className="text-black/70 text-sm lg:text-base font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;
