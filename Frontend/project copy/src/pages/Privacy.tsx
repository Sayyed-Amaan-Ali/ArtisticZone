import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, Database, UserCheck, Settings, ArrowUp, Mail, Phone, Calendar } from 'lucide-react';

const Privacy = () => {
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
      id: 'collection',
      title: 'Information Collection',
      icon: Database,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'usage',
      title: 'How We Use Data',
      icon: Settings,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'sharing',
      title: 'Information Sharing',
      icon: UserCheck,
      color: 'from-amber-500 to-amber-600'
    },
    {
      id: 'security',
      title: 'Data Security',
      icon: Lock,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'rights',
      title: 'Your Rights',
      icon: Eye,
      color: 'from-teal-500 to-teal-600'
    },
    {
      id: 'cookies',
      title: 'Cookies Policy',
      icon: Shield,
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
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Privacy <span className="text-amber-400">Policy</span>
            </h1>
            <p className="text-xl md:text-2xl text-stone-300 max-w-3xl mx-auto leading-relaxed">
              Your privacy is important to us. Learn how we protect and handle your personal information.
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
            
            {/* Information Collection */}
            <div id="collection" className="bg-white rounded-3xl shadow-xl border border-stone-100 p-8 lg:p-12">
              <div className="flex items-center space-x-4 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center">
                  <Database className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-stone-800">Information We Collect</h2>
              </div>
              <div className="prose prose-lg max-w-none text-stone-600 leading-relaxed space-y-6">
                <p>
                  We collect information you provide directly to us when you use our services, create an account, or communicate with us.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h4 className="font-semibold text-blue-800 mb-3">Personal Information</h4>
                    <ul className="space-y-2 text-blue-700">
                      <li>• Full name and contact details</li>
                      <li>• Email address and phone number</li>
                      <li>• Educational background</li>
                      <li>• Course preferences</li>
                      <li>• Payment information</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <h4 className="font-semibold text-green-800 mb-3">Usage Information</h4>
                    <ul className="space-y-2 text-green-700">
                      <li>• Website interaction data</li>
                      <li>• Course progress and performance</li>
                      <li>• Device and browser information</li>
                      <li>• IP address and location data</li>
                      <li>• Session recordings (with consent)</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
                  <p className="text-blue-800 font-medium">
                    <strong>Note:</strong> We only collect information that is necessary to provide our services and improve your learning experience.
                  </p>
                </div>
              </div>
            </div>

            {/* How We Use Data */}
            <div id="usage" className="bg-white rounded-3xl shadow-xl border border-stone-100 p-8 lg:p-12">
              <div className="flex items-center space-x-4 mb-8">
                <div className="bg-gradient-to-r from-green-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center">
                  <Settings className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-stone-800">How We Use Your Information</h2>
              </div>
              <div className="prose prose-lg max-w-none text-stone-600 leading-relaxed space-y-6">
                <p>
                  We use the information we collect to provide, maintain, and improve our services. Here's how:
                </p>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="bg-green-50 rounded-xl p-6 text-center">
                    <div className="bg-green-500 w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center">
                      <UserCheck className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-green-800 mb-3">Service Delivery</h4>
                    <p className="text-green-700 text-sm">
                      Provide coaching services, track progress, and personalize your learning experience.
                    </p>
                  </div>
                  
                  <div className="bg-amber-50 rounded-xl p-6 text-center">
                    <div className="bg-amber-500 w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-amber-800 mb-3">Communication</h4>
                    <p className="text-amber-700 text-sm">
                      Send important updates, course information, and respond to your inquiries.
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 rounded-xl p-6 text-center">
                    <div className="bg-purple-500 w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center">
                      <Settings className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-purple-800 mb-3">Improvement</h4>
                    <p className="text-purple-700 text-sm">
                      Analyze usage patterns to enhance our services and develop new features.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Information Sharing */}
            <div id="sharing" className="bg-white rounded-3xl shadow-xl border border-stone-100 p-8 lg:p-12">
              <div className="flex items-center space-x-4 mb-8">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 w-16 h-16 rounded-2xl flex items-center justify-center">
                  <UserCheck className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-stone-800">Information Sharing</h2>
              </div>
              <div className="prose prose-lg max-w-none text-stone-600 leading-relaxed space-y-6">
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
                </p>
                
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                  <h4 className="font-semibold text-amber-800 mb-4">When We May Share Information</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Service Providers:</strong> With trusted partners who help us operate our services (payment processors, email services)</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>With Consent:</strong> When you explicitly agree to share information</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Data Security */}
            <div id="security" className="bg-white rounded-3xl shadow-xl border border-stone-100 p-8 lg:p-12">
              <div className="flex items-center space-x-4 mb-8">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center">
                  <Lock className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-stone-800">Data Security</h2>
              </div>
              <div className="prose prose-lg max-w-none text-stone-600 leading-relaxed space-y-6">
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                    <h4 className="font-semibold text-purple-800 mb-3">Technical Safeguards</h4>
                    <ul className="space-y-2 text-purple-700">
                      <li>• SSL/TLS encryption for data transmission</li>
                      <li>• Secure server infrastructure</li>
                      <li>• Regular security audits and updates</li>
                      <li>• Access controls and authentication</li>
                      <li>• Data backup and recovery systems</li>
                    </ul>
                  </div>
                  <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
                    <h4 className="font-semibold text-indigo-800 mb-3">Organizational Measures</h4>
                    <ul className="space-y-2 text-indigo-700">
                      <li>• Staff training on data protection</li>
                      <li>• Limited access on need-to-know basis</li>
                      <li>• Regular privacy impact assessments</li>
                      <li>• Incident response procedures</li>
                      <li>• Third-party security agreements</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-xl">
                  <p className="text-purple-800 font-medium">
                    <strong>Important:</strong> While we strive to protect your information, no method of transmission over the internet is 100% secure. Please use strong passwords and keep your account credentials confidential.
                  </p>
                </div>
              </div>
            </div>

            {/* Your Rights */}
            <div id="rights" className="bg-white rounded-3xl shadow-xl border border-stone-100 p-8 lg:p-12">
              <div className="flex items-center space-x-4 mb-8">
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 w-16 h-16 rounded-2xl flex items-center justify-center">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-stone-800">Your Privacy Rights</h2>
              </div>
              <div className="prose prose-lg max-w-none text-stone-600 leading-relaxed space-y-6">
                <p>
                  You have certain rights regarding your personal information. Here's what you can do:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: 'Access',
                      description: 'Request a copy of the personal information we hold about you',
                      icon: Eye,
                      color: 'teal'
                    },
                    {
                      title: 'Correction',
                      description: 'Ask us to correct any inaccurate or incomplete information',
                      icon: Settings,
                      color: 'blue'
                    },
                    {
                      title: 'Deletion',
                      description: 'Request deletion of your personal information (subject to legal requirements)',
                      icon: Database,
                      color: 'red'
                    },
                    {
                      title: 'Portability',
                      description: 'Receive your data in a structured, machine-readable format',
                      icon: UserCheck,
                      color: 'green'
                    },
                    {
                      title: 'Restriction',
                      description: 'Limit how we process your personal information',
                      icon: Lock,
                      color: 'purple'
                    },
                    {
                      title: 'Objection',
                      description: 'Object to certain types of processing of your information',
                      icon: Shield,
                      color: 'amber'
                    }
                  ].map((right, index) => (
                    <div key={index} className={`bg-${right.color}-50 border border-${right.color}-200 rounded-xl p-6 text-center`}>
                      <div className={`bg-${right.color}-500 w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center`}>
                        <right.icon className="h-6 w-6 text-white" />
                      </div>
                      <h4 className={`font-semibold text-${right.color}-800 mb-2`}>{right.title}</h4>
                      <p className={`text-${right.color}-700 text-sm`}>{right.description}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-teal-50 border border-teal-200 rounded-xl p-6">
                  <h4 className="font-semibold text-teal-800 mb-3">How to Exercise Your Rights</h4>
                  <p className="text-teal-700">
                    To exercise any of these rights, please contact us at <strong>privacy@artisticzone.com</strong> or call us at <strong>+91 98765 43210</strong>. 
                    We will respond to your request within 30 days.
                  </p>
                </div>
              </div>
            </div>

            {/* Cookies Policy */}
            <div id="cookies" className="bg-white rounded-3xl shadow-xl border border-stone-100 p-8 lg:p-12">
              <div className="flex items-center space-x-4 mb-8">
                <div className="bg-gradient-to-r from-red-500 to-red-600 w-16 h-16 rounded-2xl flex items-center justify-center">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-stone-800">Cookies & Tracking</h2>
              </div>
              <div className="prose prose-lg max-w-none text-stone-600 leading-relaxed space-y-6">
                <p>
                  We use cookies and similar tracking technologies to enhance your experience on our website and analyze usage patterns.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <h4 className="font-semibold text-green-800 mb-3">Essential Cookies</h4>
                    <p className="text-green-700 text-sm mb-3">
                      Required for basic website functionality and security.
                    </p>
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium inline-block">
                      Always Active
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h4 className="font-semibold text-blue-800 mb-3">Analytics Cookies</h4>
                    <p className="text-blue-700 text-sm mb-3">
                      Help us understand how visitors interact with our website.
                    </p>
                    <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium inline-block">
                      Optional
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                    <h4 className="font-semibold text-purple-800 mb-3">Marketing Cookies</h4>
                    <p className="text-purple-700 text-sm mb-3">
                      Used to deliver relevant advertisements and track campaign effectiveness.
                    </p>
                    <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium inline-block">
                      Optional
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                  <h4 className="font-semibold text-red-800 mb-2">Cookie Management</h4>
                  <p className="text-red-700">
                    You can control cookie settings through your browser preferences. Note that disabling certain cookies may affect website functionality.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-br from-stone-800 to-stone-900 rounded-3xl shadow-2xl p-8 lg:p-12 text-white">
              <h2 className="text-3xl font-bold mb-8 text-center">Privacy Questions or Concerns?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-white/10 w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <Mail className="h-8 w-8 text-amber-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Privacy Officer</h3>
                  <p className="text-stone-300">privacy@artisticzone.com</p>
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
                  <h3 className="font-semibold mb-2">Response Time</h3>
                  <p className="text-stone-300">Within 30 days</p>
                </div>
              </div>
              <div className="text-center mt-8">
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105"
                >
                  <span>Contact Privacy Team</span>
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

export default Privacy;