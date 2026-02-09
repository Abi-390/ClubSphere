import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Users, 
  Target, 
  ArrowRight, 
  Menu, 
  X,
  MapPin,
  Clock,
  User
} from 'lucide-react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#0a0e1a] text-white min-h-screen font-sans">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a0e1a]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight">ClubSphere</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#discovery" className="text-gray-300 hover:text-white transition-colors">Discovery</a>
              <a href="#clubs" className="text-gray-300 hover:text-white transition-colors">My Clubs</a>
              <a href="#events" className="text-gray-300 hover:text-white transition-colors">Events</a>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <button className="text-gray-300 hover:text-white transition-colors px-4 py-2">
                Log In
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-2 rounded-lg font-medium">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-6 pb-6 space-y-4 animate-fadeIn">
              <a href="#discovery" className="block text-gray-300 hover:text-white transition-colors">Discovery</a>
              <a href="#clubs" className="block text-gray-300 hover:text-white transition-colors">My Clubs</a>
              <a href="#events" className="block text-gray-300 hover:text-white transition-colors">Events</a>
              <div className="pt-4 space-y-3">
                <button className="w-full text-left text-gray-300 hover:text-white transition-colors px-4 py-2">
                  Log In
                </button>
                <button className="w-full bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-2 rounded-lg font-medium">
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-slideInLeft">
              <div className="inline-block">
                <span className="text-xs font-semibold tracking-wider text-blue-400 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
                  PLATFORM VERSION 1.0 NOW LIVE
                </span>
              </div>
              
              <div>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                  Where<br />
                  Communities<br />
                  <span className="text-blue-500">Thrive.</span>
                </h1>
                <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
                  Manage your club with precision. From role-based access control to automated event scheduling, ClubSphere is the all-in-one platform for modern organizers.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 transition-all px-8 py-4 rounded-lg font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40">
                  Start a Club
                  <ArrowRight size={20} />
                </button>
                <button className="border border-gray-700 hover:border-gray-600 transition-colors px-8 py-4 rounded-lg font-semibold">
                  Explore Communities
                </button>
              </div>
            </div>

            {/* Right Content - Dashboard Preview */}
            <div className="relative animate-slideInRight">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 backdrop-blur-sm border border-gray-700/50 shadow-2xl">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-400">Club Management</h3>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                </div>
                
                {/* Chart */}
                <div className="space-y-4">
                  <div className="flex items-end justify-between h-48 gap-3">
                    {[65, 45, 80, 60, 90, 55, 75, 85, 70, 95].map((height, i) => (
                      <div key={i} className="flex-1 flex flex-col justify-end">
                        <div 
                          className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all hover:from-blue-500 hover:to-blue-300"
                          style={{ height: `${height}%` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>January</span>
                    <span>February</span>
                    <span>March</span>
                    <span>April</span>
                    <span>May</span>
                  </div>
                </div>
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-gray-800 rounded-xl p-4 shadow-xl border border-gray-700 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Users className="text-green-500" size={20} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">85K+</div>
                    <div className="text-xs text-gray-400">Total Members</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'ACTIVE CLUBS', value: '1.2k+', color: 'text-white' },
              { label: 'TOTAL MEMBERS', value: '85k+', color: 'text-white' },
              { label: 'EVENTS HELD', value: '10k+', color: 'text-white' },
              { label: 'SUCCESS RATE', value: '99.9%', color: 'text-blue-500' }
            ].map((stat, i) => (
              <div key={i} className="text-center animate-fadeIn" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="text-xs font-semibold text-gray-500 mb-2">{stat.label}</div>
                <div className={`text-4xl md:text-5xl font-bold ${stat.color}`}>{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Empower Your Community</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to grow and manage your organization in one place, with enterprise-grade tools available for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="text-blue-500" size={32} />,
                title: 'Join a Club',
                description: 'Discover thousands of communities tailored to your interests, from tech and design to hiking and gardening.',
                cta: 'Find clubs',
                color: 'blue'
              },
              {
                icon: <Users className="text-purple-500" size={32} />,
                title: 'Create Your Community',
                description: 'Set up role-based access and custom permissions to manage your team effectively and securely on your platform.',
                cta: 'Build your brand',
                color: 'purple'
              },
              {
                icon: <Calendar className="text-green-500" size={32} />,
                title: 'Schedule Events',
                description: 'Plan, promote, and track events for your online or offline gatherings seamlessly with integrated calendars.',
                cta: 'Book events',
                color: 'green'
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:shadow-xl group animate-fadeIn"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className={`w-16 h-16 bg-${feature.color}-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{feature.description}</p>
                <button className={`text-${feature.color}-500 font-semibold flex items-center gap-2 hover:gap-3 transition-all`}>
                  {feature.cta}
                  <ArrowRight size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold">Upcoming Events</h2>
            <button className="text-blue-500 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
              View All
              <ArrowRight size={20} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                tag: 'TECH TALK',
                icon: '📱',
                title: 'Digital Design Sync 2024',
                description: 'Monthly meeting for digital designers to get to discuss trends and share work.',
                attendees: 120,
                location: 'Online',
                badge: 'Interested'
              },
              {
                image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                tag: 'OUTDOOR',
                icon: '⛰️',
                title: 'Weekend Peak Challenge',
                description: 'A challenging 2-day trek for experienced hikers and enthusiasts. Limited spots available.',
                attendees: 45,
                location: 'Mountains',
                badge: 'Interested'
              },
              {
                image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                tag: 'PROFESSIONAL',
                icon: '🤖',
                title: 'AI & Ethics Roundtable',
                description: 'A virtual discussion with industry experts on the future of responsible AI development.',
                attendees: 200,
                location: 'Online',
                badge: 'Interested'
              }
            ].map((event, i) => (
              <div 
                key={i} 
                className="bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-600/50 transition-all hover:shadow-2xl group animate-fadeIn"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div 
                  className="h-48 relative overflow-hidden"
                  style={{ background: event.image }}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>
                  <div className="absolute top-4 left-4 text-4xl">{event.icon}</div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold text-gray-400">{event.tag}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <MapPin size={12} />
                      {event.location}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">{event.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((_, idx) => (
                          <div 
                            key={idx} 
                            className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-gray-800"
                          ></div>
                        ))}
                      </div>
                      <span className="text-sm text-gray-400">+{event.attendees}</span>
                    </div>
                    <button className="text-blue-500 border border-blue-500 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-500 hover:text-white transition-all">
                      {event.badge}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }}></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to build your<br />community?
              </h2>
              <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
                Join thousands of club leaders who use ClubSphere to power their organizations and connect with members.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-white text-blue-600 hover:bg-gray-100 transition-colors px-8 py-4 rounded-lg font-bold shadow-xl">
                  Get Started Free
                </button>
                <button className="border-2 border-white text-white hover:bg-white/10 transition-colors px-8 py-4 rounded-lg font-bold">
                  Request a Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                  </svg>
                </div>
                <span className="text-xl font-bold">ClubSphere</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                The all-in-one community management platform designed for the next generation of organizers.
              </p>
            </div>

            {/* Links */}
            {[
              {
                title: 'Product',
                links: ['Features', 'Roles & Access', 'Pricing', 'Enterprise']
              },
              {
                title: 'Resources',
                links: ['Community Hub', 'Support Center', 'API Docs', 'Guides']
              },
              {
                title: 'Company',
                links: ['About Us', 'Careers', 'Blog', 'Legal']
              }
            ].map((section, i) => (
              <div key={i}>
                <h4 className="font-bold mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2024 ClubSphere Inc. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;