import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export const StatsSection = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // The date you met: April 2025
  const meetingDate = new Date('2025-04-01T00:00:00'); 

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - meetingDate.getTime();
      
      setDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((diff / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((diff / (1000 * 60)) % 60));
      setSeconds(Math.floor((diff / 1000) % 60));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const StatBox = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center">
      <motion.span 
        key={value}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl md:text-7xl font-bold text-white tabular-nums tracking-tighter"
      >
        {value.toLocaleString()}
      </motion.span>
      <span className="text-rose-500 font-mono text-[10px] uppercase tracking-[0.4em] mt-2">
        {label}
      </span >
    </div>
  );

  return (
    <section className="py-32 px-6 bg-black border-y border-white/5">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">The Journey So Far</h2>
          <p className="text-white/40 text-lg">Every second of our journey has been a gift to my world.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-20">
          <StatBox value={days} label="Days Together" />
          <StatBox value={hours} label="Hours of Us" />
          <StatBox value={minutes} label="Minutes of Magic" />
          <StatBox value={seconds} label="Seconds of Love" />
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-20 p-8 rounded-3xl bg-white/[0.02] border border-white/5 inline-block"
        >
          <p className="text-white/60 font-serif italic text-xl">
            "You don't just exist, Sunidhi. You happen. And you are the most beautiful thing that has ever happened."
          </p>
        </motion.div>
      </div>
    </section>
  );
};
