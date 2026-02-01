import { Helmet } from "react-helmet-async";

interface PageMetaProps {
  title: string;
  description: string;
  canonical?: string;
  noindex?: boolean;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
}

const PageMeta = ({ 
  title, 
  description,
  canonical,
  noindex = false,
  ogImage = "https://sentorise.lovable.app/og-image.png",
  ogType = "website"
}: PageMetaProps) => {
  const fullTitle = `${title} | Sentorise`;
  const siteUrl = "https://sentorise.lovable.app";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Canonical */}
      {canonical && <link rel="canonical" href={`${siteUrl}${canonical}`} />}
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      {canonical && <meta property="og:url" content={`${siteUrl}${canonical}`} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default PageMeta;
