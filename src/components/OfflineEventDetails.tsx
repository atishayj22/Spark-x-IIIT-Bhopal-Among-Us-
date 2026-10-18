import React from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  HelpCircle,
  AlertTriangle,
  Zap,
  Target
} from 'lucide-react';
import { sound } from '../utils/sound';

interface OfflineEventDetailsProps {
  isDarkMode: boolean;
  onOpenRegister: () => void;
  onJumpToTask3: () => void;
}

export const OfflineEventDetails: React.FC<OfflineEventDetailsProps> = ({
  isDarkMode,
  onOpenRegister,
  onJumpToTask3,
}) => {
  const offlineTasks = [
    {
      num: '01',
      title: 'Plan & Storyboard Brief',
      desc: 'Form your squad and map out your web application blueprint and user journey on paper.',
      badge: 'TASK 1 · PLAN',
    },
    {
      num: '02',
      title: 'Skeld UI & Design System',
      desc: 'Build your game-inspired color palette, typography hierarchy, and laptop-first layout.',
      badge: 'TASK 2 · DESIGN',
    },
    {
      num: '03',
      title: 'Local Code Sprint',
      desc: 'Develop working React & Tailwind components with zero dead clicks or empty placeholders.',
      badge: 'TASK 3 · BUILD',
    },
    {
      num: '04',
      title: 'Impostor Bug Hunt',
      desc: 'Audit your codebase for leaked API credentials, security flaws, and responsive overflow.',
      badge: 'TASK 4 · TEST',
    },
    {
      num: '05',
      title: 'Hangar to Orbit Deploy',
      desc: 'Push to GitHub and ship a live, production-grade URL on Vercel with zero broken images.',
      badge: 'TASK 5 · DEPLOY',
    },
    {
      num: '06',
      title: 'Live Crew Showcase',
      desc: 'Pitch your live web app to the judging jury and defend your project against the Impostor vote!',
      badge: 'TASK 6 · PITCH',
    },
  ];

  return (
    <section id="event-guide" className="py-12 sm:py-16 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Quick Orientation Banner: 4 Immediate Answers */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-2 border-amber-400/80 shadow-[0_0_40px_rgba(255,209,102,0.15)] mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase mb-2">
            <Target className="w-4 h-4 text-amber-400" />
            <span>QUICK ORIENTATION GUIDE // EVERYTHING YOU NEED TO KNOW</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
            Welcome to Spark X IIIT Bhopal — Crewmate Codefest
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            {/* Q1 */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <span className="text-amber-400 font-bold block mb-1">1. WHAT IS THIS EVENT?</span>
              <p className="text-slate-300 font-sans leading-relaxed">
                An intense <strong>36-hour offline campus web hackathon</strong> where student squads build live, game-inspired web experiences based on our official Web Mission handbook.
              </p>
            </div>

            {/* Q2 */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <span className="text-rose-400 font-bold block mb-1">2. WHAT CAN I DO HERE?</span>
              <p className="text-slate-300 font-sans leading-relaxed">
                Complete the <strong>3 Website Tasks</strong> above, test ship arcade mini-games, review the ₹50,000+ prize pool, and <strong>mint your Boarding Pass</strong> for the offline hackathon!
              </p>
            </div>

            {/* Q3 */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <span className="text-cyan-400 font-bold block mb-1">3. HOW TO REGISTER?</span>
              <p className="text-slate-300 font-sans leading-relaxed">
                Scroll to the registration section or click <strong>"Register Your Squad"</strong>. Registration is 100% free for all college students until <strong>25 October</strong>!
              </p>
            </div>

            {/* Q4 */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <span className="text-emerald-400 font-bold block mb-1">4. WHAT SHOULD I CLICK FIRST?</span>
              <p className="text-slate-300 font-sans leading-relaxed">
                Click <strong>"Register Now"</strong> below to claim your ticket, then scroll down to experience the <strong>lights refuel</strong> & <strong>Instagram tag task</strong>!
              </p>
            </div>
          </div>

          {/* Quick CTA Buttons directly in the orientation banner */}
          <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                onOpenRegister();
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <span>Register For Offline Hackathon</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onJumpToTask3();
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Complete Task 3 (Tag on Instagram)</span>
            </button>

            <span className="text-xs font-mono text-rose-400 ml-auto font-bold">
              REGISTRATION DEADLINE: 25 OCTOBER 2026
            </span>
          </div>
        </div>

        {/* Event Logistics Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          
          {/* Box 1: Date & Time */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/50 text-amber-400 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase">HACKATHON DATES</span>
              <div className="text-sm font-bold text-white mt-0.5">28 – 29 October 2026</div>
              <div className="text-xs text-amber-300 font-mono mt-1">36-Hour Continuous Sprint</div>
            </div>
          </div>

          {/* Box 2: Offline Venue */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/50 text-rose-400 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase">VENUE (OFFLINE FORMAT)</span>
              <div className="text-sm font-bold text-white mt-0.5">IIIT Bhopal Campus</div>
              <div className="text-xs text-slate-300 font-mono mt-1">NTB Auditorium & Lab 101</div>
            </div>
          </div>

          {/* Box 3: Eligibility */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-400/20 border border-cyan-400/50 text-cyan-400 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase">ELIGIBILITY & TEAMS</span>
              <div className="text-sm font-bold text-white mt-0.5">All College Students</div>
              <div className="text-xs text-cyan-300 font-mono mt-1">1 to 4 Crewmates Per Squad</div>
            </div>
          </div>

          {/* Box 4: Registration Deadline */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-rose-600/70 shadow-lg shadow-rose-950/40 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-600/20 border border-rose-500/50 text-rose-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-rose-400 uppercase font-bold">LAST DATE TO REGISTER</span>
              <div className="text-sm font-bold text-white mt-0.5">25 October 2026</div>
              <div className="text-xs text-rose-300 font-mono mt-1">Closes at 11:59 PM IST</div>
            </div>
          </div>

        </div>

        {/* The 6 Offline Tasks Section */}
        <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-10 border-2 border-slate-800 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-8 border-b border-slate-800">
            <div>
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>OFFLINE COMPETITION FORMAT</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                The 6 Physical Hackathon Tasks to Conquer
              </h3>
            </div>

            <p className="text-xs font-mono text-slate-400 max-w-sm">
              During the 36 hours at IIIT Bhopal, every squad will solve these 6 offline stages to win the prize pool!
            </p>
          </div>

          {/* 6 Task Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {offlineTasks.map((t) => (
              <div
                key={t.num}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-amber-400 font-bold">{t.badge}</span>
                    <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 text-[10px] font-mono flex items-center justify-center text-slate-400">
                      {t.num}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {t.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {t.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-900 text-[10px] font-mono text-slate-500 flex items-center justify-between">
                  <span>STAGE STATUS: SCHEDULED</span>
                  <span className="text-emerald-400">OFFLINE ON CAMPUS</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Hackathon Perks */}
          <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs font-mono">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <div className="text-amber-400 font-bold text-sm">₹50,000+</div>
              <div className="text-slate-400 text-[11px] mt-0.5">Prize Pool & Grants</div>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <div className="text-rose-400 font-bold text-sm">Free Meals</div>
              <div className="text-slate-400 text-[11px] mt-0.5">Snacks & Refreshments</div>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <div className="text-cyan-400 font-bold text-sm">Merch & Kits</div>
              <div className="text-slate-400 text-[11px] mt-0.5">Crewmate Stickers & Tees</div>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <div className="text-emerald-400 font-bold text-sm">Certificates</div>
              <div className="text-slate-400 text-[11px] mt-0.5">Official IIIT Bhopal Creds</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
