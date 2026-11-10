/**
 * Admin branding (PLAN.md §12, step 1): the Complex MMC word mark on the login screen and the
 * small mark in the top bar. Replace with the real logo file once the client sends it.
 */
const ink = '#122844'
const teal = '#0b9aa6'

/** Wave mark: the site's "waterline" signature in a rounded square. */
function Mark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill={ink} />
      <path d="M6 19c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2" fill="none" stroke={teal} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M6 13c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" opacity=".9" />
    </svg>
  )
}

export function AdminLogo() {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
      <Mark size={40} />
      <span style={{ fontFamily: "'Manrope', 'Inter', sans-serif", fontWeight: 700, fontSize: 26, letterSpacing: '-0.02em', color: ink }}>
        Complex <span style={{ color: teal }}>MMC</span>
      </span>
    </span>
  )
}

export function AdminIcon() {
  return <Mark size={28} />
}
