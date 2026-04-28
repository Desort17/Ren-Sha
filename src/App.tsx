import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { 
  Heart, Music2, Volume2, Sparkles, Check, X, 
  Mic, Gift, Star, Quote, ChevronRight, MessageSquareHeart,
  Flower2, PartyPopper, Star as StarIcon
} from 'lucide-react';

// --- Parallax Hook ---

const useParallax = (strength: number = 0.05) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const x = useSpring(useTransform(mouseX, (v) => v * strength), { stiffness: 50, damping: 20 });
  const y = useSpring(useTransform(mouseY, (v) => v * strength), { stiffness: 50, damping: 20 });

  return { x, y };
};

// --- Constants & Types ---

const COLORS = {
  wine: '#2D0B14',
  roseGold: '#B76E79',
  gold: '#D4AF37'
};

const QUOTES = [
  { text: "Whatever our souls are made of, his and mine are the same.", author: "Emily Brontë" },
  { text: "I love you without knowing how, or when, or from where.", author: "Pablo Neruda" },
  { text: "In case you ever foolishly forget: I am never not thinking of you.", author: "Virginia Woolf" },
  { text: "Love recognizes no barriers. It jumps hurdles, leaps fences.", author: "Maya Angelou" },
  { text: "It was enough for me to be sure that you and I exist at this moment.", author: "Gabriel García Márquez" }
];

const POEM_LINES = [
  "I’m not even gonna dress this up too much—",
  "you just… happened to me, and now everything hits different.",
  "You walked in quiet, no warning sign,",
  "now somehow your heartbeat feels synced with mine.",
  "You turned my chaos into something clean,",
  "made real what I thought was just a dream.",
  "Lowkey, I don’t wanna do this life solo,",
  "I want your hand in mine—fast lane or slow-mo.",
  "So here’s me, no script, no pretend—",
  "I don’t just want you now, I want you ‘til the end.",
  "So tell me…",
  "will you be mine, for real this time?"
];

// --- Helpers ---

const FloatingAsset = ({ type }: { type: 'heart' | 'petal' | 'cherry' | 'balloon' | 'star' | 'rose', key?: React.Key }) => {
  const isBalloon = type === 'balloon';
  const randomDelay = useMemo(() => Math.random() * 5, []);
  const randomDuration = useMemo(() => isBalloon ? 6 + Math.random() * 4 : 15 + Math.random() * 10, [isBalloon]);
  const startX = useMemo(() => Math.random() * 100, []);
  
  return (
    <motion.div
      initial={{ y: isBalloon ? '110%' : '-10%', opacity: 0, x: `${startX}%` }}
      animate={{ 
        y: isBalloon ? '-110%' : '110%',
        x: [`${startX}%`, `${startX + (Math.random() - 0.5) * 10}%`, `${startX}%`],
        opacity: [0, 0.7, 0.7, 0],
        rotate: [0, 360],
        scale: [0.8, 1.2, 0.8]
      }}
      transition={{ 
        duration: randomDuration, 
        repeat: isBalloon ? 0 : Infinity, 
        delay: randomDelay,
        ease: "linear" 
      }}
      className="absolute pointer-events-none z-0"
    >
      {type === 'heart' && (
        <div className="relative group">
          <Heart size={20 + Math.random() * 15} className="text-red-500 fill-red-600 opacity-30 drop-shadow-[0_0_15px_rgba(225,29,72,0.8)]" />
          <motion.div animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0.6, 0.2] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute inset-0 bg-red-500 blur-2xl rounded-full" />
        </div>
      )}
      {type === 'petal' && <div className="w-6 h-4 bg-rose-800/50 rounded-tl-full rounded-br-full blur-[1px] opacity-40 shadow-[0_0_12px_rgba(255,50,50,0.4)] rotate-45" />}
      {type === 'rose' && (
        <div className="relative">
          <Flower2 size={24 + Math.random() * 10} className="text-red-900 fill-red-700 opacity-50 drop-shadow-rose" />
          <div className="absolute top-0 left-0 w-full h-full bg-red-500 blur-lg opacity-20" />
        </div>
      )}
      {type === 'cherry' && <div className="w-5 h-5 bg-red-900/50 rounded-full border border-red-400/40 opacity-50 shadow-[0_0_18px_rgba(220,38,38,0.5)]" />}
      {type === 'star' && (
        <div className="relative">
          <StarIcon size={12 + Math.random() * 10} className="text-amber-200 fill-amber-100 opacity-40 drop-shadow-gold" />
          <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute inset-0 bg-amber-400 blur-md opacity-20" />
        </div>
      )}
      {type === 'balloon' && (
        <div className="w-24 h-32 bg-gradient-to-t from-red-900/40 to-rose-500/30 rounded-full opacity-60 flex items-center justify-center relative backdrop-blur-md border border-white/20 shadow-[0_0_50px_rgba(225,29,72,0.4)]">
            <Heart size={18} className="text-white fill-white animate-pulse" />
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-[1px] h-28 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      )}
    </motion.div>
  );
};

