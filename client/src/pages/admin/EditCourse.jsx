import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { adminCoursesAPI } from '../../api/apiClient';
import { useToast } from '../../context/ToastContext';

const EditCourse = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const { addToast } = useToast();

  const initial = state?.course || {};
  const [form, setForm] = useState({
    title: initial.title || '',
    description: initial.description || '',
    image_url: initial.image_url || '',
    price: initial.price || '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminCoursesAPI.update(id, form);
      addToast('Course updated successfully!', 'success');
      navigate('/instructor/dashboard');
    } catch (err) {
      addToast(err.response?.data?.msg || 'Failed to update course', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <Link
          to="/instructor/dashboard"
          className="inline-flex items-center gap-2 text-sm text-black/60 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-black/10 p-8 shadow-sm"
        >
          <div className="mb-8">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-black">Edit Course</h1>
            <p className="text-black/60 text-sm mt-1 truncate">{initial.title}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <FormField
              label="Course Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Course title"
              required
            />
            <div>
              <label className="block text-sm font-medium text-black mb-2">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Course description..."
                className="w-full px-4 py-3 border border-black/20 rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black outline-none transition-colors resize-none text-sm"
              />
            </div>
            <FormField
              label="Thumbnail URL"
              name="image_url"
              type="url"
              value={form.image_url}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
            <FormField
              label="Price (₹)"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="999"
              required
              min="0"
            />

            {form.image_url && (
              <div>
                <p className="text-sm font-medium text-black/60 mb-2">Thumbnail Preview</p>
                <img
                  src={form.image_url}
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                  alt="preview"
                  className="h-32 rounded-lg object-cover border border-black/10"
                />
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Link
                to="/instructor/dashboard"
                className="flex-1 py-3 text-center border border-black/20 text-black rounded-lg text-sm font-medium hover:bg-black/5 transition-colors"
              >
                Cancel
              </Link>
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="flex-1 py-3 bg-black text-white rounded-lg text-sm font-semibold hover:bg-black/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

const FormField = ({ label, name, value, onChange, placeholder, type = 'text', required, min }) => (
  <div>
    <label className="block text-sm font-medium text-black mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      min={min}
      className="w-full px-4 py-3 border border-black/20 rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black outline-none transition-colors text-sm"
    />
  </div>
);

export default EditCourse;
