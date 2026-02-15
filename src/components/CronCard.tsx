'use client'

import { useState } from 'react'
import { Clock, Trash2, Copy, Check, Pause, Play } from 'lucide-react'

interface CronCardProps {
  id: string
  description: string
  cronExpression: string
  explanation: string
  createdAt: string
  status: 'active' | 'paused'
  tags: string[]
  onDelete: (id: string) => void
  onCopy: (text: string) => void
}

export default function CronCard({ 
  id, 
  description, 
  cronExpression, 
  explanation, 
  createdAt, 
  status,
  tags,
  onDelete, 
  onCopy 
}: CronCardProps) {
  const [copied, setCopied] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleCopy = () => {
    onCopy(cronExpression)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDelete = () => {
    onDelete(id)
  }

  return (
    <div 
      className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 hover:border-[#8b949e] transition-all duration-150 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <Clock className="text-[#3fb950]" size={16} />
          <code className="font-mono text-sm text-[#3fb950] font-medium">{cronExpression}</code>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={handleCopy}
            className="p-1.5 text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#21262d] rounded transition-colors"
            aria-label="Copy expression"
          >
            {copied ? <Check size={14} className="text-[#3fb950]" /> : <Copy size={14} />}
          </button>
          <button 
            onClick={handleDelete}
            className="p-1.5 text-[#8b949e] hover:text-[#e5484d] hover:bg-[#21262d] rounded transition-colors"
            aria-label="Delete schedule"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      
      <p className="text-[#c9d1d9] text-sm mb-2 leading-relaxed line-clamp-2">{description}</p>
      <p className="text-[#8b949e] text-xs mb-3 line-clamp-1">{explanation}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex gap-1 flex-wrap">
          {tags.slice(0, 2).map((tag) => (
            <span 
              key={tag} 
              className="text-[10px] px-1.5 py-0.5 bg-[#21262d] text-[#8b949e] rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            status === 'active' 
              ? 'bg-[#3fb950]/10 text-[#3fb950]' 
              : 'bg-[#f0a000]/10 text-[#f0a000]'
          }`}>
            {status}
          </span>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-[#30363d] text-[#6e7681] text-xs">
        {new Date(createdAt).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        })}
      </div>
    </div>
  )
}