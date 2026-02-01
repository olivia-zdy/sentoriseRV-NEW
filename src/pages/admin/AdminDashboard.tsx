import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  MessageSquare, 
  Palette, 
  Clock,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from './components/AdminLayout';
import { DashboardStats } from '@/components/admin/DashboardStats';
import { ExportButton } from '@/components/admin/ExportButton';
import { SkeletonTable } from '@/components/ui/skeleton-card';
import { format, differenceInHours, isToday } from 'date-fns';

interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  atRiskLeads: number;
  totalFeedback: number;
  newFeedback: number;
  totalAssets: number;
  pendingReminders: number;
}

interface RecentLead {
  id: string;
  name: string;
  email: string;
  source: string;
  created_at: string;
  lead_status: string | null;
}

interface PendingReminder {
  id: string;
  lead_id: string;
  lead_source: string;
  reminder_date: string;
  note: string | null;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalLeads: 0,
    newLeads: 0,
    atRiskLeads: 0,
    totalFeedback: 0,
    newFeedback: 0,
    totalAssets: 0,
    pendingReminders: 0,
  });
  const [recentLeads, setRecentLeads] = useState<RecentLead[]>([]);
  const [todayReminders, setTodayReminders] = useState<PendingReminder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
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

      // Fetch feedback entries
      const { data: feedback, error: feedbackError } = await supabase
        .from('feedback_entries')
        .select('*');

      // Fetch brand assets
      const { data: assets, error: assetsError } = await supabase
        .from('brand_assets')
        .select('*');

      // Fetch pending reminders
      const { data: reminders, error: remindersError } = await supabase
        .from('follow_up_reminders')
        .select('*')
        .eq('status', 'pending')
        .order('reminder_date', { ascending: true });

      // Calculate stats
      const allLeads: RecentLead[] = [
        ...(quoteRequests || []).map(q => ({
          id: q.id,
          name: q.name,
          email: q.email,
          source: 'Quote Request',
          created_at: q.created_at,
          lead_status: q.lead_status,
        })),
        ...(contactSubmissions || []).map(c => ({
          id: c.id,
          name: c.name,
          email: c.email,
          source: 'Contact Form',
          created_at: c.created_at,
          lead_status: c.lead_status,
        })),
      ].sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());

      const now = new Date();
      const atRiskLeads = allLeads.filter(lead => {
        const createdAt = new Date(lead.created_at || now);
        const hoursSince = differenceInHours(now, createdAt);
        return (!lead.lead_status || lead.lead_status === 'new') && hoursSince > 48;
      });

      const todaysReminders = (reminders || []).filter(r => 
        isToday(new Date(r.reminder_date))
      );

      setStats({
        totalLeads: allLeads.length,
        newLeads: allLeads.filter(l => !l.lead_status || l.lead_status === 'new').length,
        atRiskLeads: atRiskLeads.length,
        totalFeedback: (feedback || []).length,
        newFeedback: (feedback || []).filter(f => f.status === 'new').length,
        totalAssets: (assets || []).length,
        pendingReminders: (reminders || []).length,
      });

      setRecentLeads(allLeads.slice(0, 5));
      setTodayReminders(todaysReminders.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Leads',
      value: stats.totalLeads,
      description: `${stats.newLeads} new`,
      icon: Users,
      link: '/admin/leads',
      color: 'text-blue-500',
    },
    {
      title: 'At Risk',
      value: stats.atRiskLeads,
      description: 'No contact in 48h+',
      icon: AlertTriangle,
      link: '/admin/leads?filter=at-risk',
      color: 'text-orange-500',
    },
    {
      title: 'Feedback',
      value: stats.totalFeedback,
      description: `${stats.newFeedback} unreviewed`,
      icon: MessageSquare,
      link: '/admin/feedback',
      color: 'text-green-500',
    },
    {
      title: 'Brand Assets',
      value: stats.totalAssets,
      description: 'Created',
      icon: Palette,
      link: '/admin/assets',
      color: 'text-purple-500',
    },
  ];

  // Prepare leads for stats component
  const allLeadsForStats = recentLeads.map(lead => ({
    id: lead.id,
    created_at: lead.created_at || new Date().toISOString(),
    lead_status: lead.lead_status,
    source: lead.source,
  }));

  // Export columns for leads
  const exportColumns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'source', label: 'Source' },
    { key: 'lead_status', label: 'Status' },
    { key: 'created_at', label: 'Created At' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Overview of your leads, feedback, and brand assets
            </p>
          </div>
          <ExportButton
            data={recentLeads}
            columns={exportColumns}
            filename="sentorise_leads"
          />
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <Link key={stat.title} to={stat.link}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Lead Trend Chart */}
        {!isLoading && recentLeads.length > 0 && (
          <DashboardStats leads={allLeadsForStats} period={30} />
        )}

        {/* Today's Reminders */}
        {todayReminders.length > 0 && (
          <Card className="border-orange-200 dark:border-orange-900/50 bg-orange-50/50 dark:bg-orange-950/20">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-500" />
                <CardTitle className="text-lg">Today's Follow-ups</CardTitle>
              </div>
              <CardDescription>Reminders scheduled for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {todayReminders.map((reminder) => (
                  <div 
                    key={reminder.id} 
                    className="flex items-center justify-between p-3 rounded-lg bg-background border"
                  >
                    <div>
                      <p className="font-medium text-sm">{reminder.note || 'Follow up with lead'}</p>
                      <p className="text-xs text-muted-foreground">
                        {reminder.lead_source === 'quote_request' ? 'Quote Request' : 'Contact Form'}
                      </p>
                    </div>
                    <Link to={`/admin/leads?lead=${reminder.lead_id}&source=${reminder.lead_source}`}>
                      <Button size="sm" variant="outline">
                        View Lead
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Leads */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Leads</CardTitle>
              <CardDescription>Latest inquiries from your website</CardDescription>
            </div>
            <Link to="/admin/leads">
              <Button variant="outline" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <SkeletonTable rows={5} />
            ) : recentLeads.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No leads yet</p>
            ) : (
              <div className="space-y-4">
                {recentLeads.map((lead) => {
                  const createdAt = new Date(lead.created_at || Date.now());
                  const hoursSince = differenceInHours(new Date(), createdAt);
                  const isAtRisk = (!lead.lead_status || lead.lead_status === 'new') && hoursSince > 48;

                  return (
                    <div 
                      key={`${lead.source}-${lead.id}`} 
                      className="flex items-center justify-between p-3 rounded-lg border"
                    >
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-medium">{lead.name}</p>
                          <p className="text-sm text-muted-foreground">{lead.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {lead.source}
                        </Badge>
                        {isAtRisk && (
                          <Badge variant="destructive" className="text-xs">
                            At Risk
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {format(createdAt, 'MMM d, HH:mm')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
