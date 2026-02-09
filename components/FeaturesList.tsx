import React from 'react';
import { motion } from 'framer-motion';

const FeaturesList: React.FC = () => {
  const features = [
    { icon: '✨', title: 'GSAP Animations', description: 'Transiciones fluidas con GSAP ScrollTrigger' },
    { icon: '🎨', title: 'Iconify Icons', description: 'Todos los iconos sociales con Iconify' },
    { icon: '🌀', title: 'Dynamic BG', description: 'Fondo dinámico con orbs interactivos' },
    { icon: '🖱️', title: 'Custom Cursor', description: 'Cursor personalizado con glow effect' },
    { icon: '📱', title: 'Responsive', description: 'Totalmente responsive en todos los dispositivos' },
    { icon: '🚀', title: 'Performance', description: 'Optimizado para máxima velocidad' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      {features.map((feature, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className="glass-card p-4 rounded-lg border border-white/10"
        >
          <p className="text-2xl mb-2">{feature.icon}</p>
          <h4 className="font-bold text-cyan-400 mb-1">{feature.title}</h4>
          <p className="text-xs text-white/60">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default FeaturesList;
