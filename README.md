# Password Strength Analyzer - Premium Security Checker

A sophisticated, full-featured password strength analyzer with a futuristic cybersecurity aesthetic. Built with Next.js, React, and Tailwind CSS. All processing happens locally in your browser - no passwords are ever transmitted or stored.

## Features

### Core Analysis Engine
- **Real-time Password Analysis**: Instant feedback as you type with advanced security heuristics
- **Entropy Calculation**: Precise entropy measurement in bits with visual indicators
- **Security Score**: 0-100 scoring system with letter grades (A+ to F)
- **Strength Levels**: Six-tier classification (Very Weak → Excellent)

### Security Metrics
- **Crack Time Estimation**: Estimates time to crack against multiple attack vectors:
  - Online attacks (1 guess/second)
  - Offline attacks (1M guesses/second)
  - GPU attacks (100M guesses/second)
  - Quantum computing estimates (theoretical)

### Visual Analysis
- **Security Checklist**: 10-item verification list covering:
  - Length (8+ characters)
  - Character types (uppercase, lowercase, numbers, symbols)
  - Pattern avoidance (no repeats, no keyboard patterns)
  - Dictionary word detection
  - Entropy levels (60+ bits)

- **Character Uniqueness Heatmap**: Color-coded visualization of character diversity
  - Green: Unique characters
  - Red: Common/repeated characters
  - Hover tooltips for uniqueness percentages

- **Character Distribution**: Animated bar charts showing:
  - Uppercase letter count and percentage
  - Lowercase letter count and percentage
  - Number count and percentage
  - Symbol count and percentage

### Pattern Detection
Identifies and warns about:
- Dictionary words (common passwords, names, etc.)
- Keyboard patterns (QWERTY, ASDF, 123456, etc.)
- Repeated characters (aaa, bbb sequences)
- Sequential characters (ABC, 123 patterns)

### Password Generator
Customizable generator with options for:
- Length (8-64 characters)
- Uppercase letters (A-Z)
- Lowercase letters (a-z)
- Numbers (0-9)
- Symbols (!@#$% etc.)
- Similar character exclusion
- Pronounceable mode

### Recommendations
AI-powered suggestions to improve password strength:
- Specific actions to address weak points
- Entropy improvement tips
- Pattern avoidance guidance
- Length recommendations

## Design & Experience

### Premium Aesthetic
- **Glassmorphism Design**: 20-30px backdrop blur with semi-transparent cards
- **Dark Cybersecurity Theme**: Navy background (#081120) with cyan and purple accents
- **Animated Gradients**: Flowing color shifts and smooth transitions
- **Floating Particles**: Subtle background animations

### Interactions
- **Smooth Animations**: Spring animations, hover effects, and transitions
- **Accessibility**: Full keyboard navigation and screen reader support
- **Reduced Motion**: Respects `prefers-reduced-motion` for motion-sensitive users
- **High Contrast Mode**: Enhanced visibility for users with visual needs

### Responsive Design
- Mobile-first approach
- Optimized for desktop, tablet, and mobile
- Touch-friendly interface
- Adaptive layouts using Tailwind's responsive prefixes

## Performance

### Metrics
- **Lighthouse Scores**: Target 100 in all categories
- **Core Web Vitals**:
  - LCP ≤2500ms (Good)
  - CLS ≤0.1 (Good)
  - INP ≤200ms (Good)

- **Development Build Performance**:
  - TTFB: ~80ms
  - FCP: ~400ms
  - LCP: ~400ms
  - CLS: 0.0 (perfect)
  - React Hydration: ~35ms

### Optimizations
- Client-side only (no backend API calls)
- Optimized entropy calculations
- Efficient pattern matching
- Lazy-loaded components
- CSS animations using GPU acceleration

## Privacy & Security

### Zero Data Transmission
- All analysis happens entirely in your browser
- No passwords are sent to any server
- No logging or storage of any kind
- Completely client-side application

### Browser-based Processing
- Pure JavaScript implementation
- No external API calls
- No dependencies on third-party services
- Fully functional offline

## Technology Stack

- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Language**: TypeScript
- **Runtime**: Client-side JavaScript

## Project Structure

```
/app
  - layout.tsx         # Root layout with metadata
  - globals.css        # Global styles and animations
  - page.tsx           # Main password analyzer page

/components
  - Hero.tsx           # Hero section with introduction
  - PasswordInputCard.tsx      # Input field and controls
  - StrengthMeter.tsx         # Strength visualization
  - ChecklistCard.tsx         # Security criteria checklist
  - CrackTimeCard.tsx         # Crack time estimates
  - HeatmapCard.tsx           # Character uniqueness heatmap
  - CharacterDistributionCard.tsx # Character type breakdown
  - PatternDetectionCard.tsx  # Pattern warnings
  - RecommendationsCard.tsx   # AI suggestions
  - PasswordGeneratorModal.tsx # Password generator
  - Footer.tsx                # Privacy notice and info

/lib
  - passwordAnalysis.ts       # Core analysis engine
  - usePasswordAnalysis.ts    # React hook for state management
```

## Key Features in Detail

### Strength Scoring Algorithm
- Length contribution (20 points)
- Entropy contribution (30 points)
- Character complexity (30 points)
- Pattern deductions (20 points)

### Entropy Calculation
$$\text{Entropy} = \log_2(N^L)$$

Where N is the character set size and L is the password length.

### Crack Time Formula
$$t = \frac{2^E}{2 \times \text{guesses per second}}$$

Where E is entropy in bits.

## Usage

1. **Type or Paste a Password**: Enter any password to analyze it
2. **View Real-time Analysis**: See instant feedback across multiple metrics
3. **Generate Strong Passwords**: Use the built-in generator with custom options
4. **Follow Recommendations**: Implement suggested improvements
5. **Check Crack Times**: Understand security against different attack vectors

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Any modern browser with ES2020+ support

## Development

### Install Dependencies
```bash
pnpm install
```

### Run Development Server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
pnpm build
pnpm start
```

## Lighthouse Targets

- Performance: 100
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## Privacy Policy

This application does not collect, transmit, or store any data. All analysis is performed locally in your browser using JavaScript. Your passwords never leave your device.

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Improve documentation
- Submit pull requests

## Future Enhancements

- Breach database checking (Have I Been Pwned integration)
- Multi-language support
- Dark/Light theme toggle
- Password history export
- Advanced statistics dashboard
- Mobile app version
- Browser extension

## Credits

Built with:
- Next.js by Vercel
- React by Meta
- Tailwind CSS
- Lucide Icons
- TypeScript

---

Made with ❤️ for cybersecurity. Your password, your security, your control.
