'use client'

import { useState } from 'react'
import { Hero } from '@/components/Hero'
import { PasswordInputCard } from '@/components/PasswordInputCard'
import { StrengthMeter } from '@/components/StrengthMeter'
import { ChecklistCard } from '@/components/ChecklistCard'
import { CrackTimeCard } from '@/components/CrackTimeCard'
import { HeatmapCard } from '@/components/HeatmapCard'
import { CharacterDistributionCard } from '@/components/CharacterDistributionCard'
import { PatternDetectionCard } from '@/components/PatternDetectionCard'
import { RecommendationsCard } from '@/components/RecommendationsCard'
import { PasswordGeneratorModal } from '@/components/PasswordGeneratorModal'
import { Footer } from '@/components/Footer'
import { usePasswordAnalysis } from '@/lib/usePasswordAnalysis'

export default function Page() {
  const {
    password,
    setPassword,
    analysis,
    generatePassword,
  } = usePasswordAnalysis()

  const [showGenerator, setShowGenerator] = useState(false)

  const handleGenerateClick = () => {
    setShowGenerator(true)
  }

  const handleGeneratePassword = (pwd: string) => {
    setPassword(pwd)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero section */}
      <Hero />

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-8 sm:py-12 space-y-6 sm:space-y-8">
        {/* Password input card */}
        <section id="password-input">
          <PasswordInputCard
            password={password}
            onPasswordChange={setPassword}
            onGenerate={handleGenerateClick}
          />
        </section>

        {/* Analysis sections */}
        {analysis && (
          <>
            {/* Strength meter and checklist */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
              <section>
                <StrengthMeter analysis={analysis} />
              </section>
              <section>
                <ChecklistCard analysis={analysis} />
              </section>
            </div>

            {/* Crack time */}
            <section>
              <CrackTimeCard analysis={analysis} />
            </section>

            {/* Pattern detection, heatmap, and distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <section>
                <PatternDetectionCard analysis={analysis} />
              </section>
              <section>
                <HeatmapCard analysis={analysis} />
              </section>
            </div>

            {/* Character distribution */}
            <section>
              <CharacterDistributionCard analysis={analysis} />
            </section>

            {/* Recommendations */}
            <section>
              <RecommendationsCard analysis={analysis} />
            </section>
          </>
        )}

      </div>

      {/* Footer */}
      <Footer />

      {/* Password generator modal */}
      <PasswordGeneratorModal
        isOpen={showGenerator}
        onClose={() => setShowGenerator(false)}
        onGenerate={handleGeneratePassword}
        generatePassword={generatePassword}
      />
    </div>
  )
}
