import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

const memories = [
  { id: 1, url: 'https://picsum.photos/seed/sunidhi1/800/1000', caption: 'The laughter that echoed through the night.' },
  { id: 2, url: 'https://picsum.photos/seed/sunidhi2/800/800', caption: 'A moment frozen in time, forever cherished.' },
  { id: 3, url: 'https://picsum.photos/seed/sunidhi3/1000/800', caption: 'The quiet beauty of a shared sunset.' },
  { id: 4, url: 'https://picsum.photos/seed/sunidhi4/800/1200', caption: 'Your joy is the most beautiful thing I know.' },
  { id: 5, url: 'https://picsum.photos/seed/sunidhi5/1200/800', caption: 'Every adventure is better with you.' },
  { id: 6, url: 'https://picsum.photos/seed/sunidhi6/800/800', caption: 'The magic of just being together.' },
];

export const MemoryGallery = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <section className="py-32 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Memory Gallery
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/50 text-lg italic serif"
          >
            Memories are tiny time machines. They bring back the laughter, the smiles, and the moments that matter most.
          </motion.p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {memories.map((memory) => (
            <motion.div
              key={memory.id}
              layoutId={`memory-${memory.id}`}
              onClick={() => setSelectedId(memory.id)}
              className="relative group cursor-pointer overflow-hidden rounded-2xl bg-white/5"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={memory.url}
                alt="Memory"
                className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <p className="text-white text-sm font-light italic">{memory.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-xl"
            onClick={() => setSelectedId(null)}
          >
            <button 
              className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedId(null)}
            >
              <X size={32} />
            </button>
            
            <motion.div
              layoutId={`memory-${selectedId}`}
              className="relative max-w-5xl w-full max-h-[80vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={memories.find(m => m.id === selectedId)?.url}
                alt="Selected Memory"
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-white/80 text-xl mt-8 text-center italic serif"
              >
                {memories.find(m => m.id === selectedId)?.caption}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
