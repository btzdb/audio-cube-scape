import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AdminStatsProps {
  totalSales: number;
  totalBeats: number;
  totalDownloads: number;
}

export function AdminStats({ totalSales, totalBeats, totalDownloads }: AdminStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">${totalSales.toFixed(2)}</p>
        </CardContent>
      </Card>
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Total Beats</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{totalBeats}</p>
        </CardContent>
      </Card>
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Total Downloads</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{totalDownloads}</p>
        </CardContent>
      </Card>
    </div>
  );
}