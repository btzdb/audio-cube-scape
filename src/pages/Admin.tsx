import React from 'react';
import { AdminRoute } from '@/components/auth/AdminRoute';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminStats } from '@/components/admin/AdminStats';
import { BeatsTable } from '@/components/admin/BeatsTable';
import { useAdminData } from '@/hooks/useAdminData';

const Admin = () => {
  const { data, isLoading, handleDeleteBeat } = useAdminData();

  if (isLoading) {
    return (
      <AdminRoute>
        <div className="min-h-screen bg-gray-900 text-white p-8 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-purple-500" />
        </div>
      </AdminRoute>
    );
  }

  return (
    <AdminRoute>
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <AdminHeader title="Beat Store Admin" />
          
          <AdminStats
            totalSales={data.totalSales}
            totalBeats={data.totalBeats}
            totalDownloads={data.totalDownloads}
          />

          <BeatsTable
            beats={data.beats}
            onDelete={handleDeleteBeat}
          />
        </div>
      </div>
    </AdminRoute>
  );
};

export default Admin;