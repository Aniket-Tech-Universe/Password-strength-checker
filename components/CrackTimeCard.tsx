'use client'

import { PasswordAnalysis } from '@/lib/passwordAnalysis'
import { Zap, Database, Cpu, Sparkles } from 'lucide-react'

interface CrackTimeCardProps {
  analysis: PasswordAnalysis | null
}

export function CrackTimeCard({ analysis }: CrackTimeCardProps) {
  if (!analysis) return null

  const attacks = [
    {
      name: 'Online Attack',
      time: analysis.crackTime.online,
      icon: Zap,
      description: '1 guess per second',
      color: 'from-red-500 to-orange-500',
      severity: 'high',
    },
    {
      name: 'Offline Attack',
      time: analysis.crackTime.offline,
      icon: Database,
      description: '1M guesses per second',
      color: 'from-orange-500 to-yellow-500',
      severity: 'medium',
    },
    {
      name: 'GPU Attack',
      time: analysis.crackTime.gpu,
      icon: Cpu,
      description: '100M guesses per second',
      color: 'from-yellow-500 to-amber-500',
      severity: 'medium',
    },
    {
      name: 'Quantum (Est.)',
      time: analysis.crackTime.quantum,
      icon: Sparkles,
      description: 'Theoretical quantum computer',
      color: 'from-violet-500 to-purple-500',
      severity: 'info',
    },
  ]

  return (
    <div className="glass-card p-8">
      <h2 className="text-lg font-semibold text-foreground mb-6">Estimated Crack Times</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {attacks.map((attack) => {
          const Icon = attack.icon
          const isSafe = attack.time.includes('Centuries') || attack.time.includes('Instant') === false && parseInt(attack.time) > 365

          return (
            <div
              key={attack.name}
              className={`rounded-lg p-4 border transition-all duration-300 ${
                isSafe && attack.severity !== 'info'
                  ? 'bg-emerald-500/10 border-emerald-500/30'
                  : attack.severity === 'high'
                  ? 'bg-red-500/10 border-red-500/30'
                  : attack.severity === 'medium'
                  ? 'bg-amber-500/10 border-amber-500/30'
                  : 'bg-violet-500/10 border-violet-500/30'
              }`}
            >
              <div className="flex items-start gap-3">
                <Icon className={`w-5 h-5 flex-shrink-0 mt-1 ${
                  isSafe && attack.severity !== 'info'
                    ? 'text-emerald-400'
                    : attack.severity === 'high'
                    ? 'text-red-400'
                    : attack.severity === 'medium'
                    ? 'text-amber-400'
                    : 'text-violet-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm">{attack.name}</p>
                  <p className="text-xs text-text-muted mb-2">{attack.description}</p>
                  <div className="flex items-baseline gap-2">
                    <p className={`text-2xl font-bold ${
                      isSafe && attack.severity !== 'info'
                        ? 'text-emerald-400'
                        : attack.severity === 'high'
                        ? 'text-red-400'
                        : attack.severity === 'medium'
                        ? 'text-amber-400'
                        : 'text-violet-400'
                    }`}>
                      {attack.time}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Explanation */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <p className="text-xs text-text-muted">
          💡 <strong>Tip:</strong> A good password should require centuries to crack even with GPU attacks. Aim for entropy above 60 bits.
        </p>
      </div>
    </div>
  )
}
