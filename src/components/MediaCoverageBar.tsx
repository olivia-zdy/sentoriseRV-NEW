import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const mediaNames = [
  { name: "Börse", style: "font-serif font-black" },
  { name: "LE FIGARO", style: "font-serif font-bold tracking-wide" },
  { name: "NEOZONE", style: "font-sans font-black tracking-widest uppercase" },
  { name: "yahoo!", style: "font-sans font-bold italic text-purple-600 dark:text-purple-400" },
  { name: "NEWSBREAK", style: "font-sans font-black tracking-wider uppercase" },
  { name: "SBT Insight", style: "font-sans font-semibold tracking-wide" },
  { name: "tz", style: "font-serif font-black text-red-600 dark:text-red-400" },
];

const MediaCoverageBar = () => {
  const { t } = useTranslation();

  return (
    <section className="py-8 bg-muted/30 border-y border-border">
      <div className="container-custom">
        <p className="text-xs text-muted-foreground text-center mb-5 uppercase tracking-widest">
          {t('certifications.mediaBadge', 'Featured In')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {mediaNames.map((media) => (
            <span
              key={media.name}
              className={`${media.style} text-sm md:text-base text-foreground/40 select-none`}
            >
              {media.name}
            </span>
          ))}
        </div>
        <div className="text-center mt-5">
          <Link
            to="/certifications"
            className="text-xs text-primary hover:underline font-medium"
          >
            {t('certifications.viewAll', 'View all certifications & media →')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MediaCoverageBar;
