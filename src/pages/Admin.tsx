import React from 'react';
import { AdminRoute } from '@/components/auth/AdminRoute';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminStats } from '@/components/admin/AdminStats';
import { BeatsTable } from '@/components/admin/BeatsTable';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Admin = () => {
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
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
    } catch (error: any) {
      console.error('Delete error:', error);
      toast({
        title: 'Delete failed',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <AdminRoute>
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <AdminHeader title="Beat Store Admin" />
          
          <AdminStats
            totalSales={1234.56}
            totalBeats={10}
            totalDownloads={35}
          />

          <BeatsTable
            beats={[]}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </AdminRoute>
  );
};

export default Admin;