'use client'

import { PasswordAnalysis } from '@/lib/passwordAnalysis'
import { Lightbulb } from 'lucide-react'

interface RecommendationsCardProps {
  analysis: PasswordAnalysis | null
}

export function RecommendationsCard({ analysis }: RecommendationsCardProps) {
  if (!analysis || analysis.recommendations.length === 0) return null

  const isExcellent = analysis.score >= 85

  return (
    <div className="glass-card p-8">
      <div className="flex items-center gap-3 mb-6">
        <Lightbulb className="w-5 h-5 text-secondary" />
        <h2 className="text-lg font-semibold text-foreground">
          {isExcellent ? 'Security Excellence' : 'Recommendations'}
        </h2>
      </div>

      <div className="space-y-3">
        {analysis.recommendations.map((rec, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border transition-all duration-300 flex gap-3 ${
              isExcellent
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : index === 0
                ? 'bg-amber-500/10 border-amber-500/30'
                : 'bg-secondary/10 border-secondary/30'
            }`}
          >
            <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm ${
              isExcellent
                ? 'bg-emerald-500/20 text-emerald-400'
                : index === 0
                ? 'bg-amber-500/20 text-amber-400'
                : 'bg-secondary/20 text-secondary'
            }`}>
              {index + 1}
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${
                isExcellent ? 'text-emerald-200' : 'text-foreground'
              }`}>
                {rec}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Additional tips */}
      {analysis.score < 85 && (
        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-xs text-text-muted">
            💡 <strong>Pro Tip:</strong> Follow these recommendations to strengthen your password. Aim for a score above 85 for excellent security.
          </p>
        </div>
      )}
    </div>
  )
}
