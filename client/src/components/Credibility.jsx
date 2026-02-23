import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const Credibility = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Jessica Park',
      role: 'Software Engineer at Google',
      content: 'The courses are incredibly well-structured and practical. I landed my dream job just three months after completing the Full-Stack program.',
      avatar: 'JP'
    },
    {
      id: 2,
      name: 'Marcus Thompson',
      role: 'Product Designer at Airbnb',
      content: 'UpSkillr transformed my career. The UI/UX course gave me the confidence and skills to transition from marketing to design.',
      avatar: 'MT'
    },
    {
      id: 3,
      name: 'Priya Sharma',
      role: 'Data Scientist at Meta',
      content: 'Outstanding instructors and real-world projects. The Data Science program prepared me perfectly for the industry challenges.',
      avatar: 'PS'
    }
  ];

  const instructors = [
    { name: 'Sarah Chen', expertise: 'Web Development', students: '12k+', avatar: 'SC' },
    { name: 'Michael Brown', expertise: 'UI/UX Design', students: '8k+', avatar: 'MB' },
    { name: 'Dr. Emily Wang', expertise: 'Data Science', students: '15k+', avatar: 'EW' },
    { name: 'James Miller', expertise: 'Marketing', students: '6k+', avatar: 'JM' }
  ];

  return (
    <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Testimonials Section */}
        <div className="mb-24 lg:mb-32">
          <div className="text-center mb-16 lg:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-5 tracking-tight">
                Trusted by Professionals
              </h2>
              <p className="text-lg sm:text-xl text-black/70 max-w-2xl mx-auto leading-relaxed">
                Join thousands of learners who have transformed their careers with UpSkillr.
              </p>
            </motion.div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="group bg-white rounded-xl p-7 lg:p-8 border border-black/10 shadow-sm hover:shadow-lg hover:border-black/20 transition-all duration-300"
              >
                <Quote className="w-8 h-8 text-black/40 mb-5" strokeWidth={1.5} />
                <p className="text-black/70 mb-7 leading-relaxed text-[15px]">
                  {testimonial.content}
                </p>
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-black flex items-center justify-center text-white font-semibold shadow-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-black text-[15px]">{testimonial.name}</div>
                    <div className="text-sm text-black/60">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Instructors Section */}
        <div>
          <div className="text-center mb-14 lg:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 tracking-tight">
                Learn from the Best
              </h2>
              <p className="text-lg text-black/70 max-w-2xl mx-auto leading-relaxed">
                Our expert instructors bring years of industry experience to every course.
              </p>
            </motion.div>
          </div>

          {/* Instructors Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 lg:gap-6">
            {instructors.map((instructor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.06, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="bg-white rounded-xl p-6 lg:p-7 border border-black/10 text-center hover:border-black/20 hover:shadow-md transition-all duration-300"
              >
                <div className="w-16 h-16 lg:w-18 lg:h-18 rounded-full bg-black flex items-center justify-center text-white text-xl font-semibold mx-auto mb-4 shadow-sm">
                  {instructor.avatar}
                </div>
                <h3 className="font-semibold text-black mb-1.5 text-[15px]">{instructor.name}</h3>
                <p className="text-sm text-black/60 mb-2">{instructor.expertise}</p>
                <p className="text-xs text-black font-semibold">{instructor.students} students</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Credibility;