const Fireworks = () => (
  <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
    {[...Array(25)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ scale: 0, x: '50%', y: '100%' }}
        animate={{ 
          scale: [0, 1.8, 0],
          x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
          y: ['100%', `${Math.random() * 40}%`]
        }}
        transition={{ duration: 2.5, repeat: Infinity, delay: Math.random() * 2 }}
        className="absolute w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_30px_#fbbf24]"
      />
    ))}
  </div>
);

// --- Scene Components ---

const Scene1 = ({ onNext }: { onNext: () => void, key?: React.Key }) => {
  const { x, y } = useParallax(0.03); // Lighter strength for background
  const { x: x2, y: y2 } = useParallax(0.07); // Stronger strength for middle-ground

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen relative overflow-hidden"
    >
      {/* Background Parallax Layer */}
      <motion.div style={{ x, y, scale: 1.1 }} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(90,22,40,0.6)_0%,_rgba(45,11,20,1)_100%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-wine-light/20 blur-[150px] rounded-full animate-pulse" />
      </motion.div>

      {/* Middle-ground Parallax Particles */}
      <motion.div style={{ x: x2, y: y2 }} className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <FloatingAsset key={`bg-${i}`} type={i % 3 === 0 ? 'star' : i % 3 === 1 ? 'petal' : 'heart'} />
        ))}
      </motion.div>

      {/* Static Floating Assets (Fore-ground) */}
      {[...Array(15)].map((_, i) => (
        <FloatingAsset key={`fg-${i}`} type={i % 2 === 0 ? 'petal' : 'heart'} />
      ))}
      
      <div className="flex flex-col md:flex-row justify-between p-12 z-10 w-full relative">
        <motion.div 
          initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1.5 }}
          className="glass p-12 rounded-[2rem] max-w-sm"
        >
          <span className="text-[12px] tracking-[0.5em] uppercase text-rose-300 font-black block mb-6 animate-pulse">
            THE LEGEND OF SHARK & RENA
          </span>
          <p className="font-script text-4xl text-rose-50 md:text-5xl mb-8 leading-snug drop-shadow-glow">
            "Whatever our souls are made of, yours and mine are the same."
          </p>
          <hr className="w-20 border-rose-300/40 mb-10" />
          <p className="text-[11px] tracking-[0.4em] text-white/50 uppercase font-bold">— A STORY WRITTEN IN THE STARS</p>
        </motion.div>

        <motion.div 
          initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5 }}
          className="text-right mt-12 md:mt-0"
        >
          <h1 className="font-script text-8xl md:text-[11rem] text-white drop-shadow-glow leading-none select-none">
            Happy Proposal
          </h1>
          <h2 className="font-script text-7xl md:text-9xl text-rose-200 drop-shadow-glow mt-[-30px] select-none">
            Rena
          </h2>
          <p className="text-base tracking-[0.8em] text-rose-200/60 mt-10 uppercase font-black">
            EVERY MOMENT WITH YOU IS A MASTERPIECE
          </p>
        </motion.div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-24 z-10 px-12 relative mb-20">
        <div className="flex flex-col items-center group">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: -2 }}
            className="w-64 h-64 md:w-80 md:h-80 rounded-full border-[8px] border-white/10 shadow-[0_0_80px_rgba(255,255,255,0.15)] relative overflow-hidden bg-black/40"
          >
            <img src="/Sha.png" alt="Shark" className="w-full h-full object-cover transition-all duration-1000 grayscale group-hover:grayscale-0 scale-110" referrerPolicy="no-referrer" />
            <div className="absolute top-0 left-0 w-full h-full bg-wine/20" />
          </motion.div>
          <p className="mt-10 font-script text-6xl text-white tracking-[0.4em] drop-shadow-glow">SHARK</p>
        </div>

        <motion.div 
          animate={{ scale: [1, 1.4, 1], rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 4 }}
          className="relative"
        >
          <Heart size={100} className="text-rose-600 fill-rose-500/50 drop-shadow-[0_0_30px_rgba(225,29,72,0.8)]" />
          <Sparkles className="absolute -top-10 -right-10 text-yellow-400 w-14 h-14 animate-pulse" />
        </motion.div>

        <div className="flex flex-col items-center group">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 2 }}
            className="w-64 h-64 md:w-80 md:h-80 rounded-full border-[8px] border-rose-500/30 shadow-[0_0_80px_rgba(183,110,121,0.3)] relative overflow-hidden bg-black/40"
          >
             <img src="/Ren.png" alt="Rena" className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-125 scale-110" referrerPolicy="no-referrer" />
             <div className="absolute top-0 left-0 w-full h-full bg-wine/20" />
          </motion.div>
          <p className="mt-10 font-script text-6xl text-white tracking-[0.4em] drop-shadow-glow">RENA</p>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.25)', boxShadow: "0 0 40px rgba(255,255,255,0.2)" }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          console.log("Navigating to Scene 2");
          onNext();
        }}
        className="fixed bottom-24 left-1/2 -translate-x-1/2 px-16 py-6 glass border-2 border-white/40 rounded-full text-white hover:text-rose-100 transition-all uppercase tracking-[0.6em] text-sm font-black z-[100] cursor-pointer shadow-2xl"
      >
        Click to Continue
      </motion.button>
    </motion.div>
  );
};

