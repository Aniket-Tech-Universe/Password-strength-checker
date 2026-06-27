'use client'

import { Lock, Shield } from 'lucide-react'

export function Hero() {
  return (
    <div className="relative min-h-[92svh] md:min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 py-16 sm:py-20">
      {/* Animated background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-primary/20 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float-slow"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-secondary/20 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-0 left-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-primary/10 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating animated icons */}
      <div className="absolute top-20 right-20 hidden sm:block opacity-10">
        <Lock className="w-32 h-32 text-secondary animate-float" style={{ animationDelay: '0s' }} />
      </div>
      <div className="absolute bottom-40 left-20 hidden sm:block opacity-10">
        <Shield className="w-40 h-40 text-primary animate-float-slow" style={{ animationDelay: '1s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Subtitle */}
        <div className="mb-6 inline-block">
          <span className="text-xs sm:text-sm font-semibold text-secondary/80 bg-white/5 px-3 sm:px-4 py-2 rounded-full border border-white/10">
            🔐 Advanced Security Analysis
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-5 sm:mb-6 bg-gradient-to-r from-foreground via-secondary to-primary bg-clip-text text-transparent animate-gradient-shift">
          Password Strength Analyzer
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-lg md:text-xl text-text-muted mb-8 max-w-2xl mx-auto leading-relaxed px-1 sm:px-0">
          Instantly analyze your password using advanced security heuristics and receive actionable recommendations to improve its security. All processing happens locally — your data never leaves your device.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16">
          <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl glow-purple">
            Start Analyzing
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-foreground font-semibold rounded-lg transition-all duration-300 backdrop-blur-sm">
            Learn More
          </button>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-8 sm:mt-12">
          <div className="glass-card p-4 text-center">
            <div className="text-3xl mb-2">⚡</div>
            <p className="text-sm text-foreground font-medium">Real-time Analysis</p>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl mb-2">🔒</div>
            <p className="text-sm text-foreground font-medium">100% Client-Side</p>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl mb-2">🎯</div>
            <p className="text-sm text-foreground font-medium">Smart Recommendations</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="text-secondary/50">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  )
}
