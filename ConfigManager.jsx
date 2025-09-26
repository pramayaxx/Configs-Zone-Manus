import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Edit, Trash2, Save, X, Download } from 'lucide-react'
import NeonButton from './NeonButton.jsx'

const ConfigManager = ({ configs, onUpdateConfig, onDeleteConfig }) => {
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})

  const startEdit = (config) => {
    setEditingId(config.id)
    setEditForm({
      filename: config.filename,
      description: config.description
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm({})
  }

  const saveEdit = () => {
    if (editForm.filename && editForm.description) {
      onUpdateConfig(editingId, editForm)
      setEditingId(null)
      setEditForm({})
    }
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this configuration?')) {
      onDeleteConfig(id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold neon-text mb-2">Configuration Manager</h2>
        <p className="text-muted-foreground">Admin panel for managing V2Ray configurations</p>
      </div>

      <div className="grid gap-4">
        {configs.map((config) => (
          <motion.div
            key={config.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="glass-effect border-border hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {editingId === config.id ? (
                      <Input
                        value={editForm.filename}
                        onChange={(e) => setEditForm(prev => ({ ...prev, filename: e.target.value }))}
                        className="text-lg font-semibold bg-background/50"
                        placeholder="Filename"
                      />
                    ) : (
                      <CardTitle className="text-lg">{config.filename}</CardTitle>
                    )}
                    <Badge variant="secondary">{config.size}</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      <Download className="w-3 h-3 mr-1" />
                      {config.downloads}
                    </Badge>
                    {editingId === config.id ? (
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost" onClick={saveEdit}>
                          <Save className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={cancelEdit}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost" onClick={() => startEdit(config)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleDelete(config.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <CardDescription>
                  Uploaded: {config.uploadDate}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {editingId === config.id ? (
                  <Textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                    className="min-h-[80px] bg-background/50"
                    placeholder="Configuration description"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {config.description}
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {configs.length === 0 && (
        <Card className="glass-effect border-dashed border-border">
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No configurations available</p>
            <p className="text-sm text-muted-foreground mt-2">Upload your first config to get started</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default ConfigManager
