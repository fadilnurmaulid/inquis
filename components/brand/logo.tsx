/**
 * Logo INQUIS — huruf "I" yang tumbuh menjadi pohon.
 *
 * Anatominya sengaja dibuat terbaca dua arah:
 *   • Palang atas huruf "I"  → dua daun yang membentuk tajuk pohon.
 *   • Batang huruf "I"       → batang pohon.
 *   • Palang bawah huruf "I" → garis tanah.
 *   • Biji di bawah tanah    → titik awal setiap penyelidikan.
 *
 * Datar, tanpa gradien, tanpa bayangan. Dua varian:
 *   "warna" — untuk latar kertas terang.
 *   "mono"  — satu warna, untuk latar berwarna/gelap (dipakai di badge).
 */

interface LogoMarkProps {
  size?: number;
  className?: string;
  variant?: "warna" | "mono";
  /** Warna tunggal untuk variant="mono". */
  tone?: string;
  /** Sembunyikan dari pembaca layar bila wordmark tekstual sudah ada di sebelahnya. */
  decorative?: boolean;
}

export function LogoMark({
  size = 40,
  className,
  variant = "warna",
  tone = "#F7F8F2",
  decorative = false,
}: LogoMarkProps) {
  const mono = variant === "mono";

  const daunKiri = mono ? tone : "#3E8B54";
  const daunKanan = mono ? tone : "#2C6B3F";
  const daunTunas = mono ? tone : "#A8D8B4";
  const batang = mono ? tone : "#8C5A3C";
  const tanah = mono ? tone : "#41604D";
  const biji = mono ? tone : "#D9922E";
  const urat = mono ? "rgba(0,0,0,0.18)" : "rgba(247,248,242,0.55)";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : "INQUIS"}
      aria-hidden={decorative || undefined}
    >
      {/* Tajuk kiri — separuh palang atas huruf I */}
      <path d="M24 19C15.6 19 9.4 13.6 10.4 5.6C18.8 5.1 24 10.4 24 19Z" fill={daunKiri} />
      {/* Tajuk kanan */}
      <path d="M24 19C32.4 19 38.6 13.6 37.6 5.6C29.2 5.1 24 10.4 24 19Z" fill={daunKanan} />
      {/* Urat daun */}
      <path
        d="M23 17.6L12.6 7.4M25 17.6L35.4 7.4"
        stroke={urat}
        strokeWidth="1.3"
        strokeLinecap="round"
      />

      {/* Batang */}
      <rect x="21.7" y="16" width="4.6" height="22.5" rx="2.3" fill={batang} />

      {/* Tunas kecil di batang — pertumbuhan yang sedang berlangsung */}
      <path d="M26.4 29.6C26.4 25.4 29 22.6 33 22.6C33.4 26.8 30.6 29.6 26.4 29.6Z" fill={daunTunas} />

      {/* Garis tanah — palang bawah huruf I */}
      <rect x="11.5" y="37.4" width="25" height="4.4" rx="2.2" fill={tanah} />

      {/* Biji di bawah tanah */}
      <circle cx="24" cy="45.2" r="2" fill={biji} />
    </svg>
  );
}

interface LogoProps {
  /** Ukuran mark dalam px. */
  size?: number;
  className?: string;
  /** Tampilkan tulisan "INQUIS" di samping mark. */
  wordmark?: boolean;
  /** Baris kecil di bawah wordmark. */
  tagline?: string;
  variant?: "warna" | "mono";
  tone?: string;
}

export function Logo({
  size = 36,
  className,
  wordmark = true,
  tagline,
  variant = "warna",
  tone = "#F7F8F2",
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark size={size} variant={variant} tone={tone} decorative={wordmark} />
      {wordmark && (
        <span className="flex flex-col leading-none">
          <span
            className="font-display text-[1.35rem] font-extrabold tracking-tight"
            style={{ color: variant === "mono" ? tone : "#1E3326" }}
          >
            INQUIS
          </span>
          {tagline && (
            <span
              className="label-spesimen mt-1 text-[0.6rem]"
              style={{ color: variant === "mono" ? tone : "#7A8F80" }}
            >
              {tagline}
            </span>
          )}
        </span>
      )}
    </span>
  );
}
