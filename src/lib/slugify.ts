/**
 * Slug generator: AZ + RU transliteration -> latin, lower-case, hyphenated.
 * "Türk hamamı tikintisi" -> "turk-hamami-tikintisi"
 * "Строительство бассейнов" -> "stroitelstvo-basseynov"
 */
const AZ: Record<string, string> = {
  ə: 'e', ı: 'i', i̇: 'i', ş: 's', ç: 'c', ğ: 'g', ö: 'o', ü: 'u',
}

const RU: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'zh', з: 'z', и: 'i',
  й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't',
  у: 'u', ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch', ъ: '', ы: 'y',
  ь: '', э: 'e', ю: 'yu', я: 'ya',
}

export function slugify(input: string): string {
  return input
    .toLocaleLowerCase('az')
    .split('')
    .map((ch) => AZ[ch] ?? RU[ch] ?? ch)
    .join('')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
}
