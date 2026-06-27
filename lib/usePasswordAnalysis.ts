import { useState, useCallback, useEffect } from 'react'
import { analyzePassword, type PasswordAnalysis } from './passwordAnalysis'

interface UsePasswordAnalysisReturn {
  password: string
  setPassword: (password: string) => void
  analysis: PasswordAnalysis | null
  history: PasswordAnalysis[]
  addToHistory: (analysis: PasswordAnalysis) => void
  clearHistory: () => void
  removeFromHistory: (index: number) => void
  generatePassword: (options: GenerateOptions) => string
  favorites: PasswordAnalysis[]
  toggleFavorite: (analysis: PasswordAnalysis) => void
  isFavorited: (analysis: PasswordAnalysis) => boolean
}

export interface GenerateOptions {
  length: number
  useUppercase: boolean
  useLowercase: boolean
  useNumbers: boolean
  useSymbols: boolean
  excludeSimilar: boolean
  pronounceable: boolean
}

const DEFAULT_GENERATE_OPTIONS: GenerateOptions = {
  length: 16,
  useUppercase: true,
  useLowercase: true,
  useNumbers: true,
  useSymbols: true,
  excludeSimilar: false,
  pronounceable: false,
}

export function usePasswordAnalysis(): UsePasswordAnalysisReturn {
  const [password, setPassword] = useState('')
  const [analysis, setAnalysis] = useState<PasswordAnalysis | null>(null)
  const [history, setHistory] = useState<PasswordAnalysis[]>([])
  const [favorites, setFavorites] = useState<PasswordAnalysis[]>([])

  // Analyze password on change
  useEffect(() => {
    if (password.length > 0) {
      const result = analyzePassword(password)
      setAnalysis(result)
    } else {
      setAnalysis(null)
    }
  }, [password])

  const addToHistory = useCallback((newAnalysis: PasswordAnalysis) => {
    setHistory(prev => {
      const filtered = prev.filter(item => item.password !== newAnalysis.password)
      return [newAnalysis, ...filtered].slice(0, 20) // Keep last 20
    })
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
  }, [])

  const removeFromHistory = useCallback((index: number) => {
    setHistory(prev => prev.filter((_, i) => i !== index))
  }, [])

  const isFavorited = useCallback((testAnalysis: PasswordAnalysis) => {
    return favorites.some(fav => fav.password === testAnalysis.password)
  }, [favorites])

  const toggleFavorite = useCallback((testAnalysis: PasswordAnalysis) => {
    setFavorites(prev => {
      const isFaved = prev.some(fav => fav.password === testAnalysis.password)
      if (isFaved) {
        return prev.filter(fav => fav.password !== testAnalysis.password)
      }
      return [...prev, testAnalysis]
    })
  }, [])

  const generatePassword = useCallback((options: GenerateOptions = DEFAULT_GENERATE_OPTIONS): string => {
    let charset = ''
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'
    const similar = 'il1Lo0O' // Characters that look similar

    if (options.useUppercase) charset += uppercase
    if (options.useLowercase) charset += lowercase
    if (options.useNumbers) charset += numbers
    if (options.useSymbols) charset += symbols

    if (options.excludeSimilar) {
      for (const char of similar) {
        charset = charset.replace(new RegExp(char, 'g'), '')
      }
    }

    if (!charset) {
      charset = uppercase + lowercase + numbers
    }

    let generated = ''
    for (let i = 0; i < options.length; i++) {
      generated += charset.charAt(Math.floor(Math.random() * charset.length))
    }

    return generated
  }, [])

  return {
    password,
    setPassword,
    analysis,
    history,
    addToHistory,
    clearHistory,
    removeFromHistory,
    generatePassword,
    favorites,
    toggleFavorite,
    isFavorited,
  }
}
