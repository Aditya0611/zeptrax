import { motion } from "framer-motion";
import zeptrax3dWorld from "@/assets/zeptrax-3d-world.jpeg";

const BannerSection = () => {
  return (
    <section className="py-16 bg-gradient-hero">
      <div className="container mx-auto px-4 flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-full overflow-hidden glow-blue w-[280px] h-[280px] md:w-[400px] md:h-[400px] relative"
        >
          <motion.img
            src={zeptrax3dWorld}
            alt="Zeptrax AI - Empowering Businesses with Secure, Scalable & Future-Ready Solutions"
            className="w-full h-full object-cover"
            animate={{
              scale: [1, 1.08, 1],
              rotate: [0, 360],
            }}
            transition={{
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            }}
          />
          {/* Pulsing glow overlay */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/30"
            animate={{
              boxShadow: [
                "0 0 20px hsl(var(--primary) / 0.2)",
                "0 0 60px hsl(var(--primary) / 0.4)",
                "0 0 20px hsl(var(--primary) / 0.2)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default BannerSection;
