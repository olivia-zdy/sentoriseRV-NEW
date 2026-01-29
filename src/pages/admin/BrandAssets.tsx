import { useEffect, useState } from 'react';
import { 
  Plus, 
  Download, 
  Trash2,
  Image,
  FileText,
  Mail,
  Grid,
  List,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from './components/AdminLayout';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface BrandAsset {
  id: string;
  name: string;
  asset_type: string;
  template_type: string;
  dimensions: string;
  image_url: string | null;
  settings: Record<string, unknown>;
  status: string;
  created_at: string;
}

interface Template {
  id: string;
  name: string;
  type: 'social' | 'email' | 'document';
  dimensions: string;
  description: string;
}

const templates: Template[] = [
  // Social
  { id: 'instagram-post', name: 'Instagram Post', type: 'social', dimensions: '1080x1080', description: 'Square post for Instagram feed' },
  { id: 'facebook-cover', name: 'Facebook Cover', type: 'social', dimensions: '1200x630', description: 'Cover photo for Facebook page' },
  { id: 'twitter-header', name: 'Twitter Header', type: 'social', dimensions: '1500x500', description: 'Header banner for Twitter/X' },
  { id: 'linkedin-post', name: 'LinkedIn Post', type: 'social', dimensions: '1200x627', description: 'Post image for LinkedIn' },
  // Email
  { id: 'email-header', name: 'Email Header', type: 'email', dimensions: '600x200', description: 'Header banner for email newsletters' },
  { id: 'email-signature', name: 'Email Signature', type: 'email', dimensions: '400x100', description: 'Signature block for team emails' },
  // Document
  { id: 'letterhead', name: 'Letterhead', type: 'document', dimensions: '2480x3508', description: 'A4 letterhead template' },
  { id: 'invoice-header', name: 'Invoice Header', type: 'document', dimensions: '2480x400', description: 'Header for invoices and quotes' },
  { id: 'presentation-slide', name: 'Presentation Slide', type: 'document', dimensions: '1920x1080', description: '16:9 slide template' },
];

const typeIcons = {
  social: Image,
  email: Mail,
  document: FileText,
};

export default function BrandAssets() {
  const { toast } = useToast();
  const [assets, setAssets] = useState<BrandAsset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  
  // Create dialog state
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [assetName, setAssetName] = useState('');
  const [headline, setHeadline] = useState('');
  const [tagline, setTagline] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('brand_assets')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) setAssets(data as BrandAsset[]);
    } catch (error) {
      console.error('Error fetching assets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateAsset = async () => {
    if (!selectedTemplate || !assetName.trim()) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);

    try {
      // For now, create a placeholder asset - AI generation can be added later
      const { data, error } = await supabase
        .from('brand_assets')
        .insert({
          name: assetName,
          asset_type: selectedTemplate.type,
          template_type: selectedTemplate.id,
          dimensions: selectedTemplate.dimensions,
          settings: { headline, tagline },
          status: 'draft',
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Asset created',
        description: 'Your brand asset has been saved as a draft',
      });

      setCreateDialogOpen(false);
      setSelectedTemplate(null);
      setAssetName('');
      setHeadline('');
      setTagline('');
      fetchAssets();
    } catch (error) {
      console.error('Error creating asset:', error);
      toast({
        title: 'Error',
        description: 'Failed to create asset',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const deleteAsset = async (id: string) => {
    const { error } = await supabase
      .from('brand_assets')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete asset',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Asset deleted',
      });
      fetchAssets();
    }
  };

  const filteredAssets = assets.filter(asset => {
    return typeFilter === 'all' || asset.asset_type === typeFilter;
  });

  const filteredTemplates = selectedTemplate 
    ? templates 
    : templates;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Brand Assets</h1>
            <p className="text-muted-foreground">
              Create and manage branded marketing materials
            </p>
          </div>
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Asset
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Brand Asset</DialogTitle>
                <DialogDescription>
                  Choose a template and customize your brand asset
                </DialogDescription>
              </DialogHeader>

              {!selectedTemplate ? (
                <div className="space-y-4">
                  <Tabs defaultValue="social">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="social">Social Media</TabsTrigger>
                      <TabsTrigger value="email">Email</TabsTrigger>
                      <TabsTrigger value="document">Documents</TabsTrigger>
                    </TabsList>
                    {(['social', 'email', 'document'] as const).map(type => (
                      <TabsContent key={type} value={type} className="mt-4">
                        <div className="grid grid-cols-2 gap-3">
                          {templates.filter(t => t.type === type).map(template => {
                            const Icon = typeIcons[template.type];
                            return (
                              <button
                                key={template.id}
                                onClick={() => setSelectedTemplate(template)}
                                className="p-4 border rounded-lg text-left hover:border-primary hover:bg-muted/50 transition-colors"
                              >
                                <div className="flex items-center gap-3 mb-2">
                                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Icon className="h-5 w-5 text-primary" />
                                  </div>
                                  <div>
                                    <p className="font-medium">{template.name}</p>
                                    <p className="text-xs text-muted-foreground">{template.dimensions}</p>
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground">{template.description}</p>
                              </button>
                            );
                          })}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedTemplate(null)}
                    >
                      ← Back
                    </Button>
                    <div>
                      <p className="font-medium">{selectedTemplate.name}</p>
                      <p className="text-xs text-muted-foreground">{selectedTemplate.dimensions}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Asset Name *</Label>
                      <Input
                        value={assetName}
                        onChange={(e) => setAssetName(e.target.value)}
                        placeholder="e.g., Summer Campaign - Instagram"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Headline</Label>
                      <Input
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                        placeholder="Main text on the asset"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Tagline / Subtext</Label>
                      <Textarea
                        value={tagline}
                        onChange={(e) => setTagline(e.target.value)}
                        placeholder="Supporting text"
                        rows={2}
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={generateAsset} disabled={isGenerating}>
                      {isGenerating ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        'Create Asset'
                      )}
                    </Button>
                  </DialogFooter>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="social">Social Media</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="document">Documents</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Assets Grid/List */}
        {isLoading ? (
          <p className="text-muted-foreground text-center py-8">Loading assets...</p>
        ) : filteredAssets.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Image className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-medium mb-2">No assets yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create your first brand asset to get started
              </p>
              <Button onClick={() => setCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Asset
              </Button>
            </CardContent>
          </Card>
        ) : viewMode === 'grid' ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredAssets.map((asset) => {
              const template = templates.find(t => t.id === asset.template_type);
              const Icon = typeIcons[asset.asset_type as keyof typeof typeIcons] || Image;
              
              return (
                <Card key={asset.id} className="group overflow-hidden">
                  <div className="aspect-video bg-muted flex items-center justify-center relative">
                    {asset.image_url ? (
                      <img 
                        src={asset.image_url} 
                        alt={asset.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Icon className="h-8 w-8" />
                        <span className="text-xs">{asset.dimensions}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button size="sm" variant="secondary">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => deleteAsset(asset.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <p className="font-medium text-sm truncate">{asset.name}</p>
                    <div className="flex items-center justify-between mt-1">
                      <Badge variant="outline" className="text-xs capitalize">
                        {asset.asset_type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(asset.created_at), 'MMM d')}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredAssets.map((asset) => {
              const Icon = typeIcons[asset.asset_type as keyof typeof typeIcons] || Image;
              
              return (
                <Card key={asset.id}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      {asset.image_url ? (
                        <img 
                          src={asset.image_url} 
                          alt={asset.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Icon className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{asset.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs capitalize">
                          {asset.asset_type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{asset.dimensions}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {format(new Date(asset.created_at), 'MMM d, yyyy')}
                      </span>
                      <Button size="icon" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost"
                        onClick={() => deleteAsset(asset.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
