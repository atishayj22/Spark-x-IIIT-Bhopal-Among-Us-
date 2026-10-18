/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { AirlockGate } from './components/AirlockGate';
import { RoleIntroScreen, UserRole } from './components/RoleIntroScreen';
import { BulkheadLockdown } from './components/BulkheadLockdown';
import { VentNetwork } from './components/VentNetwork';
import { LightsSabotage } from './components/LightsSabotage';
import { CrewmateBackground } from './components/CrewmateBackground';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { OfflineEventDetails } from './components/OfflineEventDetails';
import { EventSchedule } from './components/EventSchedule';
import { PrizesAndRules } from './components/PrizesAndRules';
import { ShipTasksArcade } from './components/ShipTasksArcade';
import { InstagramTaskCard } from './components/InstagramTaskCard';
import { RegistrationSection } from './components/RegistrationSection';
import { EmergencyModal } from './components/EmergencyModal';
import { Footer } from './components/Footer';
import { sound } from './utils/sound';
import { Wind, AlertOctagon } from 'lucide-react';

export default function App() {
  const [isAirlockOpen, setIsAirlockOpen] = useState(false);
  const [showRoleIntro, setShowRoleIntro] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('impostor');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isVentOpen, setIsVentOpen] = useState(false);
  const [isBulkheadLocked, setIsBulkheadLocked] = useState(false);

  // Exact 3 Website Tasks required by user:
  // Task 1: Already completed as user enters the website (Airlock Security Gate)
  const [task1Airlock, setTask1Airlock] = useState<boolean>(true);
  // Task 2: When user scrolls down, lights flicker and user refuels engines to fix lights
  const [task2RefuelLights, setTask2RefuelLights] = useState<boolean>(false);
  // Task 3: User confirms adding event to Instagram story
  const [task3Instagram, setTask3Instagram] = useState<boolean>(false);

  const totalTasksCount = 3;
  const completedTasksCount = 
    (task1Airlock ? 1 : 0) + 
    (task2RefuelLights ? 1 : 0) + 
    (task3Instagram ? 1 : 0);

  const all3TasksCompleted = completedTasksCount === 3;

  useEffect(() => {
    // Check initial mute state
    setIsMuted(sound.getMuted());
  }, []);

  // When all 3 tasks are completed, close emergency modal and fire celebration
  useEffect(() => {
    if (all3TasksCompleted) {
      setIsEmergencyOpen(false);
      sound.playTaskComplete();
      confetti({
        particleCount: 140,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#34D399', '#67C9F5', '#FFD166', '#F45858']
      });
    }
  }, [all3TasksCompleted]);

  // Listen to scroll to trigger Bulkhead Lock & Lights Flicker when descending
  useEffect(() => {
    let triggered = false;
    const handleScroll = () => {
      if (window.scrollY > 850 && !triggered && !task2RefuelLights) {
        triggered = true;
        setIsBulkheadLocked(true);
        sound.playEmergency();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [task2RefuelLights]);

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleToggleSound = () => {
    const newMuted = sound.toggleMute();
    setIsMuted(newMuted);
  };

  // Task 2 Completion Handler (Refueling fixes lights and unlocks bulkhead)
  const handleTask2Complete = () => {
    setTask2RefuelLights(true);
    setIsBulkheadLocked(false);
  };

  // Task 3 Completion Handler (Instagram Story Tag)
  const handleTask3Complete = () => {
    setTask3Instagram(true);
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Called when Airlock Gate finishes opening
  const handleAirlockUnlock = () => {
    setTask1Airlock(true);
    setShowRoleIntro(true);
  };

  // Called when Role Reveal finishes
  const handleRoleIntroComplete = (assignedRole: UserRole) => {
    setUserRole(assignedRole);
    setShowRoleIntro(false);
    setIsAirlockOpen(true);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 relative ${
      isDarkMode 
        ? 'bg-slate-950 text-slate-100' 
        : 'bg-[#FFFDF9] text-slate-900'
    }`}>
      {/* Background Anime Speedlines, Lighting Strips, and Floating Crewmates */}
      <CrewmateBackground isDarkMode={isDarkMode} />

      {/* Step 1: Entry Airlock Gatekeeper Task (Completing opens doors and marks Task 1) */}
      {!isAirlockOpen && !showRoleIntro && (
        <AirlockGate 
          isUnlocked={false} 
          onUnlock={handleAirlockUnlock} 
        />
      )}

      {/* Step 2: SHHH! & Role Reveal Screen (Impostor / Engineer / Crewmate) */}
      {showRoleIntro && (
        <RoleIntroScreen onComplete={handleRoleIntroComplete} />
      )}

      {/* Step 3: Main Website Structure */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Lights Sabotage & Fluctuation Simulator (Task 2) */}
        <LightsSabotage 
          isDarkMode={isDarkMode} 
          onSabotageFixed={handleTask2Complete}
          isTask2Done={task2RefuelLights}
        />

        {/* Header HUD with Spark X IIIT Bhopal logo, 3-Task Bar, & Emergency Toggle */}
        <Header
          isDarkMode={isDarkMode}
          onToggleTheme={handleToggleTheme}
          isMuted={isMuted}
          onToggleSound={handleToggleSound}
          onTriggerEmergency={() => setIsEmergencyOpen(true)}
          onOpenAirlock={() => {
            setIsAirlockOpen(false);
            setShowRoleIntro(false);
          }}
          completedTasksCount={completedTasksCount}
          totalTasksCount={totalTasksCount}
        />

        {/* Floating Skeld Role Action Dock */}
        <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2 bg-slate-950/90 border-2 border-slate-700/80 p-2 rounded-2xl shadow-2xl backdrop-blur-md">
          {/* Active Role Indicator */}
          <div 
            onClick={() => setShowRoleIntro(true)}
            title="Click to replay role reveal"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-black uppercase cursor-pointer"
            style={{
              backgroundColor: userRole === 'impostor' ? '#EF4444' : userRole === 'engineer' ? '#F59E0B' : '#06B6D4',
              color: userRole === 'engineer' ? '#0F172A' : '#FFFFFF'
            }}
          >
            <span>ඞ {userRole}</span>
          </div>

          {/* Vent Quick Button */}
          <button
            onClick={() => {
              sound.playVent();
              setIsVentOpen(true);
            }}
            title="Access Ventilation Shafts"
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
              userRole === 'impostor' || userRole === 'engineer'
                ? 'border-amber-400 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 ring-1 ring-amber-400/50'
                : 'border-slate-800 bg-slate-900 text-slate-500 hover:text-slate-300'
            }`}
          >
            <Wind className="w-3.5 h-3.5" />
            <span>VENT</span>
          </button>

          {/* Emergency Button - VANISHES WHEN ALL 3 TASKS ARE COMPLETED! */}
          {!all3TasksCompleted && (
            <button
              onClick={() => {
                sound.playEmergency();
                setIsEmergencyOpen(true);
              }}
              title="Emergency Meeting (Vanishes when 3/3 tasks are done)"
              className="p-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white cursor-pointer shadow-md shadow-rose-600/30 animate-pulse"
            >
              <AlertOctagon className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Hero Section */}
        <HeroSection
          isDarkMode={isDarkMode}
          onOpenRegister={() => handleNavigateSection('registration-gate')}
          onTriggerEmergency={() => setIsEmergencyOpen(true)}
        />

        {/* Clear Orientation & Offline Event Guide: Venue IIIT Bhopal, Deadline 25 Oct, & 6 Tasks */}
        <OfflineEventDetails
          isDarkMode={isDarkMode}
          onOpenRegister={() => handleNavigateSection('registration-gate')}
          onJumpToTask3={() => handleNavigateSection('task-instagram')}
        />

        {/* Upper Bulkhead Gate Lockdown (Closes on scroll, opened by Refueling or Venting!) */}
        <BulkheadLockdown
          isLocked={isBulkheadLocked}
          onUnlock={handleTask2Complete}
          userRole={userRole}
          onOpenVent={() => setIsVentOpen(true)}
        />

        {/* Hackathon Itinerary & Timeline (Day 1 & Day 2) */}
        <EventSchedule
          isDarkMode={isDarkMode}
        />

        {/* ₹50,000+ Prize Pool, Rules & FAQs */}
        <PrizesAndRules
          isDarkMode={isDarkMode}
        />

        {/* The Skeld Ship Tasks Arcade (Interactive Among Us Mini-games: Wires, Card, Upload, Distributor) */}
        <ShipTasksArcade
          isDarkMode={isDarkMode}
          onTaskCompleted={() => {}}
          onTriggerEmergency={() => setIsEmergencyOpen(true)}
        />

        {/* Website Task 3: Instagram Tag Station */}
        <InstagramTaskCard
          isTaskCompleted={task3Instagram}
          onComplete={handleTask3Complete}
          allTasksCompleted={all3TasksCompleted}
        />

        {/* Squad Registration & Official Boarding Pass Minting */}
        <RegistrationSection
          isDarkMode={isDarkMode}
          onRegistered={() => {
            sound.playTaskComplete();
          }}
        />

        {/* Footer */}
        <Footer
          isDarkMode={isDarkMode}
          onOpenAirlock={() => {
            setIsAirlockOpen(false);
            setShowRoleIntro(false);
          }}
        />
      </div>

      {/* Emergency Modal: Displays ONLY incomplete tasks and vanishes when all 3 are completed */}
      <EmergencyModal
        isOpen={isEmergencyOpen && !all3TasksCompleted}
        onClose={() => setIsEmergencyOpen(false)}
        task1Airlock={task1Airlock}
        task2RefuelLights={task2RefuelLights}
        task3Instagram={task3Instagram}
        onCompleteTask2={handleTask2Complete}
        onCompleteTask3={handleTask3Complete}
      />

      {/* Vent Subway Fast-Travel Modal */}
      <VentNetwork
        isOpen={isVentOpen}
        onClose={() => setIsVentOpen(false)}
        userRole={userRole}
        onRoleChange={setUserRole}
        onUnlockBulkhead={handleTask2Complete}
      />
    </div>
  );
}
