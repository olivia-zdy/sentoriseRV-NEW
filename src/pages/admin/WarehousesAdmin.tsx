import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus, Pencil, Trash2, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "./components/AdminLayout";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Warehouse } from "@/hooks/useLocalWarehouse";

interface WarehouseForm {
  id?: string;
  code: string;
  display_name: string;
  country_codes: string; // comma separated in form
  shipping_copy_en: string;
  shipping_copy_de: string;
  shipping_copy_fr: string;
  shipping_copy_zh: string;
  is_default: boolean;
  sort_order: number;
  active: boolean;
}

const emptyForm: WarehouseForm = {
  code: "",
  display_name: "",
  country_codes: "",
  shipping_copy_en: "",
  shipping_copy_de: "",
  shipping_copy_fr: "",
  shipping_copy_zh: "",
  is_default: false,
  sort_order: 0,
  active: true,
};

export default function WarehousesAdmin() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<WarehouseForm>(emptyForm);

  const { data: warehouses, isLoading } = useQuery({
    queryKey: ["warehouses-admin"],
    queryFn: async (): Promise<Warehouse[]> => {
      const { data, error } = await supabase
        .from("warehouses")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Warehouse[];
    },
  });

  const upsert = useMutation({
    mutationFn: async (f: WarehouseForm) => {
      const payload = {
        code: f.code.trim().toUpperCase(),
        display_name: f.display_name.trim(),
        country_codes: f.country_codes
          .split(",")
          .map((c) => c.trim().toUpperCase())
          .filter(Boolean),
        shipping_copy_en: f.shipping_copy_en,
        shipping_copy_de: f.shipping_copy_de,
        shipping_copy_fr: f.shipping_copy_fr,
        shipping_copy_zh: f.shipping_copy_zh,
        is_default: f.is_default,
        sort_order: Number(f.sort_order) || 0,
        active: f.active,
      };
      if (f.id) {
        const { error } = await supabase
          .from("warehouses")
          .update(payload)
          .eq("id", f.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("warehouses").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["warehouses-admin"] });
      qc.invalidateQueries({ queryKey: ["warehouses-active"] });
      toast({ title: "Saved", description: "Warehouse updated." });
      setOpen(false);
      setForm(emptyForm);
    },
    onError: (e: any) =>
      toast({
        title: "Error",
        description: e?.message ?? "Failed to save",
        variant: "destructive",
      }),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("warehouses").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["warehouses-admin"] });
      qc.invalidateQueries({ queryKey: ["warehouses-active"] });
      toast({ title: "Deleted" });
    },
    onError: (e: any) =>
      toast({
        title: "Error",
        description: e?.message ?? "Failed to delete (admin only)",
        variant: "destructive",
      }),
  });

  const openCreate = () => {
    setForm(emptyForm);
    setOpen(true);
  };

  const openEdit = (w: Warehouse) => {
    setForm({
      id: w.id,
      code: w.code,
      display_name: w.display_name,
      country_codes: (w.country_codes ?? []).join(", "),
      shipping_copy_en: w.shipping_copy_en,
      shipping_copy_de: w.shipping_copy_de,
      shipping_copy_fr: w.shipping_copy_fr,
      shipping_copy_zh: w.shipping_copy_zh,
      is_default: w.is_default,
      sort_order: w.sort_order,
      active: w.active,
    });
    setOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Warehouses</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage local warehouses and shipping copy shown to visitors based
              on their country.
            </p>
          </div>
          <Button onClick={openCreate}>
            <Plus className="w-4 h-4 mr-2" /> New warehouse
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid gap-4">
            {(warehouses ?? []).map((w) => (
              <Card key={w.id} className={!w.active ? "opacity-60" : ""}>
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <div className="space-y-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {w.display_name}
                      <Badge variant="outline">{w.code}</Badge>
                      {w.is_default && (
                        <Badge className="gap-1">
                          <Star className="w-3 h-3" /> Default
                        </Badge>
                      )}
                      {!w.active && <Badge variant="secondary">Inactive</Badge>}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Countries: {(w.country_codes ?? []).join(", ") || "—"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEdit(w)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        if (confirm(`Delete warehouse "${w.display_name}"?`))
                          remove.mutate(w.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="text-sm space-y-1.5">
                  <p>
                    <span className="text-muted-foreground">EN:</span>{" "}
                    {w.shipping_copy_en}
                  </p>
                  <p>
                    <span className="text-muted-foreground">DE:</span>{" "}
                    {w.shipping_copy_de}
                  </p>
                  <p>
                    <span className="text-muted-foreground">FR:</span>{" "}
                    {w.shipping_copy_fr}
                  </p>
                  <p>
                    <span className="text-muted-foreground">ZH:</span>{" "}
                    {w.shipping_copy_zh}
                  </p>
                </CardContent>
              </Card>
            ))}
            {(warehouses ?? []).length === 0 && (
              <p className="text-muted-foreground text-center py-8">
                No warehouses yet.
              </p>
            )}
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit" : "New"} warehouse</DialogTitle>
            <DialogDescription>
              Country codes use ISO-2 (e.g. DE, AT, CH). The website matches
              visitors to a warehouse by their detected country, falling back to
              the default warehouse.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Code</Label>
                <Input
                  value={form.code}
                  onChange={(e) =>
                    setForm({ ...form, code: e.target.value })
                  }
                  placeholder="DE"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Display name</Label>
                <Input
                  value={form.display_name}
                  onChange={(e) =>
                    setForm({ ...form, display_name: e.target.value })
                  }
                  placeholder="Germany warehouse"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Country codes (comma-separated ISO-2)</Label>
              <Input
                value={form.country_codes}
                onChange={(e) =>
                  setForm({ ...form, country_codes: e.target.value })
                }
                placeholder="DE, AT, CH, NL, BE"
              />
            </div>

            {(["en", "de", "fr", "zh"] as const).map((code) => {
              const labelMap = { en: "English", de: "Deutsch", fr: "Français", zh: "中文" };
              const field = `shipping_copy_${code}` as keyof WarehouseForm;
              const value = String(form[field] ?? "");
              const len = value.length;
              const tooLong = len > 90;
              return (
                <div key={code} className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <Label>Shipping copy — {labelMap[code]}</Label>
                    <div className="flex items-center gap-2">
                      {code !== "en" && (
                        <button
                          type="button"
                          onClick={() =>
                            setForm({ ...form, [field]: form.shipping_copy_en } as WarehouseForm)
                          }
                          className="text-xs text-primary hover:underline"
                        >
                          Copy from EN
                        </button>
                      )}
                      <span className={`text-xs tabular-nums ${tooLong ? "text-destructive" : "text-muted-foreground"}`}>
                        {len}/90
                      </span>
                    </div>
                  </div>
                  <Textarea
                    rows={2}
                    value={value}
                    onChange={(e) =>
                      setForm({ ...form, [field]: e.target.value } as WarehouseForm)
                    }
                  />
                </div>
              );
            })}

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="space-y-1.5">
                <Label>Sort order</Label>
                <Input
                  type="number"
                  value={form.sort_order}
                  onChange={(e) =>
                    setForm({ ...form, sort_order: Number(e.target.value) })
                  }
                />
              </div>
              <div className="flex items-center gap-2 pt-6">
                <Switch
                  checked={form.is_default}
                  onCheckedChange={(v) => setForm({ ...form, is_default: v })}
                />
                <Label>Default fallback</Label>
              </div>
              <div className="flex items-center gap-2 pt-6">
                <Switch
                  checked={form.active}
                  onCheckedChange={(v) => setForm({ ...form, active: v })}
                />
                <Label>Active</Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => upsert.mutate(form)}
              disabled={upsert.isPending || !form.code || !form.display_name}
            >
              {upsert.isPending && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
