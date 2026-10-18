import React from 'react';

interface CrewmateBackgroundProps {
  isDarkMode: boolean;
}

export const CrewmateBackground: React.FC<CrewmateBackgroundProps> = ({ isDarkMode }) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Base Grid */}
      <div 
        className={`absolute inset-0 transition-opacity duration-500 ${
          isDarkMode 
            ? 'bg-cyber-grid opacity-30' 
            : 'bg-cyber-grid-light opacity-50'
        }`} 
      />

      {/* Diagonal Anime Hazard Energy Strips in Corners */}
      <div 
        className={`absolute -top-12 -right-12 w-96 h-28 transform rotate-12 opacity-15 pointer-events-none ${
          isDarkMode ? 'bg-hazard-stripes' : 'bg-hazard-stripes'
        }`}
      />
      <div 
        className={`absolute -bottom-16 -left-16 w-[30rem] h-24 transform -rotate-12 opacity-15 pointer-events-none ${
          isDarkMode ? 'bg-hazard-stripes' : 'bg-hazard-stripes'
        }`}
      />

      {/* Floating Animated Crewmates in Background */}
      {/* Crewmate 1: Floating Red in top left */}
      <div 
        className="absolute top-28 left-8 sm:left-20 opacity-20 sm:opacity-30 animate-pulse pointer-events-none select-none transition-all duration-1000 transform hover:scale-110"
        style={{ animationDuration: '6s' }}
      >
        <svg width="48" height="60" viewBox="0 0 100 120" className="transform -rotate-12">
          {/* Backpack */}
          <rect x="15" y="40" width="18" height="42" rx="9" fill="#C53030" stroke="#111827" strokeWidth="6" />
          {/* Main Body */}
          <path d="M30,30 C30,12 75,12 75,30 L75,85 C75,95 65,100 58,100 L58,88 L46,88 L46,100 C38,100 30,95 30,85 Z" fill="#F45858" stroke="#111827" strokeWidth="6" strokeLinejoin="round" />
          {/* Visor */}
          <ellipse cx="62" cy="42" rx="19" ry="13" fill="#67C9F5" stroke="#111827" strokeWidth="6" />
          <ellipse cx="58" cy="39" rx="10" ry="5" fill="#E0F7FA" />
        </svg>
      </div>

      {/* Crewmate 2: Floating Cyan in bottom right */}
      <div 
        className="absolute bottom-36 right-8 sm:right-24 opacity-20 sm:opacity-30 pointer-events-none select-none transform rotate-15"
      >
        <svg width="42" height="52" viewBox="0 0 100 120">
          <rect x="15" y="40" width="18" height="42" rx="9" fill="#0284C7" stroke="#111827" strokeWidth="6" />
          <path d="M30,30 C30,12 75,12 75,30 L75,85 C75,95 65,100 58,100 L58,88 L46,88 L46,100 C38,100 30,95 30,85 Z" fill="#67C9F5" stroke="#111827" strokeWidth="6" strokeLinejoin="round" />
          <ellipse cx="62" cy="42" rx="19" ry="13" fill="#B8A5F5" stroke="#111827" strokeWidth="6" />
          <ellipse cx="58" cy="39" rx="10" ry="5" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Crewmate 3: Floating Yellow in middle right */}
      <div 
        className="hidden md:block absolute top-1/2 right-12 opacity-15 pointer-events-none select-none transform -rotate-45"
      >
        <svg width="36" height="44" viewBox="0 0 100 120">
          <rect x="15" y="40" width="18" height="42" rx="9" fill="#D97706" stroke="#111827" strokeWidth="6" />
          <path d="M30,30 C30,12 75,12 75,30 L75,85 C75,95 65,100 58,100 L58,88 L46,88 L46,100 C38,100 30,95 30,85 Z" fill="#FFD166" stroke="#111827" strokeWidth="6" strokeLinejoin="round" />
          <ellipse cx="62" cy="42" rx="19" ry="13" fill="#67C9F5" stroke="#111827" strokeWidth="6" />
        </svg>
      </div>

      {/* Ambient Lighting Nebulae */}
      <div 
        className={`absolute top-1/4 left-1/3 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
          isDarkMode ? 'bg-rose-600/10' : 'bg-rose-400/10'
        }`} 
      />
      <div 
        className={`absolute bottom-1/3 right-1/4 w-[28rem] h-[28rem] rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
          isDarkMode ? 'bg-cyan-600/10' : 'bg-cyan-400/10'
        }`} 
      />
    </div>
  );
};
