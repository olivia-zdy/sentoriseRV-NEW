import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { products } from "@/data/products";

export const NONE_PRODUCT_SENTINEL = "__none__";

/**
 * Normalize a Product select value coming from the UI into the value we
 * persist. The Radix Select requires non-empty `value` props on items, so we
 * use a sentinel for "no product"; the backend stores an empty string / null.
 */
export function normalizeProductId(value: string | null | undefined): string {
  if (!value || value === NONE_PRODUCT_SENTINEL) return "";
  return value;
}

interface ProductSelectProps {
  value: string; // empty string means "no product"
  onChange: (productId: string) => void;
  placeholder?: string;
  /** Render a small status hint below the select. Defaults to true. */
  showStatus?: boolean;
  id?: string;
}

export function ProductSelect({
  value,
  onChange,
  placeholder = "Select product",
  showStatus = true,
  id,
}: ProductSelectProps) {
  const selectValue = value === "" ? NONE_PRODUCT_SENTINEL : value;
  const selected = products.find((p) => p.id === value);

  const status =
    value === ""
      ? "No product linked to this feedback."
      : selected
        ? `Linked to ${selected.name}.`
        : `Linked to product ${value}.`;

  return (
    <div className="space-y-1.5">
      <Select
        value={selectValue}
        onValueChange={(v) => onChange(normalizeProductId(v))}
      >
        <SelectTrigger id={id} aria-label="Product">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={NONE_PRODUCT_SENTINEL}>No product</SelectItem>
          {products.map((p) => (
            <SelectItem key={p.id} value={p.id}>
              {p.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {showStatus && (
        <p
          role="status"
          aria-live="polite"
          className="text-xs text-muted-foreground"
          data-testid="product-select-status"
        >
          {status}
        </p>
      )}
    </div>
  );
}
