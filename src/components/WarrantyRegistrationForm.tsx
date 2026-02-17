import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, CheckCircle2, Shield, Calendar } from "lucide-react";
import { toast } from "sonner";

const warrantySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  product_name: z.string().min(1, "Please select a product"),
  serial_number: z.string().optional(),
  purchase_date: z.string().min(1, "Purchase date is required"),
  purchase_location: z.string().optional(),
  order_number: z.string().optional(),
  street_address: z.string().optional(),
  city: z.string().optional(),
  postal_code: z.string().optional(),
  country: z.string().default("Germany"),
});

type WarrantyFormData = z.infer<typeof warrantySchema>;

const products = [
  { value: "lite-6ah", label: "Lite 12V 6Ah Ultra-Compact" },
  { value: "lite-50ah", label: "Lite 12V 50Ah Bluetooth" },
  { value: "core-100ah-std", label: "Core 12V 100Ah Standard" },
  { value: "core-100ah-mini", label: "Core 12V 100Ah MINI Compact" },
  { value: "core-100ah-din", label: "Core 12V 100Ah DIN H8" },
  { value: "plus-200ah-heated", label: "Plus 12V 200Ah Heated" },
];

const countries = [
  "Germany", "Austria", "Switzerland", "Netherlands", "Belgium", 
  "France", "Italy", "Spain", "Poland", "Czech Republic",
  "Denmark", "Sweden", "Norway", "Finland", "United Kingdom", "Other"
];

interface WarrantyRegistrationFormProps {
  onSuccess?: () => void;
}

const WarrantyRegistrationForm = ({ onSuccess }: WarrantyRegistrationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [warrantyEndDate, setWarrantyEndDate] = useState<string | null>(null);
  const formRef = useState<HTMLFormElement | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<WarrantyFormData>({
    resolver: zodResolver(warrantySchema),
    defaultValues: {
      country: "Germany",
    },
  });

  // Auto-scroll to first validation error
  const onError = () => {
    toast.error("Please fill in all required fields before submitting.");
    setTimeout(() => {
      const firstError = document.querySelector('.text-destructive');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const selectedProduct = watch("product_name");
  const purchaseDate = watch("purchase_date");

  const onSubmit = async (data: WarrantyFormData) => {
    setIsSubmitting(true);
    try {
      const productLabel = products.find(p => p.value === data.product_name)?.label || data.product_name;
      
      const { error } = await supabase
        .from("warranty_registrations")
        .insert({
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          product_name: productLabel,
          product_sku: data.product_name,
          serial_number: data.serial_number || null,
          purchase_date: data.purchase_date,
          purchase_location: data.purchase_location || null,
          order_number: data.order_number || null,
          street_address: data.street_address || null,
          city: data.city || null,
          postal_code: data.postal_code || null,
          country: data.country,
        });

      if (error) throw error;

      // Calculate warranty end date for display
      const endDate = new Date(data.purchase_date);
      endDate.setFullYear(endDate.getFullYear() + 5);
      const warrantyEndDateStr = endDate.toISOString().split('T')[0];
      
      setWarrantyEndDate(endDate.toLocaleDateString('de-DE', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }));

      // Send confirmation email
      try {
        const emailResponse = await supabase.functions.invoke('send-warranty-confirmation', {
          body: {
            name: data.name,
            email: data.email,
            product_name: productLabel,
            purchase_date: data.purchase_date,
            warranty_end_date: warrantyEndDateStr,
            serial_number: data.serial_number || undefined,
            order_number: data.order_number || undefined,
          }
        });
        
        if (emailResponse.error) {
          console.error("Email sending error:", emailResponse.error);
          // Don't fail the whole registration if email fails
        } else {
          console.log("Confirmation email sent successfully");
        }
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
        // Continue anyway - registration was successful
      }

      setIsSuccess(true);
      toast.success("Warranty registered successfully! Confirmation email sent.");
      onSuccess?.();
    } catch (error) {
      console.error("Warranty registration error:", error);
      toast.error("Failed to register warranty. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12 space-y-6">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Warranty Registered!
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Your 5-year warranty has been successfully registered. 
            You will receive a confirmation email shortly.
          </p>
        </div>
        {warrantyEndDate && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
            <Calendar className="w-5 h-5 text-primary" />
            <span className="font-medium">
              Coverage until: {warrantyEndDate}
            </span>
          </div>
        )}
        <Button 
          variant="outline" 
          onClick={() => {
            setIsSuccess(false);
            reset();
          }}
        >
          Register Another Product
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-8">
      {/* Product Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Product Information
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="product_name">Product *</Label>
            <Select 
              value={selectedProduct} 
              onValueChange={(value) => setValue("product_name", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your battery" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.value} value={product.value}>
                    {product.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.product_name && (
              <p className="text-sm text-destructive">{errors.product_name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="serial_number">Serial Number (optional)</Label>
            <Input
              id="serial_number"
              placeholder="e.g., SN-2024-XXXX"
              {...register("serial_number")}
            />
          </div>
        </div>
      </div>

      {/* Purchase Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Purchase Details</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="purchase_date">Purchase Date *</Label>
            <Input
              id="purchase_date"
              type="date"
              max={new Date().toISOString().split('T')[0]}
              {...register("purchase_date")}
            />
            {errors.purchase_date && (
              <p className="text-sm text-destructive">{errors.purchase_date.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="order_number">Order Number (optional)</Label>
            <Input
              id="order_number"
              placeholder="e.g., ORD-12345"
              {...register("order_number")}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="purchase_location">Where did you purchase? (optional)</Label>
            <Input
              id="purchase_location"
              placeholder="e.g., Amazon.de, sentorise.com, Local dealer"
              {...register("purchase_location")}
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Contact Information</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              placeholder="Max Mustermann"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="max@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+49 123 456789"
              {...register("phone")}
            />
          </div>
        </div>
      </div>

      {/* Address (for warranty claims) */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          Shipping Address 
          <span className="text-sm font-normal text-muted-foreground ml-2">
            (for potential warranty replacements)
          </span>
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="street_address">Street Address</Label>
            <Input
              id="street_address"
              placeholder="Musterstraße 123"
              {...register("street_address")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              placeholder="Berlin"
              {...register("city")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="postal_code">Postal Code</Label>
            <Input
              id="postal_code"
              placeholder="10115"
              {...register("postal_code")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select 
              value={watch("country")} 
              onValueChange={(value) => setValue("country", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="pt-4">
        <Button 
          type="submit" 
          size="lg" 
          className="w-full md:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Registering...
            </>
          ) : (
            <>
              <Shield className="w-4 h-4 mr-2" />
              Register 5-Year Warranty
            </>
          )}
        </Button>
      </div>

      {/* Info Note */}
      <p className="text-sm text-muted-foreground">
        * Required fields. Your data will be used solely for warranty purposes 
        and stored in accordance with GDPR regulations.
      </p>
    </form>
  );
};

export default WarrantyRegistrationForm;
