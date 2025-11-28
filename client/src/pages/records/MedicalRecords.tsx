import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, Search, Filter, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth";
import { useEffect, useState } from "react";
import { getMedicalRecords } from "@/lib/api";
import { useLocation } from "wouter";

export default function MedicalRecords() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLocation("/auth/login");
      return;
    }
    
    const loadData = async () => {
      try {
        const patientId = (user as any).patientId || user.id;
        const recordsRes = await getMedicalRecords(patientId);
        setRecords(recordsRes);
      } catch (err) {
        console.error("Error loading records:", err);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [user, setLocation]);

  return (
    <DashboardLayout role="patient">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Medical Records</h1>
            <p className="text-muted-foreground">Access and download your medical history securely.</p>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" className="gap-2">
               <Upload className="h-4 w-4" /> Upload Document
             </Button>
             <Button className="gap-2">
               <Download className="h-4 w-4" /> Download All
             </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="all">All Records</TabsTrigger>
              <TabsTrigger value="labs">Lab Results</TabsTrigger>
              <TabsTrigger value="imaging">Imaging</TabsTrigger>
              <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search records..." className="pl-9" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {records.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          No medical records found
                        </TableCell>
                      </TableRow>
                    ) : (
                      records.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                                <FileText className="h-5 w-5" />
                              </div>
                              <div>
                                <p>{record.title}</p>
                                <p className="text-xs text-muted-foreground">{record.fileUrl ? "File attached" : "No file"}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{new Date(record.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>{record.doctorId ? "Your Doctor" : "System"}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="font-normal">
                              {record.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              </Button>
                              {record.fileUrl && (
                                <Button variant="ghost" size="icon">
                                  <Download className="h-4 w-4 text-muted-foreground" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Placeholder content for other tabs */}
          <TabsContent value="labs">
             <div className="p-8 text-center text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
               No lab results found matching current filters.
             </div>
          </TabsContent>
          <TabsContent value="imaging">
             <div className="p-8 text-center text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
               No imaging records found matching current filters.
             </div>
          </TabsContent>
          <TabsContent value="prescriptions">
             <div className="p-8 text-center text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
               No prescription records found matching current filters.
             </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
