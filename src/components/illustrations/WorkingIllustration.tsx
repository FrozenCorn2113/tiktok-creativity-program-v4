export default function WorkingIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 320" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Desk */}
      <rect x="20" y="210" width="200" height="10" rx="5" fill="#eadfd3" />
      <rect x="40" y="220" width="6" height="50" rx="3" fill="#dfd1c4" />
      <rect x="194" y="220" width="6" height="50" rx="3" fill="#dfd1c4" />

      {/* Chair */}
      <rect x="70" y="230" width="60" height="8" rx="4" fill="#dfd1c4" />
      <rect x="68" y="238" width="8" height="40" rx="4" fill="#dfd1c4" />
      <rect x="124" y="238" width="8" height="40" rx="4" fill="#dfd1c4" />
      <rect x="66" y="180" width="68" height="52" rx="8" fill="#fff1e6" stroke="#eadfd3" strokeWidth="1.5" />

      {/* Person - seated at desk */}
      <circle cx="100" cy="130" r="26" fill="#f4a261" />
      {/* Hair */}
      <path d="M80 124 Q86 104 100 106 Q114 104 120 124" fill="#e58b3a" />
      {/* Body */}
      <rect x="80" y="158" width="40" height="36" rx="10" fill="#f4a261" />
      {/* Arms reaching to laptop */}
      <rect x="116" y="172" width="32" height="7" rx="3.5" fill="#f4a261" opacity="0.85" />
      <rect x="56" y="172" width="28" height="7" rx="3.5" fill="#f4a261" opacity="0.85" />

      {/* Laptop on desk */}
      <rect x="80" y="196" width="56" height="16" rx="3" fill="#475467" />
      <rect x="74" y="194" width="68" height="4" rx="2" fill="#667085" />
      {/* Screen content */}
      <rect x="86" y="200" width="20" height="2" rx="1" fill="#f4a261" opacity="0.6" />
      <rect x="86" y="204" width="30" height="2" rx="1" fill="white" opacity="0.3" />
      <rect x="86" y="208" width="14" height="2" rx="1" fill="white" opacity="0.2" />

      {/* Coffee mug */}
      <rect x="160" y="194" width="16" height="18" rx="3" fill="#ffe9d5" stroke="#eadfd3" strokeWidth="1.5" />
      <path d="M176 200 Q184 200 184 207 Q184 214 176 214" stroke="#eadfd3" strokeWidth="1.5" fill="none" />
      {/* Steam */}
      <path d="M164 190 Q166 184 168 190" stroke="#dfd1c4" strokeWidth="1" fill="none" />
      <path d="M170 188 Q172 182 174 188" stroke="#dfd1c4" strokeWidth="1" fill="none" />

      {/* Floating decorative elements */}
      <circle cx="30" cy="80" r="6" fill="#ffe9d5" />
      <circle cx="210" cy="100" r="4" fill="#f4a261" opacity="0.3" />
      <rect x="190" y="60" width="14" height="14" rx="3" fill="#ffe9d5" opacity="0.6" />
      <circle cx="50" cy="120" r="3" fill="#f4a261" opacity="0.2" />

      {/* Lightbulb/idea icon */}
      <circle cx="160" cy="110" r="14" fill="white" stroke="#eadfd3" strokeWidth="1.5" />
      <path d="M155 106 L160 116 L165 106" fill="none" stroke="#f4a261" strokeWidth="2" strokeLinecap="round" />
      <circle cx="160" cy="103" r="2" fill="#f4a261" />

      {/* Notebook/notepad */}
      <rect x="30" y="194" width="28" height="18" rx="3" fill="white" stroke="#eadfd3" strokeWidth="1.5" />
      <rect x="34" y="198" width="12" height="2" rx="1" fill="#eadfd3" />
      <rect x="34" y="202" width="18" height="2" rx="1" fill="#eadfd3" />
      <rect x="34" y="206" width="10" height="2" rx="1" fill="#eadfd3" />
    </svg>
  )
}
