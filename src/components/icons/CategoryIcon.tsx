import type { SVGProps } from 'react'

/**
 * Category icons — drawn for Complex MMC. One grid (48×48), one stroke (1.5), round joins.
 * Every icon stands on the same short wave at y≈41: the site's "waterline" signature.
 * Colour comes from `currentColor`, so icons follow the palette tokens.
 */
const WAVE = 'M5 41.5c2.4-1.8 4.8-1.8 7.2 0s4.8 1.8 7.2 0 4.8-1.8 7.2 0 4.8 1.8 7.2 0 4.8-1.8 7.2 0'

const PATHS: Record<string, string[]> = {
  // pool ladder entering water
  pool: [
    'M18 10.5c0-2.6 4.5-2.6 4.5 0V33',
    'M28 10.5c0-2.6 4.5-2.6 4.5 0V33',
    'M22.5 17h10',
    'M22.5 23.5h10',
    'M8 33.5c2.7-2 5.3-2 8 0s5.3 2 8 0 5.3-2 8 0 5.3 2 8 0',
  ],
  // horizon + vanishing edge + sun
  infinity: [
    'M6 22h30',
    'M36 22l6 6',
    'M6 28.5c2.6-1.8 5.2-1.8 7.8 0s5.2 1.8 7.8 0 5.2-1.8 7.8 0',
    'M36 28v7',
    'M39.5 31v4',
    'M33.5 12.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z',
  ],
  // house beside a pool
  villa: [
    'M6 23.5 15.5 15l9.5 8.5',
    'M8.5 21.5V34h14V21.5',
    'M13.5 34v-6h4v6',
    'M27 34h15',
    'M27 29h15v5',
    'M29.5 31.5c1.3-.9 2.7-.9 4 0s2.7.9 4 0',
  ],
  // sauna bucket, ladle and steam
  sauna: [
    'M12 22h18l-2 12.5H14L12 22Z',
    'M12.6 26.5h16.8',
    'M28.5 22 37 13.5',
    'M37 13.5a2.6 2.6 0 1 1 3.6 3.6 2.6 2.6 0 0 1-3.6-3.6Z',
    'M17 17c-1.4-1.6-1.4-3.4 0-5s1.4-3.4 0-5',
    'M23 17c-1.4-1.6-1.4-3.4 0-5s1.4-3.4 0-5',
  ],
  // hammam dome with skylights
  hammam: [
    'M9 34V25.5a15 15 0 0 1 30 0V34',
    'M6 34h36',
    'M24 10.5V6.5',
    'M21.5 7.5h5',
    'M18.5 21.5h.01',
    'M24 19h.01',
    'M29.5 21.5h.01',
    'M17 34v-4.5a7 7 0 0 1 14 0V34',
  ],
  // banya stove (kamenka) with stones and steam
  banya: [
    'M12 25h22v10H12z',
    'M16 25a2.6 2.6 0 0 1 5 0',
    'M21 25a2.6 2.6 0 0 1 5 0',
    'M26 25a2.6 2.6 0 0 1 5 0',
    'M16.5 30h5',
    'M34 29h4v6',
    'M22 19c-1.3-1.5-1.3-3 0-4.5s1.3-3 0-4.5',
    'M28 19c-1.3-1.5-1.3-3 0-4.5s1.3-3 0-4.5',
  ],
  // rising steam over a bench
  steam: [
    'M10 34h28',
    'M13 34v-5h22v5',
    'M17 24c-2-2-2-4 0-6s2-4 0-6',
    'M24 24c-2-2-2-4 0-6s2-4 0-6',
    'M31 24c-2-2-2-4 0-6s2-4 0-6',
  ],
  // water drop and leaf — spa / wellness
  spa: [
    'M24 7.5c5.5 7 9 12 9 16.5a9 9 0 0 1-18 0c0-4.5 3.5-9.5 9-16.5Z',
    'M24 33V21',
    'M24 26.5c2.6-.4 4.6-2.2 5-4.8-2.6.4-4.6 2.2-5 4.8Z',
  ],
  // dumbbell + lane
  fitness: [
    'M14 22.5h20',
    'M10 17v11',
    'M14 15v15',
    'M34 15v15',
    'M38 17v11',
    'M6 22.5h4',
    'M38 22.5h4',
  ],
}

export type CategoryIconKey = keyof typeof PATHS

export function CategoryIcon({ name, ...props }: { name: string } & SVGProps<SVGSVGElement>) {
  const paths = PATHS[name] ?? PATHS.pool
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
      <path d={WAVE} />
    </svg>
  )
}

export const categoryIconKeys = Object.keys(PATHS)
