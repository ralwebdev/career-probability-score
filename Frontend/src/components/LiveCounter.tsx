import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, BarChart3, Globe } from "lucide-react";

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function LiveCounter() {
  const [usersOnline, setUsersOnline] = useState(randomBetween(1800, 2500));
  const [assessments, setAssessments] = useState(randomBetween(400, 900));
  const [countries, setCountries] = useState(randomBetween(14, 22));

  useEffect(() => {
    const interval = setInterval(() => {
      setUsersOnline(prev => prev + randomBetween(-15, 25));
      setAssessments(prev => prev + randomBetween(0, 3));
      setCountries(prev => Math.min(25, prev + randomBetween(0, 1)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    { label: "Data Signals", value: usersOnline.toLocaleString(), icon: Users, color: "text-success" },
    { label: "Analysis / sec", value: assessments.toLocaleString(), icon: BarChart3, color: "text-primary" },
    { label: "Locations", value: countries.toString(), icon: Globe, color: "text-accent" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
      {metrics.map((m) => (
        <motion.div
          key={m.label}
          className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-3.5 shadow-sm hover-lift"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <m.icon className={`h-5 w-5 ${m.color}`} />
          <div>
            <AnimatePresence mode="popLayout">
              <motion.span
                key={m.value}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                className="block font-mono text-xl font-bold text-foreground"
              >
                {m.value}
              </motion.span>
            </AnimatePresence>
            <span className="text-[11px] text-muted-foreground font-medium">{m.label}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
