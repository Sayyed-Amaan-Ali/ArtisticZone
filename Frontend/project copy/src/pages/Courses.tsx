import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Filter, Clock, Users, Star, BookOpen, Award, Palette, X } from 'lucide-react';
import axios from 'axios';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = 'http://localhost:8080/api/courses';
      try {
        const res = await axios.get(endpoint);
        console.log(res.data);
      } catch (e) {
        console.error('Error fetching courses:', e);
      }
    };
  
    fetchData();
  }, []);

  const courses = [
    {
      id: 'nift',
      title: 'NIFT Coaching',
      category: 'entrance',
      description: 'Complete preparation for National Institute of Fashion Technology entrance examination with specialized modules for all design disciplines.',
      duration: '6-12 months',
      students: '200+',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Creative Ability Test (CAT)', 'General Ability Test (GAT)', 'Situation Test preparation', 'Portfolio development'],
      level: 'Beginner to Advanced',
      price: '₹25,000'
    },
    {
      id: 'nid',
      title: 'NID Coaching',
      category: 'entrance',
      description: 'Comprehensive training for National Institute of Design entrance with focus on design thinking, creativity, and visual communication.',
      duration: '8-12 months',
      students: '150+',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/6804581/pexels-photo-6804581.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Design Aptitude Test (DAT)', 'Creative workshops', 'Portfolio guidance', 'Interview preparation'],
      level: 'Intermediate to Advanced',
      price: '₹30,000'
    },
    {
      id: 'uceed',
      title: 'UCEED Preparation',
      category: 'entrance',
      description: 'Undergraduate Common Entrance Examination for Design with emphasis on visualization, observation, and design sensitivity.',
      duration: '6-10 months',
      students: '180+',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/8197521/pexels-photo-8197521.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Visualization and spatial ability', 'Observation and design sensitivity', 'Drawing and sketching', 'General awareness'],
      level: 'Beginner to Intermediate',
      price: '₹22,000'
    },
    {
      id: 'nata',
      title: 'NATA Coaching',
      category: 'entrance',
      description: 'National Aptitude Test in Architecture preparation focusing on drawing skills, proportions, and architectural awareness.',
      duration: '4-8 months',
      students: '120+',
      rating: 4.6,
      image: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Freehand drawing', 'Geometric drawing', 'Proportions and scale', 'Architectural awareness'],
      level: 'Beginner to Advanced',
      price: '₹20,000'
    },
    {
      id: 'bfa',
      title: 'BFA Foundation',
      category: 'foundation',
      description: 'Bachelor of Fine Arts foundation course covering fundamentals of art, design principles, and creative expression.',
      duration: '6-12 months',
      students: '250+',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Art history and theory', 'Drawing fundamentals', 'Color theory', 'Composition techniques'],
      level: 'Beginner',
      price: '₹18,000'
    },
    {
      id: 'fine-arts',
      title: 'Fine Arts Classes',
      category: 'creativity',
      description: 'Traditional and contemporary fine arts training including painting, sculpture, and mixed media techniques.',
      duration: '3-6 months',
      students: '300+',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Oil and acrylic painting', 'Watercolor techniques', 'Charcoal and pencil work', 'Mixed media exploration'],
      level: 'All Levels',
      price: '₹15,000'
    },
    {
      id: 'crash-course',
      title: 'Crash Courses',
      category: 'test-prep',
      description: 'Intensive short-term preparation courses for last-minute revision and exam strategy before entrance tests.',
      duration: '1-2 months',
      students: '100+',
      rating: 4.5,
      image: 'https://images.pexels.com/photos/6235233/pexels-photo-6235233.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Rapid revision modules', 'Mock test series', 'Time management strategies', 'Doubt clearing sessions'],
      level: 'Intermediate',
      price: '₹8,000'
    },
    {
      id: 'craft-workshops',
      title: 'Craft Workshops',
      category: 'creativity',
      description: 'Hands-on workshops exploring various traditional and contemporary craft techniques and materials.',
      duration: '1-3 months',
      students: '200+',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/6238050/pexels-photo-6238050.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Paper crafts and origami', 'Textile and fabric work', 'Clay and pottery basics', 'Jewelry making'],
      level: 'All Levels',
      price: '₹12,000'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Courses', icon: BookOpen, count: courses.length },
    { id: 'entrance', label: 'Entrance Exams', icon: Award, count: courses.filter(c => c.category === 'entrance').length },
    { id: 'foundation', label: 'Foundation', icon: BookOpen, count: courses.filter(c => c.category === 'foundation').length },
    { id: 'test-prep', label: 'Test Prep', icon: Clock, count: courses.filter(c => c.category === 'test-prep').length },
    { id: 'creativity', label: 'Art & Creativity', icon: Palette, count: courses.filter(c => c.category === 'creativity').length }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || course.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-stone-800 to-stone-900 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Our <span className="text-amber-400">Courses</span>
            </h1>
            <p className="text-xl md:text-2xl text-stone-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive programs designed to help you excel in your creative journey and achieve your academic goals.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-16 bg-gradient-to-br from-white to-stone-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="relative mb-12">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-white border-2 border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-300 transition-all duration-300 shadow-lg hover:shadow-xl"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors duration-300"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors duration-300"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Enhanced Filter Tabs */}
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`flex items-center space-x-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-500 transform hover:scale-110 hover:rotate-1 ${
                    selectedFilter === filter.id
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-2xl scale-110 rotate-1'
                      : 'bg-white text-stone-600 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 hover:text-amber-700 shadow-xl hover:shadow-2xl border-2 border-stone-200 hover:border-amber-300'
                  }`}
                >
                  <div className={`p-2 rounded-xl ${
                    selectedFilter === filter.id
                      ? 'bg-white/20'
                      : 'bg-amber-100'
                  }`}>
                    <filter.icon className={`h-5 w-5 ${
                      selectedFilter === filter.id ? 'text-white' : 'text-amber-600'
                    }`} />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">{filter.label}</div>
                    <div className={`text-xs ${
                      selectedFilter === filter.id ? 'text-white/80' : 'text-stone-500'
                    }`}>
                      {filter.count} courses
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Results Count */}
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-3 rounded-full border border-amber-200">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                <p className="text-stone-700 font-medium">
                  Showing <span className="font-bold text-amber-600">{filteredCourses.length}</span> course{filteredCourses.length !== 1 ? 's' : ''}
                {searchTerm && (
                    <span> for "<span className="font-bold text-amber-600">{searchTerm}</span>"</span>
                )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <div
                key={course.id}
                className="group bg-white rounded-3xl shadow-lg border border-stone-100 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Course Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-stone-700">
                      {course.level}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-amber-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {course.price}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center space-x-4 text-white text-sm">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students}</span>
                    </div>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-stone-800">{course.title}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-amber-400 fill-current" />
                      <span className="text-sm font-medium text-stone-600">{course.rating}</span>
                    </div>
                  </div>

                  <p className="text-stone-600 mb-6 leading-relaxed">{course.description}</p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-stone-800 mb-3">What you'll learn:</h4>
                    <ul className="space-y-2">
                      {course.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-stone-600">
                          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                      {course.features.length > 3 && (
                        <li className="text-sm text-amber-600 font-medium">
                          +{course.features.length - 3} more topics
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <Link
                    to={`/course/${course.id}`}
                    className="block w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white text-center py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-stone-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-12 w-12 text-stone-400" />
              </div>
              <h3 className="text-2xl font-semibold text-stone-800 mb-4">No courses found</h3>
              <p className="text-stone-600 mb-8">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedFilter('all');
                }}
                className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-stone-800 to-stone-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your <span className="text-amber-400">Creative Journey</span>?
          </h2>
          <p className="text-xl text-stone-300 mb-8 max-w-2xl mx-auto">
            Join our community of successful students and transform your passion into professional success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/contact"
              className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Book Free Demo
            </Link>
            <Link
              to="/signup"
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              Join Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;