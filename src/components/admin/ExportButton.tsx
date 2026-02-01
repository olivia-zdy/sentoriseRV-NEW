import { useState } from 'react';
import { Download, FileSpreadsheet, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface ExportColumn {
  key: string;
  label: string;
}

interface ExportButtonProps<T> {
  data: T[];
  columns: ExportColumn[];
  filename: string;
  onExport?: () => void;
}

export function ExportButton<T>({ 
  data, 
  columns, 
  filename,
  onExport 
}: ExportButtonProps<T>) {
  const [isExporting, setIsExporting] = useState(false);

  const exportToCSV = () => {
    setIsExporting(true);
    try {
      // Create CSV header
      const header = columns.map(col => `"${col.label}"`).join(',');
      
      // Create CSV rows
      const rows = data.map(item => 
        columns.map(col => {
          const value = (item as Record<string, unknown>)[col.key];
          // Handle different value types
          if (value === null || value === undefined) return '""';
          if (typeof value === 'string') return `"${value.replace(/"/g, '""')}"`;
          if (value instanceof Date) return `"${value.toISOString()}"`;
          return `"${String(value)}"`;
        }).join(',')
      );

      const csv = [header, ...rows].join('\n');
      
      // Create and download file
      const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(`Exported ${data.length} records to CSV`);
      onExport?.();
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export data');
    } finally {
      setIsExporting(false);
    }
  };

  const exportToJSON = () => {
    setIsExporting(true);
    try {
      const exportData = data.map(item => {
        const obj: Record<string, unknown> = {};
        columns.forEach(col => {
          obj[col.label] = (item as Record<string, unknown>)[col.key];
        });
        return obj;
      });

      const json = JSON.stringify(exportData, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(`Exported ${data.length} records to JSON`);
      onExport?.();
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export data');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isExporting || data.length === 0}>
          {isExporting ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Download className="h-4 w-4 mr-2" />
          )}
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportToCSV}>
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToJSON}>
          <Download className="h-4 w-4 mr-2" />
          Export as JSON
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
