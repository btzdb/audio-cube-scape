import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AdminData {
  totalSales: number;
  totalBeats: number;
  totalDownloads: number;
  beats: Array<{
    id: string;
    title: string;
    bpm: number | null;
    price: number;
    created_at: string;
  }>;
}

export function useAdminData() {
  const [data, setData] = useState<AdminData>({
    totalSales: 0,
    totalBeats: 0,
    totalDownloads: 0,
    beats: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      // Fetch beats
      const { data: beats, error: beatsError } = await supabase
        .from('beats')
        .select('id, title, bpm, price, created_at');
      
      if (beatsError) throw beatsError;

      // Fetch total sales
      const { data: sales, error: salesError } = await supabase
        .from('purchases')
        .select('amount')
        .eq('status', 'completed');
      
      if (salesError) throw salesError;

      // Calculate totals
      const totalSales = sales?.reduce((sum, sale) => sum + Number(sale.amount), 0) || 0;
      const totalBeats = beats?.length || 0;
      
      // For now, using purchases as downloads
      const { count: totalDownloads } = await supabase
        .from('purchases')
        .select('*', { count: 'exact' });

      setData({
        totalSales,
        totalBeats,
        totalDownloads: totalDownloads || 0,
        beats: beats || []
      });
    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch admin data',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBeat = async (id: string) => {
    try {
      const { error } = await supabase
        .from('beats')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Beat deleted successfully',
      });

      // Refresh data
      fetchAdminData();
    } catch (error: any) {
      console.error('Delete error:', error);
      toast({
        title: 'Delete failed',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return {
    data,
    isLoading,
    handleDeleteBeat,
    refreshData: fetchAdminData
  };
}