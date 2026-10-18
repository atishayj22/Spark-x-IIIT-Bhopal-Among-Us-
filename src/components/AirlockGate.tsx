import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Zap, 
  ShieldCheck, 
  CreditCard, 
  AlertTriangle, 
  Sparkles, 
  Lock, 
  Unlock,
  CheckCircle2,
  RefreshCw,
  Radio
} from 'lucide-react';
import { sound } from '../utils/sound';

interface AirlockGateProps {
  onUnlock: () => void;
  isUnlocked: boolean;
  onRelock?: () => void;
}

export const AirlockGate: React.FC<AirlockGateProps> = ({ onUnlock, isUnlocked }) => {
  const [activeTask, setActiveTask] = useState<'wires' | 'card' | 'emergency'>('wires');
  const [doorOpening, setDoorOpening] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(false);

  // Task 1: Fix Wires
  const initialLeftWires = [
    { id: 'red', color: '#F45858', label: 'PWR-RED' },
    { id: 'blue', color: '#67C9F5', label: 'NAV-CYAN' },
    { id: 'yellow', color: '#FFD166', label: 'ENG-YEL' },
    { id: 'purple', color: '#B8A5F5', label: 'COM-PUR' },
  ];
  const initialRightWires = [
    { id: 'blue', color: '#67C9F5', label: 'NAV-CYAN' },
    { id: 'red', color: '#F45858', label: 'PWR-RED' },
    { id: 'purple', color: '#B8A5F5', label: 'COM-PUR' },
    { id: 'yellow', color: '#FFD166', label: 'ENG-YEL' },
  ];
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [connectedWires, setConnectedWires] = useState<{ [key: string]: string }>({});

  // Task 2: Swipe Card
  const [swipeSpeed, setSwipeSpeed] = useState<number>(50); // 0-100, sweet spot is 40-60
  const [swipeStatus, setSwipeStatus] = useState<'idle' | 'swiping' | 'too_fast' | 'too_slow' | 'accepted'>('idle');

  // Task 3: Emergency Button
  const [coverOpen, setCoverOpen] = useState(false);

  const handleWireLeftClick = (id: string) => {
    sound.playClick();
    if (connectedWires[id]) return;
    setSelectedLeft(id);
  };

  const handleWireRightClick = (id: string) => {
    if (!selectedLeft) return;
    if (selectedLeft === id) {
      sound.playWire();
      const updated = { ...connectedWires, [id]: id };
      setConnectedWires(updated);
      setSelectedLeft(null);

      if (Object.keys(updated).length === 4) {
        completeAirlockTask('Wiring System Restored');
      }
    } else {
      sound.playCardFail();
      setSelectedLeft(null);
    }
  };

  const completeAirlockTask = (taskName: string) => {
    setTaskCompleted(true);
    sound.playTaskComplete();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F45858', '#67C9F5', '#FFD166', '#8DD982', '#B8A5F5']
    });

    setTimeout(() => {
      setDoorOpening(true);
      sound.playDoorOpen();
      setTimeout(() => {
        onUnlock();
      }, 1000);
    }, 600);
  };

  const handleInstantOpen = () => {
    sound.playDoorOpen();
    setDoorOpening(true);
    setTimeout(() => {
      onUnlock();
    }, 800);
  };

  // Card Swipe handler
  const handleCardSwipe = () => {
    sound.playClick();
    setSwipeStatus('swiping');
    setTimeout(() => {
      if (swipeSpeed > 75) {
        setSwipeStatus('too_fast');
        sound.playCardFail();
      } else if (swipeSpeed < 30) {
        setSwipeStatus('too_slow');
        sound.playCardFail();
      } else {
        setSwipeStatus('accepted');
        sound.playCardSuccess();
        completeAirlockTask('Security Keycard Accepted');
      }
    }, 400);
  };

  // Emergency Button handler
  const handleEmergencyPress = () => {
    if (!coverOpen) {
      setCoverOpen(true);
      sound.playClick();
      return;
    }
    sound.playEmergency();
    completeAirlockTask('Emergency Decontamination Clearance');
  };

  if (isUnlocked) {
    return null;
  }

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden flex items-center justify-center transition-colors duration-700 ${
      doorOpening ? 'bg-transparent pointer-events-none' : 'bg-slate-950/95 backdrop-blur-md'
    }`}>
      {/* Background Anime Speedlines & Lightning strips */}
      {!doorOpening && (
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute inset-0 bg-hazard-stripes-subtle opacity-30" />
          <div className="absolute top-0 left-0 w-full h-full bg-radial from-rose-900/20 via-transparent to-black" />
          
          {/* Floating Sparks */}
          <div className="absolute top-1/4 left-10 text-yellow-400 animate-pulse text-2xl font-bold">⚡</div>
          <div className="absolute bottom-1/4 right-16 text-cyan-400 animate-pulse text-3xl font-bold">✦</div>
          <div className="absolute top-1/3 right-1/4 text-rose-400 animate-ping text-xl font-bold">⚡</div>
        </div>
      )}

      {/* Left Pneumatic Blast Door */}
      <motion.div
        className="absolute top-0 left-0 w-1/2 h-full bg-slate-900 border-r-4 border-slate-700 shadow-2xl z-20 flex flex-col justify-between"
        animate={{
          x: doorOpening ? '-100%' : '0%',
        }}
        transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
      >
        {/* Hazard Stripes along door seam */}
        <div className="h-10 w-full bg-hazard-stripes" />
        
        <div className="p-8 flex flex-col items-end opacity-40 space-y-4">
          <div className="text-right">
            <span className="text-xs font-mono text-rose-400 tracking-wider">AIRLOCK SECTION 01-A</span>
            <div className="h-1 w-24 bg-rose-500 rounded-full mt-1 ml-auto" />
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-slate-700 flex items-center justify-center font-mono text-slate-500">
            01
          </div>
        </div>

        <div className="h-10 w-full bg-hazard-stripes" />
      </motion.div>

      {/* Right Pneumatic Blast Door */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full bg-slate-900 border-l-4 border-slate-700 shadow-2xl z-20 flex flex-col justify-between"
        animate={{
          x: doorOpening ? '100%' : '0%',
        }}
        transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
      >
        <div className="h-10 w-full bg-hazard-stripes" />

        <div className="p-8 flex flex-col items-start opacity-40 space-y-4">
          <div className="text-left">
            <span className="text-xs font-mono text-cyan-400 tracking-wider">AIRLOCK SECTION 01-B</span>
            <div className="h-1 w-24 bg-cyan-500 rounded-full mt-1" />
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-slate-700 flex items-center justify-center font-mono text-slate-500">
            02
          </div>
        </div>

        <div className="h-10 w-full bg-hazard-stripes" />
      </motion.div>

      {/* Center Interactive Mission Terminal */}
      <motion.div 
        className="relative z-30 w-full max-w-xl mx-4 bg-slate-950/95 border-2 border-rose-500/80 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(244,88,88,0.35)] backdrop-blur-md"
        animate={{
          scale: doorOpening ? 0.9 : 1,
          opacity: doorOpening ? 0 : 1,
        }}
        transition={{ duration: 0.5 }}
      >
        {/* Top Header Badge */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-rose-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Zap className="w-5 h-5 text-slate-950 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-widest text-amber-400 uppercase">SPARK X IIIT BHOPAL</span>
                <span className="text-slate-600">·</span>
                <span className="text-xs text-rose-400 font-mono">MISSION 01</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                SKELD AIRLOCK ACCESS GATE
              </h2>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-600/50 text-rose-300 text-xs font-mono">
            <Lock className="w-3.5 h-3.5" />
            <span>DOOR LOCKED</span>
          </div>
        </div>

        {/* Instructions */}
        <p className="text-sm text-slate-300 mb-5 leading-relaxed">
          Attention Crewmate! Security protocol active. Complete any verification task below to open the airlock doors and enter the <strong className="text-amber-300">Spark X IIIT Bhopal</strong> event portal.
        </p>

        {/* Task Tabs */}
        <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-900 rounded-xl mb-6 border border-slate-800">
          <button
            onClick={() => { setActiveTask('wires'); sound.playClick(); }}
            className={`flex items-center justify-center gap-2 py-2 px-2 text-xs font-bold rounded-lg transition-all ${
              activeTask === 'wires'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Fix Wires</span>
          </button>

          <button
            onClick={() => { setActiveTask('card'); sound.playClick(); }}
            className={`flex items-center justify-center gap-2 py-2 px-2 text-xs font-bold rounded-lg transition-all ${
              activeTask === 'card'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Swipe Card</span>
          </button>

          <button
            onClick={() => { setActiveTask('emergency'); sound.playClick(); }}
            className={`flex items-center justify-center gap-2 py-2 px-2 text-xs font-bold rounded-lg transition-all ${
              activeTask === 'emergency'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Emergency</span>
          </button>
        </div>

        {/* Active Task Body */}
        <div className="bg-slate-900/90 rounded-xl p-5 border border-slate-800 min-h-[220px] flex flex-col justify-center">
          {activeTask === 'wires' && (
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3 font-mono">
                <span>ELECTRICAL PANEL: REWIRE RECEPTACLE</span>
                <span className="text-amber-400">{Object.keys(connectedWires).length} / 4 WIRED</span>
              </div>
              <div className="grid grid-cols-2 gap-8 relative py-2">
                {/* Left Wire Pins */}
                <div className="space-y-3">
                  {initialLeftWires.map((wire) => {
                    const isConnected = !!connectedWires[wire.id];
                    const isSelected = selectedLeft === wire.id;
                    return (
                      <button
                        key={wire.id}
                        onClick={() => handleWireLeftClick(wire.id)}
                        disabled={isConnected}
                        className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-xs font-mono font-bold transition-all ${
                          isConnected
                            ? 'opacity-50 border-emerald-500 bg-emerald-950/20 text-emerald-400'
                            : isSelected
                            ? 'border-white bg-slate-800 scale-102 ring-2 ring-white/50 text-white'
                            : 'border-slate-700 bg-slate-950 text-slate-200 hover:border-slate-500'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-4 h-4 rounded-full border border-black shadow"
                            style={{ backgroundColor: wire.color }}
                          />
                          <span>{wire.label}</span>
                        </div>
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: wire.color }}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Right Wire Pins */}
                <div className="space-y-3">
                  {initialRightWires.map((wire) => {
                    const isConnected = connectedWires[wire.id] === wire.id;
                    return (
                      <button
                        key={wire.id}
                        onClick={() => handleWireRightClick(wire.id)}
                        disabled={isConnected}
                        className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-xs font-mono font-bold transition-all ${
                          isConnected
                            ? 'opacity-50 border-emerald-500 bg-emerald-950/20 text-emerald-400'
                            : selectedLeft
                            ? 'border-amber-400/80 bg-slate-950 text-slate-200 hover:bg-slate-800 animate-pulse'
                            : 'border-slate-700 bg-slate-950 text-slate-200'
                        }`}
                      >
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: wire.color }}
                        />
                        <div className="flex items-center gap-2">
                          <span>{wire.label}</span>
                          <span
                            className="w-4 h-4 rounded-full border border-black shadow"
                            style={{ backgroundColor: wire.color }}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
              <p className="text-[11px] text-center text-slate-400 mt-2">
                Click a colored wire on the left, then click the matching color on the right.
              </p>
            </div>
          )}

          {activeTask === 'card' && (
            <div className="text-center py-2 space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>ADMIN CONSOLE: KEYCARD READER</span>
                <span className={`font-bold ${
                  swipeStatus === 'accepted' ? 'text-emerald-400' :
                  swipeStatus === 'too_fast' ? 'text-rose-400' :
                  swipeStatus === 'too_slow' ? 'text-amber-400' : 'text-slate-400'
                }`}>
                  {swipeStatus === 'idle' && 'READY TO SWIPE'}
                  {swipeStatus === 'swiping' && 'READING CARD...'}
                  {swipeStatus === 'too_fast' && 'BAD READ: TOO FAST!'}
                  {swipeStatus === 'too_slow' && 'BAD READ: TOO SLOW!'}
                  {swipeStatus === 'accepted' && 'CARD ACCEPTED!'}
                </span>
              </div>

              {/* Card Reader Slot Visual */}
              <div className="relative bg-slate-950 border-2 border-slate-800 rounded-xl p-4 overflow-hidden">
                <div className="h-4 bg-slate-900 border border-slate-700 rounded-full w-full mb-3" />
                
                {/* Crewmate Card */}
                <div className="inline-block bg-gradient-to-r from-amber-400 via-rose-500 to-indigo-600 p-0.5 rounded-xl shadow-lg">
                  <div className="bg-slate-900 px-5 py-3 rounded-[10px] flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-rose-500 border-2 border-white flex items-center justify-center font-bold text-xs">
                      ඞ
                    </div>
                    <div className="text-left font-mono">
                      <div className="text-xs font-bold text-white">SPARK-X PASSPORT</div>
                      <div className="text-[10px] text-slate-400">CREWMATE #8226</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 mt-4">
                  <span className="text-xs text-slate-400">Swipe Velocity:</span>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={swipeSpeed}
                    onChange={(e) => setSwipeSpeed(Number(e.target.value))}
                    className="w-36 accent-rose-500 cursor-pointer"
                  />
                  <span className="text-xs font-mono text-amber-300 w-10 text-right">{swipeSpeed}%</span>
                </div>
              </div>

              <button
                onClick={handleCardSwipe}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-600/30 transition-all flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>Swipe Security Card</span>
              </button>
            </div>
          )}

          {activeTask === 'emergency' && (
            <div className="text-center py-3 space-y-4">
              <div className="text-xs text-slate-400 font-mono">
                EMERGENCY OVERRIDE MECHANISM
              </div>
              
              <div className="flex flex-col items-center justify-center py-2">
                {/* Emergency Glass Protective Shield */}
                <div className="relative p-6 rounded-2xl bg-slate-950 border-4 border-amber-500/80 shadow-inner">
                  {!coverOpen ? (
                    <button
                      onClick={() => { setCoverOpen(true); sound.playClick(); }}
                      className="group flex flex-col items-center gap-2"
                    >
                      <div className="w-24 h-24 rounded-full bg-amber-500/20 border-2 border-dashed border-amber-400 flex items-center justify-center text-amber-300 group-hover:scale-105 transition-all">
                        <Lock className="w-8 h-8" />
                      </div>
                      <span className="text-xs font-bold text-amber-300 tracking-wider">
                        LIFT SAFETY GLASS COVER
                      </span>
                    </button>
                  ) : (
                    <motion.button
                      initial={{ scale: 0.8 }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      onClick={handleEmergencyPress}
                      className="w-28 h-28 rounded-full bg-gradient-to-b from-rose-500 to-rose-700 border-4 border-white shadow-[0_0_35px_rgba(244,88,88,0.7)] flex flex-col items-center justify-center text-white active:scale-95 transition-all cursor-pointer"
                    >
                      <AlertTriangle className="w-8 h-8 mb-1" />
                      <span className="text-xs font-black tracking-widest uppercase">OVERRIDE</span>
                    </motion.button>
                  )}
                </div>
              </div>

              <p className="text-[11px] text-slate-400">
                {coverOpen ? 'Slam the red button to trigger emergency door clearance!' : 'Click to lift the safety glass first.'}
              </p>
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <button
            onClick={handleInstantOpen}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            <Unlock className="w-3.5 h-3.5" />
            <span>Open Doors & Enter Website</span>
          </button>

          <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
            <button
              onClick={() => completeAirlockTask('Fast-Pass')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Skip Task
            </button>
            <span>·</span>
            <span>SPARK X IIIT BHOPAL</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
