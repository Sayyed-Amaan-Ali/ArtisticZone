import React, { useEffect, useState } from 'react';
import { CheckCircle, Users, Award, BookOpen, Target, Heart, Clock, Star } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const milestones = [
    {
      year: "2019",
      title: "Foundation",
      description: "Started with a vision to democratize design education",
      icon: Target
    },
    {
      year: "2020",
      title: "First Success",
      description: "50+ students cleared prestigious entrance exams",
      icon: Award
    },
    {
      year: "2021",
      title: "Expansion",
      description: "Launched online programs reaching students nationwide",
      icon: Users
    },
    {
      year: "2022",
      title: "Recognition",
      description: "Awarded 'Best Design Coaching Institute' by Education Today",
      icon: Award
    },
    {
      year: "2023",
      title: "Innovation",
      description: "Introduced AI-powered portfolio assessment tools",
      icon: BookOpen
    },
    {
      year: "2024",
      title: "Excellence",
      description: "Achieved 95% success rate with 500+ successful students",
      icon: Target
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Passion for Art",
      description: "We believe art is not just a subject but a way of life that transforms perspectives."
    },
    {
      icon: Users,
      title: "Student-Centric",
      description: "Every decision we make is centered around our students' success and well-being."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from curriculum to mentorship."
    },
    {
      icon: BookOpen,
      title: "Continuous Learning",
      description: "We constantly evolve our methods to stay ahead in design education."
    }
  ];

  const testimonials = [
    {
      name: "Arjun Patel",
      course: "NIFT 2024",
      rank: "AIR 15",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
      text: "The faculty at Artistic Zone helped me understand complex design concepts with ease. Their teaching methodology is exceptional."
    },
    {
      name: "Sneha Reddy",
      course: "NID 2024", 
      rank: "AIR 32",
      image: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150",
      text: "The personalized attention and regular feedback sessions helped me improve my portfolio significantly."
    },
    {
      name: "Vikram Singh",
      course: "UCEED 2024",
      rank: "AIR 28",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150",
      text: "Mock tests and practice sessions were incredibly helpful in building my confidence for the actual exam."
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
              About <span className="text-amber-400">Artistic Zone</span>
            </h1>
            <p className="text-xl md:text-2xl text-stone-300 max-w-3xl mx-auto leading-relaxed">
              Nurturing creative minds and transforming artistic dreams into professional success for over 5 years.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-6">
                Our <span className="text-amber-600">Story</span>
              </h2>
              <div className="space-y-6 text-lg text-stone-600 leading-relaxed">
                <p>
                  Artistic Zone began with a simple yet powerful vision: to bridge the gap between creative passion and professional success. Founded in 2019 by a team of design educators and industry professionals, we recognized the need for comprehensive, personalized coaching in the creative fields.
                </p>
                <p>
                  What started as a small coaching center with just 20 students has now grown into India's premier destination for design entrance exam preparation. Our journey has been marked by continuous innovation, unwavering commitment to student success, and a deep understanding of what it takes to excel in competitive creative fields.
                </p>
                <p>
                  Today, we're proud to have guided over 500 students to their dream institutions, with a success rate that speaks volumes about our methodology and dedication. But beyond the numbers, what truly defines us is the transformation we witness in our students – from uncertain beginners to confident creative professionals.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Our journey"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-amber-500 to-orange-600 p-6 rounded-2xl text-white shadow-xl">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm opacity-90">Success Stories</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-amber-100">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 w-16 h-16 rounded-xl mb-6 flex items-center justify-center">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-stone-800 mb-4">Our Vision</h3>
              <p className="text-stone-600 leading-relaxed">
                To be the leading catalyst in transforming creative aspirations into professional achievements, making quality design education accessible to every passionate student across India and beyond.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-amber-100">
              <div className="bg-gradient-to-br from-teal-500 to-teal-600 w-16 h-16 rounded-xl mb-6 flex items-center justify-center">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-stone-800 mb-4">Our Mission</h3>
              <p className="text-stone-600 leading-relaxed">
                To provide comprehensive, personalized, and innovative coaching that not only prepares students for entrance exams but also nurtures their creative thinking, builds confidence, and shapes them into industry-ready professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-6">
              Our <span className="text-amber-600">Journey</span>
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              From humble beginnings to becoming a leading name in design education, here's our story of growth and impact.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-amber-500 via-orange-500 to-amber-600"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:space-x-8`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-left mb-4 md:mb-0`}>
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-stone-100 hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="bg-gradient-to-br from-amber-500 to-orange-600 w-12 h-12 rounded-lg flex items-center justify-center">
                          <milestone.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-stone-800">{milestone.title}</h3>
                          <span className="text-amber-600 font-semibold">{milestone.year}</span>
                        </div>
                      </div>
                      <p className="text-stone-600 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="relative flex-shrink-0 w-8 h-8 md:mx-8">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>

                  <div className="flex-1 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-stone-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-6">
              Our <span className="text-amber-600">Values</span>
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              The principles that guide every aspect of our work and define who we are as an institution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg border border-stone-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 w-16 h-16 rounded-xl mx-auto mb-6 flex items-center justify-center">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-stone-800 mb-4">{value.title}</h3>
                <p className="text-stone-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Excellence */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Our team"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent rounded-2xl"></div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-6">
                Excellence Through <span className="text-amber-600">Expertise</span>
              </h2>
              <div className="space-y-6 text-lg text-stone-600 leading-relaxed">
                <p>
                  Our team comprises seasoned educators, industry professionals, and successful alumni who bring a wealth of experience and passion to every interaction with our students.
                </p>
                <div className="space-y-4">
                  {[
                    "Faculty with 10+ years of design education experience",
                    "Industry professionals from top design houses",
                    "Alumni from NIFT, NID, and other premier institutions",
                    "Continuous professional development and training",
                    "Student-centric approach in every teaching methodology"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-stone-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-stone-100 to-amber-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-6">
              What Our <span className="text-amber-600">Students Say</span>
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Hear from our successful students who achieved their dreams with our guidance and support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl shadow-lg border border-stone-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div>
                    <h4 className="font-semibold text-stone-800">{testimonial.name}</h4>
                    <p className="text-sm text-amber-600">{testimonial.course} • {testimonial.rank}</p>
                  </div>
                </div>
                <p className="text-stone-600 italic leading-relaxed">"{testimonial.text}"</p>
                <div className="flex space-x-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-stone-800 to-stone-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Our <span className="text-amber-400">Impact</span>
            </h2>
            <p className="text-lg text-stone-300 max-w-2xl mx-auto">
              Numbers that reflect our commitment to student success and educational excellence.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Successful Students", icon: Users },
              { number: "95%", label: "Success Rate", icon: Award },
              { number: "50+", label: "Top 100 Ranks", icon: Target },
              { number: "5+", label: "Years of Excellence", icon: Clock }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-stone-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;