import { useMemo } from 'react';
import { format, subDays, eachDayOfInterval, startOfDay, parseISO } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface Lead {
  id: string;
  created_at: string;
  lead_status: string | null;
  source: string;
}

interface DashboardStatsProps {
  leads: Lead[];
  period?: number; // days
}

export const DashboardStats = ({ leads, period = 30 }: DashboardStatsProps) => {
  const chartData = useMemo(() => {
    const endDate = new Date();
    const startDate = subDays(endDate, period - 1);
    
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    
    return days.map(day => {
      const dayStart = startOfDay(day);
      const dayLeads = leads.filter(lead => {
        const leadDate = startOfDay(parseISO(lead.created_at));
        return leadDate.getTime() === dayStart.getTime();
      });
      
      return {
        date: format(day, 'MMM d'),
        total: dayLeads.length,
        quotes: dayLeads.filter(l => l.source === 'Quote Request').length,
        contacts: dayLeads.filter(l => l.source === 'Contact Form').length,
      };
    });
  }, [leads, period]);

  const stats = useMemo(() => {
    const now = new Date();
    const last7Days = leads.filter(l => {
      const leadDate = parseISO(l.created_at);
      return leadDate >= subDays(now, 7);
    }).length;
    
    const prev7Days = leads.filter(l => {
      const leadDate = parseISO(l.created_at);
      return leadDate >= subDays(now, 14) && leadDate < subDays(now, 7);
    }).length;
    
    const trend = prev7Days === 0 ? 100 : ((last7Days - prev7Days) / prev7Days) * 100;
    
    const conversionRate = leads.length > 0
      ? (leads.filter(l => l.lead_status === 'won').length / leads.length) * 100
      : 0;

    return {
      last7Days,
      trend: Math.round(trend),
      conversionRate: conversionRate.toFixed(1),
      totalLeads: leads.length,
    };
  }, [leads]);

  const TrendIcon = stats.trend > 0 ? TrendingUp : stats.trend < 0 ? TrendingDown : Minus;
  const trendColor = stats.trend > 0 ? 'text-green-500' : stats.trend < 0 ? 'text-red-500' : 'text-muted-foreground';

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Last 7 Days
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{stats.last7Days}</span>
              <div className={`flex items-center gap-1 text-sm ${trendColor}`}>
                <TrendIcon className="h-4 w-4" />
                <span>{Math.abs(stats.trend)}%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">vs previous 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.conversionRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">leads marked as won</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Leads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLeads}</div>
            <p className="text-xs text-muted-foreground mt-1">all time</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Lead Trend (Last {period} Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="hsl(var(--muted-foreground))"
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#colorTotal)"
                  name="Total Leads"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
