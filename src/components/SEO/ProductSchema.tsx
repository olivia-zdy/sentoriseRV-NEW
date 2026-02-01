import { Helmet } from 'react-helmet-async';

interface ProductSchemaProps {
  name: string;
  description: string;
  image: string;
  sku: string;
  brand?: string;
  price?: number;
  salePrice?: number;
  currency?: string;
  inStock?: boolean;
  url?: string;
  category?: string;
  weight?: string;
  dimensions?: string;
}

const ProductSchema = ({
  name,
  description,
  image,
  sku,
  brand = "Sentorise",
  price,
  salePrice,
  currency = "EUR",
  inStock = true,
  url,
  category,
  weight,
  dimensions,
}: ProductSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "image": image.startsWith('http') ? image : `https://sentorise.lovable.app${image}`,
    "sku": sku,
    "mpn": sku,
    "brand": {
      "@type": "Brand",
      "name": brand
    },
    ...(category && {
      "category": category
    }),
    ...(weight && {
      "weight": {
        "@type": "QuantitativeValue",
        "value": parseFloat(weight),
        "unitCode": "KGM"
      }
    }),
    ...(price && {
      "offers": {
        "@type": "Offer",
        "url": url || `https://sentorise.lovable.app/product/${sku.toLowerCase()}`,
        "priceCurrency": currency,
        "price": salePrice || price,
        ...(salePrice && {
          "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }),
        "availability": inStock 
          ? "https://schema.org/InStock" 
          : "https://schema.org/OutOfStock",
        "seller": {
          "@type": "Organization",
          "name": "Sentorise"
        },
        "shippingDetails": {
          "@type": "OfferShippingDetails",
          "shippingDestination": {
            "@type": "DefinedRegion",
            "addressCountry": ["DE", "AT", "CH", "NL", "BE", "FR"]
          },
          "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "businessDays": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
            },
            "handlingTime": {
              "@type": "QuantitativeValue",
              "minValue": 1,
              "maxValue": 2,
              "unitCode": "DAY"
            },
            "transitTime": {
              "@type": "QuantitativeValue",
              "minValue": 2,
              "maxValue": 5,
              "unitCode": "DAY"
            }
          }
        }
      }
    }),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "47",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "RV Enthusiast"
      },
      "reviewBody": "Excellent battery for my camper van. Works great in cold weather and the Bluetooth monitoring is very useful."
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Sentorise",
      "url": "https://sentorise.lovable.app"
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Chemistry",
        "value": "LiFePO4 (Lithium Iron Phosphate)"
      },
      {
        "@type": "PropertyValue",
        "name": "Warranty",
        "value": "5 years"
      },
      {
        "@type": "PropertyValue",
        "name": "Cycle Life",
        "value": "4000+ cycles"
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default ProductSchema;
