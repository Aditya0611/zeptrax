import { motion } from "framer-motion";
import { Bot, Cpu, Shield, Cloud, Blocks, Zap } from "lucide-react";
import heroRobotVideo from "@/assets/hero-robot.mp4";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source
            src="https://cdn.pixabay.com/video/2024/03/18/204655-924835498_large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 3D Robot Video */}
          <div className="w-52 h-52 md:w-72 md:h-72 lg:w-80 lg:h-80 mx-auto mb-8 rounded-full overflow-hidden ring-4 ring-primary/30 animate-pulse-glow"
            style={{ boxShadow: '0 0 60px hsl(215 100% 50% / 0.5), 0 0 120px hsl(215 100% 50% / 0.2)' }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover scale-110"
            >
              <source
                src={heroRobotVideo}
                type="video/mp4"
              />
            </video>
          </div>
          <a
            href="https://www.zeptraxai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xl md:text-2xl text-muted-foreground mb-2 font-display tracking-wider hover:text-primary transition-colors"
          >
            🌐 www.zeptraxai.com
          </a>
          <p className="text-2xl md:text-4xl font-display mt-6 mb-4 text-foreground">
            AI Training for <span className="text-gradient-gold">All Domains</span>
          </p>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Transforming the future with AI implementation across every industry.
            Special AI Program for all domain professionals.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a
            href="/register"
            className="px-8 py-4 rounded-lg bg-gradient-cta text-primary-foreground font-semibold text-lg glow-blue hover:scale-105 transition-transform"
          >
            Register Now
          </a>
          <a
            href="#domains"
            className="px-8 py-4 rounded-lg border-glow text-foreground font-semibold text-lg hover:bg-muted transition-colors"
          >
            Explore Domains
          </a>
        </motion.div>

        {/* Floating icons */}
        <div className="mt-16 flex justify-center gap-8 flex-wrap">
          {[
            { icon: Bot, label: "AI Agents" },
            { icon: Cloud, label: "AI with Cloud" },
            { icon: Shield, label: "AI with Cyber Security" },
            { icon: Blocks, label: "AI with Blockchain" },
            { icon: Cpu, label: "AI Automation" },
            { icon: Zap, label: "Gen AI & LLMs" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="flex flex-col items-center gap-2 animate-float"
              style={{ animationDelay: `${i * 0.5}s` }}
            >
              <div className="w-14 h-14 rounded-xl glass-card flex items-center justify-center">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
