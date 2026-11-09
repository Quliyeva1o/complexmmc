# Complex MMC — Korporativ sayt planı (v2)

> Status: PLAN. Kod hələ yazılmayıb. Açıq suallar — §10.
> v2 dəyişiklikləri: 3 dil, complexmmc domeni + turanprojects.az-dan köçmə, paket/rəy çıxarıldı, aqua palitra, rəqib SEO analizi, hero altında kateqoriya ikon zolağı.

## 0. Qəbul edilmiş qərarlar

| Mövzu | Qərar |
|---|---|
| Dillər | **AZ (əsas) + EN + RU**. EN/RU mətnləri turanprojects.az/en və /ru-dan |
| Domen | **complexmmc** (yeni). turanprojects.az bağlanır, bu sayta **301 yönləndirmə** olunur |
| Əlaqə məlumatları | turanprojects.az-dakı ilə eyni |
| Kalkulyator | Real smetalar gələndən sonra məntiq qurulacaq (§7) |
| Komanda | Hələlik nümunə (fake) məlumat — sonra siz əvəz edəcəksiniz. Bu müddətdə `/komanda` səhifəsi `noindex` olacaq |
| Paketlər | **Yoxdur** (bölmə və kolleksiya çıxarıldı) |
| Rəylər | Hələlik **yoxdur**. Kolleksiya admin-də hazır qalır, bölmə və səhifə söndürülüb. Real rəylər gələndə bir düymə ilə açılır |
| Loqo | Siz hazırlayırsınız. Hələlik mətn loqosu |
| Rənglər | Aqua palitra, **qlobal CSS dəyişənləri** (`var(--…)`) ilə — §5 |
| Prioritet | **SEO № 1**, sonra sürət/performans |
| Domen | **complexmmc.az** |
| Hostinq | Sonda, deploy mərhələsində seçiləcək. Kod istənilən Node hostinqində işləyəcək şəkildə yazılır |
| turanprojects.az | Domen 12+ ay saxlanılır, yalnız 301 yönləndirmə üçün (səbəb §2) |
| Məhsullar | Hələ köçürülmür — siz kataloq göndərəcəksiniz. Kolleksiya və səhifələr hazır qurulur, boş qalır |
| "Dizayn Et" / "Vizualizasiya" | Çıxarılır. `/create` və `/hovuz-vizualizasiyasi` → 301 `/qiymet-hesabla` |
| Müraciətlər | Gmail-ə (SMTP / Gmail App Password ilə) + admin paneldə saxlanılır |

---

## 1. Araşdırmanın nəticəsi

### 1.1 turanprojects.az — məzmun inventarı
Next.js sayt, 3 dil (AZ / `/en` / `/ru`). Mövzu: hovuz, SPA, türk/rus hamamı, sauna tikintisi + avadanlıq satışı.

| Bölmə | Məzmun | Say |
|---|---|---|
| Xidmət kartları | SPA avadanlıqları, SPA/Wellness tikintisi, Hovuz ətrafı elementlər, Örtüklər, Əlavə avadanlıqlar, Fontan/Şəlalə, Təmizlik texnologiyaları, İsitmə/Soyutma, Filtrasiya, Hovuz növləri | 10 |
| Xidmət SEO səhifələri | Türk hamamı, Rus hamamı, Sauna, Buxar otağı, SPA tikintisi, Fitnes zalı, Sauna qiymətləri, SPA layihələndirilməsi, Hovuz tikintisi, Villa hovuzu, Infinity hovuz, Hovuz qiymətləri, Qışlama, Daşma hovuz nədir, Skimmer hovuz nədir … | 17 |
| Xidmət əraziləri | Bilgəh, Novxanı, Badamdar, Buzovna, Mərdəkan, Lökbatan, Şüvəlan, Türkan, Nardaran, Zağulba, Pirşağı, Goradil, Saray, Fatmayı, Sea Breeze + "Bütün Bakı" | 15+1 |
| Layihələr | Crown SPA (6), My Class Yasamal (8), Makfit, Hyatt Regency, Bilgəh, Badamdar, Villa Badam, Goradil, Buzovna. Sahələr: yer, ölçü, müddət, iş növü | 21 |
| Referanslar | Hyatt Regency, My Class, Makfit, Crown Wellness Club | 4 |
| Tərəfdaş brendlər | AstralPool, Kalekim, Speck Pumpen, Hugo Lahme, Rosa Gres, Mayor Ceramica, Nurpool, Pimtaş | 8 |
| Məhsullar | AZN qiymətli kataloq; filtr: brend, mənşə, qiymət, kateqoriya | ~453 |
| Sertifikat | Rəsmi tikinti lisenziyası | 1 |
| Zəmanət | Konstruksiya / Hidroizolyasiya / İzolyasiya 12 il, İşçilik 1 il | — |
| Proses | 8 mərhələ, hər birinin müddəti; orta 4–8 həftə | 8 |
| FAQ | 6 sual (ana səhifə) | 6 |
| Əvvəl/Sonra | 5 cüt, sürükləmə slayderi | 5 |
| Əlaqə | 4 telefon, e-poçt, Instagram/TikTok, ünvan Novxanı, iş saatı, Google Maps, forma | — |

