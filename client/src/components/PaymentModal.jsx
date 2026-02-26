import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Lock, CheckCircle } from 'lucide-react';
import { coursesAPI } from '../api/apiClient';
import { useToast } from '../context/ToastContext';

const PaymentModal = ({ course, onClose, onSuccess }) => {
  const { addToast } = useToast();
  const [step, setStep] = useState('details'); // 'details' | 'processing' | 'success'
  const [payMethod, setPayMethod] = useState('card');
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [upiId, setUpiId] = useState('');

  const handleCardChange = (e) => {
    let { name, value } = e.target;
    if (name === 'number') value = value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
    if (name === 'expiry') {
      value = value.replace(/\D/g, '').slice(0, 4);
      if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
    }
    if (name === 'cvv') value = value.replace(/\D/g, '').slice(0, 3);
    setCardData({ ...cardData, [name]: value });
  };

  const handlePay = async () => {
    setStep('processing');
    try {
      await coursesAPI.purchase(course._id);
      setStep('success');
      addToast('Payment successful! Course enrolled.', 'success');
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 2000);
    } catch (err) {
      const msg = err.response?.data?.msg || 'Payment failed. Please try again.';
      addToast(msg, 'error');
      setStep('details');
    }
  };

  const isCardValid =
    payMethod === 'card'
      ? cardData.number.replace(/\s/g, '').length === 16 && cardData.expiry.length === 5 && cardData.cvv.length === 3 && cardData.name.length > 2
      : upiId.includes('@') && upiId.length > 4;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={step !== 'processing' ? onClose : undefined}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.2 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        >
          {/* Success State */}
          {step === 'success' && (
            <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              </motion.div>
              <h2 className="text-2xl font-bold text-black mb-2">Payment Successful!</h2>
              <p className="text-black/60">You now have access to <span className="font-medium text-black">{course.title}</span>.</p>
            </div>
          )}

          {/* Processing State */}
          {step === 'processing' && (
            <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
              <div className="w-14 h-14 border-4 border-black/10 border-t-black rounded-full animate-spin mx-auto mb-4" />
              <h2 className="text-xl font-bold text-black mb-2">Processing Payment</h2>
              <p className="text-black/60 text-sm">Please wait, do not close this window...</p>
            </div>
          )}

          {/* Details State */}
          {step === 'details' && (
            <>
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-black/50" />
                  <span className="font-semibold text-black">Secure Checkout</span>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-black/10 transition-colors text-black/50 hover:text-black"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Course Summary */}
              <div className="px-6 py-4 bg-black/[0.02] border-b border-black/10 flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-black/5 overflow-hidden shrink-0">
                  {course.image_url ? (
                    <img src={course.image_url} alt={course.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-black/30">
                      <CreditCard className="w-5 h-5" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-black text-sm truncate">{course.title}</p>
                  <p className="text-black/50 text-xs mt-0.5">Lifetime Access</p>
                </div>
                <div className="text-xl font-bold text-black shrink-0">₹{course.price}</div>
              </div>

              {/* Payment Method Tabs */}
              <div className="px-6 pt-5">
                <div className="flex rounded-xl border border-black/15 overflow-hidden mb-5">
                  <button
                    onClick={() => setPayMethod('card')}
                    className={`flex-1 py-2.5 text-sm font-medium transition-colors ${payMethod === 'card' ? 'bg-black text-white' : 'text-black/60 hover:text-black'}`}
                  >
                    Card
                  </button>
                  <button
                    onClick={() => setPayMethod('upi')}
                    className={`flex-1 py-2.5 text-sm font-medium transition-colors ${payMethod === 'upi' ? 'bg-black text-white' : 'text-black/60 hover:text-black'}`}
                  >
                    UPI
                  </button>
                </div>

                {/* Card Form */}
                {payMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-black/60 mb-1.5">Card Number</label>
                      <input
                        name="number"
                        value={cardData.number}
                        onChange={handleCardChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-3.5 py-2.5 border border-black/20 rounded-lg text-sm focus:outline-none focus:border-black transition-colors font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-black/60 mb-1.5">Cardholder Name</label>
                      <input
                        name="name"
                        value={cardData.name}
                        onChange={handleCardChange}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 border border-black/20 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-black/60 mb-1.5">Expiry</label>
                        <input
                          name="expiry"
                          value={cardData.expiry}
                          onChange={handleCardChange}
                          placeholder="MM/YY"
                          className="w-full px-3.5 py-2.5 border border-black/20 rounded-lg text-sm focus:outline-none focus:border-black transition-colors font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-black/60 mb-1.5">CVV</label>
                        <input
                          name="cvv"
                          value={cardData.cvv}
                          onChange={handleCardChange}
                          placeholder="•••"
                          type="password"
                          className="w-full px-3.5 py-2.5 border border-black/20 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* UPI Form */}
                {payMethod === 'upi' && (
                  <div>
                    <label className="block text-xs font-medium text-black/60 mb-1.5">UPI ID</label>
                    <input
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="yourname@paytm"
                      className="w-full px-3.5 py-2.5 border border-black/20 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
                    />
                    <p className="text-xs text-black/40 mt-2">Enter your UPI ID to pay via any UPI app</p>
                  </div>
                )}
              </div>

              {/* Pay Button */}
              <div className="px-6 py-5">
                <motion.button
                  onClick={handlePay}
                  disabled={!isCardValid}
                  whileHover={{ scale: isCardValid ? 1.02 : 1 }}
                  whileTap={{ scale: isCardValid ? 0.98 : 1 }}
                  className="w-full py-3.5 bg-black text-white rounded-xl font-semibold text-sm hover:bg-black/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Pay ₹{course.price}
                </motion.button>
                <p className="text-center text-xs text-black/40 mt-3">
                  <Lock className="inline w-3 h-3 mr-1" />
                  256-bit SSL encrypted payment
                </p>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PaymentModal;
