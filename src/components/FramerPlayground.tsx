import { motion } from 'framer-motion';
import { useState } from 'react';

export default function FramerPlayground() {
  const [isOpen, setIsOpen] = useState(false);

  // Define the orchestration variants for the staggered list
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each child animating
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <section className="py-24 w-full bg-brand-midnight text-white flex flex-col items-center px-6 overflow-hidden">
      
      {/* Capability 1: Scroll Reveal */}
      <motion.div 
        className="text-center max-w-3xl mb-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold mb-4">
          Advanced Rendering Capabilities
        </h2>
        <p className="text-lg text-gray-300">
          Scroll down to trigger dynamic viewport animations and interact with fluid layout physics.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl w-full">
        
        {/* Capability 2: Staggered Variants */}
        <motion.div 
          className="bg-white/10 p-8 rounded-xl border border-white/20 backdrop-blur-sm"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-brand-orange mb-6">Orchestrated Workflows</h3>
          <ul className="space-y-4">
            {['Audit Digital Infrastructure', 'Engineer Efficiency', 'Automate Growth'].map((step, index) => (
              <motion.li 
                key={index}
                variants={itemVariants}
                className="bg-white text-brand-midnight font-bold p-4 rounded-lg shadow-lg flex items-center gap-4"
              >
                <div className="bg-brand-orange text-white w-8 h-8 rounded-full flex items-center justify-center">
                  {index + 1}
                </div>
                {step}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Capability 3: Interactive Layout Physics & Gestures */}
        <div className="bg-white/10 p-8 rounded-xl border border-white/20 backdrop-blur-sm flex flex-col items-center justify-center">
          <h3 className="text-2xl font-bold text-brand-orange mb-6 w-full text-left">Layout Physics & Drag</h3>
          
          <motion.div 
            layout
            data-isOpen={isOpen}
            initial={{ borderRadius: 50 }}
            className="bg-brand-orange cursor-pointer flex items-center justify-center text-white font-bold p-6 shadow-xl"
            onClick={() => setIsOpen(!isOpen)}
            style={{
              width: isOpen ? '100%' : '120px',
              height: isOpen ? '200px' : '120px',
              borderRadius: isOpen ? '16px' : '50%'
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.2}
          >
            {isOpen ? "Fluid Layout Transition" : "Click Me"}
          </motion.div>
          <p className="text-gray-300 text-sm mt-6 text-center">
            Click the shape to trigger a layout calculation, or click and drag it to test spring physics.
          </p>
        </div>

      </div>
    </section>
  );
}