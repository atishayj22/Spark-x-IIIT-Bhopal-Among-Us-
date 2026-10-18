import React, { useState } from 'react';
import { 
  Zap, 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX, 
  AlertOctagon, 
  Menu, 
  X,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { sound } from '../utils/sound';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  isMuted: boolean;
  onToggleSound: () => void;
  onTriggerEmergency: () => void;
  onOpenAirlock: () => void;
  completedTasksCount: number;
  totalTasksCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  onToggleTheme,
  isMuted,
  onToggleSound,
  onTriggerEmergency,
  onOpenAirlock,
  completedTasksCount,
  totalTasksCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const taskPercentage = Math.round((completedTasksCount / totalTasksCount) * 100);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md transition-colors duration-300">
      {/* Skeld Task Bar at very top (Among Us Signature HUD) */}
      <div className={`w-full py-1.5 px-4 text-xs font-mono flex items-center justify-between border-b transition-colors ${
        isDarkMode 
          ? 'bg-slate-950/90 border-slate-800 text-slate-300' 
          : 'bg-slate-100/90 border-slate-200 text-slate-700'
      }`}>
        <div className="flex items-center gap-3 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
            <span className="font-bold text-emerald-500">TOTAL TASKS</span>
            <span className="tabular-nums font-bold">
              {completedTasksCount} / {totalTasksCount}
            </span>
          </div>

          {/* Green Among Us Task Progress Bar */}
          <div className="relative flex-1 h-3 rounded-full bg-slate-800 border border-slate-700 overflow-hidden shadow-inner max-w-md">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(52,211,153,0.8)]"
              style={{ width: `${taskPercentage}%` }}
            />
            {/* White segment lines */}
            <div className="absolute inset-0 flex justify-between px-1 pointer-events-none opacity-20">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="w-0.5 h-full bg-white" />
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 text-[11px] font-mono ml-auto whitespace-nowrap">
            {completedTasksCount >= totalTasksCount ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-500/50 px-2.5 py-0.5 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>ALL 3 TASKS COMPLETED · SHIP FULLY SECURED</span>
              </span>
            ) : (
              <span className="text-amber-300 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>TASKS: 1. AIRLOCK (DONE) · 2. REFUEL LIGHTS · 3. INSTA TAG</span>
              </span>
            )}
            <span className="text-slate-600">·</span>
            <span className="text-rose-400 font-bold">OFFLINE: IIIT BHOPAL (LAST DATE: 25 OCT)</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className={`border-b transition-colors ${
        isDarkMode 
          ? 'bg-slate-950/85 border-slate-800/80 text-white' 
          : 'bg-white/85 border-slate-200/80 text-slate-900'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 md:gap-8">
          {/* Zone 1: Brand Wordmark with Spark Logo */}
          <a 
            href="#" 
            className="flex items-center gap-2.5 text-base sm:text-lg font-black tracking-tight whitespace-nowrap shrink-0 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 via-rose-500 to-pink-600 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/30 group-hover:scale-105 transition-transform">
              <Zap className="w-4 h-4 fill-slate-950" />
            </div>
            <div className="flex flex-col">
              <span className="leading-tight font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-500 to-cyan-400">
                Spark X IIIT Bhopal
              </span>
              <span className="text-[10px] font-mono text-slate-400 tracking-wider -mt-0.5">
                CREWMATE CODEFEST (OFFLINE)
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-semibold text-slate-400">
            <a 
              href="#event-guide" 
              className="text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 font-bold"
            >
              Event Guide
            </a>
            <a 
              href="#event-schedule" 
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              Schedule
            </a>
            <a 
              href="#prizes-rules" 
              className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
            >
              Prizes & FAQs
            </a>
            <a 
              href="#ship-arcade" 
              className="hover:text-rose-400 transition-colors whitespace-nowrap shrink-0"
            >
              Ship Tasks Arcade
            </a>
            <a 
              href="#task-instagram" 
              className="hover:text-pink-400 transition-colors whitespace-nowrap shrink-0 font-bold"
            >
              Task 3: Instagram
            </a>
          </nav>

          {/* Zone 3: Actions (Emergency Button, Airlock, Sound, Theme, Register CTA) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Emergency Button - ONLY SHOWN WHEN ALL 3 TASKS ARE NOT COMPLETED. VANISHES WHEN 3/3! */}
            {completedTasksCount < totalTasksCount && (
              <button
                onClick={() => {
                  sound.playEmergency();
                  onTriggerEmergency();
                }}
                title="Trigger Emergency Meeting (Visible while tasks < 3)"
                className="relative px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-black tracking-wider uppercase flex items-center gap-1.5 shadow-md shadow-rose-600/40 active:scale-95 transition-all cursor-pointer animate-pulse"
              >
                <AlertOctagon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">EMERGENCY</span>
              </button>
            )}

            {/* Airlock Re-lock / Replay Gate */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenAirlock();
              }}
              title="Airlock Decontamination Gate"
              className={`p-2 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white' 
                  : 'border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900'
              }`}
            >
              <Lock className="w-4 h-4" />
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                sound.playClick();
                onToggleSound();
              }}
              title={isMuted ? 'Unmute Game Sounds' : 'Mute Game Sounds'}
              className={`p-2 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white' 
                  : 'border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900'
              }`}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={() => {
                sound.playClick();
                onToggleTheme();
              }}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className={`p-2 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'border-slate-800 hover:border-slate-700 text-amber-300 hover:text-amber-200' 
                  : 'border-slate-200 hover:border-slate-300 text-indigo-600 hover:text-indigo-900'
              }`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Primary Action Button */}
            <a
              href="#registration-gate"
              onClick={() => sound.playClick()}
              className="hidden sm:inline-flex px-4 py-2 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md shadow-amber-500/20 whitespace-nowrap shrink-0 transition-transform hover:scale-102"
            >
              Register Now
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-slate-700 text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className={`lg:hidden px-4 py-4 space-y-3 border-t text-sm font-semibold ${
            isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <a 
              href="#event-guide" 
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-amber-400"
            >
              Event Guide & 6 Tasks
            </a>
            <a 
              href="#event-schedule" 
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-amber-400"
            >
              Hackathon Schedule
            </a>
            <a 
              href="#prizes-rules" 
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-cyan-400"
            >
              Prizes & Rules
            </a>
            <a 
              href="#ship-arcade" 
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-rose-400"
            >
              Ship Tasks Arcade
            </a>
            <a 
              href="#task-instagram" 
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-pink-400"
            >
              Task 3: Instagram Tag
            </a>
            <a 
              href="#registration-gate" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-center rounded-lg bg-amber-400 text-slate-950 font-bold"
            >
              Register for Codefest (Free)
            </a>
          </div>
        )}
      </div>
    </header>
  );
};