Hələ çəkilməyib (Mərhələ 2): 17 xidmət + 21 layihə detal mətni/şəkilləri, bloq, EN/RU mətnləri, zəmanət/hüquqi səhifələr, tam məhsul siyahısı.

### 1.2 Rəqiblərin SEO analizi
Baxılan saytlar: safi.construction, caspianconstruction.az, trustconstruction.az, insaat.az, aquatek.az, kolizeyconstruction.com.

| Sayt | Güclü tərəf | Zəif tərəf |
|---|---|---|
| **Aquatek** | Ən güclü xidmət klasteri (skimmer, daşma, SPA, türk hamamı ayrı səhifələr), 25 il, "5 il zəmanət" | AZN qiyməti yoxdur, FAQ yoxdur, zəmanətin nəyi əhatə etdiyi yazılmayıb, rəy yoxdur |
| **Safi** | 3 dil, 5 lisenziya şəkli, partnyorlar | ~300 söz, URL-lərdə timestamp (`-1690790840300`), FAQ/bloq yoxdur, qırıq telefon linkləri |
| **Caspian** | EN-də yaxşı xidmət səhifəsi + 5 FAQ | Google Sites — texniki SEO nəzarəti yoxdur; hovuz 5 xidmətdən biridir |
| **Insaat.az** | Yeganə **AZN qiymət cədvəli** (kiçik hovuz 3–5k, orta 5–9k, böyük 9–15k, izolyasiya 15–30 AZN/m², mozaika 20–45 AZN/m²) | Elan saytıdır, şirkət deyil; etibar siqnalı yoxdur |
| **Kolizey** | "hovuz tikintisi qiymet" sorğusunu hədəfləyir, 3 dil | Səhifədə əslində qiymət yoxdur, ~150 söz, qrammatik səhvlər |
| **Trust** | Böyük müştəri loqoları | Ümumi tikinti şirkəti, hovuz mətni zəif |

**Heç kimin yaxşı etmədiyi yerlər (bizim fürsətimiz):**
1. Şirkət saytında **şəffaf AZN qiymət səhifələri** (ölçüyə görə cədvəl, m² qiymətləri, nümunə hesablamalar 4×8 / 6×12 / 8×16).
2. **Sauna / hamam / SPA qiymət səhifələri** — heç kimdə yoxdur.
3. **Rayon səhifələri** unikal mətnlə (turanda 15 var — rəqiblərdə yoxdur).
4. Məhsul + layihə + xidmət arasında **daxili linklər**.
5. **FAQPage strukturlaşdırılmış datası** AZ və RU-da.
6. **Ətraflı layihə nümunələri** (yer, ölçü, müddət, iş növü, əvvəl/sonra) — rəqiblərdə yalnız başlıqsız şəkillər var.
7. **Konkret zəmanət səhifəsi** (12/12/12/1 il + əhatə + istisnalar) və lisenziya sübutu.
8. **Müqayisə bələdçiləri:** skimmer vs daşma, beton vs fiberglas, hamam vs sauna, sızma səbəbləri.

---

## 2. URL strategiyası — domen köçməsi

**Əsas qayda: köhnə URL-lər eyni qalır, yalnız domen dəyişir.** Domen və URL-i eyni vaxtda dəyişmək Google-da reytinq itkisi riskini artırır. turanprojects.az-ın indekslənmiş səhifələri (`/about`, `/services/...`, `/projects/...`, `/hovuz-tikintisi-bilgeh`, `/turk-hamami-tikintisi-baki` və s.) complexmmc-də **eyni yollarla** açılır.

- `turanprojects.az/*` → `complexmmc.az/*` — **səhifə-səhifə 301** (ana səhifəyə toplu yönləndirmə yox).
- turanprojects.az domeni **ən azı 12 ay** aktiv saxlanmalıdır (yönləndirmələr işləsin).
- Google Search Console-da **"Ünvan dəyişikliyi"** (Change of Address) aləti; köhnə sitemap da yeni domendə 1–2 ay saxlanılır.
- Yeni səhifələr (FAQ, qalereya, komanda, qiymət səhifələri, bələdçilər) turanın mövcud stilində slug alır: latın, kiçik hərf, tire ilə, ID və tarix yoxdur.
- Admin-də slug dəyişəndə köhnə URL-dən avtomatik 301 yaranır.

