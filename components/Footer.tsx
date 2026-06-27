'use client'

import { Shield, Lock } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-white/5 backdrop-blur-sm mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Privacy notice */}
        <div className="mb-12 p-6 bg-white/5 border border-white/10 rounded-lg">
          <div className="flex gap-4 items-start">
            <Shield className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">Your Privacy is Protected</h3>
              <p className="text-sm text-text-muted">
                All password analysis occurs 100% locally in your browser. No passwords are ever transmitted, logged, stored, or sent to our servers. This is a completely client-side application.
              </p>
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Lock className="w-4 h-4 text-secondary" />
              Advanced Security
            </h4>
            <p className="text-sm text-text-muted">
              Comprehensive analysis using entropy calculation, pattern detection, and security heuristics.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Lock className="w-4 h-4 text-secondary" />
              Real-Time Feedback
            </h4>
            <p className="text-sm text-text-muted">
              Instant analysis as you type with actionable recommendations to improve password strength.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Lock className="w-4 h-4 text-secondary" />
              Built-in Generator
            </h4>
            <p className="text-sm text-text-muted">
              Generate strong passwords with customizable options and immediately analyze their strength.
            </p>
          </div>
        </div>

        {/* Bottom info */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-text-muted mb-4">
            Made with <span className="text-red-400">❤</span> for cybersecurity
          </p>
          <p className="text-xs text-text-muted/60">
            © 2025 Password Strength Analyzer. All rights reserved. | <a href="#" className="text-secondary hover:text-secondary/80">Privacy Policy</a> | <a href="#" className="text-secondary hover:text-secondary/80">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
