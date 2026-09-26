"use client";

import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';

const CustomStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Kalam:wght@300;400;700&display=swap');

    .font-handwritten {
      font-family: 'Caveat', cursive;
    }
    
    .font-quirky {
      font-family: 'Kalam', cursive;
    }

    /* 3D Envelope setup */
    .perspective-container {
      perspective: 1200px;
    }

    .preserve-3d {
      transform-style: preserve-3d;
    }

    /* Envelope Flap Animation */
    .flap-closed {
      transform: rotateX(0deg);
      z-index: 40;
    }
    
    .flap-open {
      transform: rotateX(180deg);
      z-index: 10;
    }

    /* Wax seal popping animation */
    @keyframes pop {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.5); opacity: 0.5; }
      100% { transform: scale(0); opacity: 0; }
    }
    .animate-pop {
      animation: pop 0.3s ease-out forwards;
    }

    /* Floating hearts animation */
    @keyframes float-up {
      0% { transform: translateY(0) scale(1) rotate(0deg); opacity: 1; }
      100% { transform: translateY(-100vh) scale(1.5) rotate(45deg); opacity: 0; }
    }
    .floating-heart {
      animation: float-up 4s ease-in forwards;
      position: absolute;
      pointer-events: none;
    }

    /* Gently bobbing envelope */
    @keyframes bob {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    .animate-bob {
      animation: bob 3s ease-in-out infinite;
    }
  `}} />
);

// Inspired by image_b57913.jpg (watercolor heart)
const WatercolorHeart = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full opacity-30 absolute inset-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M 100, 180 C 100, 180 20, 120 20, 60 C 20, 30 40, 10 70, 10 C 85, 10 95, 20 100, 30 C 105, 20 115, 10 130, 10 C 160, 10 180, 30 180, 60 C 180, 120 100, 180 100, 180 Z" 
      fill="#ff8da1" 
      filter="blur(4px)"
      transform="translate(0, 5) scale(0.95)"
    />
    <path 
      d="M 100, 175 C 100, 175 25, 115 25, 60 C 25, 35 45, 15 70, 15 C 85, 15 95, 25 100, 35 C 105, 25 115, 15 130, 15 C 155, 15 175, 35 175, 60 C 175, 115 100, 175 100, 175 Z" 
      fill="#ff6b8b" 
    />
  </svg>
);

// Inspired by image_b57bd5.jpg (lipstick kiss)
const LipstickKiss = ({ className }) => (
  <svg viewBox="0 0 100 60" className={`w-8 h-8 opacity-60 ${className}`} xmlns="http://www.w3.org/2000/svg">
    <path d="M10,30 Q25,10 50,20 Q75,10 90,30 Q75,25 50,30 Q25,25 10,30 Z" fill="#d91e48" />
    <path d="M10,30 Q25,50 50,40 Q75,50 90,30 Q75,35 50,35 Q25,35 10,30 Z" fill="#c0153b" />
    <path d="M20,30 Q50,25 80,30" stroke="#f48fb1" strokeWidth="1" fill="none" />
  </svg>
);

const Envelope = ({ isOpened, setIsOpened }) => {
  const [sealPopped, setSealPopped] = useState(false);
  const [showNoteContent, setShowNoteContent] = useState(false);

  useEffect(() => {
    if (isOpened) {
      setSealPopped(true);
      // Delay showing content fully until letter slides up slightly
      setTimeout(() => setShowNoteContent(true), 600);
    } else {
      setShowNoteContent(false);
      // Reset seal when closing
      setTimeout(() => setSealPopped(false), 500); 
    }
  }, [isOpened]);

  const toggleEnvelope = () => setIsOpened(!isOpened);

  return (
    <div className={`relative w-80 sm:w-96 h-64 cursor-pointer perspective-container transition-transform duration-300 ${!isOpened ? 'hover:scale-105 animate-bob' : ''}`} onClick={toggleEnvelope}>
      
      {/* The Letter (Inside) */}
      <div 
        className={`absolute left-2 right-2 sm:left-4 sm:right-4 bg-[#fdfbf7] rounded-md shadow-xl border border-rose-100 flex flex-col items-center justify-center p-6 text-center transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          ${isOpened 
            ? '-translate-y-48 sm:-translate-y-56 h-80 sm:h-96 z-30 rotate-[-2deg]' 
            : 'translate-y-0 h-60 z-10 rotate-0'}`}
        style={{ transformOrigin: 'bottom center' }}
      >
        <WatercolorHeart />
        
        {/* Content fades in after opening */}
        <div className={`relative z-10 flex flex-col items-center h-full w-full justify-between transition-opacity duration-700 delay-300 ${showNoteContent ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-full flex justify-between px-2">
            <LipstickKiss className="-rotate-12" />
            <LipstickKiss className="rotate-45 scale-75 mt-4" />
          </div>

          <div className="space-y-4">
            <h1 className="font-quirky text-3xl sm:text-4xl text-rose-900 leading-tight">
              Happy <span className="text-rose-600 font-bold text-4xl sm:text-5xl block my-1">Love Note Day</span> Gorgeous!
            </h1>
            <p className="font-handwritten text-2xl sm:text-3xl text-stone-800">
              You are always in my heart <br/>
              Always and Always. <span className="text-rose-600 font-bold">❤️</span>
            </p>
          </div>

          <div className="w-full flex flex-col items-center mt-4 border-t-2 border-dashed border-rose-200 pt-4">
            <p className="font-handwritten text-xl text-rose-900 mb-2">I Love You Cutie Ko Mwah😘</p>
            <div className="flex gap-2 text-rose-400">
              <Heart size={16} fill="currentColor" />
              <Heart size={16} fill="currentColor" className="scale-75" />
              <Heart size={16} fill="currentColor" />
            </div>
          </div>
        </div>
      </div>

      {/* Envelope Back */}
      <div className="absolute inset-0 bg-rose-300 rounded-lg shadow-inner z-0 border border-rose-400"></div>

      {/* Envelope Front (Pocket) */}
      <div className="absolute bottom-0 left-0 w-full h-full z-20 pointer-events-none drop-shadow-lg">
        {/* Left triangle */}
        <div className="absolute bottom-0 left-0 w-[55%] h-full bg-rose-400 border-r border-t border-rose-500 rounded-bl-lg" 
             style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}></div>
        {/* Right triangle */}
        <div className="absolute bottom-0 right-0 w-[55%] h-full bg-rose-400 border-l border-t border-rose-500 rounded-br-lg" 
             style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }}></div>
        {/* Bottom triangle */}
        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-rose-500 rounded-b-lg border-t border-rose-600 shadow-inner" 
             style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }}></div>
      </div>

      {/* Envelope Flap (Top) */}
      <div 
        className={`absolute top-0 left-0 w-full h-[65%] origin-top transition-transform duration-700 ease-in-out preserve-3d
          ${isOpened ? 'flap-open' : 'flap-closed'}`}
      >
        {/* Flap Outer (Visible when closed) */}
        <div className="absolute inset-0 bg-rose-100 border-b border-rose-500 shadow-md rounded-t-lg"
             style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)', backfaceVisibility: 'hidden' }}>
        </div>
        
        {/* Flap Inner (Visible when open) */}
        <div className="absolute inset-0 bg-rose-300 rounded-t-lg border-t border-rose-400"
             style={{ 
               clipPath: 'polygon(0 0, 100% 0, 50% 100%)', 
               backfaceVisibility: 'hidden',
               transform: 'rotateX(180deg)' 
             }}>
             {/* Little pattern inside the flap */}
             <div className="w-full h-full opacity-20 flex justify-center items-end pb-8">
               <Heart size={24} fill="#9f1239" className="rotate-180"/>
             </div>
        </div>

        {/* Wax Seal */}
        <div className={`absolute bottom-[-15px] left-1/2 -translate-x-1/2 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg border-2 border-red-700 z-50 cursor-pointer
            ${sealPopped ? 'animate-pop pointer-events-none' : 'hover:scale-110 transition-transform'}`}
            style={{ backfaceVisibility: 'hidden' }}
            onClick={(e) => { e.stopPropagation(); toggleEnvelope(); }}
        >
          <div className="w-10 h-10 border border-red-800 rounded-full flex items-center justify-center bg-red-600">
             <Heart size={18} fill="#ffb3c6" className="text-red-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [hearts, setHearts] = useState([]);

  // Generate floating hearts when opened
  useEffect(() => {
    if (isOpened) {
      const newHearts = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 0.5}s`,
        size: Math.random() * 20 + 10
      }));
      setHearts(newHearts);
      
      // Clean up hearts after animation
      const timer = setTimeout(() => setHearts([]), 4500);
      return () => clearTimeout(timer);
    } else {
      setHearts([]);
    }
  }, [isOpened]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-100 to-red-50 flex flex-col items-center justify-center p-4 overflow-hidden font-sans relative">
      <CustomStyles />
      
      {/* Background decoration inspired by image_b525ff.jpg (books/shelves vibe) */}
      <div className="absolute top-0 left-0 w-full h-32 bg-white/40 border-b border-rose-200 shadow-sm flex items-end justify-around px-10 pb-4 hidden sm:flex">
         <div className="flex gap-2 items-end">
            <div className="w-4 h-16 bg-rose-500 rounded-sm"></div>
            <div className="w-6 h-20 bg-pink-400 rounded-sm"></div>
            <div className="w-5 h-14 bg-red-500 rounded-sm"></div>
         </div>
         <p className="font-handwritten text-3xl text-rose-400 rotate-[-5deg]">Our Story</p>
         <div className="flex gap-2 items-end">
            <div className="w-5 h-14 bg-rose-400 rounded-sm"></div>
            <div className="w-8 h-24 bg-red-600 rounded-sm"></div>
         </div>
      </div>

      {/* Dynamic floating hearts */}
      {hearts.map(heart => (
        <div 
          key={heart.id} 
          className="floating-heart text-rose-500 flex justify-center items-center"
          style={{ 
            left: heart.left, 
            bottom: '20%', 
            animationDelay: heart.animationDelay 
          }}
        >
          <Heart size={heart.size} fill="currentColor" opacity={0.6} />
        </div>
      ))}

      {/* Main Interactive Area */}
      <div className="flex flex-col items-center z-10 mt-16 sm:mt-24">
        
        {/* Header Text */}
        <div className={`mb-12 text-center transition-all duration-500 ${isOpened ? 'opacity-0 -translate-y-5' : 'opacity-100 translate-y-0'}`}>
          <h2 className="font-quirky text-4xl sm:text-5xl text-rose-600 drop-shadow-sm flex items-center justify-center gap-3 mb-2">
            <Sparkles size={24} className="text-yellow-400" />
            Cute Little Note for Cutie
            <Sparkles size={24} className="text-yellow-400" />
          </h2>
          <p className="font-handwritten text-2xl text-stone-600">Tap to open...</p>
        </div>

        {/* Envelope Component */}
        <div className="mb-24 sm:mb-16">
          <Envelope isOpened={isOpened} setIsOpened={setIsOpened} />
        </div>
        
        {/* Reset Button (only shows when open) */}
        <button 
          onClick={() => setIsOpened(false)}
          className={`mt-8 px-6 py-2 rounded-full bg-rose-100 text-rose-600 font-quirky text-xl font-bold border-2 border-rose-200 hover:bg-rose-200 hover:scale-105 transition-all duration-300 shadow-sm
            ${isOpened ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-4 invisible'}`}
        >
          Close Note
        </button>

      </div>

      {/* Bottom decorative border */}
      <div className="absolute bottom-0 w-full flex justify-center overflow-hidden opacity-50 py-2">
         {Array.from({length: 20}).map((_, i) => (
           <Heart key={i} size={16} className="text-rose-300 mx-2 flex-shrink-0" fill="currentColor"/>
         ))}
      </div>
    </div>
  );
}