| Səhifə | AZ yol | EN / RU | Dizayn istinadı |
|---|---|---|---|
| Ana səhifə | `/` | `/en`, `/ru` | Pooluxe Homepage-3 + Homepage-1 |
| Haqqımızda (+sertifikatlar) | `/about` | `/en/about`, `/ru/about` | About Us |
| Xidmətlər | `/services` | ... | All Services 1 |
| Xidmət | `/services/{slug}` | ... | Pool Construction |
| **Kateqoriya (pillar) səhifələri** | `/hovuz-tikintisi`, `/sauna-tikintisi-baki`, `/turk-hamami-tikintisi-baki`, `/rus-hamami-tikintisi-baki`, `/spa-tikintisi-baki`, `/buxar-otagi-tikintisi` … (turandakı slug-lar) | EN: `/en/swimming-pool-construction-baku` …, RU: `/ru/stroitelstvo-basseynov-baku` … | Pool Construction (genişləndirilmiş) |
| Qiymət səhifələri | `/hovuz-qiymetleri`, `/sauna-qiymetleri` (mövcud), + `/hamam-tikintisi-qiymeti`, `/spa-tikintisi-qiymeti` (yeni) | ... | cədvəl + kalkulyator CTA |
| Rayon səhifələri | `/hovuz-tikintisi-{rayon}` | ... | xidmət şablonu |
| Layihələr / Layihə | `/projects`, `/projects/{slug}` | ... | Project Style 1 / Single |
| Məhsullar | `/products`, `/products/{kateqoriya}`, `/products/{kateqoriya}/{slug}` | ... | grid + filtr |
| Komanda | `/team` (`noindex` hələlik) | ... | Team |
| Kalkulyator | `/qiymet-hesabla` (+ köhnə `/create` → 301) | ... | Cost Estimator |
| Necə işləyirik | `/nece-isleyirik` | ... | How it works |
| Qalereya | `/qalereya` | ... | Gallery |
| FAQ | `/faq` | ... | FAQ |
| Bloq | `/blog`, `/blog/{slug}`, `/blog/kateqoriya/{slug}` | ... | Blog / Blog post |
| Zəmanət | `/zemanet` | ... | — |
| Əlaqə | `/contact` | ... | Contact |
| Hüquqi | `/gizlilik-siyaseti`, `/istifade-sertleri` | ... | — |

Son yol siyahısı Mərhələ 2-də turanın tam sitemap-ı çəkiləndən sonra dəqiqləşir.

---

## 3. Ana səhifə bölmələri (sıra admin-dən dəyişdirilir)

1. **Hero** — dəyişən fel sətirləri ("Layihələndiririk / Tikirik / Baxım edirik"), H1, alt mətn, 2 düymə (Qiymət hesabla / Layihələr), 3 etibar nişanı (Rəsmi lisenziya · 12 il zəmanət · 20+ il təcrübə), fon şəkli və ya video.
2. **🆕 Kateqoriya ikon zolağı** (hero-nun dərhal altında) — bax §3.1.
3. **Statistika zolağı** — sayğaclar (20+ il, layihə sayı, məmnuniyyət, lisenziya).
4. **Referanslarımız** — 4 obyekt, böyük şəkilli kartlar; slayder + hover-da şəkil zoom və məlumat açılması; altında brend loqoları sonsuz sürüşən zolaq (marquee).
5. **Layihələrimiz** — kateqoriya tabları + kart karuseli (yer, ölçü, müddət) → "Bütün layihələr".
6. **Haqqımızda qısa** — iki üst-üstə şəkil, "20+ il" nişanı, 3 bənd.
7. **Əvvəl/Sonra 1** — sürükləmə slayderi + 5 layihə miniatürü.
8. **Əvvəl/Sonra 2 → "Tam həllər"** — xidmət tabları (Hovuz / SPA / Hamam / Sauna / Filtrasiya / İsitmə): mətn + 4 bənd + şəkil.
9. **Zəmanət** — 12 / 12 / 12 / 1 il plitələri → `/zemanet`.
10. **Prosesimiz** — 8 mərhələ, üfüqi zaman xətti; scroll ilə dolan xətt.
11. **Məhsullar** — kateqoriya tabları + 8 kart.
12. **Any Question?** — FAQ akkordeonu + qısa forma / WhatsApp CTA.
13. **Bloq** — son 3 yazı.
14. **Əlaqə CTA** — telefonlar + forma.

