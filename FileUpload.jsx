import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Upload, File, X, Check } from 'lucide-react'
import NeonButton from './NeonButton.jsx'

const FileUpload = ({ onUpload, onClose }) => {
  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState(null)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const fileInputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type === 'application/json' || droppedFile.name.endsWith('.json')) {
        setFile(droppedFile)
      } else {
        alert('Please upload a JSON file')
      }
    }
  }

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (selectedFile.type === 'application/json' || selectedFile.name.endsWith('.json')) {
        setFile(selectedFile)
      } else {
        alert('Please upload a JSON file')
      }
    }
  }

  const handleUpload = async () => {
    if (!file || !description.trim()) {
      alert('Please select a file and add a description')
      return
    }

    setUploading(true)
    
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const newConfig = {
      id: Date.now(),
      filename: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      description: description.trim(),
      uploadDate: new Date().toISOString().split('T')[0],
      downloads: 0
    }

    onUpload(newConfig)
    setUploading(false)
    setUploaded(true)
    
    // Auto close after success
    setTimeout(() => {
      onClose()
    }, 2000)
  }

  const removeFile = () => {
    setFile(null)
    setDescription('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  if (uploaded) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <Card className="w-full max-w-md glass-effect border-primary">
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Check className="w-8 h-8 text-black" />
            </motion.div>
            <h3 className="text-xl font-bold mb-2 neon-text">Upload Successful!</h3>
            <p className="text-muted-foreground">Your configuration has been added to the library.</p>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-2xl"
      >
        <Card className="glass-effect border-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl neon-text">Upload V2Ray Config</CardTitle>
                <CardDescription>Share your premium configuration with the community</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* File Drop Zone */}
            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                dragActive 
                  ? 'border-primary bg-primary/10 scale-105' 
                  : 'border-border hover:border-primary/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              {file ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center space-x-4"
                >
                  <File className="w-8 h-8 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={removeFile}>
                    <X className="w-4 h-4" />
                  </Button>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <Upload className="w-12 h-12 text-primary mx-auto" />
                  <div>
                    <p className="text-lg font-medium">Drop your V2Ray config here</p>
                    <p className="text-sm text-muted-foreground">or click to browse files</p>
                  </div>
                  <p className="text-xs text-muted-foreground">Only JSON files are accepted</p>
                </div>
              )}
            </div>

            {/* Description Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Describe your configuration (server location, speed, special features, etc.)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px] bg-background/50 border-border focus:border-primary"
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground text-right">
                {description.length}/500 characters
              </p>
            </div>

            {/* Upload Button */}
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <NeonButton
                onClick={handleUpload}
                disabled={!file || !description.trim() || uploading}
              >
                {uploading ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Config
                  </>
                )}
              </NeonButton>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export default FileUpload
