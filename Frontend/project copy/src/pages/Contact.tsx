import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    course: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

  const validateForm = () => {
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
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', mobile: '', email: '', course: '', message: '' });
    
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Creative Street, Art District', 'New Delhi, India - 110001'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+91 98765 43210', '+91 98765 43211'],
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@artisticzone.com', 'admissions@artisticzone.com'],
      color: 'from-amber-500 to-amber-600'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Monday - Saturday: 9:00 AM - 7:00 PM', 'Sunday: 10:00 AM - 5:00 PM'],
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-stone-800 to-stone-900 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Get in <span className="text-amber-400">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-stone-300 max-w-3xl mx-auto leading-relaxed">
              Ready to start your creative journey? We're here to help you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="group p-8 bg-white rounded-2xl border border-stone-100 hover:border-amber-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${info.color} rounded-xl mb-6 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <info.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-stone-800 mb-4">{info.title}</h3>
                <div className="space-y-2">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-stone-600">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-gradient-to-br from-stone-100 to-amber-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-xl border border-stone-100">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
                  Send us a <span className="text-amber-600">Message</span>
                </h2>
                <p className="text-stone-600">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              {isSubmitted && (
                <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-800">Message Sent!</h4>
                    <p className="text-green-600 text-sm">Thank you for contacting us. We'll be in touch soon!</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-stone-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-stone-50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 ${
                        errors.name ? 'border-red-500 bg-red-50' : 'border-stone-200 focus:border-amber-300'
                      }`}
                      placeholder="Enter your full name"
                    />
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
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-stone-50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 ${
                        errors.mobile ? 'border-red-500 bg-red-50' : 'border-stone-200 focus:border-amber-300'
                      }`}
                      placeholder="Enter your mobile number"
                    />
                    {errors.mobile && (
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">!</span>
                        </div>
                        <p className="text-red-500 text-sm">{errors.mobile}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-stone-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-stone-50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 ${
                        errors.email ? 'border-red-500 bg-red-50' : 'border-stone-200 focus:border-amber-300'
                      }`}
                      placeholder="Enter your email address"
                    />
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
                      Interested Course
                    </label>
                    <select
                      id="course"
                      name="course"
                      value={formData.course}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-300 transition-all duration-300"
                    >
                      <option value="">Select a course</option>
                      {courses.map((course) => (
                        <option key={course} value={course}>{course}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-stone-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className={`w-full px-4 py-3 bg-stone-50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 resize-none ${
                      errors.message ? 'border-red-500 bg-red-50' : 'border-stone-200 focus:border-amber-300'
                    }`}
                    placeholder="Tell us about your goals and how we can help you..."
                  />
                  {errors.message && (
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">!</span>
                      </div>
                      <p className="text-red-500 text-sm">{errors.message}</p>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>

              {/* WhatsApp CTA */}
              <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border border-green-200">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-500 p-3 rounded-xl">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-stone-800">Need Immediate Help?</h4>
                    <p className="text-stone-600 text-sm">Chat with us on WhatsApp for instant support</p>
                  </div>
                  <a
                    href="https://wa.me/919876543210"
                    className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Chat Now
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-3xl shadow-xl border border-stone-100 overflow-hidden">
              <div className="h-full min-h-[400px] lg:min-h-[600px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.8984624455!2d77.20902731456613!3d28.65195008240596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd1b347eb62d%3A0x37205b715389640!2sRed%20Fort!5e0!3m2!1sen!2sin!4v1635780847536!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Artistic Zone Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-6">
              Frequently Asked <span className="text-amber-600">Questions</span>
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Find answers to common questions about our courses and admissions process.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "What is the admission process?",
                answer: "Our admission process is simple. Contact us for a consultation, take a demo class, and if you're satisfied, complete the enrollment process."
              },
              {
                question: "Do you provide study materials?",
                answer: "Yes, we provide comprehensive study materials, practice worksheets, and access to our online resource library for all enrolled students."
              },
              {
                question: "What is the batch size?",
                answer: "We maintain small batch sizes of maximum 15 students to ensure personalized attention and effective learning."
              },
              {
                question: "Do you offer online classes?",
                answer: "Yes, we offer both offline and online classes. Our online classes are interactive with live sessions and recorded lectures."
              },
              {
                question: "Is there any scholarship available?",
                answer: "We offer merit-based scholarships and financial assistance programs. Please contact us to learn more about eligibility criteria."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-stone-50 rounded-2xl p-6 border border-stone-100 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-stone-800 mb-3">{faq.question}</h3>
                <p className="text-stone-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;