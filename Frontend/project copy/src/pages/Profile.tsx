import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Phone, Mail, BookOpen, Calendar, Award, CreditCard as Edit3, Save, X, Camera, Star, Clock, Trophy, Target } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Priya Sharma',
    mobile: '9876543210',
    email: 'priya.sharma@email.com',
    joinDate: '2024-01-15',
    profileImage: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300'
  });

  const [editData, setEditData] = useState(profileData);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const enrolledCourses = [
    {
      id: 'nift',
      name: 'NIFT Coaching',
      progress: 75,
      status: 'Active',
      startDate: '2024-01-15',
      endDate: '2024-07-15',
      instructor: 'Prof. Rajesh Kumar',
      image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 'fine-arts',
      name: 'Fine Arts Classes',
      progress: 100,
      status: 'Completed',
      startDate: '2023-09-01',
      endDate: '2023-12-15',
      instructor: 'Ms. Anita Verma',
      image: 'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  const achievements = [
    {
      title: 'Course Completion',
      description: 'Completed Fine Arts Foundation Course',
      date: '2023-12-15',
      icon: Award,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Top Performer',
      description: 'Ranked in top 10% of the batch',
      date: '2024-02-20',
      icon: Trophy,
      color: 'from-amber-500 to-amber-600'
    },
    {
      title: 'Perfect Attendance',
      description: '100% attendance for 3 months',
      date: '2024-03-01',
      icon: Target,
      color: 'from-blue-500 to-blue-600'
    }
  ];

  const stats = [
    { label: 'Courses Enrolled', value: '2', icon: BookOpen },
    { label: 'Hours Completed', value: '240', icon: Clock },
    { label: 'Assignments Done', value: '45', icon: Target },
    { label: 'Average Score', value: '92%', icon: Star }
  ];

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
            <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">
              My <span className="text-amber-600">Profile</span>
            </h1>
            <p className="text-lg text-stone-600">
              Manage your account and track your learning progress
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-xl border border-stone-100 p-8 sticky top-24">
                <div className="text-center mb-6">
                  <div className="relative inline-block mb-4">
                    <img
                      src={profileData.profileImage}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <button className="absolute bottom-0 right-0 bg-gradient-to-r from-amber-500 to-orange-600 p-2 rounded-full text-white hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-110 shadow-lg">
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {!isEditing ? (
                    <div>
                      <h2 className="text-2xl font-bold text-stone-800 mb-2">{profileData.name}</h2>
                      <div className="space-y-2 text-stone-600">
                        <div className="flex items-center justify-center space-x-2">
                          <Phone className="h-4 w-4" />
                          <span>+91 {profileData.mobile}</span>
                        </div>
                        {profileData.email && (
                          <div className="flex items-center justify-center space-x-2">
                            <Mail className="h-4 w-4" />
                            <span>{profileData.email}</span>
                          </div>
                        )}
                        <div className="flex items-center justify-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>Joined {new Date(profileData.joinDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="mt-6 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2 mx-auto"
                      >
                        <Edit3 className="h-4 w-4" />
                        <span>Edit Profile</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                        placeholder="Full Name"
                      />
                      <input
                        type="tel"
                        name="mobile"
                        value={editData.mobile}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                        placeholder="Mobile Number"
                      />
                      <input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                        placeholder="Email (Optional)"
                      />
                      <div className="flex space-x-3">
                        <button
                          onClick={handleSave}
                          className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                          <Save className="h-4 w-4" />
                          <span>Save</span>
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex-1 bg-stone-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-stone-600 transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                          <X className="h-4 w-4" />
                          <span>Cancel</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="text-center p-4 bg-gradient-to-br from-stone-50 to-amber-50 rounded-2xl border border-stone-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="bg-gradient-to-br from-amber-500 to-orange-600 w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center">
                        <stat.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-stone-800">{stat.value}</div>
                      <div className="text-xs text-stone-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Enrolled Courses */}
              <div className="bg-white rounded-3xl shadow-xl border border-stone-100 p-8">
                <h3 className="text-2xl font-bold text-stone-800 mb-6 flex items-center space-x-2">
                  <BookOpen className="h-6 w-6 text-amber-600" />
                  <span>Enrolled Courses</span>
                </h3>
                
                <div className="space-y-6">
                  {enrolledCourses.map((course, index) => (
                    <div
                      key={course.id}
                      className="p-6 bg-gradient-to-br from-stone-50 to-amber-50 rounded-2xl border border-stone-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <div className="flex items-start space-x-4">
                        <img
                          src={course.image}
                          alt={course.name}
                          className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="text-lg font-semibold text-stone-800">{course.name}</h4>
                              <p className="text-sm text-stone-600">Instructor: {course.instructor}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              course.status === 'Active' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {course.status}
                            </span>
                          </div>
                          
                          <div className="mb-3">
                            <div className="flex items-center justify-between text-sm text-stone-600 mb-1">
                              <span>Progress</span>
                              <span>{course.progress}%</span>
                            </div>
                            <div className="w-full bg-stone-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-amber-500 to-orange-600 h-2 rounded-full transition-all duration-1000"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm text-stone-600">
                            <span>{new Date(course.startDate).toLocaleDateString()} - {new Date(course.endDate).toLocaleDateString()}</span>
                            <Link
                              to={`/course/${course.id}`}
                              className="text-amber-600 font-medium hover:text-amber-700 transition-colors duration-300"
                            >
                              View Details →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-white rounded-3xl shadow-xl border border-stone-100 p-8">
                <h3 className="text-2xl font-bold text-stone-800 mb-6 flex items-center space-x-2">
                  <Award className="h-6 w-6 text-amber-600" />
                  <span>Achievements</span>
                </h3>
                
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 bg-gradient-to-br from-stone-50 to-amber-50 rounded-2xl border border-stone-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className={`w-12 h-12 bg-gradient-to-r ${achievement.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <achievement.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-stone-800">{achievement.title}</h4>
                        <p className="text-stone-600 text-sm">{achievement.description}</p>
                        <p className="text-xs text-stone-500 mt-1">{new Date(achievement.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-3xl shadow-xl border border-stone-100 p-8">
                <h3 className="text-2xl font-bold text-stone-800 mb-6">Quick Actions</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link
                    to="/courses"
                    className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-center group"
                  >
                    <BookOpen className="h-8 w-8 text-amber-600 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <h4 className="font-semibold text-stone-800 mb-2">Browse Courses</h4>
                    <p className="text-sm text-stone-600">Explore new courses and programs</p>
                  </Link>
                  
                  <Link
                    to="/contact"
                    className="p-6 bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl border border-teal-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-center group"
                  >
                    <User className="h-8 w-8 text-teal-600 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <h4 className="font-semibold text-stone-800 mb-2">Contact Support</h4>
                    <p className="text-sm text-stone-600">Get help from our team</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;