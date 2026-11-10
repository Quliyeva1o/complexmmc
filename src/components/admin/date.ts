const MONTHS = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avqust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr']

/** "10 noyabr, 11:21" in Baku time — browsers have no Azerbaijani month names in Intl. */
export function bakuDate(iso: string, withYear = false) {
  const d = new Date(new Date(iso).getTime() + 4 * 3600e3) // Asia/Baku = UTC+4, no DST
  const hh = String(d.getUTCHours()).padStart(2, '0')
  const mm = String(d.getUTCMinutes()).padStart(2, '0')
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}${withYear ? ' ' + d.getUTCFullYear() : ''}, ${hh}:${mm}`
}
