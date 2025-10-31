import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, Users, Lock, AlertTriangle, CheckCircle, ArrowUp, Calendar, Mail, Phone } from 'lucide-react';

const Terms = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: CheckCircle,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'services',
      title: 'Our Services',
      icon: FileText,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'enrollment',
      title: 'Enrollment & Payment',
      icon: Users,
      color: 'from-amber-500 to-amber-600'
    },
    {
      id: 'conduct',
      title: 'User Conduct',
      icon: Shield,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'intellectual',
      title: 'Intellectual Property',
      icon: Lock,
      color: 'from-teal-500 to-teal-600'
    },
    {
      id: 'limitation',
      title: 'Limitation of Liability',
      icon: AlertTriangle,
      color: 'from-red-500 to-red-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-stone-800 to-stone-900 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-2xl">
              <FileText className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Terms & <span className="text-amber-400">Conditions</span>
            </h1>
            <p className="text-xl md:text-2xl text-stone-300 max-w-3xl mx-auto leading-relaxed">
              Please read these terms carefully before using our services
            </p>
            <div className="mt-8 text-stone-400">
              <p>Last updated: January 1, 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-12 bg-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {sections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                  setActiveSection(section.id);
                }}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeSection === section.id
                    ? `bg-gradient-to-r ${section.color} text-white shadow-lg`
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <section.icon className="h-4 w-4" />
                <span className="text-sm">{section.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-16">
            
            {/* Acceptance of Terms */}
            <div id="acceptance" className="bg-white rounded-3xl shadow-xl border border-stone-100 p-8 lg:p-12">
              <div className="flex items-center space-x-4 mb-8">
                <div className="bg-gradient-to-r from-green-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-stone-800">Acceptance of Terms</h2>
              </div>
              <div className="prose prose-lg max-w-none text-stone-600 leading-relaxed space-y-6">
                <p>
                  By accessing and using the Artistic Zone website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
                <p>
                  These terms apply to all visitors, users, and others who access or use our coaching services, whether online or offline.
                </p>
                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl">
                  <p className="text-green-800 font-medium">
                    <strong>Important:</strong> By enrolling in any of our courses, you acknowledge that you have read, understood, and agree to these terms and conditions.
                  </p>
                </div>
              </div>
            </div>

            {/* Our Services */}
            <div id="services" className="bg-white rounded-3xl shadow-xl border border-stone-100 p-8 lg:p-12">
              <div className="flex items-center space-x-4 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-stone-800">Our Services</h2>
              </div>
              <div className="prose prose-lg max-w-none text-stone-600 leading-relaxed space-y-6">
                <p>
                  Artistic Zone provides comprehensive coaching services for various design entrance examinations including but not limited to:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none">
                  {[
                    'NIFT (National Institute of Fashion Technology)',
                    'NID (National Institute of Design)',
                    'UCEED (Undergraduate Common Entrance Examination for Design)',
                    'NATA (National Aptitude Test in Architecture)',
                    'BFA Foundation Courses',
                    'Fine Arts Classes',
                    'Portfolio Development',
                    'Interview Preparation'
                  ].map((service, index) => (
                    <li key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-xl">
                      <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  We reserve the right to modify, suspend, or discontinue any part of our services at any time with reasonable notice to enrolled students.
                </p>
              </div>
            </div>

            {/* Enrollment & Payment */}
            <div id="enrollment" className="bg-white rounded-3xl shadow-xl border border-stone-100 p-8 lg:p-12">
              <div className="flex items-center space-x-4 mb-8">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 w-16 h-16 rounded-2xl flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-stone-800">Enrollment & Payment</h2>
              </div>
              <div className="prose prose-lg max-w-none text-stone-600 leading-relaxed space-y-6">
                <h3 className="text-xl font-semibold text-stone-800">Enrollment Process</h3>
                <p>
                  Students must complete the enrollment process by providing accurate personal information and selecting appropriate courses. Enrollment is confirmed only upon receipt of payment.
                </p>
                
                <h3 className="text-xl font-semibold text-stone-800">Payment Terms</h3>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>Course fees must be paid in full before the commencement of classes</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>Installment options are available for courses longer than 6 months</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>All payments are non-refundable after 7 days of course commencement</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>Late payment may result in suspension of services</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* User Conduct */}
            <div id="conduct" className="bg-white rounded-3xl shadow-xl border border-stone-100 p-8 lg:p-12">
              <div className="flex items-center space-x-4 mb-8">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-stone-800">User Conduct</h2>
              </div>
              <div className="prose prose-lg max-w-none text-stone-600 leading-relaxed space-y-6">
                <p>
                  Students are expected to maintain professional conduct during all interactions with faculty, staff, and fellow students. The following behaviors are strictly prohibited:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <h4 className="font-semibold text-red-800 mb-3">Prohibited Actions</h4>
                    <ul className="space-y-2 text-red-700">
                      <li>• Disruptive behavior in classes</li>
                      <li>• Harassment of any kind</li>
                      <li>• Sharing course materials without permission</li>
                      <li>• Cheating or plagiarism</li>
                      <li>• Unauthorized recording of sessions</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <h4 className="font-semibold text-green-800 mb-3">Expected Behavior</h4>
                    <ul className="space-y-2 text-green-700">
                      <li>• Respectful communication</li>
                      <li>• Regular attendance</li>
                      <li>• Active participation</li>
                      <li>• Timely submission of assignments</li>
                      <li>• Constructive feedback</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Intellectual Property */}
            <div id="intellectual" className="bg-white rounded-3xl shadow-xl border border-stone-100 p-8 lg:p-12">
              <div className="flex items-center space-x-4 mb-8">
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 w-16 h-16 rounded-2xl flex items-center justify-center">
                  <Lock className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-stone-800">Intellectual Property</h2>
              </div>
              <div className="prose prose-lg max-w-none text-stone-600 leading-relaxed space-y-6">
                <p>
                  All course materials, including but not limited to study guides, practice tests, video lectures, and assignments, are the intellectual property of Artistic Zone and are protected by copyright laws.
                </p>
                <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-xl">
                  <h4 className="font-semibold text-teal-800 mb-3">Usage Rights</h4>
                  <p className="text-teal-700">
                    Students are granted a limited, non-transferable license to use course materials solely for personal educational purposes during their enrollment period.
                  </p>
                </div>
                <p>
                  Unauthorized reproduction, distribution, or commercial use of any course materials is strictly prohibited and may result in legal action.
                </p>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div id="limitation" className="bg-white rounded-3xl shadow-xl border border-stone-100 p-8 lg:p-12">
              <div className="flex items-center space-x-4 mb-8">
                <div className="bg-gradient-to-r from-red-500 to-red-600 w-16 h-16 rounded-2xl flex items-center justify-center">
                  <AlertTriangle className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-stone-800">Limitation of Liability</h2>
              </div>
              <div className="prose prose-lg max-w-none text-stone-600 leading-relaxed space-y-6">
                <p>
                  While we strive to provide the best possible coaching services, Artistic Zone cannot guarantee specific results or admission to any institution. Success depends on various factors including student effort, aptitude, and external circumstances.
                </p>
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <h4 className="font-semibold text-red-800 mb-3">Important Disclaimers</h4>
                  <ul className="space-y-2 text-red-700">
                    <li>• We do not guarantee admission to any specific institution</li>
                    <li>• Results may vary based on individual performance</li>
                    <li>• We are not liable for changes in entrance exam patterns</li>
                    <li>• Technical issues beyond our control are not our responsibility</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-br from-stone-800 to-stone-900 rounded-3xl shadow-2xl p-8 lg:p-12 text-white">
              <h2 className="text-3xl font-bold mb-8 text-center">Questions About These Terms?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-white/10 w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <Mail className="h-8 w-8 text-amber-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Email Us</h3>
                  <p className="text-stone-300">legal@artisticzone.com</p>
                </div>
                <div className="text-center">
                  <div className="bg-white/10 w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <Phone className="h-8 w-8 text-amber-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Call Us</h3>
                  <p className="text-stone-300">+91 98765 43210</p>
                </div>
                <div className="text-center">
                  <div className="bg-white/10 w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <Calendar className="h-8 w-8 text-amber-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Office Hours</h3>
                  <p className="text-stone-300">Mon-Sat: 9AM-7PM</p>
                </div>
              </div>
              <div className="text-center mt-8">
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105"
                >
                  <span>Contact Support</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-24 right-6 bg-gradient-to-r from-amber-500 to-orange-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-40"
        aria-label="Back to top"
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    </div>
  );
};

export default Terms;