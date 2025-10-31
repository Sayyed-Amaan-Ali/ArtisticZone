import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Clock, Users, Star, CheckCircle, Play, Award, BookOpen, MessageCircle, Calendar } from 'lucide-react';

const CourseInfo = () => {
  const { id } = useParams();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const courseData = {
    'nift': {
      title: 'NIFT Coaching Program',
      subtitle: 'Complete preparation for National Institute of Fashion Technology',
      description: 'Our comprehensive NIFT coaching program is designed to help you excel in all aspects of the entrance examination. From creative ability tests to general aptitude, we provide structured learning with personalized attention.',
      image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '6-12 months',
      students: '200+',
      rating: 4.9,
      price: '₹25,000',
      level: 'Beginner to Advanced'
    },
    'nid': {
      title: 'NID Coaching Program',
      subtitle: 'Design thinking and creativity for National Institute of Design',
      description: 'Master the art of design thinking with our NID coaching program. We focus on developing your creative problem-solving skills, visual communication abilities, and design sensitivity required for NID entrance.',
      image: 'https://images.pexels.com/photos/6804581/pexels-photo-6804581.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '8-12 months',
      students: '150+',
      rating: 4.8,
      price: '₹30,000',
      level: 'Intermediate to Advanced'
    },
    'uceed': {
      title: 'UCEED Preparation Program',
      subtitle: 'Undergraduate design entrance exam mastery',
      description: 'Our UCEED preparation program covers all aspects of the examination including visualization, observation skills, design sensitivity, and general awareness. Get ready to secure your place in IITs.',
      image: 'https://images.pexels.com/photos/8197521/pexels-photo-8197521.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '6-10 months',
      students: '180+',
      rating: 4.7,
      price: '₹22,000',
      level: 'Beginner to Intermediate'
    }
  };

  const course = courseData[id as keyof typeof courseData] || courseData.nift;

  const modules = [
    {
      title: 'Foundation Module',
      topics: ['Basic design principles', 'Color theory fundamentals', 'Drawing techniques', 'Observation skills'],
      duration: '4 weeks'
    },
    {
      title: 'Creative Development',
      topics: ['Idea generation techniques', 'Creative problem solving', 'Concept development', 'Visual storytelling'],
      duration: '6 weeks'
    },
    {
      title: 'Technical Skills',
      topics: ['Digital design tools', 'Portfolio development', 'Presentation techniques', 'Time management'],
      duration: '6 weeks'
    },
    {
      title: 'Exam Preparation',
      topics: ['Mock test series', 'Previous year analysis', 'Interview preparation', 'Final revision'],
      duration: '4 weeks'
    }
  ];

  const features = [
    {
      icon: Users,
      title: 'Small Batch Size',
      description: 'Maximum 15 students per batch for personalized attention'
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Material',
      description: 'Updated study materials and practice worksheets'
    },
    {
      icon: Star,
      title: 'Expert Faculty',
      description: 'Industry professionals and successful alumni as mentors'
    },
    {
      icon: Award,
      title: 'Portfolio Guidance',
      description: 'One-on-one portfolio review and development sessions'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      rank: 'AIR 23, NIFT 2024',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150',
      text: 'The faculty at Artistic Zone helped me understand design concepts that I struggled with. Their approach is very systematic and student-friendly.'
    },
    {
      name: 'Rohit Kumar',
      rank: 'AIR 45, NID 2024',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      text: 'Mock tests and feedback sessions were incredibly helpful. I could track my progress and improve my weak areas effectively.'
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-stone-800 to-stone-900 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 to-transparent"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
            <div>
              <div className="mb-4">
                <span className="inline-flex items-center bg-amber-500/20 text-amber-300 px-4 py-2 rounded-full text-sm font-medium border border-amber-500/30">
                  {course.level}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {course.title}
              </h1>
              <p className="text-xl text-stone-300 mb-8 leading-relaxed">
                {course.subtitle}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 mb-8 text-stone-300">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>{course.students} enrolled</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-amber-400 fill-current" />
                  <span>{course.rating} rating</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-xl">
                  Enroll Now - {course.price}
                </button>
                <a
                  href="https://wa.me/919876543210"
                  className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Book a Session</span>
                </a>
              </div>
            </div>

            <div className="relative">
              <img
                src={course.image}
                alt={course.title}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-8">
              Course <span className="text-amber-600">Overview</span>
            </h2>
            <p className="text-lg text-stone-600 leading-relaxed mb-12">
              {course.description}
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 bg-stone-50 rounded-2xl border border-stone-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-amber-500 to-orange-600 w-12 h-12 rounded-xl mb-4 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-stone-800 mb-2">{feature.title}</h3>
                  <p className="text-sm text-stone-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-20 bg-gradient-to-br from-stone-100 to-amber-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-6">
                Course <span className="text-amber-600">Curriculum</span>
              </h2>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                Our structured curriculum is designed to build your skills progressively and prepare you comprehensively for the entrance examination.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {modules.map((module, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-3xl shadow-lg border border-stone-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-stone-800">{module.title}</h3>
                    <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
                      {module.duration}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {module.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-stone-600">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-6">
              Student <span className="text-amber-600">Success Stories</span>
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Hear from our successful students who achieved their dreams with our course.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-3xl border border-amber-100"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg flex-shrink-0"
                  />
                  <div className="flex-1">
                    <p className="text-stone-700 mb-4 italic">"{testimonial.text}"</p>
                    <div>
                      <h4 className="font-semibold text-stone-800">{testimonial.name}</h4>
                      <p className="text-sm text-amber-600">{testimonial.rank}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Courses */}
      <section className="py-20 bg-stone-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-6">
              Related <span className="text-amber-600">Courses</span>
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Explore other courses that might interest you and complement your learning journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {Object.entries(courseData)
              .filter(([key]) => key !== id)
              .slice(0, 3)
              .map(([key, relatedCourse]) => (
                <div
                  key={key}
                  className="bg-white rounded-2xl shadow-lg border border-stone-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <img
                    src={relatedCourse.image}
                    alt={relatedCourse.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-stone-800 mb-2">{relatedCourse.title}</h3>
                    <p className="text-stone-600 mb-4 text-sm">{relatedCourse.subtitle}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-amber-600 font-semibold">{relatedCourse.price}</span>
                      <Link
                        to={`/course/${key}`}
                        className="text-amber-600 font-medium hover:text-amber-700 transition-colors duration-300 flex items-center space-x-1"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-stone-800 to-stone-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Begin Your <span className="text-amber-400">Journey</span>?
          </h2>
          <p className="text-xl text-stone-300 mb-8 max-w-2xl mx-auto">
            Join our comprehensive program and get the guidance you need to achieve your creative goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-xl">
              Enroll Now
            </button>
            <Link
              to="/contact"
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
            >
              <Calendar className="h-5 w-5" />
              <span>Book Free Demo</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseInfo;