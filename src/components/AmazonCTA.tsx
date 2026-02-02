import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExternalLink, ChevronDown, ShoppingBag } from "lucide-react";

interface AmazonStore {
  country: string;
  flag: string;
  domain: string;
  url: string;
}

// Amazon store links - update with actual product ASINs
const amazonStores: AmazonStore[] = [
  { 
    country: "Germany", 
    flag: "🇩🇪", 
    domain: "amazon.de",
    url: "https://www.amazon.de/dp/B0XXXXXXXX" // Replace with actual ASIN
  },
  { 
    country: "France", 
    flag: "🇫🇷", 
    domain: "amazon.fr",
    url: "https://www.amazon.fr/dp/B0XXXXXXXX"
  },
  { 
    country: "UK", 
    flag: "🇬🇧", 
    domain: "amazon.co.uk",
    url: "https://www.amazon.co.uk/dp/B0XXXXXXXX"
  },
  { 
    country: "Italy", 
    flag: "🇮🇹", 
    domain: "amazon.it",
    url: "https://www.amazon.it/dp/B0XXXXXXXX"
  },
  { 
    country: "Spain", 
    flag: "🇪🇸", 
    domain: "amazon.es",
    url: "https://www.amazon.es/dp/B0XXXXXXXX"
  },
];

interface AmazonCTAProps {
  variant?: "default" | "hero" | "inline" | "prominent";
  productAsin?: string;
  className?: string;
  showCountrySelector?: boolean;
}

const AmazonCTA = ({ 
  variant = "default", 
  productAsin,
  className = "",
  showCountrySelector = true 
}: AmazonCTAProps) => {
  // Build URLs with product ASIN if provided
  const getStoreUrl = (store: AmazonStore) => {
    if (productAsin) {
      return store.url.replace("B0XXXXXXXX", productAsin);
    }
    // Default to brand store page
    return `https://www.${store.domain}/stores/Sentorise`;
  };

  const defaultStore = amazonStores[0]; // Germany as default for EU

  if (variant === "hero") {
    return (
      <div className={`flex flex-col sm:flex-row items-center gap-3 ${className}`}>
        <Button 
          size="lg" 
          className="group bg-[#FF9900] hover:bg-[#e88a00] text-black font-bold px-6"
          asChild
        >
          <a href={getStoreUrl(defaultStore)} target="_blank" rel="noopener noreferrer">
            <ShoppingBag className="w-5 h-5 mr-2" />
            Buy on Amazon
            <ExternalLink className="w-4 h-4 ml-2 opacity-70" />
          </a>
        </Button>
        
        {showCountrySelector && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                {defaultStore.flag} DE
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {amazonStores.map((store) => (
                <DropdownMenuItem key={store.domain} asChild>
                  <a 
                    href={getStoreUrl(store)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <span>{store.flag}</span>
                    <span>{store.country}</span>
                    <span className="text-xs text-muted-foreground ml-auto">{store.domain}</span>
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    );
  }

  if (variant === "prominent") {
    return (
      <div className={`bg-gradient-to-r from-[#232F3E] to-[#37475A] rounded-xl p-6 ${className}`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-white font-semibold text-lg mb-1">
              Ready to buy?
            </p>
            <p className="text-white/70 text-sm">
              Available on Amazon with Prime delivery in DE, FR, UK, IT, ES
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  size="lg"
                  className="bg-[#FF9900] hover:bg-[#e88a00] text-black font-bold"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Buy on Amazon
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {amazonStores.map((store) => (
                  <DropdownMenuItem key={store.domain} asChild>
                    <a 
                      href={getStoreUrl(store)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <span>{store.flag}</span>
                      <span>{store.country}</span>
                      <ExternalLink className="w-3 h-3 ml-auto text-muted-foreground" />
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4 pt-4 border-t border-white/10">
          <span className="text-xs text-white/60 flex items-center gap-1">
            ✓ Prime Eligible
          </span>
          <span className="text-xs text-white/60 flex items-center gap-1">
            ✓ Fast EU Delivery
          </span>
          <span className="text-xs text-white/60 flex items-center gap-1">
            ✓ Easy Returns
          </span>
        </div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <a 
        href={getStoreUrl(defaultStore)} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 text-[#FF9900] hover:text-[#e88a00] font-medium ${className}`}
      >
        <ShoppingBag className="w-4 h-4" />
        Buy on Amazon
        <ExternalLink className="w-3 h-3" />
      </a>
    );
  }

  // Default variant
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline"
          className={`border-[#FF9900] text-[#FF9900] hover:bg-[#FF9900] hover:text-black ${className}`}
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          Buy on Amazon
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {amazonStores.map((store) => (
          <DropdownMenuItem key={store.domain} asChild>
            <a 
              href={getStoreUrl(store)} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <span>{store.flag}</span>
              <span>{store.country}</span>
              <ExternalLink className="w-3 h-3 ml-auto text-muted-foreground" />
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AmazonCTA;
