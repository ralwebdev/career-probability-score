import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Clock, Wrench } from 'lucide-react';

const Downtime = () => {
  const downtimeUntil = import.meta.env.VITE_DOWNTIME_UNTIL || "In a few hours";

  return (
    <div className="relative min-h-[100vh] flex flex-col items-center justify-center px-4 overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/[0.04] blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-accent/[0.03] blur-[80px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-lg relative z-10 flex flex-col items-center"
      >
        <motion.img
          src="RAL-Logo-Mark-120x120.webp"
          alt="Site Favicon"
          className="h-16 w-16 mb-8 drop-shadow-xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />

        <div className="relative inline-block mb-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          >
            <Settings size={80} className="text-primary/60" />
          </motion.div>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1.1 }}
            transition={{ repeat: Infinity, duration: 2, repeatType: "reverse", ease: "easeInOut" }}
            className="absolute -bottom-2 -right-2 bg-card rounded-full p-2 border border-border shadow-md"
          >
            <Wrench size={24} className="text-accent" />
          </motion.div>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight tracking-tighter bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
          Under Maintenance
        </h1>

        <p className="text-lg text-muted-foreground mb-10 leading-relaxed font-light">
          We are currently upgrading our platform to serve you better.
          Please check back momentarily.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-card backdrop-blur-xl rounded-2xl p-6 border border-border shadow-xl mb-10 flex items-center justify-center space-x-5 w-full"
        >
          <div className="bg-primary/10 p-3 rounded-xl border border-primary/20">
            <Clock className="text-primary" size={28} />
          </div>
          <div className="text-left w-full">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">Expected Completion</p>
            <p className="text-xl font-bold text-foreground">{downtimeUntil}</p>
          </div>
        </motion.div>

        <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Downtime;
