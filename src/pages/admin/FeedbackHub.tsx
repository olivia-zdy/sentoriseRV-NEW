import { useEffect, useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter,
  ThumbsUp,
  ThumbsDown,
  Minus,
  MessageSquare,
  AlertCircle,
  Lightbulb,
  HelpCircle,
  Tag,
  ExternalLink
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
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from './components/AdminLayout';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { products } from '@/data/products';

interface FeedbackEntry {
  id: string;
  source: string;
  customer_name: string | null;
  customer_email: string | null;
  product_id: string | null;
  feedback_type: string;
  content: string;
  sentiment: string;
  status: string;
  internal_notes: string | null;
  created_at: string;
}

interface FeedbackTag {
  id: string;
  name: string;
  color: string;
}

interface FeedbackEntryTag {
  feedback_id: string;
  tag_id: string;
}

const sentimentIcons = {
  positive: ThumbsUp,
  neutral: Minus,
  negative: ThumbsDown,
};

const sentimentColors = {
  positive: 'text-green-500',
  neutral: 'text-gray-500',
  negative: 'text-red-500',
};

const typeIcons = {
  praise: ThumbsUp,
  issue: AlertCircle,
  suggestion: Lightbulb,
  question: HelpCircle,
};

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  reviewed: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  actioned: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  archived: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
};

