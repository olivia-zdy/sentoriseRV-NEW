import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  Building, 
  Calendar,
  Clock,
  MessageSquare,
  Plus,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  XCircle
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
import { format, differenceInHours, parseISO } from 'date-fns';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string | null;
  source: 'quote_request' | 'contact_submission';
  sourceLabel: string;
  product_name?: string | null;
  created_at: string;
  lead_status: string | null;
}

interface Activity {
  id: string;
  lead_id: string;
  lead_source: string;
  activity_type: string;
  content: string | null;
  created_at: string;
  metadata: unknown;
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  contacted: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  qualified: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  quoted: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
  won: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  lost: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
};

export default function LeadFollowUp() {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  
  // Activity dialog state
  const [activityDialogOpen, setActivityDialogOpen] = useState(false);
  const [activityType, setActivityType] = useState<string>('note');
  const [activityContent, setActivityContent] = useState('');
  
  // Reminder dialog state
  const [reminderDialogOpen, setReminderDialogOpen] = useState(false);
  const [reminderDate, setReminderDate] = useState('');
  const [reminderNote, setReminderNote] = useState('');

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    if (selectedLead) {
      fetchActivities(selectedLead.id, selectedLead.source);
    }
  }, [selectedLead]);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      // Fetch quote requests
      const { data: quoteRequests, error: quoteError } = await supabase
        .from('quote_requests')
        .select('*')
        .order('created_at', { ascending: false });

      // Fetch contact submissions
      const { data: contactSubmissions, error: contactError } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      const allLeads: Lead[] = [
        ...(quoteRequests || []).map(q => ({
          id: q.id,
          name: q.name,
          email: q.email,
          phone: q.phone,
          company: q.company,
          message: q.message,
          source: 'quote_request' as const,
          sourceLabel: 'Quote Request',
          product_name: q.product_name,
          created_at: q.created_at || new Date().toISOString(),
          lead_status: q.lead_status,
        })),
        ...(contactSubmissions || []).map(c => ({
          id: c.id,
          name: c.name,
          email: c.email,
          phone: null,
          company: null,
          message: c.message,
          source: 'contact_submission' as const,
          sourceLabel: 'Contact Form',
          product_name: null,
          created_at: c.created_at || new Date().toISOString(),
          lead_status: c.lead_status,
        })),
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setLeads(allLeads);

      // Check if we need to select a specific lead from URL params
      const leadId = searchParams.get('lead');
      const leadSource = searchParams.get('source');
      if (leadId && leadSource) {
        const foundLead = allLeads.find(l => l.id === leadId && l.source === leadSource);
        if (foundLead) {
          setSelectedLead(foundLead);
        }
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchActivities = async (leadId: string, leadSource: string) => {
    const { data, error } = await supabase
      .from('lead_activities')
      .select('*')
      .eq('lead_id', leadId)
      .eq('lead_source', leadSource)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setActivities(data);
    }
  };

  const updateLeadStatus = async (lead: Lead, newStatus: string) => {
    const table = lead.source === 'quote_request' ? 'quote_requests' : 'contact_submissions';
    
    const { error } = await supabase
      .from(table)
      .update({ lead_status: newStatus })
      .eq('id', lead.id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update lead status',
        variant: 'destructive',
      });
    } else {
      // Log status change activity
      await supabase.from('lead_activities').insert({
        lead_id: lead.id,
        lead_source: lead.source,
        activity_type: 'status_change',
        content: `Status changed to ${newStatus}`,
        metadata: { old_status: lead.lead_status, new_status: newStatus },
      });

      toast({
        title: 'Status updated',
        description: `Lead status changed to ${newStatus}`,
      });

      fetchLeads();
      if (selectedLead?.id === lead.id) {
        fetchActivities(lead.id, lead.source);
      }
    }
  };

  const addActivity = async () => {
    if (!selectedLead || !activityContent.trim()) return;

    const { error } = await supabase.from('lead_activities').insert({
      lead_id: selectedLead.id,
      lead_source: selectedLead.source,
      activity_type: activityType,
      content: activityContent,
    });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to add activity',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Activity added',
        description: 'Your note has been saved',
      });
      setActivityContent('');
      setActivityDialogOpen(false);
      fetchActivities(selectedLead.id, selectedLead.source);
    }
  };

  const addReminder = async () => {
    if (!selectedLead || !reminderDate) return;

    const { error } = await supabase.from('follow_up_reminders').insert({
      lead_id: selectedLead.id,
      lead_source: selectedLead.source,
      reminder_date: reminderDate,
      note: reminderNote || `Follow up with ${selectedLead.name}`,
    });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to set reminder',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Reminder set',
        description: `You'll be reminded on ${format(parseISO(reminderDate), 'MMM d, yyyy')}`,
      });
      setReminderDate('');
      setReminderNote('');
      setReminderDialogOpen(false);
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.company?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    
    const matchesStatus = statusFilter === 'all' || lead.lead_status === statusFilter || 
      (statusFilter === 'new' && !lead.lead_status);
    
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;

    // Special filter for at-risk leads
    if (searchParams.get('filter') === 'at-risk') {
      const hoursSince = differenceInHours(new Date(), new Date(lead.created_at));
      const isAtRisk = (!lead.lead_status || lead.lead_status === 'new') && hoursSince > 48;
      return matchesSearch && isAtRisk;
    }

    return matchesSearch && matchesStatus && matchesSource;
  });

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call': return Phone;
      case 'email': return Mail;
      case 'status_change': return CheckCircle;
      default: return MessageSquare;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
            <p className="text-muted-foreground">
              Manage inquiries from quote requests and contact forms
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr,400px]">
          {/* Lead List */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, or company..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="qualified">Qualified</SelectItem>
                      <SelectItem value="quoted">Quoted</SelectItem>
                      <SelectItem value="won">Won</SelectItem>
                      <SelectItem value="lost">Lost</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={sourceFilter} onValueChange={setSourceFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sources</SelectItem>
                      <SelectItem value="quote_request">Quote Requests</SelectItem>
                      <SelectItem value="contact_submission">Contact Forms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <p className="text-muted-foreground text-center py-8">Loading leads...</p>
              ) : filteredLeads.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No leads found</p>
              ) : (
                <div className="divide-y">
                  {filteredLeads.map((lead) => {
                    const hoursSince = differenceInHours(new Date(), new Date(lead.created_at));
                    const isAtRisk = (!lead.lead_status || lead.lead_status === 'new') && hoursSince > 48;
                    const isSelected = selectedLead?.id === lead.id && selectedLead?.source === lead.source;

                    return (
                      <div
                        key={`${lead.source}-${lead.id}`}
                        onClick={() => setSelectedLead(lead)}
                        className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                          isSelected ? 'bg-muted' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium truncate">{lead.name}</p>
                              {isAtRisk && (
                                <AlertTriangle className="h-4 w-4 text-orange-500 flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{lead.email}</p>
                            {lead.product_name && (
                              <p className="text-sm text-muted-foreground truncate mt-1">
                                Product: {lead.product_name}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <Badge variant="outline" className="text-xs">
                              {lead.sourceLabel}
                            </Badge>
                            <Badge className={`text-xs ${statusColors[lead.lead_status || 'new']}`}>
                              {lead.lead_status || 'new'}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {format(new Date(lead.created_at), 'MMM d')}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Lead Detail */}
          <Card className="h-fit lg:sticky lg:top-6">
            {selectedLead ? (
              <>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{selectedLead.name}</CardTitle>
                      <CardDescription>{selectedLead.sourceLabel}</CardDescription>
                    </div>
                    <Select 
                      value={selectedLead.lead_status || 'new'} 
                      onValueChange={(value) => updateLeadStatus(selectedLead, value)}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="qualified">Qualified</SelectItem>
                        <SelectItem value="quoted">Quoted</SelectItem>
                        <SelectItem value="won">Won</SelectItem>
                        <SelectItem value="lost">Lost</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Contact Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a href={`mailto:${selectedLead.email}`} className="text-primary hover:underline">
                        {selectedLead.email}
                      </a>
                    </div>
                    {selectedLead.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <a href={`tel:${selectedLead.phone}`} className="text-primary hover:underline">
                          {selectedLead.phone}
                        </a>
                      </div>
                    )}
                    {selectedLead.company && (
                      <div className="flex items-center gap-2 text-sm">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedLead.company}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{format(new Date(selectedLead.created_at), 'MMM d, yyyy HH:mm')}</span>
                    </div>
                  </div>

                  {/* Message */}
                  {selectedLead.message && (
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-1">Message:</p>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {selectedLead.message}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Dialog open={activityDialogOpen} onOpenChange={setActivityDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm" className="flex-1">
                          <Plus className="h-4 w-4 mr-1" />
                          Add Note
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Activity</DialogTitle>
                          <DialogDescription>
                            Log a note, call, or email with {selectedLead.name}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Activity Type</Label>
                            <Select value={activityType} onValueChange={setActivityType}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="note">Note</SelectItem>
                                <SelectItem value="call">Call</SelectItem>
                                <SelectItem value="email">Email</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Details</Label>
                            <Textarea
                              value={activityContent}
                              onChange={(e) => setActivityContent(e.target.value)}
                              placeholder="What happened?"
                              rows={4}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setActivityDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={addActivity}>Save Activity</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Dialog open={reminderDialogOpen} onOpenChange={setReminderDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Clock className="h-4 w-4 mr-1" />
                          Set Reminder
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Set Follow-up Reminder</DialogTitle>
                          <DialogDescription>
                            Get reminded to follow up with {selectedLead.name}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Reminder Date</Label>
                            <Input
                              type="date"
                              value={reminderDate}
                              onChange={(e) => setReminderDate(e.target.value)}
                              min={format(new Date(), 'yyyy-MM-dd')}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Note (optional)</Label>
                            <Textarea
                              value={reminderNote}
                              onChange={(e) => setReminderNote(e.target.value)}
                              placeholder="What should you do?"
                              rows={2}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setReminderDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={addReminder}>Set Reminder</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* Activity Timeline */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Activity Timeline</h4>
                    {activities.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No activities yet
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {activities.map((activity) => {
                          const Icon = getActivityIcon(activity.activity_type);
                          return (
                            <div key={activity.id} className="flex gap-3 text-sm">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                <Icon className="h-4 w-4 text-muted-foreground" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-muted-foreground">{activity.content}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {format(new Date(activity.created_at), 'MMM d, HH:mm')}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="py-12">
                <p className="text-muted-foreground text-center">
                  Select a lead to view details
                </p>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