~~Paketlər~~ və ~~Rəylər~~ çıxarıldı. Rəylər bloku kitabxanada qalır, admin-dən istənilən vaxt əlavə olunur.

### 3.1 Kategoriya ikon zolağı (yeni)
- **Elementlər (ilkin):** Hovuz · Infinity hovuz · Sauna · Türk hamamı · Rus hamamı · Buxar otağı · Duz otağı · SPA & Wellness · Cakuzi · Fontan & Şəlalə. Siyahı, sıra və say admin-dən idarə olunur.
- **Klik** → həmin kateqoriyanın pillar səhifəsi açılır (məs. Sauna → `/sauna-tikintisi-baki`). Bu səhifələr həm SEO-nun əsas giriş qapısıdır, həm də ana səhifədən güclü daxili link alır.
- **Dizayn (nümunədən fərqli):** eyni nazik xətli SVG ikon üslubu saxlanılır, amma boz-üstündə-boz yox:
  - hər element yumşaq aqua fonlu dairə/"su damlası" formalı kart içində;
  - hover-da ikonun xətti çəkilir (stroke-draw animasiyası), fon dalğa kimi aşağıdan dolur, başlıq altında kiçik "→ Ətraflı" çıxır;
  - mobildə üfüqi sürüşən sıra (snap-scroll), desktopda tam en.
- **İkonlar:** sizin üçün xüsusi çəkilmiş vahid üslublu SVG dəsti (inline, `currentColor` — palitradan rəng alır, əlavə yükləmə yoxdur). Admin-dən SVG yükləyib dəyişmək mümkündür.
- **Texniki:** `<nav aria-label>` + `<a>` linkləri (JS olmadan da işləyir), hər linkdə mənalı anchor mətni (məs. "Sauna tikintisi") — SEO üçün vacibdir.
- **Admin:** "Kateqoriyalar" kolleksiyasında `ikon (SVG)`, `qısa ad`, `hədəf səhifə`, `ana səhifədə göstər`, `sıra` sahələri.

---

## 4. Texnologiya seçimi

| Qat | Seçim | Niyə |
|---|---|---|
| Frontend | **Next.js 15 (App Router) + TypeScript** | Statik generasiya + ISR → çox sürətli, tam server render (SEO) |
| CMS / Admin | **Payload CMS 3** (Next.js-in içində) | Tam admin, blok-əsaslı səhifə qurucusu, 3 dil üçün sahələr, sürüklə-burax sıralama, qaralama/versiya, önizləmə |
| DB | **PostgreSQL** | Etibarlı, miqrasiyalar ilə genişlənən |
| Şəkillər | Payload Media + **sharp** (AVIF/WebP, çoxlu ölçü, fokus nöqtəsi), `next/image` | Sürət; alt mətn məcburi |
| Stil | **Tailwind CSS v4** — rənglər `@theme` vasitəsilə CSS dəyişənlərinə bağlı | §5 |
| Animasiya | CSS + **Motion** (yalnız lazım olan yerlərdə), IntersectionObserver ilə scroll-reveal; `prefers-reduced-motion` | Minimal JS |
| Slayder | **Embla Carousel** (~7 KB) | Yüngül, toxunma dəstəkli |
| Formalar | Payload Form Builder + SMTP e-poçt (+ istəyə görə Telegram) | Müraciətlər admin-də saxlanılır |
| Fontlar | Self-host (`next/font`), Azərbaycan hərflərini (ə, ğ, ı, ş) dəstəkləyən şrift | Xarici sorğu yoxdur, CLS yoxdur |

---

## 5. Rəng sistemi — aqua palitra (qlobal dəyişənlər)

**Konsepsiya:** su (aqua/firuzəyi) əsas rəngdir. Sauna/hamam üçün isti **qum/tik ağacı** aksenti əlavə olunur. Beləliklə həm hovuz, həm də SPA/sauna hissi verir. Tünd mavi-yaşıl başlıqlar premium görünüş yaradır.

Bütün rənglər **bir faylda** saxlanılır: `src/styles/tokens.css`. Layihənin hər yerində yalnız `var(--…)` və ya Tailwind sinifləri (`bg-primary`, `text-ink`) işlədilir. Palitranı dəyişmək üçün yalnız bu fayl redaktə olunur. İstəsəniz, admin-də "Tema" bölməsi də əlavə olunur: oradan dəyişən rənglər bu dəyişənləri üstələyir.

