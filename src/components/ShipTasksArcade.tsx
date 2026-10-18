import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Radio, 
  CreditCard, 
  UploadCloud, 
  Sliders, 
  AlertOctagon, 
  CheckCircle2, 
  Sparkles,
  RefreshCw,
  Zap
} from 'lucide-react';
import { sound } from '../utils/sound';

interface ShipTasksArcadeProps {
  isDarkMode: boolean;
  onTaskCompleted: (taskKey: string) => void;
  onTriggerEmergency: () => void;
}

export const ShipTasksArcade: React.FC<ShipTasksArcadeProps> = ({
  isDarkMode,
  onTaskCompleted,
  onTriggerEmergency,
}) => {
  const [activeTab, setActiveTab] = useState<'wires' | 'card' | 'upload' | 'distributor'>('wires');

  // Wire Task State
  const [connectedWires, setConnectedWires] = useState<{ [key: string]: string }>({});
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);

  // Card Swipe State
  const [swipeSpeed, setSwipeSpeed] = useState<number>(50);
  const [swipeStatus, setSwipeStatus] = useState<'idle' | 'swiping' | 'too_fast' | 'too_slow' | 'accepted'>('idle');

  // Upload Data Task State
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Distributor Task State
  const [dialValues, setDialValues] = useState<number[]>([15, 60, 85]);
  const [dialAligned, setDialAligned] = useState<boolean[]>([false, false, false]);

  // Wire definitions
  const leftWires = [
    { id: 'w_red', color: '#F45858', label: 'PWR-RED' },
    { id: 'w_blue', color: '#67C9F5', label: 'NAV-CYAN' },
    { id: 'w_yellow', color: '#FFD166', label: 'ENG-YEL' },
    { id: 'w_purple', color: '#B8A5F5', label: 'COM-PUR' },
  ];
  const rightWires = [
    { id: 'w_blue', color: '#67C9F5', label: 'NAV-CYAN' },
    { id: 'w_red', color: '#F45858', label: 'PWR-RED' },
    { id: 'w_purple', color: '#B8A5F5', label: 'COM-PUR' },
    { id: 'w_yellow', color: '#FFD166', label: 'ENG-YEL' },
  ];

  // Wire Click Handlers
  const handleLeftWireClick = (id: string) => {
    sound.playClick();
    if (connectedWires[id]) return;
    setSelectedLeft(id);
  };

  const handleRightWireClick = (id: string) => {
    if (!selectedLeft) return;
    if (selectedLeft === id) {
      sound.playWire();
      const next = { ...connectedWires, [id]: id };
      setConnectedWires(next);
      setSelectedLeft(null);

      if (Object.keys(next).length === 4) {
        sound.playTaskComplete();
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
        onTaskCompleted('task_wiring');
      }
    } else {
      sound.playCardFail();
      setSelectedLeft(null);
    }
  };

  // Card Swipe Handler
  const handleSwipeCard = () => {
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
        sound.playTaskComplete();
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
        onTaskCompleted('task_card');
      }
    }, 450);
  };

  // Upload Data Handler
  const handleStartUpload = () => {
    if (isUploading || uploadProgress === 100) return;
    sound.playClick();
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          setIsUploading(false);
          sound.playTaskComplete();
          confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
          onTaskCompleted('task_upload');
          return 100;
        }
        return prev + 15;
      });
    }, 250);
  };

  // Distributor Click Handler
  const handleAlignDial = (idx: number) => {
    sound.playClick();
    const next = [...dialAligned];
    next[idx] = true;
    setDialAligned(next);

    if (next.every(Boolean)) {
      sound.playTaskComplete();
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
      onTaskCompleted('task_distributor');
    }
  };

  return (
    <section id="ship-arcade" className="py-16 border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <Zap className="w-4 h-4 fill-emerald-400 text-emerald-400" />
              <span>THE SKELD SHIP TASKS ARCADE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Interactive Crewmate Mini-Games
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 max-w-md">
            Complete real Among Us tasks right on the website to boost your crewmate reputation and advance the global mission task bar!
          </p>
        </div>

        {/* Task Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800 mb-8">
          <button
            onClick={() => { sound.playClick(); setActiveTab('wires'); }}
            className={`py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'wires'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>Fix Electrical Wires</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('card'); }}
            className={`py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'card'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Swipe Admin Card</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('upload'); }}
            className={`py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'upload'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Mission Data</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('distributor'); }}
            className={`py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'distributor'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Calibrate Power</span>
          </button>
        </div>

        {/* Task Active Screen */}
        <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-10 border-2 border-slate-800 shadow-2xl relative">
          
          {/* Top Info Bar */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
              SYSTEM: ELECTRICAL / NAVIGATION CONSOLE
            </span>
            <button
              onClick={() => {
                sound.playEmergency();
                onTriggerEmergency();
              }}
              className="px-3 py-1 rounded-lg bg-rose-600/80 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <AlertOctagon className="w-3.5 h-3.5" />
              <span>Call Emergency Meeting</span>
            </button>
          </div>

          {/* Tab 1: Wire Fixing */}
          {activeTab === 'wires' && (
            <div className="max-w-2xl mx-auto py-4">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
                <span>CONNECT TERMINALS BY COLOR MATCHING</span>
                <span className="text-amber-400 font-bold">{Object.keys(connectedWires).length} / 4 CONNECTED</span>
              </div>

              <div className="grid grid-cols-2 gap-10">
                {/* Left Wire Terminals */}
                <div className="space-y-4">
                  {leftWires.map((wire) => {
                    const isConnected = !!connectedWires[wire.id];
                    const isSelected = selectedLeft === wire.id;
                    return (
                      <button
                        key={wire.id}
                        onClick={() => handleLeftWireClick(wire.id)}
                        disabled={isConnected}
                        className={`w-full p-3 rounded-xl border text-xs font-mono font-bold flex items-center justify-between transition-all cursor-pointer ${
                          isConnected
                            ? 'opacity-40 border-emerald-500 bg-emerald-950/20 text-emerald-400'
                            : isSelected
                            ? 'border-white bg-slate-800 ring-2 ring-white scale-102 text-white'
                            : 'border-slate-700 bg-slate-950 text-slate-200 hover:border-slate-500'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-4 h-4 rounded-full border border-black shadow"
                            style={{ backgroundColor: wire.color }}
                          />
                          <span>{wire.label}</span>
                        </div>
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: wire.color }}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Right Wire Terminals */}
                <div className="space-y-4">
                  {rightWires.map((wire) => {
                    const isConnected = connectedWires[wire.id] === wire.id;
                    return (
                      <button
                        key={wire.id}
                        onClick={() => handleRightWireClick(wire.id)}
                        disabled={isConnected}
                        className={`w-full p-3 rounded-xl border text-xs font-mono font-bold flex items-center justify-between transition-all cursor-pointer ${
                          isConnected
                            ? 'opacity-40 border-emerald-500 bg-emerald-950/20 text-emerald-400'
                            : selectedLeft
                            ? 'border-amber-400 bg-slate-950 text-slate-200 animate-pulse'
                            : 'border-slate-700 bg-slate-950 text-slate-200'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: wire.color }}
                        />
                        <div className="flex items-center gap-2.5">
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

              {Object.keys(connectedWires).length === 4 && (
                <div className="mt-6 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-center text-emerald-300 font-mono text-xs flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>TASK COMPLETED · ELECTRICAL CIRCUIT ONLINE!</span>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Card Swipe */}
          {activeTab === 'card' && (
            <div className="max-w-md mx-auto text-center py-4 space-y-6">
              <div className="text-xs font-mono text-slate-400">
                SWIPE VELOCITY CALIBRATION (TARGET: 40% - 70%)
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="h-4 bg-slate-900 border border-slate-700 rounded-full w-full" />

                <div className="bg-gradient-to-r from-amber-400 via-rose-500 to-indigo-600 p-0.5 rounded-xl inline-block shadow-lg">
                  <div className="bg-slate-900 px-6 py-4 rounded-[10px] flex items-center gap-4">
                    <span className="text-2xl font-black text-rose-500">ඞ</span>
                    <div className="text-left font-mono">
                      <div className="text-xs font-bold text-white">SPARK-X PASSPORT</div>
                      <div className="text-[10px] text-slate-400">STATUS: {swipeStatus.toUpperCase()}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <span className="text-xs text-slate-400">Swipe Velocity:</span>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={swipeSpeed}
                    onChange={(e) => setSwipeSpeed(Number(e.target.value))}
                    className="w-36 accent-amber-400 cursor-pointer"
                  />
                  <span className="text-xs font-mono text-amber-300 w-10 text-right">{swipeSpeed}%</span>
                </div>
              </div>

              <button
                onClick={handleSwipeCard}
                className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-400/20 transition-all cursor-pointer"
              >
                Swipe Admin Security Card
              </button>
            </div>
          )}

          {/* Tab 3: Upload Data */}
          {activeTab === 'upload' && (
            <div className="max-w-md mx-auto text-center py-4 space-y-6">
              <div className="text-xs font-mono text-slate-400">
                UPLOADING TELEMETRY TO SKELD SATELLITE ARRAY
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                  <span>TRANSFERRING DATA...</span>
                  <span>{uploadProgress}%</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-4 rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.6)]"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>

                <div className="text-[11px] font-mono text-slate-500">
                  ESTIMATED TIME: {uploadProgress === 100 ? '0s (COMPLETE)' : `${Math.ceil((100 - uploadProgress) / 20)}s`}
                </div>
              </div>

              <button
                onClick={handleStartUpload}
                disabled={isUploading || uploadProgress === 100}
                className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-600/30 transition-all cursor-pointer"
              >
                {uploadProgress === 100 ? 'Upload Completed ✓' : isUploading ? 'Uploading Data...' : 'Start Data Transmission'}
              </button>
            </div>
          )}

          {/* Tab 4: Calibrate Distributor */}
          {activeTab === 'distributor' && (
            <div className="max-w-lg mx-auto py-4 space-y-6 text-center">
              <div className="text-xs font-mono text-slate-400">
                ALIGN POWER CHANNELS (CLICK EACH WHEN ENGAGED)
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[0, 1, 2].map((idx) => {
                  const isDone = dialAligned[idx];
                  return (
                    <button
                      key={idx}
                      onClick={() => handleAlignDial(idx)}
                      disabled={isDone}
                      className={`p-5 rounded-2xl border flex flex-col items-center gap-3 transition-all cursor-pointer ${
                        isDone
                          ? 'border-emerald-500 bg-emerald-950/30 text-emerald-300'
                          : 'border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center font-bold text-sm ${
                        isDone ? 'border-emerald-400 text-emerald-400' : 'border-amber-400 text-amber-400'
                      }`}>
                        {idx + 1}
                      </div>
                      <span className="text-[10px] font-mono">
                        {isDone ? 'POWER LOCKED' : 'CLICK TO LOCK'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {dialAligned.every(Boolean) && (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-center text-emerald-300 font-mono text-xs flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>DISTRIBUTOR CALIBRATED TO 100% EFFICIENCY!</span>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
