import React, { useState } from 'react';
import { Award, Trophy, Gift, HelpCircle, ChevronDown, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { sound } from '../utils/sound';

interface PrizesAndRulesProps {
  isDarkMode: boolean;
}

export const PrizesAndRules: React.FC<PrizesAndRulesProps> = ({ isDarkMode }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const prizes = [
    {
      rank: '1ST PLACE',
      title: 'Golden Crewmate Award',
      amount: '₹25,000',
      color: '#FFD166',
      perks: ['Official Winner Trophy', 'Custom Among Us Winner Hoodies', 'Direct Mentorship & Interview Fast-track', 'Certificates of Excellence'],
    },
    {
      rank: '2ND PLACE',
      title: 'Silver Visor Award',
      amount: '₹15,000',
      color: '#67C9F5',
      perks: ['Runner-up Silver Trophy', 'Spark X Swag Bags & Kits', 'Exclusive IIIT Bhopal Goodies', 'Certificates of Excellence'],
    },
    {
      rank: 'SPECIAL PRIZE',
      title: 'Master Impostor / Best UX',
      amount: '₹10,000',
      color: '#F45858',
      perks: ['Most Creative / Viral Feature', 'Mechanical Keyboards & Gaming Gear', 'Official Certificates', 'Among Us Special Plushies'],
    },
  ];

  const faqs = [
    {
      q: 'Who is eligible to participate in Crewmate Codefest?',
      a: 'Any student enrolled in an undergraduate or postgraduate program (B.Tech, BCA, MCA, B.Sc, M.Tech, all branches & years) from any recognized college or university is eligible. Solo crewmates or squads of 1–4 are welcome!',
    },
    {
      q: 'Is there any registration fee to participate?',
      a: 'No, registration is 100% FREE! There are zero hidden costs. Meals, snacks, high-speed Wi-Fi, and swag are provided free by Spark X IIIT Bhopal.',
    },
    {
      q: 'What is the format and venue of the hackathon?',
      a: 'This is a 100% OFFLINE event hosted on-campus at IIIT Bhopal (NTB Auditorium & Advanced Computing Labs). You must be present physically during October 28–29, 2026.',
    },
    {
      q: 'What should we bring with us to the campus?',
      a: 'Bring your laptop, charger, college ID card, student credentials, and lots of enthusiasm! Power sockets and high-speed campus Wi-Fi are provided.',
    },
    {
      q: 'What is the last date to register?',
      a: 'The final registration deadline is 25 October 2026 at 11:59 PM IST. Ensure your team registers and mints their boarding pass before slots fill up!',
    },
  ];

  return (
    <section id="prizes-rules" className="py-14 sm:py-18 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section 1: Prizes */}
        <div className="mb-14">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-1.5 flex items-center justify-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>₹50,000+ PRIZE POOL & REWARDS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Bounties For Victorious Crewmates
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {prizes.map((p, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-900/90 border-2 border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between shadow-xl relative overflow-hidden group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span 
                      className="px-3 py-1 rounded-full text-slate-950 text-xs font-black font-mono tracking-wider"
                      style={{ backgroundColor: p.color }}
                    >
                      {p.rank}
                    </span>
                    <Trophy className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
                  </div>

                  <div className="text-3xl sm:text-4xl font-black font-mono text-white mb-1">
                    {p.amount}
                  </div>
                  <div className="text-sm font-bold text-slate-200 mb-4">
                    {p.title}
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    {p.perks.map((perk, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 text-[10px] font-mono text-slate-500">
                  OFFICIAL SPARK X IIIT BHOPAL GRANT
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Frequently Asked Questions & Rules Accordion */}
        <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-10 border-2 border-slate-800 shadow-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase mb-2">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span>HACKATHON RULES & FAQs</span>
          </div>
          <h3 className="text-xl sm:text-3xl font-black text-white mb-6">
            Frequently Asked Questions
          </h3>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => {
                      sound.playClick();
                      setOpenFaq(isOpen ? null : idx);
                    }}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-amber-400' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed border-t border-slate-900">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-2">
            <span>HAVE MORE QUESTIONS? REACH OUT ON DISCORD</span>
            <span className="text-amber-400 font-bold">LAST DATE: 25 OCTOBER 2026</span>
          </div>
        </div>

      </div>
    </section>
  );
};