```css
:root {
  /* Aqua şkalası */
  --aqua-50:  #EEFBFC;
  --aqua-100: #D2F4F7;
  --aqua-200: #A8E8EF;
  --aqua-300: #6FD4E1;
  --aqua-400: #33B9CC;
  --aqua-500: #129CB1;   /* brend aqua — fonlar, ikonlar, illüstrasiya */
  --aqua-600: #0C7E91;   /* düymələr — ağ mətnlə AA kontrast */
  --aqua-700: #0E6575;
  --aqua-800: #11525F;
  --aqua-900: #12424D;
  --aqua-950: #082A32;   /* tünd bölmələr, footer */

  /* İsti aksent — sauna / hamam / ağac */
  --sand-50:  #FAF6F0;   /* açıq fon alternativi */
  --sand-200: #EADCC8;
  --teak-500: #B9814F;   /* aksent: nişanlar, kiçik vurğular */
  --teak-700: #8A5A33;

  /* Neytrallar */
  --ink:      #0F2A30;   /* əsas mətn */
  --muted:    #5A7176;   /* ikinci dərəcəli mətn */
  --line:     #DCE8EA;   /* xətlər */
  --surface:  #FFFFFF;
  --bg:       #F7FBFB;

  /* Semantik dəyişənlər — komponentlər YALNIZ bunları işlədir */
  --color-primary:        var(--aqua-600);
  --color-primary-hover:  var(--aqua-700);
  --color-primary-soft:   var(--aqua-50);
  --color-accent:         var(--teak-500);
  --color-heading:        var(--aqua-950);
  --color-text:           var(--ink);
  --color-text-muted:     var(--muted);
  --color-bg:             var(--bg);
  --color-surface:        var(--surface);
  --color-border:         var(--line);
  --color-dark-section:   var(--aqua-950);
  --gradient-water: linear-gradient(135deg, var(--aqua-400), var(--aqua-700));
}
```

**UI/UX qaydaları:**
- Mətn kontrastı WCAG AA (≥ 4.5:1): düymə fonu `--aqua-600` + ağ mətn; açıq aqua (`400–500`) yalnız böyük elementlərdə və dekorda işlənir, kiçik mətndə yox.
- Aksent (`--teak-500`) azca işlənir: nişanlar, sayğaclar, sauna/hamam kateqoriyaları.
- Tünd bölmələr (`--aqua-950`) ritm yaradır: Proses, Statistika, Footer.
- Mərhələ 3-də rənglər real komponentlərdə vizual nümunə səhifəsi ilə təsdiqə göstəriləcək.

---

## 6. Admin panel strukturu

### 6.1 Qlobal parametrlər
- **Sayt parametrləri:** şirkət adı, loqo (açıq/tünd), favicon, telefonlar, e-poçt, ünvan, xəritə, iş saatları, sosial şəbəkələr, WhatsApp, floating düymələr.
- **Header / Footer:** menyu ağacı (dropdown, sıra), CTA, footer sütunları, rayon linkləri.
- **SEO defaults:** başlıq şablonu, default OG şəkli, Organization/LocalBusiness məlumatı, Search Console/Yandex kodları, GA4/GTM.
- **Tema (opsional):** palitra dəyişənlərinin üstələnməsi.
- **Kalkulyator parametrləri:** §7.

### 6.2 Səhifələr — blok qurucusu
Hər səhifə: başlıq, slug, banner, **bloklar** (sürüklə-burax), SEO qrupu, status (qaralama/dərc), 3 dil.
Blok kitabxanası: Hero · Kateqoriya ikonları · Statistika · Referanslar · Layihələr karuseli · Haqqımızda-qısa · Əvvəl/Sonra · Xidmət tabları · Zəmanət · Proses · Məhsullar · FAQ · Bloq · Komanda · Sertifikatlar · Brend loqoları · Qalereya · Qiymət cədvəli · Mətn+şəkil · CTA zolağı · Əlaqə forması · Video · Zəngin mətn · Rəylər (söndürülüb).
Yeni blok = bir konfiqurasiya faylı + bir komponent.

### 6.3 Kolleksiyalar
Hamısında: `sıra` (sürüklə-burax), `status`, 3 dil üçün sahələr, **SEO qrupu**.

