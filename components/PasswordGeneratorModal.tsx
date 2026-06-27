'use client'

import { useState, useEffect } from 'react'
import { X, Copy, Zap } from 'lucide-react'
import { GenerateOptions } from '@/lib/usePasswordAnalysis'

interface PasswordGeneratorModalProps {
  isOpen: boolean
  onClose: () => void
  onGenerate: (password: string) => void
  generatePassword: (options: GenerateOptions) => string
}

export function PasswordGeneratorModal({
  isOpen,
  onClose,
  onGenerate,
  generatePassword,
}: PasswordGeneratorModalProps) {
  const [options, setOptions] = useState<GenerateOptions>({
    length: 16,
    useUppercase: true,
    useLowercase: true,
    useNumbers: true,
    useSymbols: true,
    excludeSimilar: false,
    pronounceable: false,
  })

  const [generatedPassword, setGeneratedPassword] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (isOpen) {
      handleGenerate()
    }
  }, [isOpen, options])

  const handleGenerate = () => {
    const pwd = generatePassword(options)
    setGeneratedPassword(pwd)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedPassword)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleUse = () => {
    onGenerate(generatedPassword)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-2 sm:p-4">
      <div className="glass-card max-w-md w-full max-h-[calc(100dvh-1rem)] sm:max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-t-3xl sm:rounded-2xl animate-bounce-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Zap className="w-5 h-5 text-secondary" />
            Generate Password
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-6">
          {/* Generated password display */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Generated Password
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={generatedPassword}
                readOnly
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-foreground font-mono text-sm min-w-0"
              />
              <button
                onClick={handleCopy}
                className="px-4 py-3 bg-secondary/20 hover:bg-secondary/30 border border-secondary/30 rounded-lg transition-colors min-h-11"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
            {copied && <p className="text-xs text-secondary mt-2">Copied to clipboard!</p>}
          </div>

          {/* Options */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">Options</label>
            <div className="space-y-3">
              {/* Length */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-foreground">Length</label>
                  <span className="text-sm font-bold text-secondary">{options.length}</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="64"
                  value={options.length}
                  onChange={(e) =>
                    setOptions({ ...options, length: parseInt(e.target.value) })
                  }
                  className="w-full accent-secondary"
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-2">
                {[
                  { key: 'useUppercase', label: 'Uppercase (A-Z)' },
                  { key: 'useLowercase', label: 'Lowercase (a-z)' },
                  { key: 'useNumbers', label: 'Numbers (0-9)' },
                  { key: 'useSymbols', label: 'Symbols (!@#$%)' },
                  { key: 'excludeSimilar', label: 'Exclude similar characters (il1Lo0O)' },
                  { key: 'pronounceable', label: 'Pronounceable (Experimental)' },
                ].map((option) => (
                  <label
                    key={option.key}
                    className="flex items-start gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={
                        options[option.key as keyof GenerateOptions] as boolean
                      }
                      onChange={(e) =>
                        setOptions({
                          ...options,
                          [option.key]: e.target.checked,
                        })
                      }
                      className="w-4 h-4 accent-secondary"
                    />
                    <span className="text-sm text-foreground group-hover:text-secondary transition-colors">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
            <button
              onClick={handleGenerate}
              className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-foreground font-medium transition-colors min-h-11"
            >
              Regenerate
            </button>
            <button
              onClick={handleUse}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-medium rounded-lg transition-all duration-200 min-h-11"
            >
              Use This Password
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
