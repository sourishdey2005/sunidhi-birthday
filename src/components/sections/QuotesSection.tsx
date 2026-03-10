import React from 'react';
import { motion } from 'motion/react';

const quotes = [
  {
    text: "Count your life by smiles, not tears. Count your age by friends, not years.",
    author: "John Lennon",
    size: "large"
  },
  {
    text: "The more you praise and celebrate your life, the more there is in life to celebrate.",
    author: "Oprah Winfrey",
    size: "medium"
  },
  {
    text: "A birthday is not a day to get older, but a day to celebrate how far you've come.",
    author: "Unknown",
    size: "small"
  },
  {
    text: "You are never too old to set another goal or to dream a new dream.",
    author: "C.S. Lewis",
    size: "medium"
  },
  {
    text: "Today you are You, that is truer than true. There is no one alive who is Youer than You.",
    author: "Dr. Seuss",
    size: "large"
  },
  {
    text: "Life is a journey, and your birthday is the milestone that reminds you to enjoy the ride.",
    author: "Unknown",
    size: "small"
  }
];

export const QuotesSection = () => {
  return (
    <section className="py-32 px-6 bg-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-rose-500 font-mono text-xs tracking-[0.5em] uppercase mb-4 block"
          >
            Words of Wisdom
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-bold text-white tracking-tighter"
          >
            Birthday Inspirations
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
          {quotes.map((quote, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`
                p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-sm flex flex-col justify-center
                ${quote.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''}
                ${quote.size === 'medium' ? 'md:row-span-2' : ''}
                hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 group
              `}
            >
              <div className="text-rose-500/20 group-hover:text-rose-500/40 transition-colors mb-4">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 16.8954 21.017 18V21C21.017 22.1046 20.1216 23 19.017 23H16.017C14.9124 23 14.017 22.1046 14.017 21ZM14.017 11L14.017 8C14.017 6.89543 14.9124 6 16.017 6H19.017C20.1216 6 21.017 6.89543 21.017 8V11C21.017 12.1046 20.1216 13 19.017 13H16.017C14.9124 13 14.017 12.1046 14.017 11ZM2.99997 21L2.99997 18C2.99997 16.8954 3.8954 16 4.99997 16H7.99997C9.10454 16 9.99997 16.8954 9.99997 18V21C9.99997 22.1046 9.10454 23 7.99997 23H4.99997C3.8954 23 2.99997 22.1046 2.99997 21ZM2.99997 11L2.99997 8C2.99997 6.89543 3.8954 6 4.99997 6H7.99997C9.10454 6 9.99997 6.89543 9.99997 8V11C9.99997 12.1046 9.10454 13 7.99997 13H4.99997C3.8954 13 2.99997 12.1046 2.99997 11Z" />
                </svg>
              </div>
              <p className={`
                text-white/80 font-serif italic leading-relaxed mb-6
                ${quote.size === 'large' ? 'text-2xl md:text-4xl' : 'text-lg md:text-xl'}
              `}>
                {quote.text}
              </p>
              <p className="text-white/30 font-mono text-xs uppercase tracking-widest">— {quote.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
