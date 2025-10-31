import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Palette, User, LogOut } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCoursesDropdown, setShowCoursesDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate login state

  const [name,setName] = useState();

  useEffect(()=>{
    if(localStorage.getItem("user")!== undefined){
        // setName(localStorage.getItem("user"));
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const courses = [
    { name: 'NIFT Coaching', path: '/course/nift' },
    { name: 'NID Coaching', path: '/course/nid' },
    { name: 'UCEED Coaching', path: '/course/uceed' },
    { name: 'NATA Coaching', path: '/course/nata' },
    { name: 'BFA Foundation', path: '/course/bfa' },
    { name: 'Fine Arts Classes', path: '/course/fine-arts' }
  ];

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Courses', path: '/courses', hasDropdown: true },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Palette className="h-6 w-6 text-white" />
            </div>
            <span className={`text-xl lg:text-2xl font-bold bg-gradient-to-r from-stone-800 to-amber-600 bg-clip-text text-transparent ${
              isScrolled ? 'opacity-100' : 'text-white'
            }`}>
              Artistic Zone
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'text-amber-600 bg-amber-50'
                      : isScrolled
                      ? 'text-stone-700 hover:text-amber-600 hover:bg-amber-50'
                      : 'text-white hover:text-amber-300'
                  }`}
                  onMouseEnter={() => item.hasDropdown && setShowCoursesDropdown(true)}
                  onMouseLeave={() => item.hasDropdown && setShowCoursesDropdown(false)}
                >
                  <span className="font-medium">{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${
                      showCoursesDropdown ? 'rotate-180' : ''
                    }`} />
                  )}
                </Link>

                {/* Courses Dropdown */}
                {item.hasDropdown && (
                  <div
                    className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-stone-200 transition-all duration-300 ${
                      showCoursesDropdown ? 'opacity-100 visible transform translate-y-0' : 'opacity-0 invisible transform translate-y-2'
                    }`}
                    onMouseEnter={() => setShowCoursesDropdown(true)}
                    onMouseLeave={() => setShowCoursesDropdown(false)}
                  >
                    <div className="py-2">
                      {courses.map((course, index) => (
                        <Link
                          key={course.name}
                          to={course.path}
                          className="block px-4 py-3 text-stone-700 hover:text-amber-600 hover:bg-amber-50 transition-all duration-200"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          {course.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      isScrolled
                        ? 'text-stone-700 hover:text-amber-600 hover:bg-amber-50'
                        : 'text-white hover:text-amber-300'
                    }`}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span>{name===null?"USER":name}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${
                      showUserDropdown ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {/* User Dropdown */}
                  <div className={`absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-stone-200 transition-all duration-300 ${
                    showUserDropdown ? 'opacity-100 visible transform translate-y-0' : 'opacity-0 invisible transform translate-y-2'
                  }`}>
                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="block px-4 py-3 text-stone-700 hover:text-amber-600 hover:bg-amber-50 transition-all duration-200 flex items-center space-x-2"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        <User className="h-4 w-4" />
                        <span>My Profile</span>
                      </Link>
                      <button
                        onClick={() => {
                          setIsLoggedIn(false);
                          setShowUserDropdown(false);
                        }}
                        className="w-full text-left px-4 py-3 text-stone-700 hover:text-red-600 hover:bg-red-50 transition-all duration-200 flex items-center space-x-2"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Link
                    to="/abc"
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      isScrolled
                        ? 'text-stone-700 hover:text-amber-600 hover:bg-amber-50'
                        : 'text-white hover:text-amber-300'
                    }`}
                  >
                    <User className="h-4 w-4" />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Join Now
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${
              isScrolled ? 'text-stone-700 hover:bg-stone-100' : 'text-white hover:bg-white/20'
            }`}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-lg">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 text-stone-700 hover:text-amber-600 hover:bg-amber-50 transition-colors duration-200 ${
                  location.pathname === item.path ? 'text-amber-600 bg-amber-50' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
            <hr className="my-2 border-stone-200" />
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-stone-700 hover:text-amber-600 hover:bg-amber-50 transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="block mx-4 my-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-300 text-center"
            >
              Join Now
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;