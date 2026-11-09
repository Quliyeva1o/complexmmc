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
