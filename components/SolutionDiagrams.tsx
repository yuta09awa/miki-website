// Inline SVG diagrams for solution pages. Original artwork — no third-party assets.

type Props = {className?: string}

export function IonizerDiagram({className}: Props) {
  return (
    <svg viewBox="0 0 600 400" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ion-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <radialGradient id="ion-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="400" fill="url(#ion-bg)" />
      {/* Ionizer bar */}
      <rect x="100" y="60" width="400" height="40" rx="6" fill="#334155" stroke="#60a5fa" strokeWidth="2" />
      <text x="300" y="86" textAnchor="middle" fill="#e2e8f0" fontSize="14" fontFamily="system-ui" fontWeight="600">
        AIR-LESS IONIZER BAR
      </text>
      {/* Emitter points */}
      {[150, 200, 250, 300, 350, 400, 450].map((x) => (
        <g key={x}>
          <circle cx={x} cy="110" r="3" fill="#60a5fa" />
          <circle cx={x} cy="110" r="20" fill="url(#ion-glow)" />
        </g>
      ))}
      {/* Ion clouds */}
      {[150, 250, 350, 450].map((x, i) => (
        <g key={x} opacity="0.7">
          <circle cx={x - 10} cy={170 + i * 5} r="4" fill="#60a5fa" />
          <text x={x - 10} y={175 + i * 5} textAnchor="middle" fill="#fff" fontSize="9">+</text>
          <circle cx={x + 15} cy={190 + i * 5} r="4" fill="#f87171" />
          <text x={x + 15} y={195 + i * 5} textAnchor="middle" fill="#fff" fontSize="9">−</text>
        </g>
      ))}
      {/* Target substrate */}
      <rect x="80" y="290" width="440" height="20" fill="#475569" stroke="#94a3b8" strokeWidth="1" />
      <text x="300" y="335" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="system-ui">
        Charged substrate → neutralized in &lt; 2 sec
      </text>
      {/* Arrows down */}
      {[150, 250, 350, 450].map((x) => (
        <line key={x} x1={x} y1="220" x2={x} y2="280" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3,3" markerEnd="url(#arrow)" />
      ))}
      <defs>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#60a5fa" />
        </marker>
      </defs>
    </svg>
  )
}

export function WebCleanerDiagram({className}: Props) {
  return (
    <svg viewBox="0 0 600 400" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="400" fill="#0f172a" />
      {/* Roller left */}
      <circle cx="80" cy="200" r="40" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
      <circle cx="80" cy="200" r="6" fill="#64748b" />
      {/* Roller right */}
      <circle cx="520" cy="200" r="40" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
      <circle cx="520" cy="200" r="6" fill="#64748b" />
      {/* Web (film) */}
      <path d="M 80 160 L 520 160" stroke="#60a5fa" strokeWidth="3" />
      <path d="M 80 240 L 520 240" stroke="#60a5fa" strokeWidth="3" />
      {/* Particles on incoming web */}
      {[120, 150, 180, 210, 240].map((x, i) => (
        <circle key={x} cx={x} cy={155 - (i % 2) * 3} r="2" fill="#f87171" />
      ))}
      {/* Cleaning head (non-contact) */}
      <rect x="260" y="100" width="80" height="50" rx="4" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2" />
      <text x="300" y="130" textAnchor="middle" fill="#dbeafe" fontSize="11" fontFamily="system-ui" fontWeight="600">
        NON-CONTACT
      </text>
      <text x="300" y="144" textAnchor="middle" fill="#dbeafe" fontSize="11" fontFamily="system-ui" fontWeight="600">
        CLEANER
      </text>
      {/* Vacuum arrows up into head */}
      {[280, 300, 320].map((x) => (
        <line key={x} x1={x} y1="158" x2={x} y2="152" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrow2)" />
      ))}
      {/* Capture chamber */}
      <rect x="220" y="40" width="160" height="50" rx="4" fill="#334155" stroke="#94a3b8" strokeWidth="1" />
      <text x="300" y="70" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontFamily="system-ui">
        Sealed capture chamber
      </text>
      <line x1="300" y1="100" x2="300" y2="90" stroke="#94a3b8" strokeWidth="1" />
      {/* Clean web after */}
      <text x="430" y="155" textAnchor="middle" fill="#86efac" fontSize="11" fontFamily="system-ui">
        ✓ &gt; 99% clean
      </text>
      <text x="170" y="155" textAnchor="middle" fill="#fca5a5" fontSize="11" fontFamily="system-ui">
        Particles in
      </text>
      <text x="300" y="350" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="system-ui">
        Roll-to-roll film cleaning · no rollers · no consumables
      </text>
      <defs>
        <marker id="arrow2" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="#60a5fa" />
        </marker>
      </defs>
    </svg>
  )
}

export function CleanBenchDiagram({className}: Props) {
  return (
    <svg viewBox="0 0 600 400" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="400" fill="#0f172a" />
      {/* Bench enclosure */}
      <rect x="120" y="80" width="360" height="240" rx="8" fill="none" stroke="#60a5fa" strokeWidth="2" />
      {/* HEPA filter top */}
      <rect x="120" y="80" width="360" height="30" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2" />
      <text x="300" y="100" textAnchor="middle" fill="#dbeafe" fontSize="12" fontFamily="system-ui" fontWeight="600">
        HEPA + ULPA + IONIZER
      </text>
      {/* Laminar flow lines */}
      {[160, 200, 240, 280, 320, 360, 400, 440].map((x) => (
        <line key={x} x1={x} y1="115" x2={x} y2="270" stroke="#60a5fa" strokeWidth="1" strokeDasharray="2,4" opacity="0.6" />
      ))}
      {/* Work surface */}
      <rect x="120" y="270" width="360" height="20" fill="#334155" stroke="#94a3b8" strokeWidth="1" />
      {/* Sample on bench */}
      <rect x="270" y="250" width="60" height="20" rx="2" fill="#475569" stroke="#94a3b8" />
      {/* Class 1 badge */}
      <circle cx="450" cy="200" r="28" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2" />
      <text x="450" y="195" textAnchor="middle" fill="#dbeafe" fontSize="10" fontFamily="system-ui">
        ISO
      </text>
      <text x="450" y="210" textAnchor="middle" fill="#dbeafe" fontSize="14" fontFamily="system-ui" fontWeight="700">
        Class 1
      </text>
      {/* Plug */}
      <line x1="490" y1="320" x2="520" y2="320" stroke="#94a3b8" strokeWidth="2" />
      <rect x="520" y="316" width="10" height="8" fill="#94a3b8" />
      <text x="300" y="360" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="system-ui">
        Tabletop · single plug · no facility air
      </text>
    </svg>
  )
}

export function CleanroomDiagram({className}: Props) {
  return (
    <svg viewBox="0 0 600 400" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="400" fill="#0f172a" />
      {/* Cleanroom walls */}
      <rect x="60" y="80" width="480" height="240" fill="none" stroke="#60a5fa" strokeWidth="2" />
      {/* Ceiling HEPA grid */}
      {[100, 180, 260, 340, 420, 500].map((x) => (
        <rect key={x} x={x - 20} y="80" width="40" height="14" fill="#1e3a8a" stroke="#60a5fa" />
      ))}
      <text x="300" y="74" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="system-ui">
        HEPA ceiling grid
      </text>
      {/* Vertical laminar flow */}
      {[100, 180, 260, 340, 420, 500].map((x) => (
        <line key={x} x1={x} y1="100" x2={x} y2="280" stroke="#60a5fa" strokeWidth="1" strokeDasharray="2,4" opacity="0.5" />
      ))}
      {/* Equipment inside */}
      <rect x="100" y="220" width="80" height="60" fill="#334155" stroke="#94a3b8" />
      <rect x="220" y="220" width="80" height="60" fill="#334155" stroke="#94a3b8" />
      <rect x="340" y="220" width="80" height="60" fill="#334155" stroke="#94a3b8" />
      <rect x="460" y="220" width="60" height="60" fill="#334155" stroke="#94a3b8" />
      {/* Floor return */}
      <rect x="60" y="300" width="480" height="20" fill="#1e293b" stroke="#60a5fa" />
      <text x="300" y="315" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="system-ui">
        Raised floor return
      </text>
      {/* Ionizer markers */}
      {[140, 260, 380, 490].map((x) => (
        <circle key={x} cx={x} cy="100" r="4" fill="#fbbf24" />
      ))}
      <text x="300" y="360" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="system-ui">
        ISO 14644 · integrated ionization throughout
      </text>
    </svg>
  )
}

export function AirBlowFreeDiagram({className}: Props) {
  return (
    <svg viewBox="0 0 600 400" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="400" fill="#0f172a" />
      {/* Conventional side */}
      <text x="150" y="50" textAnchor="middle" fill="#fca5a5" fontSize="13" fontFamily="system-ui" fontWeight="700">
        CONVENTIONAL
      </text>
      <rect x="60" y="70" width="180" height="120" fill="none" stroke="#7f1d1d" strokeWidth="1.5" />
      <rect x="100" y="100" width="100" height="20" fill="#7f1d1d" />
      <text x="150" y="115" textAnchor="middle" fill="#fee2e2" fontSize="10">Compressor</text>
      {/* Air lines */}
      <path d="M 150 120 Q 150 150 130 165" stroke="#fca5a5" strokeWidth="2" fill="none" />
      <path d="M 150 120 Q 150 150 170 165" stroke="#fca5a5" strokeWidth="2" fill="none" />
      <text x="150" y="180" textAnchor="middle" fill="#fca5a5" fontSize="10">High kWh</text>
      {/* Energy bar */}
      <rect x="80" y="220" width="140" height="14" fill="#7f1d1d" />
      <rect x="80" y="220" width="115" height="14" fill="#dc2626" />
      <text x="150" y="250" textAnchor="middle" fill="#fca5a5" fontSize="11">~25% facility energy</text>

      {/* Divider */}
      <line x1="300" y1="40" x2="300" y2="360" stroke="#334155" strokeWidth="1" strokeDasharray="4,4" />

      {/* Air-less side */}
      <text x="450" y="50" textAnchor="middle" fill="#86efac" fontSize="13" fontFamily="system-ui" fontWeight="700">
        AIR-LESS
      </text>
      <rect x="360" y="70" width="180" height="120" fill="none" stroke="#14532d" strokeWidth="1.5" />
      <rect x="400" y="100" width="100" height="20" fill="#14532d" />
      <text x="450" y="115" textAnchor="middle" fill="#dcfce7" fontSize="10">Air-less ionizer</text>
      <circle cx="430" cy="150" r="3" fill="#86efac" />
      <circle cx="450" cy="155" r="3" fill="#86efac" />
      <circle cx="470" cy="150" r="3" fill="#86efac" />
      <text x="450" y="180" textAnchor="middle" fill="#86efac" fontSize="10">Low kWh</text>
      {/* Energy bar */}
      <rect x="380" y="220" width="140" height="14" fill="#14532d" />
      <rect x="380" y="220" width="20" height="14" fill="#16a34a" />
      <text x="450" y="250" textAnchor="middle" fill="#86efac" fontSize="11">60–90% reduction</text>

      <text x="300" y="320" textAnchor="middle" fill="#e2e8f0" fontSize="14" fontFamily="system-ui" fontWeight="600">
        Payback &lt; 18 months
      </text>
      <text x="300" y="345" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="system-ui">
        Same static control · fraction of the energy
      </text>
    </svg>
  )
}

const map: Record<string, (p: Props) => React.ReactElement> = {
  'static-control': IonizerDiagram,
  'anti-static-ionizers': IonizerDiagram,
  'non-contact-film-web-cleaner': WebCleanerDiagram,
  'ionizing-clean-bench': CleanBenchDiagram,
  'cleanroom-construction': CleanroomDiagram,
  'air-blow-free-sustainability': AirBlowFreeDiagram,
}

export function SolutionDiagram({slug, className}: {slug: string; className?: string}) {
  const C = map[slug]
  if (!C) return null
  return <C className={className} />
}
