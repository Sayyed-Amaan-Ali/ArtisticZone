import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Phone, Mail, Eye, EyeOff, CheckCircle, ArrowRight } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    otp: '',
    course: ''
  });
  const [step, setStep] = useState(1); // 1: Basic info, 2: OTP verification, 3: Success
  const [showOtp, setShowOtp] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const courses = [
    'NIFT Coaching',
    'NID Coaching',
    'UCEED Preparation', 
    'NATA Coaching',
    'BFA Foundation',
    'Fine Arts Classes',
    'Crash Courses',
    'Craft Workshops'
  ];

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }
    
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile.replace(/\s/g, ''))) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.course) newErrors.course = 'Please select a course';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.otp.trim()) {
      newErrors.otp = 'OTP is required';
    } else if (!/^\d{6}$/.test(formData.otp)) {
      newErrors.otp = 'Please enter a valid 6-digit OTP';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const sendOtp = async () => {
    if (!validateStep1()) return;
    
    setIsLoading(true);
    // Simulate OTP sending
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setStep(2);
    setShowOtp(true);
  };

  const verifyOtp = async () => {
    if (!validateStep2()) return;
    
    setIsLoading(true);
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setStep(3);
  };

  const resendOtp = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    // Reset OTP field
    setFormData(prev => ({ ...prev, otp: '' }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 to-amber-50 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
              <User className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-stone-800 mb-2">
              Join Artistic Zone
            </h1>
            <p className="text-stone-600">
              Start your creative journey with us today
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                step >= 1 ? 'bg-amber-500 text-white' : 'bg-stone-200 text-stone-500'
              }`}>
                {step > 1 ? <CheckCircle className="h-5 w-5" /> : '1'}
              </div>
              <div className={`w-8 h-1 transition-all duration-300 ${
                step >= 2 ? 'bg-amber-500' : 'bg-stone-200'
              }`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                step >= 2 ? 'bg-amber-500 text-white' : 'bg-stone-200 text-stone-500'
              }`}>
                {step > 2 ? <CheckCircle className="h-5 w-5" /> : '2'}
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-stone-100 p-8">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-stone-800 text-center mb-6">
                  Create Your Account
                </h2>

                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-stone-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 bg-stone-50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 ${
                        errors.name ? 'border-red-500 bg-red-50' : 'border-stone-200 focus:border-amber-300'
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && (
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">!</span>
                      </div>
                      <p className="text-red-500 text-sm">{errors.name}</p>
                    </div>
                  )}
                </div>

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

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-stone-700 mb-2">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 bg-stone-50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 ${
                        errors.email ? 'border-red-500 bg-red-50' : 'border-stone-200 focus:border-amber-300'
                      }`}
                      placeholder="Enter your email address"
                    />
                  </div>
                  {errors.email && (
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">!</span>
                      </div>
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="course" className="block text-sm font-semibold text-stone-700 mb-2">
                    Interested Course *
                  </label>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-stone-50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 ${
                      errors.course ? 'border-red-500 bg-red-50' : 'border-stone-200 focus:border-amber-300'
                    }`}
                  >
                    <option value="">Select a course</option>
                    {courses.map((course) => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                  {errors.course && (
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">!</span>
                      </div>
                      <p className="text-red-500 text-sm">{errors.course}</p>
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
                    Verify Your Mobile
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
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-5 w-5" />
                        <span>Verify OTP</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={resendOtp}
                    disabled={isLoading}
                    className="text-amber-600 font-medium hover:text-amber-700 transition-colors duration-300 text-sm disabled:opacity-50"
                  >
                    Didn't receive OTP? Resend
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center space-y-6">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-10 w-10 text-green-500" />
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-stone-800 mb-2">
                    Welcome to Artistic Zone!
                  </h2>
                  <p className="text-stone-600">
                    Your account has been created successfully. You can now access all our courses and resources.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-100">
                  <h3 className="font-semibold text-stone-800 mb-2">What's Next?</h3>
                  <ul className="text-sm text-stone-600 space-y-1">
                    <li>• Explore our course catalog</li>
                    <li>• Book a free demo session</li>
                    <li>• Connect with our counselors</li>
                    <li>• Join our community</li>
                  </ul>
                </div>

                <Link
                  to="/courses"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            )}

            {step < 3 && (
              <div className="mt-6 text-center text-sm text-stone-600">
                Already have an account?{' '}
                <Link to="/login" className="text-amber-600 font-medium hover:text-amber-700 transition-colors duration-300">
                  Sign in here
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;