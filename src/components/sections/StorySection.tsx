import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const Chapter = ({ title, content, index }: { title: string, content: string, index: number }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-3xl text-center"
      >
        <span className="text-rose-500 font-mono text-sm tracking-[0.3em] uppercase mb-4 block">
          Chapter {index + 1}
        </span>
        <h3 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
          {title}
        </h3>
        <div className="text-white/70 text-lg md:text-2xl leading-relaxed font-light whitespace-pre-line italic serif">
          {content}
        </div>
      </motion.div>
    </div>
  );
};

const SpecialCard = ({ title, text }: { title: string, text: string }) => {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm transition-all duration-500 group"
    >
      <h4 className="text-2xl font-semibold text-white mb-4 group-hover:text-rose-400 transition-colors">
        {title}
      </h4>
      <p className="text-white/60 leading-relaxed">
        {text}
      </p>
    </motion.div>
  );
};

export const StorySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const bgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative bg-black">
      <motion.div 
        style={{ opacity: bgOpacity }}
        className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,77,109,0.05)_0%,transparent_70%)]"
      />

      <Chapter 
        index={0}
        title="The Beginning"
        content={`Every story begins somewhere.\n\nSometimes it begins with a conversation,\nsometimes with a smile,\nsometimes with a moment so small that nobody notices.\n\nBut those small moments often become the most meaningful memories.`}
      />

      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="max-w-6xl w-full"
        >
          <div className="text-center mb-16">
            <span className="text-rose-500 font-mono text-sm tracking-[0.3em] uppercase mb-4 block">
              Chapter 2
            </span>
            <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              What Makes You Special
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SpecialCard title="Your Smile" text="Your smile has this strange ability to make ordinary moments feel special. It's like a warm light in a cold room." />
            <SpecialCard title="Your Kindness" text="The way you care for people without expecting anything in return is a rare gift. You make the world softer." />
            <SpecialCard title="Your Energy" text="There's a vibrant life in you that is contagious. You don't just walk into a room; you illuminate it." />
            <SpecialCard title="Your Positivity" text="Even in the darkest times, you find a way to see the silver lining. Your hope is a beacon for everyone around you." />
            <SpecialCard title="Your Presence" text="Just being around you is enough to make everything feel okay. You are home to so many hearts." />
            <SpecialCard title="Your Soul" text="Pure, genuine, and incredibly beautiful. There is nobody quite like you, Sunidhi." />
          </div>
        </motion.div>
      </div>

      <Chapter 
        index={2}
        title="The Magic of You"
        content={`Some people are loud like fireworks.\n\nAnd some people are quiet like moonlight.\n\nBut somehow they still light up the entire sky.\n\nYou are that kind of person.`}
      />
    </div>
  );
};
