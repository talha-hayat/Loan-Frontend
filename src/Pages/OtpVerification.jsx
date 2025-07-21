import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem('emailForOtp');
  const [loading, setLoading] = useState(false);

  // Hold individual OTP digits
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);

  // Refs for inputs
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, ''); // Only digits
    if (!value) return;

    const newOtp = [...otpDigits];
    newOtp[index] = value;
    setOtpDigits(newOtp);

    // Move to next input if exists
    if (index < 5 && value) {
      inputsRef.current[index + 1]?.focus();
    }

    // Auto-submit if last digit entered
    if (index === 5) {
      verifyOtp(newOtp.join(''));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otpDigits[index]) {
        // Clear this box
        const newOtp = [...otpDigits];
        newOtp[index] = '';
        setOtpDigits(newOtp);
      } else if (index > 0) {
        // Move to previous box
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const verifyOtp = async (otpValue) => {
    if (!email) {
      alert("Email not found. Please login again.");
      navigate('/login');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}api/verify-otp`, {
        email,
        otp: otpValue
      });

      if (response.status === 201) {
        localStorage.removeItem('emailForOtp');
        navigate('/login');
      } else {
        alert("Verification failed. Please try again.");
      }

    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert(error.response?.data?.message || "Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otpDigits.join('');
    if (otpValue.length === 6) {
      verifyOtp(otpValue);
    } else {
      alert("Please enter a 6-digit OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-blue-50">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-10 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-100 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
        
        <h2 className="text-4xl font-extrabold text-green-700 mb-2 text-center">OTP Verification</h2>
        <p className="text-center text-gray-500 mb-8">
          We have sent a 6-digit OTP to your email
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 text-center">Enter OTP</label>
            
            <div className="flex justify-center space-x-3">
              {otpDigits.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  disabled={loading}
                  value={digit}
                  ref={(el) => (inputsRef.current[index] = el)}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500 transition"
                />
              ))}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </div>
        </form>

        {/* <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Didn’t receive the code?{" "}
            <span
              onClick={() => alert("Resend OTP functionality not implemented yet")}
              className="text-green-700 font-bold underline hover:text-green-900 cursor-pointer"
            >
              Resend OTP
            </span>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default OtpVerification;
