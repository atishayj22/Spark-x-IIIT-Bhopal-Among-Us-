import React from 'react';
import { 
  Zap, 
  ArrowRight, 
  Terminal, 
  ShieldCheck, 
  Sparkles, 
  Play,
  Flame,
  Award
} from 'lucide-react';
import { sound } from '../utils/sound';
import bannerImg from '../assets/images/spark_amongus_banner_1792328174098.jpg';

interface HeroSectionProps {
  isDarkMode: boolean;
  onOpenRegister: () => void;
  onTriggerEmergency: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  isDarkMode,
  onOpenRegister,
  onTriggerEmergency,
}) => {
  return (
    <section className="relative pt-6 pb-16 sm:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top Kicker Label */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono mb-4 text-slate-400">
          <span className="font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 fill-amber-400" />
            SPARK X · IIIT BHOPAL
          </span>
          <span aria-hidden="true">·</span>
          <span>WEB MISSION 01</span>
          <span aria-hidden="true">·</span>
          <span className="text-rose-400">THE SKELD HACKATHON</span>
        </div>

        {/* 2-Column Split: Hero Headline & Interactive Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Column 1: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-balance">
              Turn Your Wildest Ideas Into A{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-500 to-cyan-400">
                Live Web Expedition
              </span>
            </h1>

            {/* Clear value proposition answering what is this event */}
            <p className={`text-base sm:text-lg leading-relaxed max-w-2xl ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              <strong>Crewmate Codefest</strong> is a premier <strong>offline 36-hour web hackathon</strong> on the <strong>IIIT Bhopal Campus</strong>. 
              Teams of 1–4 students tackle <strong>6 physical event tasks</strong> inspired by Among Us to design, code, and deploy live production web apps.
            </p>

            {/* Instant Key Fact Tags */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">FORMAT</span>
                <span className="text-amber-300 font-bold">100% Offline</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">VENUE</span>
                <span className="text-cyan-300 font-bold">IIIT Bhopal</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">EVENT DATES</span>
                <span className="text-slate-200 font-bold">28–29 Oct</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-rose-900/80 bg-rose-950/20">
                <span className="text-rose-400 block text-[10px] font-bold">LAST DATE</span>
                <span className="text-rose-300 font-black">25 Oct 2026</span>
              </div>
            </div>

            {/* Quick Action CTAs: Exactly what to click first */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#registration-gate"
                onClick={() => sound.playClick()}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-rose-600/30 flex items-center gap-2 transform hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <span>1. Register Squad (Free)</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#event-guide"
                onClick={() => sound.playClick()}
                className={`px-5 py-3.5 rounded-xl border text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  isDarkMode 
                    ? 'border-amber-500/50 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300' 
                    : 'border-amber-400 bg-amber-50 hover:bg-amber-100 text-amber-900'
                }`}
              >
                <span>2. View 6 Offline Tasks</span>
              </a>

              <a
                href="#task-instagram"
                onClick={() => sound.playClick()}
                className={`px-4 py-3.5 rounded-xl border text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  isDarkMode 
                    ? 'border-pink-900/60 bg-pink-950/40 text-pink-300 hover:bg-pink-950/70' 
                    : 'border-pink-200 bg-pink-50 text-pink-700 hover:bg-pink-100'
                }`}
              >
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span>3. Complete Task 3</span>
              </a>
            </div>

            {/* Verification & Metadata tags (anti-pill unboxed text with bullets) */}
            <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Eligibility: All College Students (B.Tech, BCA, MCA)</span>
              </div>
              <span aria-hidden="true">·</span>
              <span>₹0 Registration Fee</span>
              <span aria-hidden="true">·</span>
              <span>Teams 1–4 Members</span>
            </div>
          </div>

          {/* Column 2: High-impact Anime Gaming Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-slate-700/80 shadow-[0_0_40px_rgba(244,88,88,0.25)] group">
              <img
                src={bannerImg}
                alt="Spark X IIIT Bhopal Among Us Web Mission"
                className="w-full h-auto aspect-video lg:aspect-auto lg:h-[420px] object-cover transform group-hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Floating Live Badge Over Image */}
              <div className="absolute top-4 left-4 bg-slate-950/90 border border-slate-700 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs font-mono text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span>MISSION: IN PROGRESS</span>
              </div>

              {/* Bottom Holographic HUD overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono text-amber-400">THE SKELD NAVIGATION</div>
                    <div className="text-sm font-bold">5 Web Disciplines Activated</div>
                  </div>
                  <div className="px-2.5 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs font-mono">
                    ONLINE
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative anime sticker in corner */}
            <div className="absolute -bottom-5 -right-3 bg-gradient-to-r from-amber-400 to-rose-500 text-slate-950 p-3 rounded-2xl shadow-xl transform rotate-3 flex items-center gap-2 font-black text-xs">
              <Award className="w-4 h-4" />
              <span>OFFICIAL OFFLINE EVENT</span>
            </div>
          </div>

        </div>

        {/* Full-width 4-Column KPI/Proof Strip (adjacent to claim) */}
        <div className={`mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl border transition-colors ${
          isDarkMode 
            ? 'bg-slate-900/60 border-slate-800' 
            : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-black font-mono text-amber-400 tabular-nums">
              36h
            </div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">
              Rapid Web Sprint Duration
            </div>
          </div>

          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-black font-mono text-rose-500 tabular-nums">
              ₹50,000+
            </div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">
              Prize Pool & Goodies
            </div>
          </div>

          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-400 tabular-nums">
              6 Tasks
            </div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">
              Offline Hackathon Tasks
            </div>
          </div>

          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 tabular-nums">
              0% Fee
            </div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">
              Open to All College Students
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
