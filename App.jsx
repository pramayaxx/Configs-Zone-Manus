import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Shield, Download, Upload, Zap, Globe, Lock, Send, MessageCircle, Star, Users, Settings } from 'lucide-react'
import AnimatedBackground from './components/AnimatedBackground.jsx'
import LoadingSpinner from './components/LoadingSpinner.jsx'
import AnimatedCard from './components/AnimatedCard.jsx'
import NeonButton from './components/NeonButton.jsx'
import FileUpload from './components/FileUpload.jsx'
import ConfigManager from './components/ConfigManager.jsx'
import MonetizationScript from './components/MonetizationScript.jsx'
import { siteConfig } from './config/admin.js'
import './App.css'

function App() {
  const [configs, setConfigs] = useState(siteConfig.defaultConfigs)

  const [isLoading, setIsLoading] = useState(true)
  const [showUpload, setShowUpload] = useState(false)
  const [adminMode, setAdminMode] = useState(false)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleDownload = (config) => {
    // Create a blob with sample V2Ray config
    const sampleConfig = {
      "inbounds": [{
        "port": 1080,
        "protocol": "socks",
        "settings": {
          "auth": "noauth"
        }
      }],
      "outbounds": [{
        "protocol": "vmess",
        "settings": {
          "vnext": [{
            "address": "example.com",
            "port": 443,
            "users": [{
              "id": "12345678-1234-1234-1234-123456789abc",
              "security": "auto"
            }]
          }]
        }
      }]
    }

    const blob = new Blob([JSON.stringify(sampleConfig, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = config.filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    // Update download count
    setConfigs(prev => prev.map(c => 
      c.id === config.id ? { ...c, downloads: c.downloads + 1 } : c
    ))
  }

  const handleUpload = (newConfig) => {
    setConfigs(prev => [newConfig, ...prev])
    setShowUpload(false)
  }

  const handleUpdateConfig = (id, updates) => {
    setConfigs(prev => prev.map(c => 
      c.id === id ? { ...c, ...updates } : c
    ))
  }

  const handleDeleteConfig = (id) => {
    setConfigs(prev => prev.filter(c => c.id !== id))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center relative">
        <AnimatedBackground />
        <div className="relative z-10">
          <LoadingSpinner size="lg" text="Loading VPN Configs..." />
          <motion.p 
            className="text-muted-foreground mt-4 text-center"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Preparing secure connections...
          </motion.p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative">
      <MonetizationScript />
      <AnimatedBackground />
      {/* Header */}
      <motion.header 
        className="border-b border-border glass-effect sticky top-0 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold neon-text">{siteConfig.siteName}</h1>
            </motion.div>
            <div className="flex items-center space-x-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              >
                <Badge variant="outline" className="neon-border">
                  <Zap className="w-4 h-4 mr-1" />
                  {configs.length} Configs Available
                </Badge>
              </motion.div>
              <NeonButton variant="outline" onClick={() => setShowUpload(true)}>
                <Upload className="w-4 h-4 mr-2" />
                Upload Config
              </NeonButton>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setAdminMode(!adminMode)}
                className="ml-2"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-6 gradient-bg bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Secure V2Ray Configurations
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Access premium V2Ray configurations for free. Bypass restrictions, protect your privacy, 
              and enjoy unrestricted internet access with our curated collection of high-performance servers.
            </motion.p>
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {[
                { icon: Globe, text: 'Global Servers' },
                { icon: Lock, text: 'Encrypted Connection' },
                { icon: Zap, text: 'High Speed' },
                { icon: Star, text: 'Premium Quality' },
                { icon: Users, text: 'Trusted by Thousands' }
              ].map((feature, index) => (
                <motion.div
                  key={feature.text}
                  className="flex items-center space-x-2 glass-effect px-4 py-2 rounded-lg hover-glow"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <feature.icon className="w-5 h-5 text-primary" />
                  <span className="text-sm md:text-base">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Config Cards Section */}
      <section className="py-12 px-4 relative z-10">
        <div className="container mx-auto">
          {adminMode ? (
            <ConfigManager 
              configs={configs}
              onUpdateConfig={handleUpdateConfig}
              onDeleteConfig={handleDeleteConfig}
            />
          ) : (
            <>
              <motion.h3 
                className="text-3xl font-bold text-center mb-12 neon-text"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Available Configurations
              </motion.h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {configs.map((config, index) => (
                  <AnimatedCard key={config.id} delay={index * 0.1}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{config.filename}</CardTitle>
                        <Badge variant="secondary">{config.size}</Badge>
                      </div>
                      <CardDescription className="text-sm text-muted-foreground">
                        Uploaded: {config.uploadDate}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4 text-muted-foreground leading-relaxed">
                        {config.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Download className="w-4 h-4" />
                          <span>{config.downloads} downloads</span>
                        </div>
                        <NeonButton 
                          onClick={() => handleDownload(config)}
                          size="sm"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </NeonButton>
                      </div>
                    </CardContent>
                  </AnimatedCard>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* File Upload Modal */}
      <AnimatePresence>
        {showUpload && (
          <FileUpload 
            onUpload={handleUpload}
            onClose={() => setShowUpload(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar/Footer with Telegram Links */}
      <motion.footer 
        className="border-t border-border glass-effect mt-20 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-lg font-semibold mb-4 neon-text">{siteConfig.siteName}</h4>
              <p className="text-sm text-muted-foreground">
                {siteConfig.siteDescription}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">How to Use</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Setup Guide</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex flex-col sm:flex-row gap-3">
                <NeonButton 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(siteConfig.telegramChannel, '_blank')}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Channel
                </NeonButton>
                <NeonButton 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(siteConfig.telegramContact, '_blank')}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact
                </NeonButton>
              </div>
            </motion.div>
          </div>
          <motion.div 
            className="border-t border-border mt-8 pt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-sm text-muted-foreground">
              © 2024 {siteConfig.siteName}. Secure connections for everyone.
            </p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  )
}

export default App
