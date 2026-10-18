import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Sparkles, Coffee, Code2, Award, Users } from 'lucide-react';
import { sound } from '../utils/sound';

interface EventScheduleProps {
  isDarkMode: boolean;
}

export const EventSchedule: React.FC<EventScheduleProps> = ({ isDarkMode }) => {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);

  const day1Events = [
    { time: '09:00 AM - 10:00 AM', title: 'Crewmate Check-in & Airlock Entry', desc: 'Arrive at IIIT Bhopal NTB Audi. Collect your official badge, swag bag, and Wi-Fi credentials.', icon: Users },
    { time: '10:00 AM - 10:45 AM', title: 'Mission Launch & Opening Keynote', desc: 'Opening ceremony by Spark X IIIT Bhopal leads, challenge theme reveal, and rules briefing.', icon: Sparkles },
    { time: '11:00 AM', title: 'Coding Sprint 01 Kicks Off', desc: 'Teams begin designing and building their web apps across the auditorium and computing labs.', icon: Code2 },
    { time: '01:30 PM - 02:30 PM', title: 'Lunch & Crewmate Recharge', desc: 'Complimentary hot lunch and refreshments served at the campus mess.', icon: Coffee },
    { time: '04:30 PM - 06:00 PM', title: 'Mentor Review & Guidance Round', desc: 'Senior engineers and student mentors review project progress and advise on architecture.', icon: Award },
    { time: '08:30 PM - 09:30 PM', title: 'Dinner & Real-Life Among Us Game', desc: 'Dinner served alongside an interactive live Among Us mini-game in the campus quad!', icon: Coffee },
    { time: '11:30 PM', title: 'Midnight Pizza & Cyber Night Sprint', desc: 'Hot pizza slices, energy drinks, and intense overnight hacking for night-owl squads.', icon: Sparkles },
  ];

  const day2Events = [
    { time: '08:00 AM - 09:00 AM', title: 'Morning Fuel & Breakfast', desc: 'Breakfast, hot coffee, and team morning stand-ups.', icon: Coffee },
    { time: '09:00 AM - 11:30 AM', title: 'Final Coding Sprint & Polish', desc: 'Last push to fix bugs, test mobile responsiveness, and polish UI micro-interactions.', icon: Code2 },
    { time: '11:30 AM', title: 'HARD CODE FREEZE & Deployment', desc: 'All GitHub repositories locked and live Vercel URLs submitted for evaluation.', icon: Award },
    { time: '12:00 PM - 01:30 PM', title: 'Lunch & Relax Session', desc: 'Buffet lunch for all participants before the live project demonstrations.', icon: Coffee },
    { time: '01:30 PM - 03:30 PM', title: 'Grand Jury Demo & Impostor Trial', desc: 'Top teams pitch live on stage to our judging panel of tech leads and professors.', icon: Sparkles },
    { time: '04:00 PM - 05:00 PM', title: 'Award Ceremony & Swag Drop', desc: 'Announcement of ₹50,000+ prize winners, trophy handover, and group photos!', icon: Award },
  ];

  const currentEvents = activeDay === 1 ? day1Events : day2Events;

  return (
    <section id="event-schedule" className="py-14 sm:py-18 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>OFFLINE EVENT ITINERARY // 36-HOUR RUNWAY</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Hackathon Schedule & Timeline
            </h2>
          </div>

          {/* Day Toggle Buttons */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl">
            <button
              onClick={() => {
                sound.playClick();
                setActiveDay(1);
              }}
              className={`px-5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeDay === 1
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              DAY 01 · 28 OCT
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveDay(2);
              }}
              className={`px-5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeDay === 2
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              DAY 02 · 29 OCT
            </button>
          </div>
        </div>

        {/* Timeline Events List */}
        <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border-2 border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="space-y-4">
            {currentEvents.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/40 text-amber-300 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-400 font-sans mt-0.5 max-w-xl">
                        {item.desc}
                      </div>
                    </div>
                  </div>

                  <div className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-amber-300 font-bold shrink-0 self-end sm:self-center">
                    {item.time}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>VENUE: IIIT BHOPAL CAMPUS (AUDITORIUM & LABS)</span>
            <span className="text-emerald-400 font-bold">ALL SESSIONS OFFLINE</span>
          </div>
        </div>

      </div>
    </section>
  );
};
