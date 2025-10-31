import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Eye, EyeOff, LogIn, ArrowRight } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    mobile: '',
    otp: ''
  });

  const [step, setStep] = useState(1); // 1: Mobile, 2: OTP
  const [showOtp, setShowOtp] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateMobile = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile.replace(/\s/g, ''))) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOtp = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.otp.trim()) {
      newErrors.otp = 'OTP is required';
    } else if (!/^\d{6}$/.test(formData.otp)) {
      newErrors.otp = 'Please enter a valid 6-digit OTP';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  interface FormData {
    mobile: string;
    otp: string;
  }

  interface Errors {
    mobile?: string;
    otp?: string;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({ ...prev, [name]: value }));
    if (errors[name as keyof Errors]) {
      setErrors((prev: Errors) => ({ ...prev, [name]: '' }));
    }
  };

  const sendOtp = async () => {
    console.log('Sending OTP to mobile:', formData.mobile);
    if (!validateMobile()) return;
    
    setIsLoading(true);
    try {
      const apiUrl = process.env.REACT_APP_API_BASE_URL_TO_SEND_OTP || '/default-send-otp-url';
      
      if (!apiUrl) {
        throw new Error('API base URL is not defined. Please check your environment variables.');
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile: formData.mobile }),
      });

      if (!response.ok) {
        throw new Error('Failed to send OTP. Please try again.');
      }

      const data = await response.json();
      console.log('OTP sent successfully:', data);
      setStep(2);
    } catch (error) {
      console.error(error);
      setErrors((prev) => ({ ...prev, mobile: (error as Error).message }));
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!validateOtp()) return;

    setIsLoading(true);
    try {
      const apiUrl = process.env.REACT_APP_API_BASE_URL_TO_VERIFY_OTP || '/default-verify-otp-url';
      if (!apiUrl) {
        throw new Error('API base URL is not defined. Please check your environment variables.');
      }
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile: formData.mobile, otp: formData.otp }),
      });

      if (!response.ok) {
        throw new Error('Invalid OTP. Please try again.');
      }

      const data = await response.json();
      console.log('OTP verified successfully:', data);
      window.location.href = '/courses';
    } catch (error) {
      console.error(error);
      setErrors((prev) => ({ ...prev, otp: (error as Error).message }));
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    setIsLoading(true);
    try {
      const apiUrl = process.env.REACT_APP_API_BASE_URL_TO_RESEND_OTP || '/default-resend-otp-url';
      if (!apiUrl) {
        throw new Error('API base URL is not defined. Please check your environment variables.');
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile: formData.mobile }),
      });

      if (!response.ok) {
        throw new Error('Failed to resend OTP. Please try again.');
      }

      const data = await response.json();
      console.log('OTP resent successfully:', data);
      setFormData((prev) => ({ ...prev, otp: '' }));
    } catch (error) {
      console.error(error);
      setErrors((prev) => ({ ...prev, otp: (error as Error).message }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 to-amber-50 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
              <LogIn className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-stone-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-stone-600">
              Sign in to access your account and continue learning
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-stone-100 p-8">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-stone-800 text-center mb-6">
                  Sign In to Your Account
                </h2>

                <div>
                  <label htmlFor="mobile" className="block text-sm font-semibold text-stone-700 mb-2">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 bg-stone-50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 ${
                        errors.mobile ? 'border-red-500 bg-red-50' : 'border-stone-200 focus:border-amber-300'
                      }`}
                      placeholder="Enter your mobile number"
                    />
                  </div>
                  {errors.mobile && (
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">!</span>
                      </div>
                      <p className="text-red-500 text-sm">{errors.mobile}</p>
                    </div>
                  )}
                </div>

                <button
                  onClick={sendOtp}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending OTP...</span>
                    </>
                  ) : (
                    <>
                      <span>Send OTP</span>
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-bold text-stone-800 mb-2">
                    Enter OTP
                  </h2>
                  <p className="text-stone-600 text-sm">
                    We've sent a 6-digit OTP to +91 {formData.mobile}
                  </p>
                </div>

                <div>
                  <label htmlFor="otp" className="block text-sm font-semibold text-stone-700 mb-2">
                    Enter OTP *
                  </label>
                  <div className="relative">
                    <input
                      type={showOtp ? 'text' : 'password'}
                      id="otp"
                      name="otp"
                      value={formData.otp}
                      onChange={handleInputChange}
                      maxLength={6}
                      className={`w-full px-4 py-3 bg-stone-50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 text-center text-lg tracking-widest ${
                        errors.otp ? 'border-red-500 bg-red-50' : 'border-stone-200 focus:border-amber-300'
                      }`}
                      placeholder="000000"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOtp(!showOtp)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600"
                    >
                      {showOtp ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.otp && (
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">!</span>
                      </div>
                      <p className="text-red-500 text-sm">{errors.otp}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col space-y-3">
                  <button
                    onClick={verifyOtp}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Signing In...</span>
                      </>
                    ) : (
                      <>
                        <LogIn className="h-5 w-5" />
                        <span>Sign In</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={resendOtp}
                      disabled={isLoading}
                      className="text-amber-600 font-medium hover:text-amber-700 transition-colors duration-300 text-sm disabled:opacity-50"
                    >
                      Resend OTP
                    </button>
                    <button
                      onClick={() => setStep(1)}
                      className="text-stone-600 font-medium hover:text-stone-700 transition-colors duration-300 text-sm"
                    >
                      Change Number
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 text-center text-sm text-stone-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-amber-600 font-medium hover:text-amber-700 transition-colors duration-300">
                Sign up here
              </Link>
            </div>

            <div className="mt-6 p-4 bg-stone-50 rounded-xl border border-stone-200">
              <p className="text-xs text-stone-500 text-center">
                🔒 Your information is secure and encrypted. We never share your data with third parties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;