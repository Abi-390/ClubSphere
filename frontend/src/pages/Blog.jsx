import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Blog = () => {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white px-6 py-20">
      
      <div className="max-w-5xl mx-auto">

        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-10 transition"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* Header Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          
          {/* Photo */}
          <div className="relative">
            <div className="relative flex justify-center items-center">

  {/* Glow Background */}
  <div className="absolute w-[80%] h-[80%] bg-blue-500/20 blur-3xl rounded-full"></div>

  {/* Image */}
  <img
    src="/my-photo.png"
    alt="Founder"
    className="relative z-10 h-[450px] object-contain drop-shadow-[0_0_40px_rgba(59,130,246,0.6)]"
  />

  {/* Bottom Fade Blend */}
  <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-[#0a0e1a] to-transparent"></div>

</div>

          </div>

          {/* Intro */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Why I Built <span className="text-blue-500">ClubSphere</span>
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Hi, I’m <span className="text-white font-semibold">Abinash</span> — 
              a full-stack developer passionate about building scalable backend systems 
              and real-world applications.
            </p>

            <p className="text-gray-400 leading-relaxed">
              ClubSphere started as a learning project but quickly evolved into something 
              much bigger — a platform designed to simulate real-world community 
              management systems with authentication, role-based access control, 
              discussions, events, and structured data relationships.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="space-y-10 text-gray-400 leading-relaxed text-lg">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              The Problem
            </h2>
            <p>
              I wanted to build something beyond CRUD tutorials. Something that felt 
              closer to industry-level architecture. Most beginner projects don’t 
              simulate real user roles, nested discussions, ownership security, 
              or scalable structure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              The Vision
            </h2>
            <p>
              ClubSphere is designed to represent how real platforms manage:
            </p>
            <ul className="list-disc ml-6 mt-4 space-y-2">
              <li>Role-based access control (Admin / Owner / User)</li>
              <li>Club-based event organization</li>
              <li>Threaded discussion systems</li>
              <li>Authentication & authorization</li>
              <li>Clean frontend + scalable backend architecture</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              What I Learned
            </h2>
            <p>
              This project pushed me far beyond my comfort zone. I strengthened my 
              backend reasoning, database relationship modeling, security handling, 
              and frontend state management.
            </p>
            <p className="mt-4">
              It helped me think like a system architect — not just a coder.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              What’s Next?
            </h2>
            <p>
              The next goal is production-level improvements — caching with Redis, 
              performance optimization, Google Calendar integration, and refined UI polish.
            </p>
          </section>

        </div>

        {/* Footer Note */}
        <div className="mt-20 border-t border-gray-800 pt-8 text-center text-gray-500">
          Built with passion, curiosity, and late-night debugging sessions.
        </div>

      </div>
    </div>
  );
};

export default Blog;