| Kolleksiya | Əsas sahələr |
|---|---|
| **Kateqoriyalar** (Hovuz, Sauna, Hamam, SPA…) | ad, slug, **ikon (SVG)**, qısa ad, pillar məzmun (bloklar), ana səhifədə göstər |
| **Xidmətlər** | ad, slug, kateqoriya, qısa təsvir, ikon, örtük şəkli, məzmun, 6 nömrəli xüsusiyyət, sayğac, FAQ, əlaqəli layihələr/məhsullar, qalereya |
| **Xidmət əraziləri** | rayon, slug, unikal mətn, xəritə, əlaqəli layihələr |
| **Qiymət səhifələri** | kateqoriya, qiymət cədvəli (ölçü → AZN diapazon), m² qiymətləri, nümunə hesablamalar, "qiymətə nə təsir edir", FAQ, yenilənmə tarixi |
| **Layihələr** | ad, slug, kateqoriya(lar), referans, yer, ölçü, müddət, il, iş növü, təsvir, məzmun, highlights, qalereya, əvvəl/sonra cütləri, seçilmiş |
| **Referanslar** | ad, tip, alt başlıq, şəkil, loqo, əlaqəli layihələr |
| **Brendlər** | ad, loqo, ölkə, təsvir |
| **Məhsullar** | ad, slug, kateqoriya, brend, mənşə, spesifikasiya cədvəli, variantlar (ölçü → qiymət), başlayan qiymət, şəkillər, PDF, stok |
| **Məhsul kateqoriyaları** | ad, slug, ana kateqoriya (iyerarxiya), şəkil |
| **Komanda** | ad, vəzifə, foto, bio, sosial (hələlik nümunə məlumat) |
| **Sertifikatlar** | ad, verən qurum, nömrə, tarix, şəkil, PDF |
| **Qalereya** | şəkil, başlıq, kateqoriya, əlaqəli layihə |
| **FAQ** | sual, cavab, kateqoriya, harada göstərilsin |
| **Rəylər** | ad, foto, obyekt, reytinq, mətn, tarix, mənbə (hazır, söndürülüb) |
| **Bloq yazıları / kateqoriyalar / teqlər** | başlıq, slug, müəllif, örtük, xülasə, məzmun, dərc tarixi, oxşar yazılar |
| **Müraciətlər** | forma növü, ad, telefon, mesaj, kalkulyator seçimləri, mənbə səhifə, UTM |
| **Yönləndirmələr** | köhnə URL → yeni URL, 301/302 (turanprojects xəritəsi buraya idxal olunur) |
| **Media** | fayl, **alt mətn (məcburi, 3 dil)**, başlıq, fokus nöqtəsi |
| **İstifadəçilər** | rol: Admin / Redaktor |

---

## 7. Qiymət kalkulyatoru

**Gözləyirik:** sizin göndərəcəyiniz smetalar. Onlardan aşağıdakı modeli quracağam (əmsalların hamısı admin-dən dəyişdirilir):

```
Qiymət = Sahə m² × Baza qiymət[obyekt/hovuz növü]
         × Dərinlik əmsalı × Üzlük əmsalı × Ərazi əmsalı
         + Σ Əlavələr (sabit və ya m²-ə görə)
Nəticə: "≈ X – Y AZN" (diapazon faizi admin-dən)
```

- Addımlı forma: obyekt növü → ölçülər → hovuz növü → üzlük → əlavələr → ərazi → əlaqə → nəticə. Nəticə ilə birlikdə müraciət admin-ə düşür.
- Admin-də "qiyməti göstər / yalnız müraciət al" açarı.
- **SEO bonusu:** eyni smetalardan qiymət səhifələrindəki (`/hovuz-qiymetleri` və s.) cədvəllər avtomatik qurulur. Rəqiblərdə olmayan əsas üstünlük budur.

Smetalar gələnə qədər kalkulyator "yalnız müraciət" rejimində işləyir.

---

## 8. SEO planı (prioritet № 1)

### 8.1 Texniki SEO
1. **Meta:** hər səhifə/element üçün title, description, OG şəkli, canonical, `noindex` açarı; boş olarsa şablondan dolur. Admin-də simvol sayğacı + Google nəticə önizləməsi.
2. **hreflang** az / en / ru / x-default; hər dildə ayrıca slug və meta.
3. **Sitemap:** `/sitemap.xml` indeks → səhifələr, kateqoriyalar, xidmətlər, rayonlar, layihələr, məhsullar, bloq; `lastmod` + şəkil sitemap. Dərcdən sonra avtomatik yenilənir.
4. **robots.txt:** admin, API, filtr parametrləri bağlı; sitemap linki.
5. **JSON-LD:** `Organization` + `LocalBusiness`/`GeneralContractor` (ünvan, telefon, saat, geo, sosial) · `WebSite` · `Service` (+`areaServed` rayon səhifələrində) · layihələr üçün `CreativeWork` · `Product` + `Offer` (AZN) · `BlogPosting` · `FAQPage` · `BreadcrumbList` · qiymət səhifələrində `Offer`/`PriceSpecification` · `Review` yalnız real rəylərlə.
6. **Başlıq iyerarxiyası:** səhifədə tək H1; bloklar H2 → H3 ardıcıllığı ilə. Komponent başlıq səviyyəsini kontekstdən alır.
7. **Şəkillər:** alt mətn məcburi (3 dil), AVIF/WebP, `srcset`, hero xaricində lazy-load, sabit ölçülər.
8. **Sürət hədəfi:** Lighthouse mobil 95+; LCP < 2.0 s, CLS < 0.05, INP < 200 ms. Statik generasiya + ISR, hero şəkli `priority`, minimal client JS, üçüncü tərəf skriptləri (GTM) gecikdirilmiş yüklənir.
9. **Domen köçməsi:** §2 (301 xəritəsi, Search Console Change of Address, köhnə domen 12+ ay).

