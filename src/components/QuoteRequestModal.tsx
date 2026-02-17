import { useState } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Send } from "lucide-react";

const quoteSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().max(50).optional(),
  company: z.string().trim().max(200).optional(),
  quantity: z.number().min(1, "Quantity must be at least 1").max(10000),
  message: z.string().trim().max(2000).optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

interface QuoteRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId: string;
  productName: string;
}

const QuoteRequestModal = ({
  open,
  onOpenChange,
  productId,
  productName,
}: QuoteRequestModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<QuoteFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    quantity: 1,
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = quoteSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof QuoteFormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof QuoteFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("quote_requests").insert([
        {
          product_id: productId,
          product_name: productName,
          name: result.data.name,
          email: result.data.email,
          phone: result.data.phone || null,
          company: result.data.company || null,
          quantity: result.data.quantity,
          message: result.data.message || null,
        },
      ]);

      if (error) throw error;

      toast.success("Quote request submitted! We'll contact you within 24 hours.");
      onOpenChange(false);
      setFormData({ name: "", email: "", phone: "", company: "", quantity: 1, message: "" });
    } catch (error) {
      console.error("Quote request error:", error);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Request a Quote</DialogTitle>
          <DialogDescription>
            Get a personalized quote for <strong>{productName}</strong>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Input
                placeholder="Your Name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              placeholder="Phone (optional)"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <Input
              placeholder="Company (optional)"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
          </div>

          <div>
            <Input
              type="number"
              min={1}
              placeholder="Quantity"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
              className={errors.quantity ? "border-destructive" : ""}
            />
            {errors.quantity && <p className="text-xs text-destructive mt-1">{errors.quantity}</p>}
          </div>

          <Textarea
            placeholder="Additional requirements or questions (optional)"
            rows={3}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Request
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteRequestModal;