export default function FeedbackHub() {
  const { toast } = useToast();
  const [entries, setEntries] = useState<FeedbackEntry[]>([]);
  const [tags, setTags] = useState<FeedbackTag[]>([]);
  const [entryTags, setEntryTags] = useState<FeedbackEntryTag[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<FeedbackEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sentimentFilter, setSentimentFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Add feedback dialog
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newFeedback, setNewFeedback] = useState({
    source: 'manual',
    customer_name: '',
    customer_email: '',
    product_id: '',
    feedback_type: 'praise',
    content: '',
    sentiment: 'neutral',
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [entriesRes, tagsRes, entryTagsRes] = await Promise.all([
        supabase.from('feedback_entries').select('*').order('created_at', { ascending: false }),
        supabase.from('feedback_tags').select('*').order('name'),
        supabase.from('feedback_entry_tags').select('*'),
      ]);

      if (entriesRes.data) setEntries(entriesRes.data);
      if (tagsRes.data) setTags(tagsRes.data);
      if (entryTagsRes.data) setEntryTags(entryTagsRes.data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addFeedback = async () => {
    if (!newFeedback.content.trim()) {
      toast({
        title: 'Error',
        description: 'Feedback content is required',
        variant: 'destructive',
      });
      return;
    }

    const { data, error } = await supabase
      .from('feedback_entries')
      .insert({
        ...newFeedback,
        product_id: newFeedback.product_id || null,
        customer_name: newFeedback.customer_name || null,
        customer_email: newFeedback.customer_email || null,
      })
      .select()
      .single();

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to add feedback',
        variant: 'destructive',
      });
    } else {
      // Add tags
      if (selectedTags.length > 0 && data) {
        await supabase.from('feedback_entry_tags').insert(
          selectedTags.map(tagId => ({
            feedback_id: data.id,
            tag_id: tagId,
          }))
        );
      }

      toast({
        title: 'Feedback added',
        description: 'The feedback has been saved',
      });
      
      setAddDialogOpen(false);
      setNewFeedback({
        source: 'manual',
        customer_name: '',
        customer_email: '',
        product_id: '',
        feedback_type: 'praise',
        content: '',
        sentiment: 'neutral',
      });
      setSelectedTags([]);
      fetchData();
    }
  };

  const updateStatus = async (entry: FeedbackEntry, newStatus: string) => {
    const { error } = await supabase
      .from('feedback_entries')
      .update({ status: newStatus })
      .eq('id', entry.id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update status',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Status updated',
      });
      fetchData();
    }
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = 
      entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (entry.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (entry.customer_email?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    
    const matchesType = typeFilter === 'all' || entry.feedback_type === typeFilter;
    const matchesSentiment = sentimentFilter === 'all' || entry.sentiment === sentimentFilter;
    const matchesStatus = statusFilter === 'all' || entry.status === statusFilter;

    return matchesSearch && matchesType && matchesSentiment && matchesStatus;
  });

  const getEntryTags = (entryId: string) => {
    const tagIds = entryTags.filter(et => et.feedback_id === entryId).map(et => et.tag_id);
    return tags.filter(t => tagIds.includes(t.id));
  };

  // Calculate insights
  const sentimentData = [
    { name: 'Positive', value: entries.filter(e => e.sentiment === 'positive').length, color: '#22c55e' },
    { name: 'Neutral', value: entries.filter(e => e.sentiment === 'neutral').length, color: '#6b7280' },
    { name: 'Negative', value: entries.filter(e => e.sentiment === 'negative').length, color: '#ef4444' },
  ];

  const typeData = [
    { name: 'Praise', value: entries.filter(e => e.feedback_type === 'praise').length },
    { name: 'Issue', value: entries.filter(e => e.feedback_type === 'issue').length },
    { name: 'Suggestion', value: entries.filter(e => e.feedback_type === 'suggestion').length },
    { name: 'Question', value: entries.filter(e => e.feedback_type === 'question').length },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Feedback Hub</h1>
            <p className="text-muted-foreground">
              Collect and analyze customer feedback
            </p>
          </div>
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Feedback
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Add Feedback</DialogTitle>
                <DialogDescription>
                  Log customer feedback from any channel
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Source</Label>
                    <Select 
                      value={newFeedback.source} 
                      onValueChange={(v) => setNewFeedback({...newFeedback, source: v})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">Manual Entry</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="phone">Phone Call</SelectItem>
                        <SelectItem value="slack">Slack</SelectItem>
                        <SelectItem value="form">Website Form</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select 
                      value={newFeedback.feedback_type} 
                      onValueChange={(v) => setNewFeedback({...newFeedback, feedback_type: v})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="praise">Praise</SelectItem>
                        <SelectItem value="issue">Issue</SelectItem>
                        <SelectItem value="suggestion">Suggestion</SelectItem>
                        <SelectItem value="question">Question</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Customer Name (optional)</Label>
                    <Input
                      value={newFeedback.customer_name}
                      onChange={(e) => setNewFeedback({...newFeedback, customer_name: e.target.value})}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Customer Email (optional)</Label>
                    <Input
                      type="email"
                      value={newFeedback.customer_email}
                      onChange={(e) => setNewFeedback({...newFeedback, customer_email: e.target.value})}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Product (optional)</Label>
                    <Select 
                      value={newFeedback.product_id} 
                      onValueChange={(v) => setNewFeedback({...newFeedback, product_id: v})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">No product</SelectItem>
                        {products.map(p => (
                          <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Sentiment</Label>
                    <Select 
                      value={newFeedback.sentiment} 
                      onValueChange={(v) => setNewFeedback({...newFeedback, sentiment: v})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="positive">Positive</SelectItem>
                        <SelectItem value="neutral">Neutral</SelectItem>
                        <SelectItem value="negative">Negative</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Feedback Content</Label>
                  <Textarea
                    value={newFeedback.content}
                    onChange={(e) => setNewFeedback({...newFeedback, content: e.target.value})}
                    placeholder="What did the customer say?"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <label
                        key={tag.id}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs cursor-pointer transition-colors ${
                          selectedTags.includes(tag.id)
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted hover:bg-muted/80'
                        }`}
                      >
                        <Checkbox
                          checked={selectedTags.includes(tag.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedTags([...selectedTags, tag.id]);
                            } else {
                              setSelectedTags(selectedTags.filter(id => id !== tag.id));
                            }
                          }}
                          className="hidden"
                        />
                        {tag.name}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={addFeedback}>Save Feedback</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="inbox" className="space-y-4">
          <TabsList>
            <TabsTrigger value="inbox">Inbox</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="inbox" className="space-y-4">
            {/* Filters */}
            <Card>
              <CardContent className="pt-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search feedback..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="praise">Praise</SelectItem>
                        <SelectItem value="issue">Issue</SelectItem>
                        <SelectItem value="suggestion">Suggestion</SelectItem>
                        <SelectItem value="question">Question</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Sentiment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Sentiment</SelectItem>
                        <SelectItem value="positive">Positive</SelectItem>
                        <SelectItem value="neutral">Neutral</SelectItem>
                        <SelectItem value="negative">Negative</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                        <SelectItem value="actioned">Actioned</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feedback List */}
            {isLoading ? (
              <p className="text-muted-foreground text-center py-8">Loading feedback...</p>
            ) : filteredEntries.length === 0 ? (
              <Card>
                <CardContent className="py-8">
                  <p className="text-muted-foreground text-center">No feedback found</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredEntries.map((entry) => {
                  const SentimentIcon = sentimentIcons[entry.sentiment as keyof typeof sentimentIcons] || Minus;
                  const TypeIcon = typeIcons[entry.feedback_type as keyof typeof typeIcons] || MessageSquare;
                  const entryTagsList = getEntryTags(entry.id);

                  return (
                    <Card key={entry.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center ${sentimentColors[entry.sentiment as keyof typeof sentimentColors]}`}>
                            <SentimentIcon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <Badge variant="outline" className="capitalize">
                                  <TypeIcon className="h-3 w-3 mr-1" />
                                  {entry.feedback_type}
                                </Badge>
                                <Badge className={statusColors[entry.status]}>
                                  {entry.status}
                                </Badge>
                                {entry.customer_name && (
                                  <span className="text-sm font-medium">{entry.customer_name}</span>
                                )}
                              </div>
                              <Select
                                value={entry.status}
                                onValueChange={(v) => updateStatus(entry, v)}
                              >
                                <SelectTrigger className="w-[110px] h-8">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="new">New</SelectItem>
                                  <SelectItem value="reviewed">Reviewed</SelectItem>
                                  <SelectItem value="actioned">Actioned</SelectItem>
                                  <SelectItem value="archived">Archived</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <p className="text-sm mb-2 line-clamp-3">{entry.content}</p>
                            
                            <div className="flex items-center gap-2 flex-wrap">
                              {entryTagsList.map(tag => (
                                <Badge 
                                  key={tag.id} 
                                  variant="secondary" 
                                  className="text-xs"
                                  style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
                                >
                                  <Tag className="h-3 w-3 mr-1" />
                                  {tag.name}
                                </Badge>
                              ))}
                              <span className="text-xs text-muted-foreground ml-auto">
                                {format(new Date(entry.created_at), 'MMM d, yyyy')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Sentiment Distribution</CardTitle>
                  <CardDescription>Overall customer sentiment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sentimentData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {sentimentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-4 mt-4">
                    {sentimentData.map((item) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm">{item.name}: {item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Feedback Types</CardTitle>
                  <CardDescription>Breakdown by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={typeData}>
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top Tags</CardTitle>
                <CardDescription>Most frequently used feedback tags</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => {
                    const count = entryTags.filter(et => et.tag_id === tag.id).length;
                    return (
                      <Badge 
                        key={tag.id}
                        variant="secondary"
                        className="text-sm"
                        style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
                      >
                        {tag.name} ({count})
                      </Badge>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
