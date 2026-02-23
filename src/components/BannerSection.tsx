import { motion } from "framer-motion";
import zeptraxBanner from "@/assets/zeptrax-banner.jpeg";

const BannerSection = () => {
  return (
    <section className="py-16 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden glow-blue"
        >
          <img
            src={zeptraxBanner}
            alt="Zeptrax AI - AI Implementation Across All Industries"
            className="w-full h-auto object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default BannerSection;
