
'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { gradesData } from '@/lib/data';
import { Info, Lock, AlertTriangle } from 'lucide-react';

export default function GradesPage() {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-headline font-bold mb-6">Grades</h1>

      <Alert className="mb-8 bg-yellow-50 border-yellow-200 text-yellow-800">
        <AlertTriangle className="h-5 w-5 !text-yellow-500" />
        <AlertDescription className="flex items-center gap-2">
            <span className="bg-yellow-400 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold">1</span>
            You have 1 assessment coming up. Be sure to submit it before the deadline.
        </AlertDescription>
      </Alert>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-2/4">Item</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Grade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gradesData.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-primary">{assignment.title}</p>
                      <p className="text-sm text-muted-foreground">Graded Assignment</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-muted-foreground" />
                    <span>{assignment.status}</span>
                  </div>
                </TableCell>
                <TableCell>{assignment.dueDate}</TableCell>
                <TableCell>{assignment.weight > 0 ? `${assignment.weight}%` : '0%'}</TableCell>
                <TableCell>{assignment.grade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
