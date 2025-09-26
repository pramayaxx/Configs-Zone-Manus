import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'

const NeonButton = ({ children, variant = 'primary', size = 'default', className = '', onClick, ...props }) => {
  const variants = {
    primary: 'btn-neon bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600',
    secondary: 'bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600',
    outline: 'border-2 border-primary bg-transparent hover:bg-primary/10'
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <Button
        className={`${variants[variant]} relative overflow-hidden group transition-all duration-300 ${className}`}
        size={size}
        onClick={onClick}
        {...props}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />
        <span className="relative z-10 flex items-center justify-center font-semibold">
          {children}
        </span>
      </Button>
    </motion.div>
  )
}

export default NeonButton
