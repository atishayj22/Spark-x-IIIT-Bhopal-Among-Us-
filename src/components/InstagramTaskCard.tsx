import React from 'react';
import confetti from 'canvas-confetti';
import { 
  Instagram, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  Share2, 
  Heart,
  Check,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { sound } from '../utils/sound';

interface InstagramTaskCardProps {
  isTaskCompleted: boolean;
  onComplete: () => void;
  allTasksCompleted: boolean;
}

export const InstagramTaskCard: React.FC<InstagramTaskCardProps> = ({
  isTaskCompleted,
  onComplete,
  allTasksCompleted,
}) => {
  const handleConfirmStory = () => {
    sound.playTaskComplete();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#E1306C', '#F56040', '#FCAF45', '#8DD982', '#67C9F5']
    });
    onComplete();
  };

  const handleOpenInsta = () => {
    sound.playClick();
    window.open('https://instagram.com', '_blank');
  };

  return (
    <section id="task-instagram" className="py-12 sm:py-16 border-t border-slate-800/80 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className={`p-6 sm:p-10 rounded-3xl border-2 transition-all shadow-2xl relative overflow-hidden ${
          isTaskCompleted
            ? 'bg-slate-900/90 border-emerald-500 shadow-emerald-950/30'
            : 'bg-slate-900/95 border-pink-500/80 shadow-[0_0_50px_rgba(236,72,153,0.25)]'
        }`}>
          {/* Top Hazard Accent */}
          <div className="h-2 bg-hazard-stripes -mx-6 sm:-mx-10 -mt-6 sm:-mt-10 mb-6 sm:mb-8" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Left Content */}
            <div className="space-y-4 text-center md:text-left flex-1">
              <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono">
                <span className="px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/50 text-pink-300 font-bold flex items-center gap-1.5">
                  <Instagram className="w-3.5 h-3.5" />
                  <span>WEBSITE TASK 03 // FINAL TASK</span>
                </span>
                <span className="text-slate-500">·</span>
                <span className={isTaskCompleted ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
                  {isTaskCompleted ? 'STATUS: COMPLETED ✓' : 'ACTION REQUIRED'}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Tag Spark X on Instagram (@spark_iiitbhopal)
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed max-w-xl">
                Add our upcoming Among Us offline hackathon to your Instagram Story and tag <strong>@spark_iiitbhopal</strong>. 
                Once posted, simply click <strong>"Yes, Added to Story!"</strong> below to complete Task 3 and fully secure the spaceship!
              </p>

              {/* Status Note */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-2.5 justify-center md:justify-start">
                {isTaskCompleted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-emerald-300">
                      Task 3 Complete! Your Instagram tag is recorded for priority entry pass.
                    </span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
                    <span>
                      Did you add our event to your Instagram Story? Click below to confirm!
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Right Action & Instagram Mock */}
            <div className="w-full md:w-auto flex flex-col items-center gap-3 shrink-0">
              
              {/* Instagram Story Action Button */}
              {!isTaskCompleted ? (
                <div className="w-full flex flex-col gap-2.5">
                  <button
                    onClick={handleConfirmStory}
                    className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 hover:opacity-95 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-pink-600/40 flex items-center justify-center gap-2.5 transition-transform hover:scale-102 cursor-pointer"
                  >
                    <Check className="w-5 h-5 stroke-[3]" />
                    <span>Yes, Added to Instagram Story!</span>
                  </button>

                  <button
                    onClick={handleOpenInsta}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold font-mono flex items-center justify-center gap-2 border border-slate-700 transition-colors cursor-pointer"
                  >
                    <Instagram className="w-3.5 h-3.5 text-pink-400" />
                    <span>View @spark_iiitbhopal</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </button>
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 mx-auto flex items-center justify-center font-black">
                    ✓
                  </div>
                  <div className="text-xs font-mono font-bold text-emerald-300 uppercase">
                    TASK 03 COMPLETED
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    All 3 website tasks verified!
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* Celebratory Banner when all 3 tasks are complete */}
          {allTasksCompleted && (
            <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/60 text-emerald-300 font-mono text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>ALL 3 TASKS COMPLETED (3/3) · EMERGENCY PROTOCOL CLEARED · SHIP FULLY SECURED!</span>
              </div>
            </div>
          )}

          {/* Bottom Hazard Accent */}
          <div className="h-2 bg-hazard-stripes -mx-6 sm:-mx-10 -mb-6 sm:-mb-10 mt-6 sm:mt-8" />
        </div>

      </div>
    </section>
  );
};
