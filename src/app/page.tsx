'use client'

import { useState, useEffect } from 'react'
import { Clock, Trash2, Plus, Settings, LayoutDashboard, Terminal, Copy, Check, Moon, Sun, Download, Search, ChevronDown, Activity, Calendar, Hash } from 'lucide-react'
import { askAI } from '@/lib/ai'
import CronCard from '@/components/CronCard'
import Toast from '@/components/Toast'
import SkeletonCard from '@/components/SkeletonCard'

interface CronItem {
  id: string
  description: string
  cronExpression: string
  explanation: string
  createdAt: string
  tags: string[]
  status: 'active' | 'paused'
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'builder' | 'dashboard' | 'settings'>('builder')
  const [items, setItems] = useState<CronItem[]>([
    {
      id: '1',
      description: 'Run database backup every Monday at 2:30 AM',
      cronExpression: '30 2 * * 1',
      explanation: 'At 02:30 on Monday',
      createdAt: '2024-03-15T08:30:00Z',
      tags: ['backup', 'database'],
      status: 'active'
    },
    {
      id: '2',
      description: 'Send weekly analytics report every Friday at 9:00 AM',
      cronExpression: '0 9 * * 5',
      explanation: 'At 09:00 on Friday',
      createdAt: '2024-03-14T10:15:00Z',
      tags: ['reports', 'email'],
      status: 'active'
    },
    {
      id: '3',
      description: 'Clean temporary files daily at midnight',
      cronExpression: '0 0 * * *',
      explanation: 'At 00:00 daily',
      createdAt: '2024-03-13T14:22:00Z',
      tags: ['maintenance', 'cleanup'],
      status: 'active'
    },
    {
      id: '4',
      description: 'Check system health every 5 minutes during business hours',
      cronExpression: '*/5 9-17 * * 1-5',
      explanation: 'Every 5 minutes between 09:00 and 17:00 on weekdays',
      createdAt: '2024-03-12T09:45:00Z',
      tags: ['monitoring', 'health'],
      status: 'active'
    },
    {
      id: '5',
      description: 'Rotate logs on the first day of every month',
      cronExpression: '0 0 1 * *',
      explanation: 'At 00:00 on day-of-month 1',
      createdAt: '2024-03-11T16:30:00Z',
      tags: ['logs', 'maintenance'],
      status: 'paused'
    },
    {
      id: '6',
      description: 'Send daily digest email at 8:00 AM',
      cronExpression: '0 8 * * *',
      explanation: 'At 08:00 daily',
      createdAt: '2024-03-10T11:20:00Z',
      tags: ['email', 'digest'],
      status: 'active'
    },
    {
      id: '7',
      description: 'Sync user data every Sunday at 3:00 AM',
      cronExpression: '0 3 * * 0',
      explanation: 'At 03:00 on Sunday',
      createdAt: '2024-03-09T07:15:00Z',
      tags: ['sync', 'users'],
      status: 'active'
    },
    {
      id: '8',
      description: 'Generate invoice on the 15th of every month at 10:00 AM',
      cronExpression: '0 10 15 * *',
      explanation: 'At 10:00 on day-of-month 15',
      createdAt: '2024-03-08T13:40:00Z',
      tags: ['billing', 'invoice'],
      status: 'active'
    },
    {
      id: '9',
      description: 'Purge old sessions every day at 2:00 AM',
      cronExpression: '0 2 * * *',
      explanation: 'At 02:00 daily',
      createdAt: '2024-03-07T15:55:00Z',
      tags: ['sessions', 'security'],
      status: 'active'
    },
    {
      id: '10',
      description: 'Update currency rates every hour during weekdays',
      cronExpression: '0 9-17 * * 1-5',
      explanation: 'Every hour from 09:00 through 17:00 on weekdays',
      createdAt: '2024-03-06T08:25:00Z',
      tags: ['finance', 'api'],
      status: 'paused'
    },
    {
      id: '11',
      description: 'Run security scan every Monday at 1:00 AM',
      cronExpression: '0 1 * * 1',
      explanation: 'At 01:00 on Monday',
      createdAt: '2024-03-05T12:10:00Z',
      tags: ['security', 'scan'],
      status: 'active'
    },
    {
      id: '12',
      description: 'Backup photos on the first day of every quarter',
      cronExpression: '0 0 1 */3 *',
      explanation: 'At 00:00 on day-of-month 1 every 3 months',
      createdAt: '2024-03-04T09:30:00Z',
      tags: ['backup', 'photos'],
      status: 'active'
    }
  ])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date')
  const [darkMode, setDarkMode] = useState(true)
  const [userName, setUserName] = useState('Alex Chen')
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  
  const [nlInput, setNlInput] = useState('')
  const [cronInput, setCronInput] = useState('')
  const [formError, setFormError] = useState('')
  const [isConverting, setIsConverting] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('cronItems')
    const savedUser = localStorage.getItem('cronUserName')
    const savedMode = localStorage.getItem('cronDarkMode')
    
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to parse saved items')
      }
    }
    if (savedUser) setUserName(savedUser)
    if (savedMode) setDarkMode(savedMode === 'true')
    
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    localStorage.setItem('cronItems', JSON.stringify(items))
  }, [items])

  useEffect(() => {
    localStorage.setItem('cronUserName', userName)
  }, [userName])

  useEffect(() => {
    localStorage.setItem('cronDarkMode', darkMode.toString())
  }, [darkMode])

  const filteredItems = items
    .filter(item => 
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.cronExpression.includes(searchQuery) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      return a.description.localeCompare(b.description)
    })

  const handleDelete = (id: string) => {
    setDeletingId(id)
    setTimeout(() => {
      setItems(items.filter(i => i.id !== id))
      setDeletingId(null)
      setToast({ message: 'Schedule deleted successfully', type: 'success' })
    }, 150)
  }

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nlInput.trim()) {
      setFormError('Please enter a schedule description')
      return
    }
    setFormError('')
    setIsConverting(true)
    
    try {
      const result = await askAI(
        `Convert to cron: ${nlInput}`,
        'You are a cron expert. Convert natural language to 5-field cron expression (minute hour day month weekday). Reply ONLY with the expression or ERROR if invalid.'
      )
      
      if (result === 'ERROR' || result.includes('ERROR') || !result.match(/^[\d*,/-]+\s+[\d*,/-]+\s+[\d*,/-]+\s+[\d*,/-]+\s+[\d*,/-]+$/)) {
        throw new Error('Parse failed')
      }
      
      const explanation = await askAI(
        `Explain this cron: ${result.trim()}`,
        'Explain this cron expression in plain English. Be concise under 10 words.'
      )
      
      const newItem: CronItem = {
        id: Date.now().toString(),
        description: nlInput,
        cronExpression: result.trim(),
        explanation: explanation || 'Custom schedule',
        createdAt: new Date().toISOString(),
        tags: ['generated'],
        status: 'active'
      }
      
      setItems([newItem, ...items])
      setNlInput('')
      setToast({ message: 'Schedule converted successfully', type: 'success' })
    } catch (err) {
      setFormError('Failed to parse. Try formats like "every day at 3pm" or "Mondays at 2:30"')
    } finally {
      setIsConverting(false)
    }
  }

  const handleExplain = async () => {
    if (!cronInput.trim()) {
      setFormError('Please enter a cron expression')
      return
    }
    
    const cronRegex = /^(\*|\d{1,2})(\s+(\*|\d{1,2})){4}$/
    if (!cronRegex.test(cronInput.trim())) {
      setFormError('Invalid format. Use: minute hour day month weekday (e.g., 0 9 * * 1)')
      return
    }
    
    setIsConverting(true)
    try {
      const explanation = await askAI(
        `Explain this cron: ${cronInput}`,
        'Explain this cron expression in plain English. Be concise but complete.'
      )
      
      const newItem: CronItem = {
        id: Date.now().toString(),
        description: explanation,
        cronExpression: cronInput.trim(),
        explanation: explanation,
        createdAt: new Date().toISOString(),
        tags: ['explained'],
        status: 'active'
      }
      
      setItems([newItem, ...items])
      setCronInput('')
      setToast({ message: 'Cron expression explained', type: 'success' })
    } catch (err) {
      setFormError('Failed to explain expression')
    } finally {
      setIsConverting(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setToast({ message: 'Copied to clipboard', type: 'success' })
  }

  const exportData = () => {
    const data = JSON.stringify(items, null, 2)
    navigator.clipboard.writeText(data)
    setToast({ message: 'Data exported to clipboard', type: 'success' })
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const activeCount = items.filter(i => i.status === 'active').length
  const pausedCount = items.filter(i => i.status === 'paused').length
  const completionRate = items.length > 0 ? Math.round((activeCount / items.length) * 100) : 0

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <nav className="sticky top-0 z-40 bg-[#161b22] border-b border-[#30363d] h-12 flex items-center px-4">
        <div className="flex items-center gap-2 mr-8">
          <Terminal className="text-[#3fb950]" size={20} />
          <span className="font-semibold text-[#c9d1d9] text-sm">CronBuilder</span>
        </div>
        
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab('builder')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'builder' 
                ? 'text-[#3fb950] bg-[#3fb950]/10' 
                : 'text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#21262d]'
            }`}
          >
            Builder
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'dashboard' 
                ? 'text-[#3fb950] bg-[#3fb950]/10' 
                : 'text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#21262d]'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'settings' 
                ? 'text-[#3fb950] bg-[#3fb950]/10' 
                : 'text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#21262d]'
            }`}
          >
            Settings
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'builder' && (
          <div className="space-y-6">
            <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6">
              <h1 className="text-xl font-semibold text-[#c9d1d9] mb-1">Natural Language Cron Builder</h1>
              <p className="text-[#8b949e] text-sm mb-6">Convert plain English schedules into valid cron expressions</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <form onSubmit={handleConvert} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-[#8b949e] mb-1.5 uppercase tracking-wider">Natural Language</label>
                    <input
                      type="text"
                      value={nlInput}
                      onChange={(e) => setNlInput(e.target.value)}
                      placeholder="e.g., every Monday at 2pm"
                      className="w-full h-8 px-3 bg-transparent border border-[#30363d] rounded-md text-sm text-[#c9d1d9] placeholder-[#6e7681] focus:border-[#3fb950] focus:outline-none transition-colors"
                    />
                    {formError && (
                      <p className="mt-1.5 text-xs text-[#e5484d]">{formError}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isConverting}
                    className="h-8 px-4 bg-[#238636] hover:bg-[#2ea043] text-white text-sm font-medium rounded-md border border-[#3fb950]/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isConverting ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Plus size={14} />
                    )}
                    Convert to Cron
                  </button>
                </form>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-[#8b949e] mb-1.5 uppercase tracking-wider">Cron Expression</label>
                    <input
                      type="text"
                      value={cronInput}
                      onChange={(e) => setCronInput(e.target.value)}
                      placeholder="e.g., 0 14 * * 1"
                      className="w-full h-8 px-3 bg-transparent border border-[#30363d] rounded-md text-sm text-[#c9d1d9] placeholder-[#6e7681] focus:border-[#3fb950] focus:outline-none transition-colors font-mono"
                    />
                  </div>
                  <button
                    onClick={handleExplain}
                    disabled={isConverting}
                    className="h-8 px-4 bg-transparent hover:bg-[#21262d] text-[#c9d1d9] text-sm font-medium rounded-md border border-[#30363d] transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    <Clock size={14} />
                    Explain Expression
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6e7681]" size={14} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search schedules..."
                  className="w-full h-8 pl-9 pr-3 bg-[#161b22] border border-[#30363d] rounded-md text-sm text-[#c9d1d9] placeholder-[#6e7681] focus:border-[#3fb950] focus:outline-none transition-colors"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#8b949e]">Sort by:</span>
                <button
                  onClick={() => setSortBy(sortBy === 'date' ? 'name' : 'date')}
                  className="h-8 px-3 bg-[#161b22] border border-[#30363d] rounded-md text-sm text-[#c9d1d9] hover:border-[#8b949e] transition-colors flex items-center gap-2"
                >
                  {sortBy === 'date' ? 'Date Created' : 'Name'}
                  <ChevronDown size={14} />
                </button>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-12 text-center">
                <Clock className="mx-auto text-[#6e7681] mb-3" size={32} />
                <h3 className="text-[#c9d1d9] font-medium mb-1">No schedules found</h3>
                <p className="text-[#8b949e] text-sm mb-4">Get started by converting your first natural language schedule</p>
                <button
                  onClick={() => { setSearchQuery(''); setActiveTab('builder') }}
                  className="h-8 px-4 bg-[#238636] hover:bg-[#2ea043] text-white text-sm font-medium rounded-md border border-[#3fb950]/30 transition-colors"
                >
                  Add Your First Schedule
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className={`transition-all duration-150 ${deletingId === item.id ? 'opacity-0 scale-95' : 'opacity-100'}`}
                  >
                    <CronCard
                      {...item}
                      onDelete={handleDelete}
                      onCopy={copyToClipboard}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <h1 className="text-xl font-semibold text-[#c9d1d9]">Dashboard</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
                <div className="flex items-center gap-2 text-[#8b949e] mb-2">
                  <Hash size={16} />
                  <span className="text-xs uppercase tracking-wider font-medium">Total Schedules</span>
                </div>
                <div className="text-2xl font-semibold text-[#c9d1d9]">{items.length}</div>
              </div>
              
              <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
                <div className="flex items-center gap-2 text-[#8b949e] mb-2">
                  <Activity size={16} />
                  <span className="text-xs uppercase tracking-wider font-medium">Active Rate</span>
                </div>
                <div className="text-2xl font-semibold text-[#3fb950]">{completionRate}%</div>
                <div className="text-xs text-[#8b949e] mt-1">{activeCount} active, {pausedCount} paused</div>
              </div>
              
              <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
                <div className="flex items-center gap-2 text-[#8b949e] mb-2">
                  <Calendar size={16} />
                  <span className="text-xs uppercase tracking-wider font-medium">This Week</span>
                </div>
                <div className="text-2xl font-semibold text-[#c9d1d9]">
                  {items.filter(i => new Date(i.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
                </div>
                <div className="text-xs text-[#8b949e] mt-1">New schedules</div>
              </div>
            </div>

            <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
              <h2 className="text-sm font-medium text-[#c9d1d9] mb-4">Status Breakdown</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#8b949e]">Active</span>
                  <div className="flex items-center gap-2 flex-1 mx-4">
                    <div className="h-2 bg-[#21262d] rounded-full flex-1 overflow-hidden">
                      <div 
                        className="h-full bg-[#3fb950] rounded-full transition-all"
                        style={{ width: `${items.length ? (activeCount / items.length) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="text-sm text-[#c9d1d9] w-8 text-right">{activeCount}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#8b949e]">Paused</span>
                  <div className="flex items-center gap-2 flex-1 mx-4">
                    <div className="h-2 bg-[#21262d] rounded-full flex-1 overflow-hidden">
                      <div 
                        className="h-full bg-[#f0a000] rounded-full transition-all"
                        style={{ width: `${items.length ? (pausedCount / items.length) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="text-sm text-[#c9d1d9] w-8 text-right">{pausedCount}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
              <h2 className="text-sm font-medium text-[#c9d1d9] mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {items.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b border-[#30363d] last:border-0">
                    <div>
                      <p className="text-sm text-[#c9d1d9]">{item.description}</p>
                      <p className="text-xs text-[#6e7681] font-mono">{item.cronExpression}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.status === 'active' 
                        ? 'bg-[#3fb950]/10 text-[#3fb950]' 
                        : 'bg-[#f0a000]/10 text-[#f0a000]'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl space-y-6">
            <h1 className="text-xl font-semibold text-[#c9d1d9]">Settings</h1>
            
            <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 space-y-6">
              <div>
                <label className="block text-xs font-medium text-[#8b949e] mb-1.5 uppercase tracking-wider">Display Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full h-8 px-3 bg-transparent border border-[#30363d] rounded-md text-sm text-[#c9d1d9] focus:border-[#3fb950] focus:outline-none transition-colors"
                />
              </div>

              <div className="flex items-center justify-between py-4 border-t border-[#30363d]">
                <div>
                  <h3 className="text-sm font-medium text-[#c9d1d9]">Dark Mode</h3>
                  <p className="text-xs text-[#8b949e]">Toggle between dark and light appearance</p>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className="h-8 w-8 flex items-center justify-center bg-[#21262d] hover:bg-[#30363d] rounded-md border border-[#30363d] transition-colors"
                >
                  {darkMode ? <Moon size={14} className="text-[#c9d1d9]" /> : <Sun size={14} className="text-[#c9d1d9]" />}
                </button>
              </div>

              <div className="pt-4 border-t border-[#30363d]">
                <h3 className="text-sm font-medium text-[#c9d1d9] mb-3">Data Management</h3>
                <button
                  onClick={exportData}
                  className="h-8 px-4 bg-transparent hover:bg-[#21262d] text-[#c9d1d9] text-sm font-medium rounded-md border border-[#30363d] transition-colors flex items-center gap-2"
                >
                  <Download size={14} />
                  Export Data to Clipboard
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}