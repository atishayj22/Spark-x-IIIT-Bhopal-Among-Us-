import React, { useState, useEffect } from 'react';
import { Zap, Fuel, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';

interface LightsSabotageProps {
  isDarkMode: boolean;
  onSabotageFixed: () => void;
  isTask2Done: boolean;
}

export const LightsSabotage: React.FC<LightsSabotageProps> = ({
  isDarkMode,
  onSabotageFixed,
  isTask2Done,
}) => {
  const [isFlickering, setIsFlickering] = useState<boolean>(false);
  const [hasTriggered, setHasTriggered] = useState<boolean>(false);
  const [fuelLevel, setFuelLevel] = useState<number>(0);
  const [showRefuelModal, setShowRefuelModal] = useState<boolean>(false);

  // Trigger lights fluctuation when scrolling down past 350px
  useEffect(() => {
    if (isTask2Done) {
      setIsFlickering(false);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 350 && !hasTriggered && !isTask2Done) {
        setHasTriggered(true);
        setIsFlickering(true);
        sound.playSparkFlicker();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasTriggered, isTask2Done]);

  // Turn off flicker if task 2 is marked done externally
  useEffect(() => {
    if (isTask2Done) {
      setIsFlickering(false);
      setShowRefuelModal(false);
    }
  }, [isTask2Done]);

  const handlePumpFuel = () => {
    sound.playRefuel();
    setFuelLevel((prev) => {
      const next = Math.min(100, prev + 25);
      if (next >= 100) {
        setTimeout(() => {
          sound.playTaskComplete();
          setIsFlickering(false);
          setShowRefuelModal(false);
          onSabotageFixed();
        }, 500);
      }
      return next;
    });
  };

  return (
    <>
      {/* Visual Flickering Strobe Overlay when lights are fluctuating */}
      {isFlickering && !isTask2Done && (
        <div className="fixed inset-0 pointer-events-none z-30 animate-pulse bg-slate-950/45 mix-blend-multiply transition-opacity duration-100" />
      )}

      {/* Floating Alert Bar: Task 2 Refuel Engines to Fix Lights */}
      {isFlickering && !isTask2Done && (
        <div className="fixed bottom-6 inset-x-4 max-w-xl mx-auto z-40 bg-slate-950/95 border-2 border-rose-600 rounded-2xl p-4 shadow-[0_0_40px_rgba(244,88,88,0.7)] backdrop-blur-md flex items-center justify-between gap-3 animate-bounce">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-600 flex items-center justify-center text-white shrink-0 shadow-lg">
              <Zap className="w-5 h-5 animate-ping" />
            </div>
            <div>
              <div className="text-xs font-mono font-black text-rose-400 tracking-wider">
                WEBSITE TASK 02: LIGHTS FLUCTUATING!
              </div>
              <div className="text-[11px] text-slate-300 font-mono">
                Refuel the engine canister to restore ship power & stabilize lighting.
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              setShowRefuelModal(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 cursor-pointer whitespace-nowrap flex items-center gap-1.5"
          >
            <Fuel className="w-3.5 h-3.5" />
            <span>Refuel (Fix Lights)</span>
          </button>
        </div>
      )}

      {/* Refueling Mini-Task Modal for Lights Stabilization */}
      {showRefuelModal && !isTask2Done && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="max-w-md w-full bg-slate-900 border-2 border-amber-400 rounded-3xl p-6 shadow-2xl relative text-center space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase">
                <Fuel className="w-4 h-4" />
                <span>TASK 02: REFUEL TO FIX LIGHTS</span>
              </div>
              <span className="text-xs font-mono text-slate-400">{fuelLevel}% FULL</span>
            </div>

            {/* Skeld Fuel Canister Visual */}
            <div className="relative w-36 h-48 mx-auto bg-slate-950 border-4 border-slate-700 rounded-2xl overflow-hidden p-2 flex flex-col justify-end shadow-inner">
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-3 bg-amber-500 rounded-t-sm" />
              
              <div 
                className="w-full bg-gradient-to-t from-amber-600 to-amber-400 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.6)]"
                style={{ height: `${fuelLevel}%` }}
              />

              <div className="absolute inset-y-3 right-3 flex flex-col justify-between text-[9px] font-mono text-slate-500 pointer-events-none">
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 font-mono">
              Pump fuel into the auxiliary generator to clear the electrical fluctuation and complete Task 2!
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
              <span>{fuelLevel >= 100 ? 'Fuel Full! Lights Restored ✓' : 'Pump Rocket Fuel (25%)'}</span>
            </button>

            <button
              onClick={() => setShowRefuelModal(false)}
              className="text-xs text-slate-500 hover:text-slate-300 font-mono"
            >
              Close Window
            </button>
          </div>
        </div>
      )}
    </>
  );
};
