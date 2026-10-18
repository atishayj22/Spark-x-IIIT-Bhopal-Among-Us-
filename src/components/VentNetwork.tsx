import React, { useState } from 'react';
import { Wind, X, MapPin, Zap, ShieldAlert, Sparkles, Navigation } from 'lucide-react';
import { sound } from '../utils/sound';
import { UserRole } from './RoleIntroScreen';

interface VentNetworkProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: UserRole;
  onRoleChange: (newRole: UserRole) => void;
  onUnlockBulkhead: () => void;
}

export const VentNetwork: React.FC<VentNetworkProps> = ({
  isOpen,
  onClose,
  userRole,
  onRoleChange,
  onUnlockBulkhead,
}) => {
  const canVent = userRole === 'impostor' || userRole === 'engineer';

  const ventDestinations = [
    { id: 'mission-brief', name: 'Bridge / Navigation (Top)', desc: 'Bypasses the locked bulkhead gate directly to the bridge!' },
    { id: 'ship-customizer', name: 'Spaceship Customizer Bay', desc: 'Avatar color and headgear styling station.' },
    { id: 'galaxy-radar', name: 'Galaxy Radar Station', desc: 'References and design guidelines.' },
    { id: 'ai-copilot', name: 'AI Copilot Terminal', desc: 'Prompt workshop and engineering habits.' },
    { id: 'launch-orbit', name: 'Engine Room & Launchpad', desc: 'Git and Vercel orbit deployment engine.' },
    { id: 'code-security', name: 'Security Hub & Radar', desc: 'Code inspection and impostor audit.' },
    { id: 'registration-gate', name: 'Communications Deck', desc: 'Event registration & boarding pass minting.' },
  ];

  const handleTeleport = (targetId: string) => {
    sound.playVent();
    // If teleporting to top, unlock bulkhead
    if (targetId === 'mission-brief') {
      onUnlockBulkhead();
    }
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="max-w-lg w-full bg-slate-900 border-2 border-amber-400 rounded-3xl p-6 shadow-[0_0_50px_rgba(245,158,11,0.4)] relative">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center text-slate-950 font-black shadow-lg">
              <Wind className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-bold">
                SKELD VENTILATION SHAFT NETWORK
              </span>
              <h3 className="text-lg font-black text-white">
                {canVent ? `Vent Access Granted (${userRole.toUpperCase()})` : 'Vent Locked (Crewmate)'}
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content based on whether user can vent */}
        {canVent ? (
          <div className="space-y-4">
            <p className="text-xs text-slate-300 font-mono leading-relaxed">
              As an <strong className="text-amber-400">{userRole.toUpperCase()}</strong>, you can crawl through the Skeld air shafts to fast-travel to any section and bypass locked bulkhead gates!
            </p>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {ventDestinations.map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => handleTeleport(dest.id)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-400 hover:bg-slate-800/80 text-left transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-amber-300 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{dest.name}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {dest.desc}
                    </div>
                  </div>
                  <Wind className="w-4 h-4 text-slate-600 group-hover:text-amber-400 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-950/60 border-2 border-rose-500/80 mx-auto flex items-center justify-center text-rose-400">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-bold text-white">
                Only Engineers & Impostors Can Vent!
              </h4>
              <p className="text-xs text-slate-400 font-mono max-w-sm mx-auto">
                Crewmates must walk the corridors and refuel engines to open gates. Or switch your identity to test venting!
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  onRoleChange('engineer');
                }}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase cursor-pointer"
              >
                Become Engineer
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  onRoleChange('impostor');
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase cursor-pointer"
              >
                Become Impostor
              </button>
            </div>
          </div>
        )}

        <div className="mt-5 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500 text-center">
          SKELD SUBWAY VENT DUCT #42
        </div>
      </div>
    </div>
  );
};
