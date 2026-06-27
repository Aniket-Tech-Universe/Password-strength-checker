// Password Analysis Engine - All processing client-side, no data transmission

export interface PasswordAnalysis {
  password: string
  length: number
  strength: StrengthLevel
  score: number
  grade: string
  entropy: number
  crackTime: CrackTimeEstimate
  checklist: ChecklistItem[]
  patterns: PatternResult[]
  heatmap: HeatmapData[]
  recommendations: string[]
  characterDistribution: CharacterDistribution
  hasRepeating: boolean
  hasKeyboardPatterns: boolean
  hasDictionaryWords: boolean
}

export type StrengthLevel = 'very-weak' | 'weak' | 'fair' | 'good' | 'strong' | 'excellent'

export interface CrackTimeEstimate {
  online: string
  offline: string
  gpu: string
  quantum: string
}

export interface ChecklistItem {
  id: string
  label: string
  met: boolean
  icon: string
}

export interface PatternResult {
  pattern: string
  position: number
  length: number
  type: 'dictionary' | 'keyboard' | 'repeated' | 'sequence'
  severity: 'low' | 'medium' | 'high'
}

export interface HeatmapData {
  char: string
  uniqueness: number
  color: string
}

export interface CharacterDistribution {
  uppercase: number
  lowercase: number
  numbers: number
  symbols: number
}

// Dictionary words for detection
const COMMON_WORDS = [
  'password', 'admin', 'user', 'welcome', 'master', 'letmein', 'monkey',
  'dragon', 'sunshine', 'princess', 'qwerty', 'pass', 'root', 'toor',
  'login', 'login123', 'admin123', 'passw0rd', 'password123', 'test',
  'test123', 'demo', 'demo123', 'guest', 'guest123', 'default',
  'admin@123', 'iloveyou', 'mustang', 'shadow', 'trust', 'hunt',
  'flower', 'master123', 'love', 'sex', 'god', 'hello', 'starwars',
  'baseball', 'batman', 'superman', 'pokemon', 'batman123', 'pass123',
]

// Keyboard patterns
const KEYBOARD_PATTERNS = [
  'qwerty', 'asdfgh', 'zxcvbn', 'qazwsx', 'qweasd',
  '12345', '123456', '1234567', '12345678', '123456789',
  'abcdef', 'abcdefg', 'abc123', 'asd', 'qwe',
  'zxc', 'iop', 'lkj', 'hjkl', 'bnm',
]

// Calculate entropy
function calculateEntropy(password: string): number {
  let charsetSize = 0
  if (/[a-z]/.test(password)) charsetSize += 26
  if (/[A-Z]/.test(password)) charsetSize += 26
  if (/[0-9]/.test(password)) charsetSize += 10
  if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32

  if (charsetSize === 0) return 0
  return password.length * Math.log2(charsetSize)
}

