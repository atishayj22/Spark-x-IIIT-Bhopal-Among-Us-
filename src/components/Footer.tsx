import React from 'react';
import { Zap, Heart, Shield, Terminal, ArrowUp } from 'lucide-react';
import { sound } from '../utils/sound';

interface FooterProps {
  isDarkMode: boolean;
  onOpenAirlock: () => void;
}

export const Footer: React.FC<FooterProps> = ({ isDarkMode, onOpenAirlock }) => {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t transition-colors ${
      isDarkMode 
        ? 'bg-slate-950 border-slate-900 text-slate-400' 
        : 'bg-slate-100 border-slate-200 text-slate-600'
    }`}>
      {/* Hazard stripe accent line */}
      <div className="h-1 bg-hazard-stripes w-full opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-rose-600 flex items-center justify-center text-slate-950 shadow-md">
                <Zap className="w-4 h-4 fill-slate-950" />
              </div>
              <span className="font-black text-white text-base tracking-wide">
                Spark X IIIT Bhopal
              </span>
            </div>
            
            <p className="text-xs leading-relaxed max-w-sm">
              The flagship student innovation community at the Indian Institute of Information Technology Bhopal. Empowering students to build, ship, and conquer real-world web missions.
            </p>

            <div className="text-xs font-mono text-slate-500">
              Web Mission 01 · Among Us Edition
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-3">
              Event Navigation
            </div>
            <ul className="text-xs space-y-2">
              <li>
                <a href="#event-guide" className="hover:text-amber-400 transition-colors">
                  Orientation & 6 Tasks
                </a>
              </li>
              <li>
                <a href="#event-schedule" className="hover:text-amber-400 transition-colors">
                  Hackathon Schedule
                </a>
              </li>
              <li>
                <a href="#prizes-rules" className="hover:text-cyan-400 transition-colors">
                  ₹50,000+ Prize Pool
                </a>
              </li>
              <li>
                <a href="#ship-arcade" className="hover:text-rose-400 transition-colors">
                  Ship Tasks Arcade
                </a>
              </li>
              <li>
                <a href="#task-instagram" className="hover:text-pink-400 transition-colors">
                  Task 3: Instagram Tag
                </a>
              </li>
              <li>
                <a href="#registration-gate" className="hover:text-emerald-400 transition-colors">
                  Squad Registration & Pass
                </a>
              </li>
            </ul>
          </div>

          {/* Event Info & Replay Controls */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-3">
              Skeld Airway Controls
            </div>
            <button
              onClick={() => {
                sound.playClick();
                onOpenAirlock();
              }}
              className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-300 hover:text-white transition-colors text-left flex items-center justify-between"
            >
              <span>Relock Airlock Door</span>
              <span className="text-rose-400">⚡</span>
            </button>

            <button
              onClick={scrollToTop}
              className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-300 hover:text-white transition-colors text-left flex items-center justify-between"
            >
              <span>Back to Top Deck</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © 2026 Spark X IIIT Bhopal. Crafted for Web Mission 01.
          </div>

          <div className="flex items-center gap-2">
            <span>Built with React + Tailwind CSS</span>
            <span aria-hidden="true">·</span>
            <span>Zero Impostors Detected</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
