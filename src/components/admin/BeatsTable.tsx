import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';

interface Beat {
  id: string;
  title: string;
  bpm: number | null;
  price: number;
  created_at: string;
}

interface BeatsTableProps {
  beats: Beat[];
  onDelete: (id: string) => void;
}

export function BeatsTable({ beats, onDelete }: BeatsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>BPM</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Uploaded</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {beats.map((beat) => (
          <TableRow key={beat.id}>
            <TableCell>{beat.title}</TableCell>
            <TableCell>{beat.bpm || 'N/A'}</TableCell>
            <TableCell>${beat.price}</TableCell>
            <TableCell>{new Date(beat.created_at).toLocaleDateString()}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => onDelete(beat.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}