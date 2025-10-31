import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Trophy, BookOpen, Sparkles, Play, CheckCircle, MessageCircle, Calendar } from 'lucide-react';

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      if (!isPaused) {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Mouse tracking for subtle parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const features = [
    {
      icon: Users,
      title: "Live Mentorship",
      description: "One-on-one guidance from industry experts and successful alumni",
      color: "from-blue-500 to-blue-600",
      delay: "0ms"
    },
    {
      icon: BookOpen,
      title: "Proven Curriculum",
      description: "Comprehensive study materials and practice tests tailored for each entrance exam",
      color: "from-green-500 to-green-600",
      delay: "150ms"
    },
    {
      icon: Trophy,
      title: "Top Results",
      description: "95% success rate with students securing top ranks in NIFT, NID, UCEED",
      color: "from-amber-500 to-amber-600",
      delay: "300ms"
    },
    {
      icon: Sparkles,
      title: "Creative Excellence",
      description: "Portfolio development and artistic skills enhancement programs",
      color: "from-purple-500 to-purple-600",
      delay: "450ms"
    }
  ];

  const programs = [
    {
      title: "NIFT Coaching",
      description: "Complete preparation for National Institute of Fashion Technology entrance exam",
      image: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400",
      duration: "6-12 months",
      students: "200+",
      delay: "0ms"
    },
    {
      title: "NID Coaching",
      description: "Design aptitude and creative thinking for National Institute of Design",
      image: "https://images.pexels.com/photos/6804581/pexels-photo-6804581.jpeg?auto=compress&cs=tinysrgb&w=400",
      duration: "8-12 months",
      students: "150+",
      delay: "150ms"
    },
    {
      title: "UCEED Preparation",
      description: "Undergraduate Common Entrance Examination for Design programs",
      image: "https://images.pexels.com/photos/8197521/pexels-photo-8197521.jpeg?auto=compress&cs=tinysrgb&w=400",
      duration: "6-10 months",
      students: "180+",
      delay: "300ms"
    },
    {
      title: "Fine Arts Classes",
      description: "Traditional and contemporary art techniques for creative expression",
      image: "https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg?auto=compress&cs=tinysrgb&w=400",
      duration: "3-6 months",
      students: "300+",
      delay: "450ms"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      course: "NIFT 2024",
      rank: "AIR 23",
      image: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150",
      text: "Artistic Zone transformed my approach to design thinking. The mentors guided me through every step, and I achieved my dream rank!"
    },
    {
      name: "Rohit Kumar",
      course: "NID 2024",
      rank: "AIR 45",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
      text: "The personalized attention and creative workshops at Artistic Zone helped me discover my potential and crack NID with confidence."
    },
    {
      name: "Ananya Gupta",
      course: "UCEED 2024",
      rank: "AIR 67",
      image: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150",
      text: "From portfolio building to interview preparation, Artistic Zone provided complete support. I couldn't have done it without them!"
    }
  ];

  const stats = [
    { number: "500+", label: "Students Enrolled", icon: Users, delay: "0ms" },
    { number: "95%", label: "Success Rate", icon: Trophy, delay: "150ms" },
    { number: "50+", label: "Top 100 Ranks", icon: Star, delay: "300ms" },
    { number: "5+", label: "Years Experience", icon: Calendar, delay: "450ms" }
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 to-transparent"></div>
        </div>

        {/* Subtle Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
                transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
              }}
            >
              <div className="w-2 h-2 bg-amber-400/40 rounded-full animate-pulse"></div>
            </div>
          ))}
          
          {/* Geometric shapes with subtle movement */}
          {[...Array(6)].map((_, i) => (
            <div
              key={`shape-${i}`}
              className="absolute opacity-10"
              style={{
                left: `${10 + (i * 15)}%`,
                top: `${20 + Math.sin(i) * 20}%`,
                transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
                animation: `gentle-float ${8 + i}s ease-in-out infinite`
              }}
            >
              <div className="w-12 h-12 border border-amber-400/30 rounded-lg transform rotate-45"></div>
            </div>
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1500 ease-out ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-20'}`}>
            {/* Animated Badge */}
            <div className="mb-8 animate-fade-in-up">
              <span className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 px-6 py-3 rounded-full text-sm font-medium border border-amber-500/30 backdrop-blur-sm hover:bg-amber-500/30 transition-all duration-500">
                <Sparkles className="h-5 w-5 animate-pulse" />
                <span>🚀 India's Premier Creative Coaching Institute</span>
              </span>
            </div>
            
            {/* Main Heading with Enhanced Typography */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-amber-200 to-amber-400 bg-clip-text text-transparent animate-gradient-x">
                Live Mentorship
              </span>
              <br />
              <span className="text-amber-400 inline-block animate-pulse">+</span>
              <span className="animate-fade-in-up"> Proven Curriculum</span>
              <br />
              <span className="text-2xl md:text-3xl lg:text-4xl text-stone-300 font-normal animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                = Your Gateway to Success
              </span>
            </h1>
            
            {/* Enhanced Subtitle */}
            <p className="text-xl md:text-2xl text-stone-300 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
              Turning Creative Aspirations into <span className="text-amber-400 font-semibold animate-pulse">Top Ranks</span> with Daily Guidance & Emotional Support
            </p>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{ animationDelay: '1s' }}>
              <Link
                to="/signup"
                className="group bg-gradient-to-r from-amber-500 to-orange-600 text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/25 flex items-center space-x-3"
              >
                <span>Start Your Journey Today</span>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
              
              <Link
                to="/contact"
                className="group bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-2xl font-semibold text-lg border-2 border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-500 transform hover:scale-105 flex items-center space-x-3"
              >
                <Play className="h-6 w-6 group-hover:scale-125 transition-transform duration-300" />
                <span>Book a Free Demo</span>
              </Link>

              <a
                href="https://wa.me/919876543210"
                className="group bg-green-500 text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:bg-green-600 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25 flex items-center space-x-3"
              >
                <MessageCircle className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>

        {/* Elegant Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-gentle-bounce">
          <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-2 h-4 bg-white/50 rounded-full mt-2 animate-scroll-indicator"></div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-orange-50"></div>
        
        {/* Subtle background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute opacity-5"
              style={{
                left: `${i * 25}%`,
                top: `${Math.sin(i) * 20 + 50}%`,
                animation: `gentle-float ${6 + i}s ease-in-out infinite`
              }}
            >
              <div className="w-32 h-32 bg-amber-500 rounded-full"></div>
            </div>
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group animate-fade-in-up hover:scale-110 transition-all duration-500"
                style={{ animationDelay: stat.delay }}
              >
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-xl group-hover:shadow-2xl">
                  <stat.icon className="h-10 w-10 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-stone-800 mb-3 group-hover:text-amber-600 transition-colors duration-300">{stat.number}</div>
                <div className="text-stone-600 font-medium group-hover:text-stone-800 transition-colors duration-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section className="py-20 bg-stone-50 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #E69D00 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, #BD4220 2px, transparent 2px)`,
            backgroundSize: '50px 50px',
            animation: 'gentle-drift 20s linear infinite'
          }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-left">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-800 mb-8">
                Welcome to <span className="text-amber-600 animate-gradient-x bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Artistic Zone</span>
              </h2>
              <p className="text-xl text-stone-600 mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                At Artistic Zone, we believe every creative mind deserves the right guidance to flourish. With over 5 years of excellence in design education, we've helped hundreds of students achieve their dreams of joining prestigious institutions like NIFT, NID, and UCEED.
              </p>
              <div className="space-y-6">
                {[
                  "Personalized mentorship from industry experts",
                  "Comprehensive curriculum designed for success",
                  "Regular portfolio reviews and feedback sessions",
                  "Mock tests and interview preparation"
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-4 animate-fade-in-right hover:scale-105 transition-all duration-300"
                    style={{ animationDelay: `${300 + index * 100}ms` }}
                  >
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 animate-pulse" />
                    <span className="text-stone-600 text-lg">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/about"
                className="inline-flex items-center space-x-3 mt-10 text-amber-600 font-semibold text-lg hover:text-amber-700 transition-all duration-300 group animate-fade-in-up"
                style={{ animationDelay: '700ms' }}
              >
                <span>Learn More About Us</span>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>
            <div className="relative animate-fade-in-right" style={{ animationDelay: '400ms' }}>
              <div className="relative group">
                <img
                  src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Students learning"
                  className="rounded-3xl shadow-2xl group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent rounded-3xl group-hover:from-amber-500/30 transition-all duration-700"></div>
                
                {/* Floating achievement badge */}
                <div className="absolute -bottom-8 -right-8 bg-gradient-to-br from-amber-500 to-orange-600 p-8 rounded-3xl text-white shadow-2xl animate-gentle-bounce group-hover:scale-110 transition-all duration-500">
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-sm opacity-90">Success Stories</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute opacity-5"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `gentle-float ${5 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            >
              <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full"></div>
            </div>
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-800 mb-8 animate-fade-in-up">
              Why Choose <span className="text-amber-600 animate-gradient-x bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Artistic Zone</span>?
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              We provide everything you need to succeed in your creative journey with proven methods and personalized attention.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-10 bg-white rounded-3xl border border-stone-100 hover:border-amber-200 hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:rotate-1 animate-fade-in-up"
                style={{ animationDelay: feature.delay }}
              >
                <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl mb-8 flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-xl group-hover:shadow-2xl`}>
                  <feature.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-stone-800 mb-6 group-hover:text-amber-600 transition-colors duration-300">{feature.title}</h3>
                <p className="text-stone-600 leading-relaxed group-hover:text-stone-700 transition-colors duration-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Programs Section */}
      <section className="py-20 bg-gradient-to-br from-stone-100 to-amber-50 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(45deg, #E69D00 25%, transparent 25%),
                             linear-gradient(-45deg, #BD4220 25%, transparent 25%),
                             linear-gradient(45deg, transparent 75%, #E69D00 75%),
                             linear-gradient(-45deg, transparent 75%, #BD4220 75%)`,
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0, 0 15px, 15px -15px, -15px 0px',
            animation: 'gentle-slide 10s linear infinite'
          }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-800 mb-8 animate-fade-in-up">
              Popular <span className="text-amber-600 animate-gradient-x bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Programs</span>
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Explore our comprehensive range of coaching programs designed to help you excel in your chosen field.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((program, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-6 hover:rotate-2 animate-fade-in-up"
                style={{ animationDelay: program.delay }}
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/40 transition-all duration-500"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-sm font-medium">{program.duration}</div>
                    <div className="text-xs opacity-80">{program.students} students</div>
                  </div>
                  
                  {/* Floating icon */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-3 rounded-full group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-stone-800 mb-4 group-hover:text-amber-600 transition-colors duration-300">{program.title}</h3>
                  <p className="text-stone-600 mb-6 leading-relaxed group-hover:text-stone-700 transition-colors duration-300">{program.description}</p>
                  <Link
                    to={`/course/${program.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center space-x-2 text-amber-600 font-medium hover:text-amber-700 transition-all duration-300 group-hover:scale-105"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link
              to="/courses"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-12 py-5 rounded-2xl font-semibold text-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-500 transform hover:scale-110 hover:rotate-1 shadow-2xl hover:shadow-amber-500/25"
            >
              <span>View All Programs</span>
              <ArrowRight className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute opacity-5"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `gentle-drift ${8 + Math.random() * 4}s linear infinite`,
                animationDelay: `${Math.random() * 3}s`
              }}
            >
              <Star className="h-8 w-8 text-amber-500" />
            </div>
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-800 mb-8 animate-fade-in-up">
              Success <span className="text-amber-600 animate-gradient-x bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Stories</span>
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Hear from our successful students who achieved their dreams with our guidance and support.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <div 
                className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-12 md:p-16 shadow-2xl border border-amber-100 transform hover:scale-105 transition-all duration-700"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
                  <div className="flex-shrink-0 animate-fade-in-left">
                    <img
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-8 border-white shadow-2xl transform hover:scale-110 transition-all duration-500"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left animate-fade-in-right">
                    <p className="text-2xl md:text-3xl text-stone-700 mb-8 italic leading-relaxed">
                      "{testimonials[currentTestimonial].text}"
                    </p>
                    <div className="flex items-center justify-center md:justify-start space-x-6">
                      <div>
                        <h4 className="text-2xl font-semibold text-stone-800">{testimonials[currentTestimonial].name}</h4>
                        <p className="text-lg text-amber-600">{testimonials[currentTestimonial].course} • {testimonials[currentTestimonial].rank}</p>
                      </div>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-6 w-6 text-amber-400 fill-current animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Navigation Buttons */}
              <button
                onClick={prevTestimonial}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-2xl hover:bg-white hover:shadow-amber-500/25 transition-all duration-500 hover:scale-125 hover:-rotate-12 group"
              >
                <svg className="h-6 w-6 text-stone-600 group-hover:text-amber-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-2xl hover:bg-white hover:shadow-amber-500/25 transition-all duration-500 hover:scale-125 hover:rotate-12 group"
              >
                <svg className="h-6 w-6 text-stone-600 group-hover:text-amber-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Enhanced Testimonial indicators */}
              <div className="flex justify-center space-x-3 mt-12">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`h-4 rounded-full transition-all duration-500 hover:scale-125 ${
                      index === currentTestimonial
                        ? 'bg-amber-500 w-12 shadow-lg'
                        : 'bg-stone-300 w-4 hover:bg-stone-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-br from-stone-800 to-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            >
              <div className="w-1 h-1 bg-amber-400/40 rounded-full"></div>
            </div>
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 animate-fade-in-up">
            Ready to Start Your <span className="text-amber-400 animate-gradient-x bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Creative Journey</span>?
          </h2>
          <p className="text-2xl text-stone-300 mb-12 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Join hundreds of successful students who transformed their artistic passion into professional success.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/signup"
              className="group bg-gradient-to-r from-amber-500 to-orange-600 text-white px-12 py-5 rounded-2xl font-semibold text-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-500 transform hover:scale-110 hover:rotate-1 shadow-2xl hover:shadow-amber-500/25 flex items-center space-x-3 animate-fade-in-up"
              style={{ animationDelay: '400ms' }}
            >
              <span>Join Now</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
            <Link
              to="/contact"
              className="group bg-white/10 backdrop-blur-sm text-white px-12 py-5 rounded-2xl font-semibold text-xl border-2 border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-500 transform hover:scale-105 hover:-rotate-1 flex items-center space-x-3 animate-fade-in-up"
              style={{ animationDelay: '600ms' }}
            >
              <Calendar className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
              <span>Book Free Demo</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes gentle-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        @keyframes gentle-drift {
          0% { transform: translateX(-50px) rotate(0deg); }
          100% { transform: translateX(calc(100vw + 50px)) rotate(360deg); }
        }
        
        @keyframes gentle-slide {
          0% { background-position: 0 0, 0 15px, 15px -15px, -15px 0px; }
          100% { background-position: 30px 30px, 30px 45px, 45px 15px, 15px 30px; }
        }
        
        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes scroll-indicator {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(10px); }
        }
        
        @keyframes animate-gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
          transform: translateY(30px);
        }
        
        .animate-fade-in-left {
          animation: fadeInLeft 1s ease-out forwards;
          opacity: 0;
          transform: translateX(-30px);
        }
        
        .animate-fade-in-right {
          animation: fadeInRight 1s ease-out forwards;
          opacity: 0;
          transform: translateX(30px);
        }
        
        .animate-gentle-bounce {
          animation: gentle-bounce 2s ease-in-out infinite;
        }
        
        .animate-gradient-x {
          animation: animate-gradient-x 3s ease infinite;
        }
        
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInLeft {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Home;