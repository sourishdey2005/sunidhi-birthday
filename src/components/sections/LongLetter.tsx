import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export const LongLetter = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const letterText = `Dear Sunidhi,

Today is your birthday, and I wanted to do something a little different.

Not just a simple message.

But something that would remind you how special you are.

The truth is, people like you make the world feel a little lighter. Your kindness, your positivity, and the way you carry yourself make a difference in ways you probably don’t even realize.

You have this incredible ability to see the best in everyone, to turn a bad day into a good one with just a few words, and to love with a depth that is truly inspiring.

And even though this is just a small digital surprise, it was created with one simple thought: You deserve to feel appreciated today. Not just for what you do, but for who you are.

I hope this year brings you as much happiness as you give to others. I hope it brings you adventures that take your breath away, dreams that finally come true, and a peace that stays with you always.

Thank you for being the wonderful person you are. The world is truly, honestly, a better place because you are in it.

Happy Birthday, Sunidhi.`;

  const words = letterText.split(' ');

  return (
    <section ref={containerRef} className="min-h-screen py-32 px-6 bg-[#faf9f6] text-[#1a1a1a] flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <span className="text-rose-500 font-mono text-sm tracking-[0.3em] uppercase mb-4 block">
            A Heartfelt Message
          </span>
          <h2 className="text-4xl md:text-6xl font-serif italic">For You</h2>
        </motion.div>

        <div className="bg-white p-8 md:p-16 rounded-[2rem] shadow-xl border border-black/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-200 via-rose-400 to-rose-200" />
          
          <div className="font-serif text-lg md:text-2xl leading-relaxed text-[#2c2c2c] space-y-6">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.5, delay: i * 0.02 }}
                viewport={{ once: true }}
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-16 pt-8 border-t border-black/5 flex justify-between items-end"
          >
            <div>
              <p className="text-sm uppercase tracking-widest text-black/40 mb-2">With Love,</p>
              <p className="font-serif italic text-2xl">Always.</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center">
              <div className="w-6 h-6 text-rose-500">❤</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
