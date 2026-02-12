import React from "react";
import { Users, Target, Shield, Rocket } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white px-6 py-20">
      
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">About ClubSphere</h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            ClubSphere is a modern community management platform built to empower
            organizers, creators, and leaders to build thriving communities with
            powerful tools and structured collaboration.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed">
              Our mission is to simplify community building. Whether it's a gaming
              club, academic group, or tech society, ClubSphere provides structured
              role-based management, event planning, and threaded discussions —
              all in one unified platform.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">Why We Built This</h2>
            <p className="text-gray-400 leading-relaxed">
              Many community platforms lack structured control and scalability.
              ClubSphere was built to combine clean design, backend logic,
              and scalable architecture to support serious community growth.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            What We Stand For
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <Users className="text-blue-500 mb-4" size={28} />
              <h3 className="text-xl font-semibold mb-2">Community First</h3>
              <p className="text-gray-400 text-sm">
                Every feature is designed to help communities grow stronger.
              </p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <Shield className="text-green-500 mb-4" size={28} />
              <h3 className="text-xl font-semibold mb-2">Secure & Structured</h3>
              <p className="text-gray-400 text-sm">
                Role-based access and controlled discussions for stability.
              </p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <Target className="text-purple-500 mb-4" size={28} />
              <h3 className="text-xl font-semibold mb-2">Focused Design</h3>
              <p className="text-gray-400 text-sm">
                Clean, distraction-free UI built for productivity.
              </p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <Rocket className="text-red-500 mb-4" size={28} />
              <h3 className="text-xl font-semibold mb-2">Scalable Vision</h3>
              <p className="text-gray-400 text-sm">
                Built with backend-first architecture ready to scale.
              </p>
            </div>

          </div>
        </div>

        {/* Founder Section */}
        <div className="text-center border-t border-gray-800 pt-16">
          <h2 className="text-3xl font-bold mb-6">Built with Passion</h2>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            ClubSphere was built with dedication and engineering discipline.
            It represents a blend of backend architecture, frontend structure,
            and real-world product thinking.
          </p>

          <div className="mt-6 text-gray-500 text-sm">
            Built with ❤️ & Passion by Abinash.
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