const Scene2 = ({ onNext }: { onNext: () => void, key?: React.Key }) => {
  const [opening, setOpening] = useState(false);
  const { x, y } = useParallax(0.04);

  useEffect(() => {
    if (opening) {
      const timer = setTimeout(onNext, 3000);
      return () => clearTimeout(timer);
    }
  }, [opening, onNext]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen p-8 overflow-hidden relative"
    >
      <motion.div style={{ x, y, scale: 1.15 }} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(90,22,40,0.6)_0%,_rgba(20,5,10,1)_100%)] opacity-95" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
      </motion.div>
      
      {/* Luxury Flower Rain */}
      {[...Array(40)].map((_, i) => (
        <FloatingAsset key={i} type={i % 2 === 0 ? "rose" : "heart"} />
      ))}
      
      <div className="relative perspective-1000 flex flex-col items-center z-10 transform scale-75 md:scale-100">
        {/* Ornate Floral Arch */}
        <motion.div 
          initial={{ y: -200, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          className="absolute -top-60 flex justify-center items-center w-[160%] h-[300px] z-20 pointer-events-none"
        >
          <div className="absolute inset-0 border-t-[30px] border-x-[15px] border-amber-600/40 rounded-t-[300px] blur-sm" />
          <div className="absolute inset-0 flex flex-wrap justify-center content-start gap-4 p-12">
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 3 + Math.random() * 2, repeat: Infinity }}
              >
                <Flower2 
                  className={i % 3 === 0 ? "text-red-700" : i % 3 === 1 ? "text-rose-900" : "text-amber-500"} 
                  size={30 + Math.random() * 40} 
                  fill="currentColor"
                />
              </motion.div>
            ))}
          </div>
          <Sparkles className="absolute top-0 left-0 text-amber-300 w-20 h-20 animate-pulse drop-shadow-gold" />
          <Sparkles className="absolute top-0 right-0 text-amber-300 w-20 h-20 animate-pulse drop-shadow-gold" />
        </motion.div>

        <div className="relative flex preserve-3d">
          <motion.div
             animate={{ rotateY: opening ? -130 : 0 }}
             transition={{ duration: 3, ease: "easeInOut" }}
             className="w-64 h-[700px] royal-border rounded-tl-[200px] bg-amber-950/20 glass door-side origin-left relative shadow-2xl overflow-hidden"
          >
             <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
             <div className="absolute top-1/2 right-8 w-12 h-12 bg-gradient-to-br from-amber-300 to-amber-700 rounded-full shadow-[0_0_30px_rgba(212,175,55,0.6)] border-2 border-amber-200/50 flex items-center justify-center">
                <div className="w-4 h-4 bg-black/40 rounded-full" />
             </div>
             {/* Vines/Flowers on door */}
             <div className="absolute top-20 left-10 opacity-30">
                <Flower2 size={100} className="text-red-900" />
                <Flower2 size={80} className="text-red-900 mt-[-40px] ml-10" />
             </div>
          </motion.div>
          <motion.div
             animate={{ rotateY: opening ? 130 : 0 }}
             transition={{ duration: 3, ease: "easeInOut" }}
             className="w-64 h-[700px] royal-border rounded-tr-[200px] bg-amber-950/20 glass door-side origin-right relative shadow-2xl overflow-hidden"
          >
             <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent" />
             <div className="absolute top-1/2 left-8 w-12 h-12 bg-gradient-to-br from-amber-300 to-amber-700 rounded-full shadow-[0_0_30px_rgba(212,175,55,0.6)] border-2 border-amber-200/50 flex items-center justify-center">
                <div className="w-4 h-4 bg-black/40 rounded-full" />
             </div>
              {/* Vines/Flowers on door */}
              <div className="absolute bottom-20 right-10 opacity-30">
                <Flower2 size={100} className="text-red-900" />
                <Flower2 size={80} className="text-red-900 mt-[-40px] mr-10" />
             </div>
          </motion.div>
        </div>

        <div className="mt-24">
          {!opening && (
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(212,175,55,0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpening(true)}
              className="px-20 py-8 bg-gradient-to-r from-red-900/80 to-rose-900/80 border-2 border-amber-500/50 rounded-full text-amber-200 font-black tracking-[0.8em] backdrop-blur-2xl transition-all flex items-center gap-8 group uppercase z-50 relative cursor-pointer shadow-3xl"
            >
              <PartyPopper className="text-amber-300 group-hover:rotate-12 transition-transform w-10 h-10" />
              Enter the Kingdom
              <PartyPopper className="text-amber-300 group-hover:-rotate-12 transition-transform w-10 h-10" />
            </motion.button>
          )}
          {opening && (
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }}
               className="text-amber-200 font-script text-6xl drop-shadow-gold"
             >
               Welcome My Queen...
             </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Scene3 = ({ onNext }: { onNext: () => void, key?: React.Key }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const { x, y } = useParallax(0.02);

  useEffect(() => {
    if (currentLine < POEM_LINES.length) {
      const timer = setTimeout(() => setCurrentLine(l => l + 1), 1500);
      return () => clearTimeout(timer);
    }
  }, [currentLine]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen p-8 text-center relative overflow-hidden"
    >
      <motion.div style={{ x, y, scale: 1.1 }} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(90,22,40,0.4)_0%,_rgba(45,11,20,0.9)_100%)] opacity-90" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-500/5 blur-[100px] rounded-full" />
      </motion.div>
      
      {[...Array(25)].map((_, i) => <FloatingAsset key={i} type={i % 2 === 0 ? "petal" : "star"} />)}
      
      <div className="max-w-3xl z-10 bg-black/30 p-12 rounded-[3rem] border border-white/5 backdrop-blur-md shadow-2xl">
        <AnimatePresence mode="popLayout">
          {POEM_LINES.slice(0, currentLine + 1).map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className={`text-2xl md:text-3xl font-script mb-6 leading-relaxed transition-colors duration-500 ${i === POEM_LINES.length - 1 ? 'text-amber-300 font-bold mt-12 text-4xl' : 'text-rose-100/90'}`}
            >
              {line}
            </motion.p>
          ))}
        </AnimatePresence>
      </div>

      {currentLine >= POEM_LINES.length && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
          className="mt-16 flex flex-col items-center gap-10 z-10"
        >
          <div className="flex items-center gap-6 p-6 bg-white/5 rounded-3xl border border-white/10 w-80 backdrop-blur-xl">
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}
              className="w-14 h-14 rounded-full bg-rose-500/30 flex items-center justify-center"
            >
              <Mic className="text-rose-300 w-7 h-7" />
            </motion.div>
            <div className="flex-1 space-y-3">
              <div className="h-1.5 bg-rose-500/40 rounded-full w-full" />
              <div className="h-1.5 bg-rose-500/20 rounded-full w-3/4" />
              <p className="text-[10px] uppercase tracking-widest text-white/40">Listening to your heart...</p>
            </div>
          </div>
          <button 
            onClick={onNext}
            className="flex items-center gap-4 text-rose-200 hover:text-white transition-all uppercase tracking-[0.4em] text-sm font-bold group z-50 relative cursor-pointer"
          >
            I have something to ask <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

