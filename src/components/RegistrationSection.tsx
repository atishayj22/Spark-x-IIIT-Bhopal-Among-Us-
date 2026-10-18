import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  QrCode, 
  Download, 
  Printer, 
  Share2, 
  ExternalLink,
  Zap,
  Shield,
  Smile
} from 'lucide-react';
import { sound } from '../utils/sound';
import squadImg from '../assets/images/crewmate_squad_poster_1792328174461.jpg';

interface RegistrationSectionProps {
  isDarkMode: boolean;
  onRegistered: () => void;
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({
  isDarkMode,
  onRegistered,
}) => {
  const [crewmateName, setCrewmateName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('Indian Institute of Information Technology (IIIT) Bhopal');
  const [teamName, setTeamName] = useState('The Sus Coders');
  const [crewRole, setCrewRole] = useState('Frontend Engineer');
  const [repoUrl, setRepoUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [ticketGenerated, setTicketGenerated] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const roles = [
    'Frontend Engineer',
    'Full-Stack Crewmate',
    'UI/UX Saboteur',
    'DevOps Ghost',
    'Security Impostor Hunter',
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!crewmateName || !email) return;

    sound.playCardSuccess();
    const generatedId = `SPARK-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(generatedId);
    setTicketGenerated(true);
    onRegistered();

    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.7 },
      colors: ['#F45858', '#67C9F5', '#FFD166', '#8DD982', '#B8A5F5'],
    });
  };

  return (
    <section id="registration-gate" className="py-16 border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>OFFICIAL REGISTRATION // OFFLINE ENTRY PASS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Register Squad & Mint Boarding Pass
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 max-w-md">
            Join 200+ crewmates at the 36-hour offline hackathon at IIIT Bhopal (28–29 October 2026). Registration is 100% free! Final registration deadline: <strong>25 October 2026 at 11:59 PM</strong>.
          </p>
        </div>

        {/* 2-Column Registration & Boarding Pass Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Column */}
          <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
              <span className="text-xs font-mono text-rose-400 tracking-wider uppercase font-bold">
                SPARK X IIIT BHOPAL // OFFICIAL OFFLINE EVENT REGISTRATION
              </span>
              <span className="text-[11px] font-mono text-emerald-400">STATUS: OPEN (OFFLINE)</span>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">
                    CREWMATE NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={crewmateName}
                    onChange={(e) => setCrewmateName(e.target.value)}
                    placeholder="e.g. Alex Red"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-rose-500 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="crewmate@iiitbhopal.ac.in"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-rose-500 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">
                    COLLEGE / INSTITUTION
                  </label>
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="IIIT Bhopal"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-rose-500 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">
                    SQUAD / TEAM NAME
                  </label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="e.g. Electrical Saboteurs"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-rose-500 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">
                  MISSION ROLE SPECIALIZATION
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {roles.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setCrewRole(r);
                      }}
                      className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-all text-left truncate cursor-pointer ${
                        crewRole === r
                          ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">
                    GITHUB REPOSITORY URL (OPTIONAL)
                  </label>
                  <input
                    type="url"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">
                    LIVE DEPLOYED URL (OPTIONAL)
                  </label>
                  <input
                    type="url"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    placeholder="https://...vercel.app"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-rose-500 to-rose-600 hover:opacity-95 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4 fill-slate-950" />
                <span>Issue Official Offline Crewmate Boarding Pass</span>
              </button>
            </form>
          </div>

          {/* Ticket / Boarding Pass Showcase Column */}
          <div className="lg:col-span-5 space-y-4">
            {ticketGenerated ? (
              <div className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-2 border-amber-400/80 rounded-3xl p-6 shadow-[0_0_40px_rgba(255,209,102,0.25)] relative overflow-hidden">
                {/* Hazard Top Stripe */}
                <div className="h-2 bg-hazard-stripes -mx-6 -mt-6 mb-5" />

                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center text-slate-950 font-black text-xs">
                      ⚡
                    </div>
                    <div>
                      <div className="text-xs font-black text-white">SPARK X IIIT BHOPAL</div>
                      <div className="text-[10px] font-mono text-amber-400">OFFLINE CREWMATE BOARDING PASS</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                    OFFLINE VERIFIED
                  </span>
                </div>

                <div className="space-y-3 py-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">CREWMATE:</span>
                    <span className="font-bold text-white">{crewmateName || 'Red Astronaut'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">SQUAD:</span>
                    <span className="font-bold text-cyan-300">{teamName || 'Solo Explorer'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">ROLE:</span>
                    <span className="font-bold text-rose-400">{crewRole}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">COLLEGE:</span>
                    <span className="font-bold text-slate-200 truncate max-w-[200px]">{college}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">PASS ID:</span>
                    <span className="font-bold text-amber-400">{ticketId}</span>
                  </div>
                </div>

                {/* Simulated Barcode */}
                <div className="mt-4 pt-4 border-t border-dashed border-slate-800 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex gap-1 h-8 items-end">
                      {[3, 1, 4, 2, 5, 1, 2, 6, 2, 4, 1, 5, 3, 2, 4, 1, 3].map((h, i) => (
                        <div key={i} className="bg-white w-1" style={{ height: `${h * 5}px` }} />
                      ))}
                    </div>
                    <div className="text-[9px] font-mono text-slate-500">
                      AUTH-HASH-{ticketId}
                    </div>
                  </div>

                  <div className="w-14 h-14 bg-white rounded-lg p-1 flex items-center justify-center">
                    <QrCode className="w-12 h-12 text-slate-950" />
                  </div>
                </div>

                {/* Print button */}
                <button
                  onClick={() => {
                    sound.playClick();
                    window.print();
                  }}
                  className="w-full mt-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save Ticket</span>
                </button>
              </div>
            ) : (
              <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 text-center space-y-4">
                <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-lg">
                  <img
                    src={squadImg}
                    alt="Among Us Anime Squad"
                    className="w-full h-auto aspect-square object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                    <span className="text-xs font-mono font-bold text-amber-300">
                      SQUAD UP · READY TO CODE!
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-400 leading-relaxed font-mono">
                  Fill out the registration form to mint your official Spark X Skeld boarding pass and secure your team slot!
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
