'use client'

import { PasswordAnalysis } from '@/lib/passwordAnalysis'

interface HeatmapCardProps {
  analysis: PasswordAnalysis | null
}

export function HeatmapCard({ analysis }: HeatmapCardProps) {
  if (!analysis) return null

  return (
    <div className="glass-card p-8">
      <h2 className="text-lg font-semibold text-foreground mb-4">Character Uniqueness Heatmap</h2>
      <p className="text-xs text-text-muted mb-6">
        Green = Unique, Red = Common. More unique characters reduce predictability.
      </p>

      <div className="flex flex-wrap gap-2 p-4 bg-white/5 rounded-lg border border-white/10 min-h-24 items-center">
        {analysis.heatmap.map((data, index) => (
          <div
            key={index}
            className="relative group"
            title={`${data.char} - Uniqueness: ${(data.uniqueness * 100).toFixed(0)}%`}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-semibold cursor-help transition-transform duration-200 hover:scale-110 border border-white/20"
              style={{ backgroundColor: data.color + '40' }}
            >
              {data.char === ' ' ? '·' : data.char}
            </div>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-background rounded text-xs text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white/20">
              {(data.uniqueness * 100).toFixed(0)}%
            </div>
          </div>
        ))}
      </div>

      {/* Distribution summary */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <p className="text-xs text-text-muted mb-3">
          💡 <strong>Analysis:</strong> {
            analysis.heatmap.filter(h => h.uniqueness > 0.7).length > 0
              ? 'Good character diversity detected. Your password has a good mix of unique and varied characters.'
              : analysis.heatmap.filter(h => h.uniqueness > 0.4).length > analysis.heatmap.length / 2
              ? 'Moderate character diversity. Consider adding more variety.'
              : 'Low character diversity. Consider using more varied characters.'
          }
        </p>
      </div>
    </div>
  )
}
