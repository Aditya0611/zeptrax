import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Bot } from "lucide-react";

const AIRobotWelcome = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasSpoken, setHasSpoken] = useState(false);

  const speak = useCallback(() => {
    if (isSpeaking) return;
    
    const utterance = new SpeechSynthesisUtterance(
      "Welcome to the AI World! I am Zeptrax AI, your gateway to mastering artificial intelligence across every industry domain."
    );
    utterance.rate = 0.95;
    utterance.pitch = 0.9;
    utterance.volume = 1;

    // Try to pick a good voice
    const voices = speechSynthesis.getVoices();
    const preferred = voices.find(
      (v) => v.name.includes("Google") && v.lang.startsWith("en")
    ) || voices.find((v) => v.lang.startsWith("en"));
    if (preferred) utterance.voice = preferred;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      setHasSpoken(true);
    };
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }, [isSpeaking]);

  const stop = useCallback(() => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="fixed bottom-24 right-6 z-40 flex flex-col items-center gap-2"
    >
      {/* Speech bubble */}
      <AnimatePresence>
        {(isSpeaking || !hasSpoken) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="glass-card rounded-2xl px-4 py-3 max-w-[200px] text-center mb-2 relative"
          >
            <p className="text-xs text-foreground font-medium">
              {isSpeaking
                ? "🎙️ Speaking..."
                : "👋 Tap me to hear a welcome!"}
            </p>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 glass-card" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Robot button */}
      <button
        onClick={isSpeaking ? stop : speak}
        className="relative group"
        aria-label={isSpeaking ? "Stop speaking" : "Play welcome message"}
      >
        {/* Pulse rings when speaking */}
        {isSpeaking && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/20"
              animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/20"
              animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            />
          </>
        )}

        <motion.div
          animate={
            isSpeaking
              ? { scale: [1, 1.08, 1], rotate: [0, 3, -3, 0] }
              : { y: [0, -6, 0] }
          }
          transition={{
            duration: isSpeaking ? 0.6 : 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-shadow"
        >
          <Bot className="w-8 h-8 text-primary-foreground" />
        </motion.div>

        {/* Volume indicator */}
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center">
          {isSpeaking ? (
            <VolumeX className="w-3 h-3 text-primary" />
          ) : (
            <Volume2 className="w-3 h-3 text-primary" />
          )}
        </div>
      </button>
    </motion.div>
  );
};

export default AIRobotWelcome;
