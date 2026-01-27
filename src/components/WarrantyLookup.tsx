import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Search, Shield, Calendar, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface WarrantyRecord {
  id: string;
  product_name: string;
  serial_number: string | null;
  purchase_date: string;
  warranty_end_date: string | null;
  status: string | null;
  created_at: string;
}

const WarrantyLookup = () => {
  const [email, setEmail] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [records, setRecords] = useState<WarrantyRecord[] | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSearching(true);
    setSearched(true);

    try {
      const { data, error } = await supabase
        .from("warranty_registrations")
        .select("id, product_name, serial_number, purchase_date, warranty_end_date, status, created_at")
        .eq("email", email.toLowerCase().trim())
        .order("created_at", { ascending: false });

      if (error) throw error;

      setRecords(data || []);
      
      if (!data || data.length === 0) {
        toast.info("No warranty registrations found for this email");
      }
    } catch (error) {
      console.error("Warranty lookup error:", error);
      toast.error("Failed to search warranties. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isExpired = (endDate: string | null) => {
    if (!endDate) return false;
    return new Date(endDate) < new Date();
  };

  const getStatusBadge = (record: WarrantyRecord) => {
    if (isExpired(record.warranty_end_date)) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground">
          <AlertCircle className="w-3 h-3" />
          Expired
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
        <CheckCircle2 className="w-3 h-3" />
        Active
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="lookup-email">Email Address</Label>
          <div className="flex gap-3">
            <Input
              id="lookup-email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={isSearching}>
              {isSearching ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </>
              )}
            </Button>
          </div>
        </div>
      </form>

      {/* Results */}
      {searched && records !== null && (
        <div className="space-y-4">
          {records.length === 0 ? (
            <div className="text-center py-8 bg-muted/30 rounded-lg">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-1">No Warranties Found</h3>
              <p className="text-sm text-muted-foreground">
                No warranty registrations found for <strong>{email}</strong>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                If you recently purchased a Sentorise battery, please register it above.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Found {records.length} Registration{records.length > 1 ? 's' : ''}
              </h3>
              
              {records.map((record) => (
                <div 
                  key={record.id}
                  className="bg-card border rounded-lg p-5 space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {record.product_name}
                      </h4>
                      {record.serial_number && (
                        <p className="text-sm text-muted-foreground font-mono">
                          SN: {record.serial_number}
                        </p>
                      )}
                    </div>
                    {getStatusBadge(record)}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Purchase Date</p>
                      <p className="font-medium text-foreground">
                        {formatDate(record.purchase_date)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Valid Until</p>
                      <p className={`font-medium flex items-center gap-1 ${
                        isExpired(record.warranty_end_date) 
                          ? 'text-muted-foreground' 
                          : 'text-primary'
                      }`}>
                        <Calendar className="w-4 h-4" />
                        {record.warranty_end_date 
                          ? formatDate(record.warranty_end_date)
                          : 'Calculating...'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WarrantyLookup;