const Scene4 = ({ onNext }: { onNext: () => void, key?: React.Key }) => {
  const [complete, setComplete] = useState(false);
  const { x, y } = useParallax(0.05);

  useEffect(() => {
    const timer = setTimeout(() => setComplete(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen bg-black overflow-hidden relative"
    >
      <motion.div style={{ x, y, scale: 1.2 }} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e0b11_0%,_#000_100%)] opacity-80" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />
      </motion.div>
      
      <div className="flex items-end gap-12 relative h-[500px] w-full max-w-4xl px-12 z-10">
        {/* Shark Silhouette */}
        <motion.div 
          initial={{ x: -400, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 3, ease: "easeOut" }}
          className="relative flex flex-col items-center"
        >
          <div className="w-40 h-80 bg-slate-900 rounded-t-[100px] shadow-[0_0_120px_rgba(30,58,138,0.3)]" />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-6 text-blue-400 font-script text-4xl drop-shadow-rose">Shark</motion.p>
        </motion.div>
        
        {/* Ring and Sparkle Area */}
        <div className="flex-1 flex flex-col items-center justify-center h-full relative">
           <motion.div 
              initial={{ y: -500, opacity: 0, scale: 0 }} 
              animate={complete ? { y: -100, opacity: 1, scale: 1.5 } : {}}
              transition={{ type: "spring", stiffness: 50, damping: 10 }}
              className="z-20 relative"
            >
              <div className="relative group cursor-pointer z-50" onClick={onNext}>
                <div className="w-24 h-24 rounded-full border-[12px] border-amber-300 drop-shadow-[0_0_50px_rgba(251,191,36,1)] relative shadow-[inset_0_0_20px_rgba(251,191,36,0.5)]">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-12 h-12 bg-blue-300 rounded-full blur-[3px] shadow-[0_0_40px_#93c5fd] animate-pulse" />
                </div>
                <Sparkles className="absolute -top-16 -right-16 text-yellow-200 w-20 h-20 animate-spin-slow opacity-80" />
              </div>
            </motion.div>
        </div>

        {/* Rena Silhouette */}
        <motion.div 
          initial={{ x: 400, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 3, ease: "easeOut" }}
          className="relative flex flex-col items-center"
        >
          <div className="w-40 h-80 bg-rose-950 rounded-t-[100px] shadow-[0_0_120px_rgba(183,110,121,0.3)]" />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-6 text-rose-400 font-script text-4xl drop-shadow-rose">Rena</motion.p>
        </motion.div>
      </div>
      
      <motion.p 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4 }}
        className="mt-20 text-yellow-100/40 font-script text-3xl tracking-[0.6em] animate-pulse z-10 drop-shadow-glow"
      >
        CLICK THE RING
      </motion.p>
    </motion.div>
  );
};

const Scene5 = ({ onNext }: { onNext: () => void, key?: React.Key }) => {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [accepted, setAccepted] = useState(false);
  const { x, y } = useParallax(0.06);

  const moveNo = () => {
    const x = Math.random() * 600 - 300;
    const y = Math.random() * 400 - 200;
    setNoPos({ x, y });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen p-8 text-center relative overflow-hidden"
    >
      <motion.div style={{ x, y, scale: 1.1 }} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(90,22,40,0.6)_0%,_rgba(45,11,20,1)_100%)] opacity-90" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-15" />
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-rose-800/10 blur-[150px] rounded-full animate-pulse-subtle" />
      </motion.div>

      {/* Luxury Flower Rain */}
      {[...Array(30)].map((_, i) => (
        <FloatingAsset key={i} type={i % 2 === 0 ? "rose" : "heart"} />
      ))}
      
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      {accepted && <Fireworks />}
      
      <motion.h2 
        animate={accepted ? { scale: [1, 1.2, 1], rotate: [0, 2, -2, 0] } : {}}
        className="font-script text-7xl md:text-[10rem] text-white mb-24 drop-shadow-rose relative z-10 font-black"
      >
        Will you marry me?
      </motion.h2>

      <div className="flex flex-wrap justify-center gap-16 items-center z-20">
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: "0 0 100px rgba(225,29,72,0.9)" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => { setAccepted(true); setTimeout(onNext, 5000); }}
          className="px-24 py-10 bg-gradient-to-br from-rose-600 to-rose-800 rounded-[2.5rem] text-white font-black text-4xl shadow-[0_0_60px_rgba(225,29,72,0.6)] hover:brightness-110 transition-all uppercase tracking-[0.2em] z-50 relative cursor-pointer border-4 border-rose-400/30"
        >
          YES!
        </motion.button>

        <motion.button
          animate={{ x: noPos.x, y: noPos.y }}
          onMouseEnter={moveNo}
          className="px-12 py-5 bg-white/5 rounded-full text-white/30 cursor-default border border-white/5"
        >
          No...
        </motion.button>
      </div>
    </motion.div>
  );
};

