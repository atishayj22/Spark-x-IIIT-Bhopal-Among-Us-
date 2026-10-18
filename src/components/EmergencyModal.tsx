import React from 'react';
import { AlertOctagon, X, Fuel, Instagram, ArrowRight, ShieldAlert, Check } from 'lucide-react';
import { sound } from '../utils/sound';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  task1Airlock: boolean;
  task2RefuelLights: boolean;
  task3Instagram: boolean;
  onCompleteTask2: () => void;
  onCompleteTask3: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  task1Airlock,
  task2RefuelLights,
  task3Instagram,
  onCompleteTask2,
  onCompleteTask3,
}) => {
  if (!isOpen) return null;

  const incompleteTasks = [];
  if (!task1Airlock) {
    incompleteTasks.push({
      id: 1,
      title: 'Task 01: Unlock Airlock Security Gate',
      desc: 'Security clearance required to enter the main Skeld ship decks.',
      actionLabel: 'Solve Airlock Gate',
      action: () => {
        sound.playClick();
        onClose();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      icon: ShieldAlert,
      color: '#F45858',
    });
  }
  if (!task2RefuelLights) {
    incompleteTasks.push({
      id: 2,
      title: 'Task 02: Refuel Engines to Fix Flickering Lights',
      desc: 'Electrical sabotage detected! Pump rocket fuel into the engine canister to restore lights.',
      actionLabel: 'Refuel Canister Now',
      action: () => {
        sound.playRefuel();
        onCompleteTask2();
      },
      icon: Fuel,
      color: '#FFD166',
    });
  }
  if (!task3Instagram) {
    incompleteTasks.push({
      id: 3,
      title: 'Task 03: Tag Spark X on Instagram (@spark_iiitbhopal)',
      desc: 'Broadcast the offline hackathon on your Instagram Story and confirm below.',
      actionLabel: 'Yes, Added to Story!',
      action: () => {
        sound.playTaskComplete();
        onCompleteTask3();
      },
      icon: Instagram,
      color: '#EC4899',
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-slate-900 border-4 border-rose-600 rounded-3xl p-6 shadow-[0_0_60px_rgba(244,88,88,0.5)] overflow-hidden text-white">
        
        {/* Top Caution Banner */}
        <div className="h-3 bg-hazard-stripes -mx-6 -mt-6 mb-5" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white shadow-lg animate-pulse">
              <AlertOctagon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-rose-400 uppercase tracking-widest font-bold">
                EMERGENCY ALERT // SHIP SABOTAGE DETECTED
              </div>
              <h3 className="text-base sm:text-lg font-black text-white">
                Incomplete Tasks ({incompleteTasks.length} Remaining)
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Incomplete Tasks List Only (Nothing Else) */}
        <div className="py-4 space-y-3">
          {incompleteTasks.length > 0 ? (
            incompleteTasks.map((t) => {
              const Icon = t.icon;
              return (
                <div
                  key={t.id}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-950 font-bold shrink-0 mt-0.5"
                      style={{ backgroundColor: t.color }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white mb-0.5">
                        {t.title}
                      </div>
                      <div className="text-[11px] text-slate-400 font-sans leading-snug">
                        {t.desc}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={t.action}
                    className="w-full sm:w-auto px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-slate-950 shadow-md shrink-0 transition-transform active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                    style={{ backgroundColor: t.color }}
                  >
                    <span>{t.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })
          ) : (
            <div className="p-6 text-center text-emerald-300 font-mono text-xs">
              All tasks completed! Emergency cleared.
            </div>
          )}
        </div>

        {/* Bottom Status */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>COMPLETE ALL TASKS TO CLEAR ALARM</span>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="hover:text-white transition-colors"
          >
            Dismiss
          </button>
        </div>

        {/* Bottom Caution Banner */}
        <div className="h-2 bg-hazard-stripes -mx-6 -mb-6 mt-4" />
      </div>
    </div>
  );
};
