'use client'

import { PasswordAnalysis, StrengthLevel } from '@/lib/passwordAnalysis'

interface StrengthMeterProps {
  analysis: PasswordAnalysis | null
}

const STRENGTH_CONFIG = {
  'very-weak': {
    label: 'Very Weak',
    color: 'from-red-600 to-red-500',
    glow: 'glow-red',
    icon: '🔓',
    percent: 10,
  },
  'weak': {
    label: 'Weak',
    color: 'from-orange-600 to-orange-500',
    glow: 'glow-amber',
    icon: '⚠️',
    percent: 25,
  },
  'fair': {
    label: 'Fair',
    color: 'from-yellow-500 to-amber-500',
    glow: 'glow-amber',
    icon: '📊',
    percent: 50,
  },
  'good': {
    label: 'Good',
    color: 'from-cyan-500 to-blue-500',
    glow: 'glow-cyan',
    icon: '✓',
    percent: 75,
  },
  'strong': {
    label: 'Strong',
    color: 'from-emerald-500 to-green-500',
    glow: 'glow-emerald',
    icon: '🔒',
    percent: 90,
  },
  'excellent': {
    label: 'Excellent',
    color: 'from-violet-500 to-purple-500',
    glow: 'glow-purple',
    icon: '🛡️',
    percent: 100,
  },
}

export function StrengthMeter({ analysis }: StrengthMeterProps) {
  if (!analysis) {
    return (
      <div className="glass-card p-8 max-w-2xl mx-auto">
        <p className="text-center text-text-muted">Enter a password to see strength analysis</p>
      </div>
    )
  }

  const config = STRENGTH_CONFIG[analysis.strength]

  return (
    <div className="glass-card p-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Password Strength</h2>
          <div className="flex items-center gap-2">
            <span className="text-3xl">{config.icon}</span>
            <div>
              <p className="text-2xl font-bold text-foreground">{analysis.score}</p>
              <p className="text-xs text-text-muted">Score / 100</p>
            </div>
          </div>
        </div>

        {/* Segmented strength bar */}
        <div className="space-y-3">
          <div className="flex gap-1.5 h-3">
            {([10, 25, 50, 75, 90, 100] as const).map((level, index) => (
              <div
                key={index}
                className={`flex-1 rounded-full transition-all duration-500 ${
                  analysis.score >= level
                    ? `bg-gradient-to-r ${config.color} ${config.glow}`
                    : 'bg-white/5'
                }`}
              />
            ))}
          </div>

          {/* Strength label and grade */}
          <div className="flex items-center justify-between">
            <span className={`text-sm font-semibold ${
              config.color.includes('red')
                ? 'text-red-400'
                : config.color.includes('orange')
                ? 'text-orange-400'
                : config.color.includes('yellow')
                ? 'text-yellow-400'
                : config.color.includes('cyan')
                ? 'text-cyan-400'
                : config.color.includes('emerald')
                ? 'text-emerald-400'
                : 'text-violet-400'
            }`}>
              {config.label}
            </span>
            <span className={`text-2xl font-bold px-3 py-1 rounded-lg bg-white/5 border ${
              config.color.includes('red')
                ? 'border-red-500/30 text-red-400'
                : config.color.includes('orange')
                ? 'border-orange-500/30 text-orange-400'
                : config.color.includes('yellow')
                ? 'border-yellow-500/30 text-yellow-400'
                : config.color.includes('cyan')
                ? 'border-cyan-500/30 text-cyan-400'
                : config.color.includes('emerald')
                ? 'border-emerald-500/30 text-emerald-400'
                : 'border-violet-500/30 text-violet-400'
            }`}>
              {analysis.grade}
            </span>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10">
        <div className="text-center">
          <p className="text-2xl font-bold text-secondary">{analysis.length}</p>
          <p className="text-xs text-text-muted">Characters</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">{analysis.entropy.toFixed(1)}</p>
          <p className="text-xs text-text-muted">Entropy Bits</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-accent">{analysis.checklist.filter(c => c.met).length}/10</p>
          <p className="text-xs text-text-muted">Criteria Met</p>
        </div>
      </div>
    </div>
  )
}
