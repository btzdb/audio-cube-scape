import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Upload, Plus, ArrowLeft } from 'lucide-react';

const Admin = () => {
  const tracks = [
    { id: 1, title: 'Summer Vibes', bpm: 128, price: 29.99, sales: 12 },
    { id: 2, title: 'Midnight Dreams', bpm: 140, price: 34.99, sales: 8 },
    { id: 3, title: 'Urban Flow', bpm: 95, price: 24.99, sales: 15 },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Beat Store Admin</h1>
          </div>
          <div className="flex gap-4">
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Beat
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Beat
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">$1,234.56</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Total Beats</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{tracks.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Total Downloads</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">35</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Beats</CardTitle>
            <div className="flex items-center gap-4">
              <Input 
                placeholder="Search beats..." 
                className="max-w-sm bg-gray-700 border-gray-600"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>BPM</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tracks.map((track) => (
                  <TableRow key={track.id}>
                    <TableCell>{track.title}</TableCell>
                    <TableCell>{track.bpm}</TableCell>
                    <TableCell>${track.price}</TableCell>
                    <TableCell>{track.sales}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="destructive" size="sm">Delete</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;