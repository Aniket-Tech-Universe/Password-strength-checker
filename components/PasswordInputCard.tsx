'use client'

import { useState } from 'react'
import { Eye, EyeOff, Copy, Trash2, Zap } from 'lucide-react'

interface PasswordInputCardProps {
  password: string
  onPasswordChange: (password: string) => void
  onGenerate: () => void
}

export function PasswordInputCard({ password, onPasswordChange, onGenerate }: PasswordInputCardProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (password) {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      onPasswordChange(text)
    } catch (err) {
      console.error('Failed to read clipboard')
    }
  }

  const handleClear = () => {
    onPasswordChange('')
  }

  return (
    <div className="glass-card p-8 max-w-2xl mx-auto">
      <label className="block text-sm font-semibold text-foreground mb-3">
        Enter or Generate a Password
      </label>

      <div className="relative mb-6">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          placeholder="Type your password here or generate one..."
          className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-lg text-foreground placeholder:text-text-muted focus:outline-none focus:border-secondary/50 focus:ring-2 focus:ring-secondary/20 transition-all duration-200"
        />

        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2">
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5 text-text-muted" />
            ) : (
              <Eye className="w-5 h-5 text-text-muted" />
            )}
          </button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={onGenerate}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 border border-primary/30 rounded-lg text-foreground font-medium transition-all duration-200"
        >
          <Zap className="w-4 h-4" />
          <span className="hidden sm:inline">Generate</span>
        </button>

        <button
          onClick={handlePaste}
          className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-foreground font-medium transition-all duration-200"
        >
          Paste
        </button>

        <button
          onClick={handleCopy}
          disabled={!password}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-secondary/20 hover:bg-secondary/30 border border-secondary/30 rounded-lg text-foreground font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Copy className="w-4 h-4" />
          {copied ? 'Copied!' : 'Copy'}
        </button>

        <button
          onClick={handleClear}
          disabled={!password}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-foreground font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden sm:inline">Clear</span>
        </button>
      </div>
    </div>
  )
}
