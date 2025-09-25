import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Layout } from '@/components/layout/Layout';
import { uploadAPI } from '@/services/api';
import type { DistributedData } from '@/types';
import { Upload as UploadIcon } from 'lucide-react';

export default function Upload() {
  const [loading, setLoading] = useState(false);
  const [distributedData, setDistributedData] = useState<DistributedData[]>([]);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    const file = data.file[0];
    
    if (!file) {
      toast.error('Please select a file');
      return;
    }

    const allowedTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload only CSV, XLS, or XLSX files');
      return;
    }

    setLoading(true);
    try {
      const response = await uploadAPI.uploadCSV(file);
      setDistributedData(response.distributedData);
      toast.success('File uploaded and distributed successfully!');
      reset();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Upload & Distribute">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UploadIcon className="h-5 w-5" />
              Upload CSV File
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file">Select File (CSV, XLS, XLSX)</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".csv,.xls,.xlsx"
                  {...register('file', { required: true })}
                />
                <p className="text-sm text-muted-foreground">
                  File should contain: FirstName, Phone, Notes columns
                </p>
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? 'Uploading...' : 'Upload & Distribute'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {distributedData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Distribution Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {distributedData.map((agent) => (
                  <div key={agent.agentId} className="space-y-2">
                    <h3 className="font-medium">
                      {agent.agentName} ({agent.data.length} records)
                    </h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>First Name</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Notes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {agent.data.map((record, index) => (
                          <TableRow key={index}>
                            <TableCell>{record.firstName}</TableCell>
                            <TableCell>{record.phone}</TableCell>
                            <TableCell>{record.notes}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}