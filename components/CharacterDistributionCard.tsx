'use client'

import { PasswordAnalysis } from '@/lib/passwordAnalysis'

interface CharacterDistributionCardProps {
  analysis: PasswordAnalysis | null
}

export function CharacterDistributionCard({ analysis }: CharacterDistributionCardProps) {
  if (!analysis) return null

  const { characterDistribution } = analysis
  const total = analysis.length || 1

  const categories = [
    {
      label: 'Uppercase',
      count: characterDistribution.uppercase,
      color: 'from-blue-500 to-blue-600',
      emoji: 'A',
    },
    {
      label: 'Lowercase',
      count: characterDistribution.lowercase,
      color: 'from-cyan-500 to-cyan-600',
      emoji: 'a',
    },
    {
      label: 'Numbers',
      count: characterDistribution.numbers,
      color: 'from-purple-500 to-purple-600',
      emoji: '0',
    },
    {
      label: 'Symbols',
      count: characterDistribution.symbols,
      color: 'from-pink-500 to-pink-600',
      emoji: '!',
    },
  ]

  return (
    <div className="glass-card p-8">
      <h2 className="text-lg font-semibold text-foreground mb-6">Character Distribution</h2>

      <div className="space-y-4">
        {categories.map((category) => {
          const percentage = (category.count / total) * 100

          return (
            <div key={category.label}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold bg-white/10 w-8 h-8 rounded flex items-center justify-center">
                    {category.emoji}
                  </span>
                  <span className="text-sm font-medium text-foreground">{category.label}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-secondary">{category.count}</span>
                  <span className="text-xs text-text-muted ml-2">({percentage.toFixed(0)}%)</span>
                </div>
              </div>

              {/* Animated bar */}
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${category.color} transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <p className="text-xs text-text-muted">
          💡 <strong>Analysis:</strong>{' '}
          {characterDistribution.symbols > 0 && characterDistribution.numbers > 0 && characterDistribution.uppercase > 0
            ? 'Excellent mix of character types! Your password has great diversity.'
            : characterDistribution.uppercase > 0 && characterDistribution.lowercase > 0 && characterDistribution.numbers > 0
            ? 'Good character variety, but add symbols for better security.'
            : 'Limited character types. Add uppercase, lowercase, numbers, and symbols.'}
        </p>
      </div>
    </div>
  )
}
