export default function CollaborationIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 360" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Desk / table */}
      <rect x="80" y="220" width="320" height="12" rx="6" fill="#eadfd3" />
      <rect x="120" y="232" width="8" height="60" rx="4" fill="#dfd1c4" />
      <rect x="352" y="232" width="8" height="60" rx="4" fill="#dfd1c4" />

      {/* Person 1 - left, standing */}
      <circle cx="140" cy="140" r="28" fill="#f4a261" />
      <rect x="118" y="172" width="44" height="50" rx="12" fill="#f4a261" />
      {/* Hair */}
      <path d="M118 135 Q125 110 140 112 Q155 110 162 135" fill="#e58b3a" />
      {/* Arm holding paper */}
      <rect x="158" y="180" width="36" height="8" rx="4" fill="#f4a261" opacity="0.85" />
      <rect x="186" y="170" width="24" height="32" rx="3" fill="white" stroke="#eadfd3" strokeWidth="1.5" />

      {/* Person 2 - center, seated */}
      <circle cx="240" cy="148" r="32" fill="#ffe9d5" />
      <rect x="214" y="184" width="52" height="38" rx="14" fill="#ffe9d5" />
      {/* Hair */}
      <path d="M214 142 Q220 118 240 120 Q260 118 266 142" fill="#f4a261" />
      {/* Laptop */}
      <rect x="216" y="208" width="48" height="14" rx="3" fill="#475467" />
      <rect x="210" y="206" width="60" height="4" rx="2" fill="#667085" />

      {/* Person 3 - right, standing */}
      <circle cx="340" cy="145" r="26" fill="#fff1e6" stroke="#f4a261" strokeWidth="2.5" />
      <rect x="320" y="175" width="40" height="46" rx="11" fill="#fff1e6" stroke="#f4a261" strokeWidth="2.5" />
      {/* Hair */}
      <path d="M320 140 Q327 118 340 120 Q353 118 360 140" fill="#f4a261" opacity="0.5" />
      {/* Arm pointing */}
      <rect x="296" y="188" width="28" height="7" rx="3.5" fill="#fff1e6" stroke="#f4a261" strokeWidth="1.5" />

      {/* Decorative elements */}
      {/* Floating shapes */}
      <circle cx="70" cy="100" r="8" fill="#ffe9d5" />
      <circle cx="420" cy="90" r="6" fill="#f4a261" opacity="0.3" />
      <rect x="390" y="130" width="16" height="16" rx="4" fill="#ffe9d5" opacity="0.6" />
      <circle cx="100" cy="200" r="5" fill="#f4a261" opacity="0.2" />
      <rect x="60" cy="160" width="12" height="12" rx="3" fill="#f4a261" opacity="0.15" />

      {/* Speech/thought bubbles */}
      <rect x="280" y="100" width="40" height="24" rx="12" fill="white" stroke="#eadfd3" strokeWidth="1.5" />
      <circle cx="278" cy="128" r="3" fill="white" stroke="#eadfd3" strokeWidth="1" />
      <rect x="288" y="108" width="8" height="3" rx="1.5" fill="#f4a261" opacity="0.5" />
      <rect x="300" y="108" width="12" height="3" rx="1.5" fill="#eadfd3" />
      <rect x="288" y="114" width="16" height="3" rx="1.5" fill="#eadfd3" />

      {/* Chart icon near person 1 */}
      <rect x="100" y="100" width="28" height="20" rx="4" fill="white" stroke="#eadfd3" strokeWidth="1.5" />
      <rect x="106" y="112" width="4" height="4" fill="#f4a261" />
      <rect x="112" y="108" width="4" height="8" fill="#f4a261" opacity="0.7" />
      <rect x="118" y="105" width="4" height="11" fill="#f4a261" opacity="0.4" />
    </svg>
  )
}
