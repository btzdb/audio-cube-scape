import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useProfile } from '@/hooks/useProfile';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminStats } from '@/components/admin/AdminStats';
import { BeatsTable } from '@/components/admin/BeatsTable';

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile, isLoading } = useProfile();
  const [beats, setBeats] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // Check if user is authenticated and has admin role
    if (!isLoading && (!profile || profile.role !== 'admin')) {
      toast({
        title: "Access Denied",
        description: "You need admin privileges to access this page.",
        variant: "destructive"
      });
      navigate('/');
      return;
    }

    fetchBeats();
  }, [profile, isLoading, navigate]);

  const fetchBeats = async () => {
    try {
      const { data, error } = await supabase
        .from('beats')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBeats(data || []);
    } catch (error) {
      console.error('Error fetching beats:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch beats',
        variant: 'destructive',
      });
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      setUploading(true);
      
      // Sanitize filename
      const timestamp = new Date().getTime();
      const sanitizedFileName = file.name.replace(/[^\x00-\x7F]/g, '');
      const fileExt = sanitizedFileName.split('.').pop();
      const filePath = `${timestamp}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('beats')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('beats')
        .getPublicUrl(filePath);

      // Add to beats table
      const { error: dbError } = await supabase
        .from('beats')
        .insert({
          title: file.name.split('.')[0],
          audio_url: publicUrl,
          price: 29.99,
          artist_id: profile?.id,
        });

      if (dbError) throw dbError;

      toast({
        title: 'Success',
        description: 'Beat uploaded successfully',
      });

      fetchBeats();
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

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

      setBeats(beats.filter(beat => beat.id !== id));
    } catch (error: any) {
      console.error('Delete error:', error);
      toast({
        title: 'Delete failed',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <AdminHeader title="Beat Store Admin" />

        <div className="flex gap-4 justify-end">
          <label className="cursor-pointer">
            <Input
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors cursor-pointer">
              <Upload className="h-4 w-4" />
              {uploading ? 'Uploading...' : 'Upload Beat'}
            </div>
          </label>
        </div>

        <AdminStats
          totalSales={1234.56}
          totalBeats={beats.length}
          totalDownloads={35}
        />

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Beats</CardTitle>
            <Input 
              placeholder="Search beats..." 
              className="max-w-sm bg-gray-700 border-gray-600"
            />
          </CardHeader>
          <CardContent>
            <BeatsTable beats={beats} onDelete={handleDelete} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;