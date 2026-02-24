import { motion } from "framer-motion";

const partners = [
  {
    name: "Microsoft",
    logo: "https://img.icons8.com/fluency/240/microsoft.png",
  },
  {
    name: "Snowflake",
    logo: "https://cdn.worldvectorlogo.com/logos/snowflake.svg",
  },
  {
    name: "AWS",
    logo: "https://img.icons8.com/color/240/amazon-web-services.png",
  },
  {
    name: "Google Cloud",
    logo: "https://img.icons8.com/color/240/google-cloud.png",
  },
];

const PartnersSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Working <span className="text-gradient-gold">Partners</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            In collaboration with industry leaders
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 md:p-8 flex items-center justify-center hover:glow-blue transition-all duration-300"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-10 md:h-14 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
