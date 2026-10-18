import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Wrench, Skull, Shield, ArrowRight, RefreshCw } from 'lucide-react';
import { sound } from '../utils/sound';

export type UserRole = 'impostor' | 'engineer' | 'crewmate';

interface RoleIntroScreenProps {
  onComplete: (role: UserRole) => void;
}

export const RoleIntroScreen: React.FC<RoleIntroScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'shhh' | 'reveal'>('shhh');
  const [assignedRole, setAssignedRole] = useState<UserRole>('impostor');

  useEffect(() => {
    // Pick a random role: 40% Impostor, 30% Engineer, 30% Crewmate
    const rand = Math.random();
    const role: UserRole = rand < 0.4 ? 'impostor' : rand < 0.7 ? 'engineer' : 'crewmate';
    setAssignedRole(role);

    // Play Shhh sound
    sound.playShhh();

    // Transition from SHHH to Role Reveal after 1.6s
    const timer = setTimeout(() => {
      setPhase('reveal');
      sound.playRoleReveal(role === 'impostor');
    }, 1600);

    return () => clearTimeout(timer);
  }, []);

  const handleRoleChange = (role: UserRole) => {
    sound.playClick();
    setAssignedRole(role);
    sound.playRoleReveal(role === 'impostor');
  };

  const handleEnterWebsite = () => {
    sound.playTaskComplete();
    onComplete(assignedRole);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-black select-none">
      
      {/* SHHH SCREEN */}
      {phase === 'shhh' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center text-center p-6"
        >
          {/* Animated Red Crewmate Making Finger Shhh */}
          <div className="relative mb-6">
            <svg width="140" height="170" viewBox="0 0 100 130" className="drop-shadow-[0_0_30px_rgba(244,88,88,0.8)]">
              {/* Backpack */}
              <rect x="12" y="42" width="20" height="48" rx="10" fill="#991B1B" stroke="#000" strokeWidth="6" />
              {/* Body */}
              <path d="M26,32 C26,12 74,12 74,32 L74,92 C74,104 65,110 57,110 L57,96 L43,96 L43,110 C35,110 26,104 26,92 Z" fill="#DC2626" stroke="#000" strokeWidth="7" strokeLinejoin="round" />
              {/* Visor */}
              <ellipse cx="60" cy="44" rx="20" ry="14" fill="#67C9F5" stroke="#000" strokeWidth="6" />
              <ellipse cx="56" cy="41" rx="11" ry="6" fill="#E0F7FA" />
              {/* Finger to mouth / Shhh hand */}
              <path d="M52,65 C52,48 57,48 57,65 L57,80 C57,85 52,85 52,80 Z" fill="#DC2626" stroke="#000" strokeWidth="5" />
            </svg>
          </div>

          <motion.h1
            initial={{ scale: 0.8 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="text-6xl sm:text-7xl font-black text-rose-500 font-mono tracking-widest drop-shadow-[0_0_20px_rgba(244,88,88,0.9)]"
          >
            SHHH!
          </motion.h1>

          <p className="text-xs font-mono text-slate-400 mt-4 tracking-wider uppercase">
            ESTABLISHING SECURE CREW PROTOCOL...
          </p>
        </motion.div>
      )}

      {/* ROLE REVEAL SCREEN */}
      {phase === 'reveal' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative max-w-xl w-full mx-4 text-center p-8 rounded-3xl bg-slate-950/90 border-2 shadow-2xl backdrop-blur-xl"
          style={{
            borderColor: 
              assignedRole === 'impostor' ? '#EF4444' : 
              assignedRole === 'engineer' ? '#F59E0B' : '#06B6D4'
          }}
        >
          {/* Top Label */}
          <div className="text-xs font-mono tracking-widest uppercase mb-3 opacity-70 text-slate-300">
            SPARK X IIIT BHOPAL // ASSIGNED IDENTITY
          </div>

          {/* Role Character Avatar */}
          <div className="relative w-36 h-44 mx-auto my-3 flex items-center justify-center">
            <svg viewBox="0 0 100 130" className="w-full h-full drop-shadow-2xl">
              {/* Backpack */}
              <rect 
                x="14" 
                y="45" 
                width="18" 
                height="45" 
                rx="9" 
                fill={
                  assignedRole === 'impostor' ? '#991B1B' : 
                  assignedRole === 'engineer' ? '#B45309' : '#0284C7'
                } 
                stroke="#000" 
                strokeWidth="6" 
              />
              {/* Main Body */}
              <path 
                d="M28,35 C28,14 75,14 75,35 L75,90 C75,102 65,108 57,108 L57,94 L45,94 L45,108 C37,108 28,102 28,90 Z" 
                fill={
                  assignedRole === 'impostor' ? '#DC2626' : 
                  assignedRole === 'engineer' ? '#F59E0B' : '#06B6D4'
                } 
                stroke="#000" 
                strokeWidth="6" 
                strokeLinejoin="round" 
              />
              {/* Visor */}
              <ellipse cx="62" cy="46" rx="19" ry="13" fill="#67C9F5" stroke="#000" strokeWidth="6" />
              <ellipse cx="58" cy="43" rx="10" ry="5" fill="#E0F7FA" />

              {/* Hat / Accents */}
              {assignedRole === 'impostor' && (
                <g transform="translate(68, 60)">
                  {/* Glowing Knife */}
                  <path d="M0,0 L18,-8 L20,-2 L0,8 Z" fill="#E2E8F0" stroke="#000" strokeWidth="2" />
                  <rect x="-6" y="2" width="8" height="6" fill="#7F1D1D" stroke="#000" strokeWidth="2" />
                </g>
              )}

              {assignedRole === 'engineer' && (
                <g transform="translate(38, 4)">
                  {/* Wrench Hat */}
                  <circle cx="12" cy="12" r="10" fill="#CBD5E1" stroke="#000" strokeWidth="2" />
                  <rect x="18" y="10" width="16" height="6" fill="#94A3B8" stroke="#000" strokeWidth="2" />
                </g>
              )}
            </svg>
          </div>

          {/* Role Title */}
          <motion.h2 
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            className={`text-4xl sm:text-5xl font-black font-mono tracking-widest uppercase mb-3 ${
              assignedRole === 'impostor' ? 'text-rose-500 drop-shadow-[0_0_25px_rgba(239,68,68,0.8)]' :
              assignedRole === 'engineer' ? 'text-amber-400 drop-shadow-[0_0_25px_rgba(245,158,11,0.8)]' :
              'text-cyan-400 drop-shadow-[0_0_25px_rgba(6,182,212,0.8)]'
            }`}
          >
            {assignedRole}
          </motion.h2>

          {/* Role Description */}
          <p className="text-sm font-medium text-slate-200 max-w-md mx-auto leading-relaxed mb-6 font-mono">
            {assignedRole === 'impostor' && (
              <span className="text-rose-300">
                You are the <strong className="text-white">IMPOSTOR</strong>! Sabotage systems, trigger electrical flicker, and <strong className="text-amber-300">use secret vents</strong> to bypass locked security gates!
              </span>
            )}
            {assignedRole === 'engineer' && (
              <span className="text-amber-300">
                You are the <strong className="text-white">ENGINEER</strong>! You possess the unique ability to <strong className="text-white">use ventilation shafts (vents)</strong> to fast-travel across the ship!
              </span>
            )}
            {assignedRole === 'crewmate' && (
              <span className="text-cyan-300">
                You are a <strong className="text-white">CREWMATE</strong>! There is 1 Impostor among us. Complete tasks, refuel engines to reopen locked gates, and vote out the suspect!
              </span>
            )}
          </p>

          {/* Switch Role Quick Tester */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-[11px] font-mono text-slate-400 mr-1">Switch Role:</span>
            <button
              onClick={() => handleRoleChange('impostor')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                assignedRole === 'impostor' ? 'bg-rose-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Impostor
            </button>
            <button
              onClick={() => handleRoleChange('engineer')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                assignedRole === 'engineer' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Engineer
            </button>
            <button
              onClick={() => handleRoleChange('crewmate')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                assignedRole === 'crewmate' ? 'bg-cyan-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Crewmate
            </button>
          </div>

          {/* Action to Enter Website */}
          <button
            onClick={handleEnterWebsite}
            className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer transform hover:scale-102 ${
              assignedRole === 'impostor' ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/40' :
              assignedRole === 'engineer' ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-400/40' :
              'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/40'
            }`}
          >
            <span>Enter The Skeld Website</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      )}

    </div>
  );
};
