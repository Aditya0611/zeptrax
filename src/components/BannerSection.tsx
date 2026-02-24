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
          className="rounded-2xl overflow-hidden glow-blue max-w-4xl w-full relative"
        >
          <motion.img
            src={zeptrax3dWorld}
            alt="Zeptrax AI - Empowering Businesses with Secure, Scalable & Future-Ready Solutions"
            className="w-full h-auto object-contain"
            animate={{
              scale: [1, 1.04, 1],
              rotate: 0,
            }}
            transition={{
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{ rotate: 0 }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default BannerSection;