### 8.2 Məzmun SEO — rəqibləri keçmək üçün
| Səhifə tipi | Hədəf sorğu | Həcm |
|---|---|---|
| **Pillar səhifələr** (hər kateqoriyaya bir) — ikon zolağından link alır | "hovuz tikintisi", "sauna tikintisi bakı", "türk hamamı tikintisi", "spa tikintisi bakı" | 1500–2000 söz: növlər, proses, qiymət xülasəsi, layihələr, zəmanət, FAQ |
| **Qiymət səhifələri** | "hovuz tikintisi qiyməti 2026", "sauna qiymətləri" | 800–1200 söz + AZN cədvəli + nümunələr + kalkulyator CTA |
| **Rayon səhifələri** (15) | "hovuz tikintisi bilgəh" … | 400–600 **unikal** söz + o rayondakı layihələr |
| **Bələdçi yazılar** (bloq) | "skimmer və daşma hovuz fərqi", "hovuz sızması səbəbləri", "hamam və sauna fərqi", "hovuz tikintisi neçə manatdır", "beton və fiberglas hovuz" | 800–1200 söz |
| **EN** | "swimming pool construction baku", "sauna construction baku" | pillar səhifələrin tərcüməsi |
| **RU** | "строительство бассейнов баку", "строительство бассейнов цена", "строительство сауны/хамама баку" | pillar + qiymət səhifələri |

- **Daxili linklər:** kateqoriya ↔ xidmət ↔ layihə ↔ rayon ↔ məhsul ↔ bloq; hər səhifədə avtomatik "Əlaqəli" bloku.
- **Etibar siqnalları:** lisenziya (skan), 12 illik zəmanət səhifəsi, adı çəkilən referanslar (Hyatt, My Class, Makfit, Crown), ətraflı layihə nümunələri.
- **Analitika:** GA4/GTM, Search Console, Yandex Webmaster, Google Business Profile-da yeni domen; formalar konversiya hadisəsi kimi izlənir.

---

## 9. İş mərhələləri

| # | Mərhələ | Nəticə |
|---|---|---|
| 0 | Plan təsdiqi | — |
| 1 | Layihə qurulması: Next.js + Payload + Postgres, 3 dil, kolleksiyalar, bloklar, rollar, `tokens.css` | Boş, işləyən admin |
| 2 | **Məzmun idxalı:** turanprojects.az-ın tam sitemap-ı, bütün səhifələr, 3 dil, şəkillər → DB; 301 xəritəsi | Məzmunla dolu admin |
| **2b** | **Məzmun gücləndirmə** (§9.1) — köhnə saytın zəif SEO məzmununu rəqibləri keçəcək səviyyəyə qaldırmaq | Admin-də yenilənmiş, dərcə hazır mətnlər |
| 3 | Dizayn sistemi: aqua tokenlər, tipoqrafiya, ikon dəsti, komponentlər, animasiyalar; ana səhifə konsepti | Stil bələdçisi (sizin təsdiqinizlə) |
| 4 | Ana səhifə (bütün bloklar, ikon zolağı daxil) | — |
| 5 | Kateqoriya/pillar səhifələri, Xidmətlər, Rayonlar, Layihələr, Məhsullar | — |
| 6 | Haqqımızda + sertifikatlar, Komanda (nümunə), Necə işləyirik, Qalereya, FAQ, Zəmanət | — |
| 7 | Bloq, Əlaqə, formalar, kalkulyator (smetalar gələndə tam rejim) | — |
| 8 | SEO qatı: sitemap, JSON-LD, hreflang, yönləndirmələr; Lighthouse auditi | Hesabat |
| **8b** | **Məhsul kataloqunun idxalı:** `2026 Qiymet kataloqu rev 01 01.04.2026.pdf`-dən məhsulların (ad, brend, kateqoriya, ölçü/variant, AZN qiymət, şəkil) çıxarılması → `products` / `product-categories` / `brands` kolleksiyalarına idxal skripti; nəticənin admin-də yoxlanması | Doldurulmuş kataloq |
| 9 | Deploy, domen, SSL, backup, 301-lərin işə salınması, Search Console köçməsi, admin təlimatı | Canlı sayt |

---

