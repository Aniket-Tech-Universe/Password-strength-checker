'use client'

import { PasswordAnalysis, PatternResult } from '@/lib/passwordAnalysis'
import { AlertTriangle, AlertCircle, Info } from 'lucide-react'

interface PatternDetectionCardProps {
  analysis: PasswordAnalysis | null
}

export function PatternDetectionCard({ analysis }: PatternDetectionCardProps) {
  if (!analysis || analysis.patterns.length === 0) return null

  const highSeverity = analysis.patterns.filter(p => p.severity === 'high')
  const mediumSeverity = analysis.patterns.filter(p => p.severity === 'medium')
  const lowSeverity = analysis.patterns.filter(p => p.severity === 'low')

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="w-5 h-5" />
      case 'medium':
        return <AlertCircle className="w-5 h-5" />
      default:
        return <Info className="w-5 h-5" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'from-red-500 to-red-600'
      case 'medium':
        return 'from-amber-500 to-amber-600'
      default:
        return 'from-blue-500 to-blue-600'
    }
  }

  return (
    <div className="glass-card p-8">
      <h2 className="text-lg font-semibold text-foreground mb-6">Detected Patterns</h2>

      {(highSeverity.length > 0 || mediumSeverity.length > 0) && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-sm text-red-200">
            ⚠️ Warning: Your password contains predictable patterns. Consider making these changes:
          </p>
        </div>
      )}

      <div className="space-y-3">
        {/* High severity */}
        {highSeverity.map((pattern, index) => (
          <div
            key={`high-${index}`}
            className="p-4 rounded-lg border bg-red-500/10 border-red-500/30 flex gap-3"
          >
            <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-400 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-red-200">
                {pattern.type === 'dictionary' && 'Dictionary word detected'}
                {pattern.type === 'keyboard' && 'Keyboard pattern detected'}
                {pattern.type === 'repeated' && 'Repeated characters'}
                {pattern.type === 'sequence' && 'Sequential characters'}
              </p>
              <p className="text-xs text-red-300 mt-1">
                Pattern: <code className="bg-red-900/30 px-2 py-1 rounded">{pattern.pattern}</code> at position {pattern.position}
              </p>
              <p className="text-xs text-red-300/70 mt-1">
                {pattern.type === 'dictionary' && 'Common words are easy to guess. Avoid using dictionary words.'}
                {pattern.type === 'keyboard' && 'Keyboard patterns like QWERTY are commonly attacked. Use random characters instead.'}
                {pattern.type === 'repeated' && 'Multiple repeated characters reduce entropy. Mix it up.'}
                {pattern.type === 'sequence' && 'Sequential characters are predictable. Avoid ABC or 123 patterns.'}
              </p>
            </div>
          </div>
        ))}

        {/* Medium severity */}
        {mediumSeverity.map((pattern, index) => (
          <div
            key={`medium-${index}`}
            className="p-4 rounded-lg border bg-amber-500/10 border-amber-500/30 flex gap-3"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-400 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-amber-200">
                {pattern.type === 'repeated' && 'Repeated characters detected'}
                {pattern.type === 'sequence' && 'Sequential pattern found'}
              </p>
              <p className="text-xs text-amber-300 mt-1">
                <code className="bg-amber-900/30 px-2 py-1 rounded">{pattern.pattern}</code> at position {pattern.position}
              </p>
            </div>
          </div>
        ))}

        {/* Low severity */}
        {lowSeverity.length > 0 && (
          <div>
            <p className="text-xs text-text-muted mb-2">ℹ️ Low severity patterns detected:</p>
            <div className="flex flex-wrap gap-2">
              {lowSeverity.map((pattern, index) => (
                <code
                  key={`low-${index}`}
                  className="text-xs bg-blue-500/20 border border-blue-500/30 text-blue-300 px-2 py-1 rounded"
                >
                  {pattern.pattern}
                </code>
              ))}
            </div>
          </div>
        )}
      </div>

      {analysis.patterns.length === 0 && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-center">
          <p className="text-sm text-emerald-300">✓ No problematic patterns detected!</p>
        </div>
      )}
    </div>
  )
}
