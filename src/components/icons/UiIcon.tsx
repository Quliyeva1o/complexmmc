import type { SVGProps } from 'react'

/** Small interface icons (24×24, 1.75 stroke). Decorative only — every use has a text label. */
const PATHS: Record<string, string[]> = {
  phone: ['M5 4h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.1 6.1l1.4-2.3L20 15.5V19a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z'],
  chat: ['M20 11.5a8 8 0 0 1-11.7 7.1L4 20l1.4-4.3A8 8 0 1 1 20 11.5Z', 'M9 11.5h.01', 'M12.5 11.5h.01', 'M16 11.5h.01'],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h10'],
  close: ['M6 6l12 12', 'M18 6 6 18'],
  plus: ['M12 5v14', 'M5 12h14'],
  check: ['M5 12.5 10 17l9-10'],
  pin: ['M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z', 'M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z'],
  clock: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 7.5V12l3 2'],
  chevron: ['M9 6l6 6-6 6'],
  ruler: ['M3.5 15.5 15.5 3.5l5 5-12 12-5-5Z', 'M7 12l2 2', 'M10 9l2 2', 'M13 6l2 2'],
  calendar: ['M4 6.5h16V20H4z', 'M4 10.5h16', 'M8.5 4v4', 'M15.5 4v4'],
  arrowRight: ['M4 12h15', 'M13.5 6.5 19 12l-5.5 5.5'],
  compass: ['M12 3v3', 'M12 6a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z', 'M10.6 10.6 5 21', 'M13.4 10.6 19 21', 'M7.5 16.5h9'],
  gem: ['M6 4h12l3 5-9 11L3 9l3-5Z', 'M3 9h18', 'M9.5 4 12 9l2.5-5', 'M12 9v11'],
  drop: ['M12 3.5s6 6.4 6 10.5a6 6 0 0 1-12 0c0-4.1 6-10.5 6-10.5Z', 'M9 14.5a3 3 0 0 0 3 3'],
  gear: ['M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z', 'M12 2.5v3', 'M12 18.5v3', 'M2.5 12h3', 'M18.5 12h3', 'M5.3 5.3l2.1 2.1', 'M16.6 16.6l2.1 2.1', 'M5.3 18.7l2.1-2.1', 'M16.6 7.4l2.1-2.1'],
  leaf: ['M5 19c0-8 5-13 15-14-1 10-6 15-14 15', 'M5 19l7-7'],
  shield: ['M12 3 4.5 6v5.5c0 4.6 3.2 8.3 7.5 9.5 4.3-1.2 7.5-4.9 7.5-9.5V6L12 3Z', 'M8.5 12l2.5 2.5 4.5-5'],
}

export function UiIcon({ name, ...props }: { name: keyof typeof PATHS | string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      width="1em"
      height="1em"
      {...props}
    >
      {(PATHS[name] ?? []).map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}
