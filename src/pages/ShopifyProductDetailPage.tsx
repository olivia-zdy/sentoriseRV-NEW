import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductByHandle } from "@/lib/shopify";
import { useCartStore, ShopifyProduct } from "@/stores/cartStore";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  Loader2, 
  ArrowLeft, 
  Bluetooth, 
  Thermometer, 
  Shield, 
  Truck,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

const ShopifyProductDetailPage = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchProductByHandle(handle);
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setIsLoading(false);
      }
    };
    loadProduct();
  }, [handle]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container-custom py-20">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">Loading product...</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container-custom py-20">
          <div className="text-center py-20">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <p className="text-destructive mb-4">{error || 'Product not found'}</p>
            <Button asChild variant="outline">
              <Link to="/products">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const currencyCode = product.priceRange.minVariantPrice.currencyCode;
  const image = product.images?.edges?.[0]?.node;
  const variant = product.variants?.edges?.[0]?.node;

  const hasBluetooth = product.title.toLowerCase().includes('bluetooth') || 
                       product.description?.toLowerCase().includes('bluetooth');
  const hasHeating = product.title.toLowerCase().includes('heated') || 
                     product.description?.toLowerCase().includes('self-heating');

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currencyCode,
    }).format(amount);
  };

  const handleAddToCart = async () => {
    if (!variant) return;
    
    setIsAdding(true);
    try {
      const shopifyProduct: ShopifyProduct = { node: product };
      await addItem({
        product: shopifyProduct,
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        quantity,
        selectedOptions: variant.selectedOptions || []
      });
      toast.success("Added to cart", {
        description: `${quantity}x ${product.title}`,
      });
    } catch (error) {
      toast.error("Failed to add to cart");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PageMeta 
        title={product.title}
        description={product.description?.slice(0, 155) || `${product.title} - Sentorise LiFePO₄ Battery`}
      />
      <Header />
      
      <main className="container-custom py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Home</Link></li>
            <li>/</li>
            <li><Link to="/products" className="hover:text-foreground">Products</Link></li>
            <li>/</li>
            <li className="text-foreground">{product.title}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square bg-muted/30 rounded-2xl overflow-hidden border p-8">
              {image && (
                <img 
                  src={image.url} 
                  alt={image.altText || product.title}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            
            {/* Feature Badges */}
            <div className="absolute top-6 left-6 flex flex-col gap-2">
              {hasBluetooth && (
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  <Bluetooth className="w-4 h-4 mr-2" />
                  Bluetooth Monitoring
                </Badge>
              )}
              {hasHeating && (
                <Badge className="bg-orange-500/90 text-white text-sm px-3 py-1">
                  <Thermometer className="w-4 h-4 mr-2" />
                  Self-Heating
                </Badge>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {product.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="py-4 border-y">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary">
                  {formatPrice(price)}
                </span>
                <span className="text-sm text-muted-foreground">incl. VAT</span>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Quantity:</label>
                <div className="flex items-center border rounded-lg">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3"
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3"
                  >
                    +
                  </Button>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full text-lg py-6"
                onClick={handleAddToCart}
                disabled={isAdding || !variant?.availableForSale}
              >
                {isAdding ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : (
                  <ShoppingCart className="w-5 h-5 mr-2" />
                )}
                Add to Cart — {formatPrice(price * quantity)}
              </Button>
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                <Shield className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-sm">5-Year Warranty</p>
                  <p className="text-xs text-muted-foreground">Full coverage</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                <Truck className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Free EU Shipping</p>
                  <p className="text-xs text-muted-foreground">2-5 business days</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-sm">4000+ Cycles</p>
                  <p className="text-xs text-muted-foreground">Long lifespan</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-sm">-20°C to 60°C</p>
                  <p className="text-xs text-muted-foreground">Operating range</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShopifyProductDetailPage;