const Scene6 = ({ onNext }: { onNext: () => void, key?: React.Key }) => {
  const [idx, setIdx] = useState(0);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen p-8 text-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(90,22,40,0.4)_0%,_rgba(45,11,20,0.9)_100%)] pointer-events-none" />
      {[...Array(20)].map((_, i) => <FloatingAsset key={i} type="petal" />)}
      <Quote className="text-rose-500/40 w-20 h-20 mb-12 drop-shadow-glow" />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          className="max-w-3xl glass p-16 rounded-[4rem]"
        >
          <p className="text-3xl md:text-5xl font-script text-rose-100 italic mb-8 leading-relaxed">
            "{QUOTES[idx].text}"
          </p>
          <p className="text-amber-400 font-bold tracking-[0.4em] uppercase text-sm">— {QUOTES[idx].author}</p>
        </motion.div>
      </AnimatePresence>

      <div className="mt-20 flex gap-8">
        {idx < QUOTES.length - 1 ? (
          <button 
            onClick={() => setIdx(i => i + 1)}
            className="px-10 py-3 glass border border-white/10 rounded-full text-white/50 hover:text-white transition-colors uppercase tracking-[0.3em] font-bold text-xs z-50 relative cursor-pointer"
          >
            Next Quote
          </button>
        ) : (
          <button 
            onClick={onNext}
            className="px-16 py-4 bg-rose-900/40 border border-rose-500/50 rounded-full text-rose-100 uppercase tracking-[0.5em] font-bold text-xs hover:bg-rose-900 transition-all z-50 relative cursor-pointer"
          >
            I Want to See More
          </button>
        )}
      </div>
    </motion.div>
  );
};

