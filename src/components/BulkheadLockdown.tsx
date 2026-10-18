import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Unlock, 
  Fuel, 
  AlertTriangle, 
  Sparkles, 
  ArrowUp,
  CheckCircle2,
  Wind
} from 'lucide-react';
import { sound } from '../utils/sound';
import { UserRole } from './RoleIntroScreen';

interface BulkheadLockdownProps {
  isLocked: boolean;
  onUnlock: () => void;
  userRole: UserRole;
  onOpenVent: () => void;
}

export const BulkheadLockdown: React.FC<BulkheadLockdownProps> = ({
  isLocked,
  onUnlock,
  userRole,
  onOpenVent,
}) => {
  const [fuelLevel, setFuelLevel] = useState<number>(0);
  const [isPumping, setIsPumping] = useState<boolean>(false);
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false);

  // When locked, prevent scrolling past the bulkhead position unless refueled or vented!
  useEffect(() => {
    if (!isLocked) return;

    const handleScroll = () => {
      // If user tries to scroll up above 500px while locked, snap them back down
      if (window.scrollY < 650 && isLocked) {
        window.scrollTo({ top: 680, behavior: 'auto' });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLocked]);

  const handleStartRefuel = () => {
    sound.playClick();
    setShowTaskModal(true);
  };

  const handlePumpFuel = () => {
    sound.playRefuel();
    setIsPumping(true);
    setFuelLevel((prev) => {
      const next = Math.min(100, prev + 25);
      if (next >= 100) {
        setTimeout(() => {
          sound.playTaskComplete();
          setIsPumping(false);
          setShowTaskModal(false);
          onUnlock();
          // Scroll up smoothly
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 500);
      } else {
        setTimeout(() => setIsPumping(false), 200);
      }
      return next;
    });
  };

  if (!isLocked) {
    return null;
  }

  return (
    <>
      {/* Heavy Bulkhead Gate Visual Barrier Across Screen */}
      <div className="sticky top-20 z-40 w-full bg-slate-950/95 border-y-4 border-rose-600 shadow-[0_0_50px_rgba(244,88,88,0.5)] backdrop-blur-md py-4 px-4 sm:px-8 my-6">
        <div className="h-2 bg-hazard-stripes -mx-4 sm:-mx-8 -mt-4 mb-3" />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-xl bg-rose-600/30 border-2 border-rose-500 flex items-center justify-center text-rose-400 shrink-0 animate-pulse">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-widest">
                  UPPER BULKHEAD LOCKED
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-xs font-mono text-amber-400">LOW FUEL PRESSURE</span>
              </div>
              <p className="text-xs text-slate-300 font-mono">
                Bulkhead gate closed! You cannot scroll up to the bridge until you refuel engines.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* If Engineer or Impostor, allow venting past gate */}
            {(userRole === 'impostor' || userRole === 'engineer') && (
              <button
                onClick={() => {
                  sound.playVent();
                  onOpenVent();
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer animate-bounce"
              >
                <Wind className="w-4 h-4" />
                <span>Bypass Gate Via Vent ({userRole.toUpperCase()})</span>
              </button>
            )}

            {/* Refuel Engine Button to unlock gate for anyone */}
            <button
              onClick={handleStartRefuel}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-rose-600/30 cursor-pointer"
            >
              <Fuel className="w-4 h-4" />
              <span>Refuel Engines (Unlock Gate)</span>
            </button>
          </div>
        </div>

        <div className="h-2 bg-hazard-stripes -mx-4 sm:-mx-8 -mb-4 mt-3" />
      </div>

      {/* Refueling Mini-Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-md w-full bg-slate-900 border-2 border-amber-400 rounded-3xl p-6 shadow-2xl relative text-center space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase">
                <Fuel className="w-4 h-4" />
                <span>STORAGE BAY: REFUELING ENGINES</span>
              </div>
              <span className="text-xs font-mono text-slate-400">{fuelLevel}% FILLED</span>
            </div>

            {/* Skeld Fuel Canister Visual */}
            <div className="relative w-36 h-52 mx-auto bg-slate-950 border-4 border-slate-700 rounded-2xl overflow-hidden p-2 flex flex-col justify-end shadow-inner">
              {/* Canister Cap */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-3 bg-amber-500 rounded-t-sm" />
              
              {/* Fluid Fill */}
              <div 
                className="w-full bg-gradient-to-t from-amber-600 to-amber-400 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.6)]"
                style={{ height: `${fuelLevel}%` }}
              />

              {/* Gauge Level Markers */}
              <div className="absolute inset-y-3 right-3 flex flex-col justify-between text-[9px] font-mono text-slate-500 pointer-events-none">
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 font-mono">
              Click the pump repeatedly to fill the engine canister with rocket fuel!
            </p>

            <button
              onClick={handlePumpFuel}
              disabled={fuelLevel >= 100}
              className={`w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer ${
                fuelLevel >= 100
                  ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/30'
                  : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-400/30'
              }`}
            >
              <Fuel className="w-4 h-4" />
              <span>{fuelLevel >= 100 ? 'Canister Full! Unlocking Gate...' : 'Pump Fuel Into Canister'}</span>
            </button>

            <button
              onClick={() => setShowTaskModal(false)}
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors font-mono"
            >
              Cancel Refueling
            </button>
          </div>
        </div>
      )}
    </>
  );
};
