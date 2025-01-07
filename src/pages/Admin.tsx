import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '@/hooks/useProfile';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminStats } from '@/components/admin/AdminStats';
import { BeatsTable } from '@/components/admin/BeatsTable';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile, isLoading, error } = useProfile();

  useEffect(() => {
    // Add detailed console logs for debugging
    console.log('Admin page - Profile:', profile);
    console.log('Admin page - Loading:', isLoading);
    console.log('Admin page - Error:', error);

    if (!isLoading) {
      if (error) {
        toast({
          title: "Error",
          description: "Failed to load profile: " + error.message,
          variant: "destructive"
        });
        navigate('/');
        return;
      }

      if (!profile) {
        toast({
          title: "Access Denied",
          description: "Please sign in to access this page",
          variant: "destructive"
        });
        navigate('/');
        return;
      }

      if (profile.role !== 'admin') {
        toast({
          title: "Access Denied",
          description: "You need admin privileges to access this page",
          variant: "destructive"
        });
        navigate('/');
        return;
      }
    }
  }, [profile, isLoading, error, navigate, toast]);

  // Show loading state while checking permissions
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  // If not admin, don't render the admin content
  if (!profile || profile.role !== 'admin') {
    return null;
  }

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
  );
};

export default Admin;