const Scene7 = ({ onNext }: { onNext: () => void, key?: React.Key }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { x, y } = useParallax(0.04);

  return (
    <motion.div className="flex flex-col items-center justify-center min-h-screen p-8 text-center relative overflow-hidden">
      <motion.div style={{ x, y, scale: 1.1 }} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(90,22,40,0.4)_0%,_rgba(45,11,20,0.9)_100%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.05)_0%,_transparent_50%)]" />
      </motion.div>
      
      <h2 className="font-script text-7xl text-rose-50 mb-16 drop-shadow-rose relative z-10 font-bold">
        Do you wanna see inside your heart?
      </h2>
      
      <div className="relative">
        {!isOpen ? (
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(true)}
              className="w-64 h-56 bg-rose-900 rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.6)] relative cursor-pointer overflow-hidden flex flex-col items-center justify-center border-4 border-rose-400/20 z-50"
            >
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
              <Gift className="text-white fill-white w-20 h-20" />
            </motion.div>
            <div className="mt-4 text-white/60 tracking-[0.4em] text-xs font-bold uppercase">Open Me</div>
            <div className="absolute top-0 left-0 w-full h-6 bg-white/10 animate-pulse" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="z-10 flex items-center justify-center"
          >
            <div className="bg-white/5 backdrop-blur-3xl p-12 rounded-[4rem] border border-white/20 shadow-[0_0_100px_rgba(0,0,0,0.5)] w-[400px] relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 to-amber-500/10" />
                <div className="flex flex-wrap justify-center gap-4 mb-10 relative">
                  {[...Array(12)].map((_, i) => (
                    <motion.div 
                      key={i} animate={{ 
                        scale: [1, 1.5, 1], 
                        rotate: [0, 45, -45, 0],
                        y: [0, -20, 0]
                      }} 
                      transition={{ delay: i * 0.1, repeat: Infinity, duration: 3 }}
                    >
                      <Heart className="text-rose-500 fill-rose-500 drop-shadow-glow" size={32} />
                    </motion.div>
                  ))}
                </div>
                <h3 className="text-3xl font-script text-white mb-6 relative">Every Beat is Yours</h3>
                <p className="text-rose-100/60 mb-10 font-sans text-sm tracking-widest relative">Every gift, every single moment we've shared, is safely kept within my heart for you, Rena.</p>
                <button 
                  onClick={onNext} 
                  className="w-full py-5 bg-rose-600 rounded-2xl text-white font-bold tracking-[0.5em] text-xs uppercase shadow-xl hover:bg-rose-500 transition-all relative"
                >
                  Our Eternal Finale
                </button>
            </div>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {isOpen && [...Array(20)].map((_, i) => <FloatingAsset key={i} type="heart" />)}
      </AnimatePresence>
    </motion.div>
  );
};

