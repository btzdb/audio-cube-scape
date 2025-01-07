import React from 'react';
import { AdminRoute } from '@/components/auth/AdminRoute';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminStats } from '@/components/admin/AdminStats';
import { BeatsTable } from '@/components/admin/BeatsTable';
import { useAdminData } from '@/hooks/useAdminData';
import { AuthModal } from '@/components/auth/AuthModal';
import { useProfile } from '@/hooks/useProfile';
import { Navigate } from 'react-router-dom';

const Admin = () => {
  const { data, isLoading, handleDeleteBeat } = useAdminData();
  const { profile, isLoading: profileLoading } = useProfile();
  const [showAuth, setShowAuth] = React.useState(false);

  // Show loading state while checking profile
  if (profileLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-purple-500" />
      </div>
    );
  }

  // If not logged in, show auth modal
  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Admin Access Required</h1>
          <p className="mb-6">Please sign in to access the admin dashboard.</p>
          <button
            onClick={() => setShowAuth(true)}
            className="px-4 py-2 bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Sign In
          </button>
          <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
        </div>
      </div>
    );
  }

  // If logged in but not admin, redirect to home
  if (profile.role !== 'admin') {
    return <Navigate to="/" replace />;
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