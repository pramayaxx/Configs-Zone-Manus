import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card.jsx'

const AnimatedCard = ({ children, delay = 0, className = '', ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: 'spring',
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        className={`config-card hover-glow transition-all duration-300 ${className}`}
        {...props}
      >
        {children}
      </Card>
    </motion.div>
  )
}

export default AnimatedCard