const Scene8 = () => {
  const { x, y } = useParallax(0.02);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen bg-black text-center p-8 relative overflow-hidden"
    >
      <motion.div style={{ x, y, scale: 1.05 }} className="absolute inset-0 pointer-events-none">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(90,22,40,0.3)_0%,_#000_100%)]" />
         <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30" />
      </motion.div>

      <Fireworks />
      {/* Luxury Flower Rain Final */}
      {[...Array(40)].map((_, i) => (
        <FloatingAsset key={`final-${i}`} type={i % 3 === 0 ? "rose" : i % 3 === 1 ? "heart" : "star"} />
      ))}
      
      {[...Array(60)].map((_, i) => (
        <motion.div
           key={i}
           initial={{ opacity: 0 }}
           animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
           transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 10 }}
           className="absolute w-1 h-1 bg-amber-200 rounded-full shadow-[0_0_8px_white]"
           style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
        />
      ))}

      <div className="z-10 relative">
        <motion.div
           animate={{ 
             rotate: [0, 5, -5, 0], 
             scale: [1, 1.1, 1],
             filter: ["drop-shadow(0 0 50px rgba(225,29,72,0.6))", "drop-shadow(0 0 80px rgba(225,29,72,0.9))", "drop-shadow(0 0 50px rgba(225,29,72,0.6))"] 
           }}
           transition={{ duration: 5, repeat: Infinity }}
           className="mb-16 inline-block relative"
        >
          <Heart className="w-56 h-56 text-rose-600 fill-rose-600" />
          <div className="absolute inset-0 bg-rose-500 blur-[60px] opacity-20 rounded-full animate-pulse" />
          <Sparkles className="absolute -top-10 -right-10 text-yellow-300 w-24 h-24 rotate-12" />
        </motion.div>

        <h1 className="font-script text-9xl md:text-[12rem] text-white mb-10 drop-shadow-rose tracking-tight">
          I Love You Rena
        </h1>
        <div className="flex items-center justify-center gap-10 text-rose-100">
           <span className="w-24 h-px bg-gradient-to-r from-transparent via-rose-300/40 to-transparent" />
           <p className="font-sans font-black tracking-[1em] uppercase text-base">Your Shark 🦈❤️</p>
           <span className="w-24 h-px bg-gradient-to-r from-transparent via-rose-300/40 to-transparent" />
        </div>
        
        <div className="mt-32 opacity-20 text-[10px] tracking-[1em] text-white/50 uppercase font-bold">
          Forever Starts Today • Beyond Infinity
        </div>
      </div>
    </motion.div>
  );
};