// Estimate crack time
function estimateCrackTime(entropy: number): CrackTimeEstimate {
  const secondsPerGuess = {
    online: 1, // 1 guess per second
    offline: 0.000001, // 1 million per second
    gpu: 0.00000001, // 100 million per second
    quantum: 0.0000000001, // 10 billion per second (rough estimate)
  }

  const averageGuesses = Math.pow(2, entropy - 1)

  const calculateTime = (guessesPerSecond: number): string => {
    const seconds = averageGuesses / guessesPerSecond
    
    if (seconds < 1) return 'Instantly'
    if (seconds < 60) return `${Math.floor(seconds)}s`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d`
    if (seconds < 31536000) return `${Math.floor(seconds / 2592000)}mo`
    if (seconds < 315360000) return `${Math.floor(seconds / 31536000)}y`
    return 'Centuries'
  }

  return {
    online: calculateTime(1 / secondsPerGuess.online),
    offline: calculateTime(1 / secondsPerGuess.offline),
    gpu: calculateTime(1 / secondsPerGuess.gpu),
    quantum: calculateTime(1 / secondsPerGuess.quantum),
  }
}

// Detect patterns
function detectPatterns(password: string): PatternResult[] {
  const patterns: PatternResult[] = []

  // Dictionary words
  COMMON_WORDS.forEach(word => {
    let index = 0
    while ((index = password.toLowerCase().indexOf(word, index)) !== -1) {
      patterns.push({
        pattern: word,
        position: index,
        length: word.length,
        type: 'dictionary',
        severity: 'high',
      })
      index += word.length
    }
  })

  // Keyboard patterns
  KEYBOARD_PATTERNS.forEach(pattern => {
    let index = 0
    while ((index = password.toLowerCase().indexOf(pattern, index)) !== -1) {
      patterns.push({
        pattern,
        position: index,
        length: pattern.length,
        type: 'keyboard',
        severity: 'high',
      })
      index += pattern.length
    }
  })

  // Repeated characters
  for (let i = 0; i < password.length - 2; i++) {
    if (password[i] === password[i + 1] && password[i + 1] === password[i + 2]) {
      patterns.push({
        pattern: password[i].repeat(3),
        position: i,
        length: 3,
        type: 'repeated',
        severity: 'medium',
      })
    }
  }

  // Sequential numbers
  for (let i = 0; i < password.length - 2; i++) {
    const c1 = password.charCodeAt(i)
    const c2 = password.charCodeAt(i + 1)
    const c3 = password.charCodeAt(i + 2)
    
    if (c2 === c1 + 1 && c3 === c2 + 1) {
      patterns.push({
        pattern: password.slice(i, i + 3),
        position: i,
        length: 3,
        type: 'sequence',
        severity: 'low',
      })
    }
  }

  return patterns
}

// Get character distribution
function getCharacterDistribution(password: string): CharacterDistribution {
  return {
    uppercase: (password.match(/[A-Z]/g) || []).length,
    lowercase: (password.match(/[a-z]/g) || []).length,
    numbers: (password.match(/[0-9]/g) || []).length,
    symbols: (password.match(/[^a-zA-Z0-9]/g) || []).length,
  }
}

// Generate heatmap data
function generateHeatmap(password: string): HeatmapData[] {
  const charFreq = new Map<string, number>()
  for (const char of password) {
    charFreq.set(char, (charFreq.get(char) || 0) + 1)
  }

  const maxFreq = Math.max(...charFreq.values())

  return password.split('').map((char, index) => {
    const freq = charFreq.get(char) || 0
    const uniqueness = 1 - freq / maxFreq
    const hue = Math.round(uniqueness * 120) // Green (120) for unique, red (0) for common
    const saturation = 70 + uniqueness * 30
    const lightness = 50 + uniqueness * 10

    return {
      char,
      uniqueness,
      color: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
    }
  })
}

// Build checklist
function buildChecklist(password: string): ChecklistItem[] {
  const dist = getCharacterDistribution(password)
  return [
    { id: 'length', label: 'At least 8 characters', met: password.length >= 8, icon: '📏' },
    { id: 'uppercase', label: 'Uppercase letters', met: dist.uppercase > 0, icon: 'Ⓐ' },
    { id: 'lowercase', label: 'Lowercase letters', met: dist.lowercase > 0, icon: 'ⓐ' },
    { id: 'numbers', label: 'Numbers', met: dist.numbers > 0, icon: '🔢' },
    { id: 'symbols', label: 'Symbols', met: dist.symbols > 0, icon: '🔐' },
    { id: 'no-repeat', label: 'No 3+ repeated chars', met: !/(.)\1{2,}/.test(password), icon: '✨' },
    { id: 'no-keyboard', label: 'No keyboard patterns', met: !KEYBOARD_PATTERNS.some(p => password.toLowerCase().includes(p)), icon: '⌨️' },
    { id: 'no-dict', label: 'No dictionary words', met: !COMMON_WORDS.some(w => password.toLowerCase().includes(w)), icon: '📚' },
    { id: 'randomness', label: 'Good randomness', met: password.length >= 12 && dist.uppercase > 0 && dist.lowercase > 0 && dist.numbers > 0 && dist.symbols > 0, icon: '🎲' },
    { id: 'entropy', label: 'High entropy (>60 bits)', met: calculateEntropy(password) >= 60, icon: '⚡' },
  ]
}

// Calculate score
function calculateScore(password: string, entropy: number, patterns: PatternResult[]): number {
  let score = 0

  // Length (0-20 points)
  score += Math.min(20, (password.length / 64) * 20)

  // Entropy (0-30 points)
  score += Math.min(30, (entropy / 100) * 30)

  // Complexity (0-30 points)
  const dist = getCharacterDistribution(password)
  if (dist.uppercase > 0) score += 10
  if (dist.lowercase > 0) score += 10
  if (dist.numbers > 0) score += 5
  if (dist.symbols > 0) score += 5

  // Deduct for patterns (0-20 points)
  let patternDeduction = 0
  patterns.forEach(p => {
    if (p.severity === 'high') patternDeduction += 10
    if (p.severity === 'medium') patternDeduction += 5
    if (p.severity === 'low') patternDeduction += 2
  })
  score -= Math.min(20, patternDeduction)

  return Math.max(0, Math.round(score))
}

// Get strength level
function getStrengthLevel(score: number): StrengthLevel {
  if (score < 20) return 'very-weak'
  if (score < 40) return 'weak'
  if (score < 60) return 'fair'
  if (score < 75) return 'good'
  if (score < 90) return 'strong'
  return 'excellent'
}

// Get grade
function getGrade(score: number): string {
  if (score >= 95) return 'A+'
  if (score >= 90) return 'A'
  if (score >= 85) return 'A-'
  if (score >= 80) return 'B+'
  if (score >= 75) return 'B'
  if (score >= 70) return 'B-'
  if (score >= 65) return 'C+'
  if (score >= 60) return 'C'
  if (score >= 50) return 'D'
  return 'F'
}

// Generate recommendations
function generateRecommendations(password: string, checklist: ChecklistItem[], patterns: PatternResult[]): string[] {
  const recommendations: string[] = []

  if (password.length < 12) {
    recommendations.push('Increase password length to at least 12 characters for better security')
  }

  const unmet = checklist.filter(item => !item.met)
  if (unmet.length > 0) {
    recommendations.push(`Add ${unmet.map(u => u.label.toLowerCase()).join(', ')} for better security`)
  }

  if (patterns.length > 0) {
    const highSeverity = patterns.filter(p => p.severity === 'high')
    if (highSeverity.length > 0) {
      recommendations.push('Remove common words and patterns detected in your password')
    }
  }

  if (password.length >= 16) {
    recommendations.push('Consider using a passphrase for easier memorization of long passwords')
  }

  if (!recommendations.length) {
    recommendations.push('Excellent password! Consider using this one.')
  }

  return recommendations
}

// Main analysis function
export function analyzePassword(password: string): PasswordAnalysis {
  const length = password.length
  const entropy = calculateEntropy(password)
  const patterns = detectPatterns(password)
  const distribution = getCharacterDistribution(password)
  const checklist = buildChecklist(password)
  const heatmap = generateHeatmap(password)
  const score = calculateScore(password, entropy, patterns)
  const strength = getStrengthLevel(score)
  const grade = getGrade(score)
  const crackTime = estimateCrackTime(entropy)
  const recommendations = generateRecommendations(password, checklist, patterns)

  return {
    password,
    length,
    strength,
    score,
    grade,
    entropy,
    crackTime,
    checklist,
    patterns,
    heatmap,
    recommendations,
    characterDistribution: distribution,
    hasRepeating: /(.)\1{2,}/.test(password),
    hasKeyboardPatterns: KEYBOARD_PATTERNS.some(p => password.toLowerCase().includes(p)),
    hasDictionaryWords: COMMON_WORDS.some(w => password.toLowerCase().includes(w)),
  }
}
