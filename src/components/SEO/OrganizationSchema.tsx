import { Helmet } from 'react-helmet-async';

const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Sentorise",
    "url": "https://sentorise.lovable.app",
    "logo": "https://sentorise.lovable.app/og-image.png",
    "description": "European-quality LiFePO4 batteries with Bluetooth monitoring, smart BMS protection, and 5-year warranty for RV, vanlife, and off-grid solar systems.",
    "foundingDate": "2024",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "support@sentorise.com",
      "availableLanguage": ["English", "German"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "DE",
      "addressLocality": "Berlin"
    },
    "sameAs": [
      "https://www.instagram.com/sentorise",
      "https://www.youtube.com/@sentorise"
    ],
    "brand": {
      "@type": "Brand",
      "name": "Sentorise",
      "slogan": "Stay Powered. Stay Free."
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

export default OrganizationSchema;