// --- Main App Component ---

export default function App() {
  const [scene, setScene] = useState(1);
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio fail", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-wine text-white selection:bg-rose-500/30">
      <audio ref={audioRef} src="/romantic.mp3" loop />

      <div className="fixed top-8 right-8 z-50 flex items-center gap-6 glass p-4 rounded-full border border-white/10">
        <button 
          onClick={togglePlay} 
          className="p-3 hover:bg-white/10 rounded-full transition-all group"
        >
          {isPlaying ? (
            <Music2 className="text-rose-400 animate-pulse" size={24} />
          ) : (
            <MessageSquareHeart className="text-white/40 group-hover:text-white" size={24} />
          )}
        </button>
        <div className="flex items-center gap-3">
          <Volume2 size={20} className="text-white/30" />
          <input 
            type="range" min="0" max="1" step="0.01" value={volume} 
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-24 h-1 bg-white/20 rounded-lg accent-rose-500 cursor-pointer appearance-none"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {scene === 1 && <Scene1 key="s1" onNext={() => setScene(2)} />}
        {scene === 2 && <Scene2 key="s2" onNext={() => setScene(3)} />}
        {scene === 3 && <Scene3 key="s3" onNext={() => setScene(4)} />}
        {scene === 4 && <Scene4 key="s4" onNext={() => setScene(5)} />}
        {scene === 5 && <Scene5 key="s5" onNext={() => setScene(6)} />}
        {scene === 6 && <Scene6 key="s6" onNext={() => setScene(7)} />}
        {scene === 7 && <Scene7 key="s7" onNext={() => setScene(8)} />}
        {scene === 8 && <Scene8 key="s8" />}
      </AnimatePresence>
    </div>
  );
}
