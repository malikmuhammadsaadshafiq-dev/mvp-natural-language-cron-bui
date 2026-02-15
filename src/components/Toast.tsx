'use client'

import { CheckCircle, XCircle, X } from 'lucide-react'
import { useEffect } from 'react'

interface ToastProps {
  message: string
  type: 'success' | 'error'
  onClose: () => void
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed bottom-4 right-4 bg-[#161b22] border border-[#30363d] rounded-lg shadow-lg p-4 flex items-center gap-3 z-50 animate-in slide-in-from-bottom-2 duration-150">
      {type === 'success' ? (
        <CheckCircle className="text-[#3fb950] flex-shrink-0" size={18} />
      ) : (
        <XCircle className="text-[#e5484d] flex-shrink-0" size={18} />
      )}
      <span className="text-[#c9d1d9] text-sm">{message}</span>
      <button 
        onClick={onClose} 
        className="text-[#6e7681] hover:text-[#c9d1d9] transition-colors ml-2"
      >
        <X size={14} />
      </button>
    </div>
  )
}