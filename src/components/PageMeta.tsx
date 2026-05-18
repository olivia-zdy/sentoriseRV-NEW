import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

interface PageMetaProps {
  title: string;
  description: string;
  canonical?: string;
  noindex?: boolean;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
}

const SITE_URL = "https://sentorise.lovable.app";
const SUPPORTED_LANGS = ["en", "de", "fr", "zh"] as const;

const PageMeta = ({
  title,
  description,
  canonical,
  noindex = false,
  ogImage = "https://sentorise.lovable.app/og-image.png",
  ogType = "website",
}: PageMetaProps) => {
  const { i18n } = useTranslation();
  const lang = (i18n.language || "en").toLowerCase().split("-")[0];
  const fullTitle = `${title} | Sentorise`;

  const hreflangLinks = canonical
    ? [
        ...SUPPORTED_LANGS.map((l) => ({ lang: l, href: `${SITE_URL}${canonical}` })),
        { lang: "x-default", href: `${SITE_URL}${canonical}` },
      ]
    : [];

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta httpEquiv="content-language" content={lang} />

      {canonical && <link rel="canonical" href={`${SITE_URL}${canonical}`} />}

      {hreflangLinks.map(({ lang: l, href }) => (
        <link key={l} rel="alternate" hrefLang={l} href={href} />
      ))}

      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={lang} />
      {canonical && <meta property="og:url" content={`${SITE_URL}${canonical}`} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default PageMeta;
