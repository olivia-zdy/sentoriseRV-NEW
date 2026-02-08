import { Helmet } from 'react-helmet-async';

interface ArticleSchemaProps {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  image?: string;
  url: string;
}

const ArticleSchema = ({ title, description, author, datePublished, image, url }: ArticleSchemaProps) => {
  const siteUrl = "https://sentorise.lovable.app";
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Sentorise",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/og-image.png`
      }
    },
    "datePublished": datePublished,
    "dateModified": datePublished,
    ...(image && { "image": image }),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}${url}`
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default ArticleSchema;
