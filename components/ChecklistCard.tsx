'use client'

import { PasswordAnalysis } from '@/lib/passwordAnalysis'

interface ChecklistCardProps {
  analysis: PasswordAnalysis | null
}

export function ChecklistCard({ analysis }: ChecklistCardProps) {
  if (!analysis) return null

  const metCount = analysis.checklist.filter(item => item.met).length
  const totalCount = analysis.checklist.length

  return (
    <div className="glass-card p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Security Checklist</h2>
        <div className="text-sm font-semibold text-secondary">
          {metCount}/{totalCount} Criteria
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-secondary to-primary transition-all duration-500"
            style={{ width: `${(metCount / totalCount) * 100}%` }}
          />
        </div>
      </div>

      {/* Checklist items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {analysis.checklist.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${
              item.met
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : 'bg-white/5 border-white/10'
            }`}
          >
            <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-bold ${
              item.met
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-white/10 text-text-muted'
            }`}>
              {item.met ? '✓' : '○'}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${
                item.met ? 'text-foreground' : 'text-text-muted'
              }`}>
                {item.label}
              </p>
            </div>
            <span className="text-lg flex-shrink-0">{item.icon}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
