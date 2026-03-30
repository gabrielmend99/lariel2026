'use client';

import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: ReactNode;
}

interface FAQProps {
  items: FAQItem[];
}

export function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 px-12 w-full bg-cream flex flex-col items-center gap-8">
      <h2 className="font-meow text-4xl text-blue">
        Perguntas Frequentes
      </h2>
      
      <div className="w-full max-w-[600px] flex flex-col gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="overflow-hidden border-b-2 border-blue"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full py-4 flex items-center justify-between text-left font-syne text-xl text-blue uppercase transition-all"
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-blue transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 font-syne text-xl text-orange">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