### 9.1 Mərhələ 2b — Məzmun gücləndirmə

**Səbəb:** turanprojects.az az trafik və az sifariş gətirirdi. Köçürülmüş məzmunun ölçülməsi (2026-11-09) bunu izah edir:

| Səhifə tipi | İndi (orta, AZ) | Hədəf | Problem |
|---|---|---|---|
| Kateqoriya (pillar) — 9 | ~356 söz | 1500–2000 söz | Rəqiblərdən qısa, ətraflı bölmələr yoxdur |
| Layihə — 21 | ~50 söz | 300–500 söz | "Zəif məzmun" — Google dəyər görmür |
| Rayon — 15 | ~150–240 söz, yalnız AZ | 400–600 unikal söz, 3 dil | EN/RU yoxdur, yerli detallar azdır |
| Qiymət səhifələri — 2 | qiymət yoxdur | AZN cədvəl + nümunə hesablamalar | "qiymət" sorğularında rəqabət edə bilmir |
| Meta description | 150–200 simvol | 140–155 simvol | Google kəsir |
| Infinity / Villa hovuzu | yalnız AZ | 3 dil | EN/RU səhifə yoxdur |

**İş sırası (prioritetə görə):**
1. **Meta title / description** — bütün səhifələrdə 3 dildə: əsas açar söz əvvəldə, title ≤ 60, description 140–155 simvol, CTA ilə.
2. **9 pillar səhifə** genişləndirilir: növlər, proses, materiallar, qiymətə təsir edən amillər, layihə nümunələri, zəmanət, 8–10 FAQ. Hədəf sorğular §8.2-dən (AZ + EN + RU).
3. **Qiymət səhifələri** (`/hovuz-qiymetleri`, `/sauna-qiymetleri` + hamam, SPA): sizin smetalardan AZN diapazon cədvəlləri, m² qiymətləri, 3 nümunə hesablama. *Smetalar gələndən sonra.*
4. **21 layihə**: hər birinə hekayə (tapşırıq → həll → nəticə), texniki detallar, istifadə olunan materiallar/brendlər, müddət; FAQ yoxdursa 2–3 sual.
5. **15 rayon səhifəsi**: yerli şərait (torpaq, dəniz havası, su), o ərazidəki layihələr, xidmət siyahısı; EN və RU versiyaları yazılır.
6. **Infinity / Villa hovuzu** üçün EN/RU səhifələr.
7. **Yeni bələdçi yazılar** (rəqib boşluqları, §1.2): skimmer vs daşma, beton vs fiberglas, hovuz sızması səbəbləri, hamam vs sauna, "hovuz tikintisi neçə manatdır".
8. **Daxili linklər**: hər pillar ↔ xidmət ↔ layihə ↔ rayon ↔ bloq; anchor mətnlər açar sözlü.

**Qaydalar:**
- Uydurma rəqəm, müştəri adı və ya rəy yazılmır. Bilinməyən faktlar (qiymət, il, layihə sayı) sizdən soruşulur və ya `[TƏSDİQ]` işarəsi ilə qaralama qalır.
- Mətnlər insan üçün yazılır, açar söz doldurulmur. Hər rayon səhifəsi digərlərindən fərqli olur.
- Hər dəyişiklik admin-də **qaralama** kimi saxlanılır — siz baxıb dərc edirsiniz.

**Sizdən lazım olanlar (işi sürətləndirir):**
- Smetalar (qiymət səhifələri və kalkulyator üçün).
- Google Search Console girişi (turanprojects.az) — hansı sorğuların artıq göründüyünü görmək üçün; yoxdursa, rəqib analizi əsasında davam edirik.
- Layihələr haqqında bildiyiniz əlavə faktlar (il, istifadə olunan avadanlıq brendləri, müştərinin tapşırığı), əgər varsa.

---

## 10. Açıq suallar və gözlənilən materiallar

- **Sizdən gözlənilir:** smetalar (kalkulyator + qiymət səhifələri), loqo, komanda məlumatları, Gmail ünvanı (+ App Password, deploy zamanı).
- **Alınıb (2026-11-09):** məhsul qiymət kataloqu PDF (`media/` qovluğunda) – Mərhələ 8b-də idxal olunacaq. Qeyd: `media/` Payload-un yükləmə qovluğudur və git-ə düşmür; kataloqu idxaldan əvvəl ayrıca `data/catalogs/` qovluğuna köçürəcəyik.
- **Kateqoriya ikon zolağı:** §3.1-dəki 10 elementlik siyahı ilə başlayıram; istənilən vaxt admin-dən dəyişir.
- **Hostinq:** deploy mərhələsində (tövsiyə: VPS — Node + Postgres + Nginx).
