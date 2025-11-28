import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, MessageSquare, Clock, MoreHorizontal, TrendingUp, Search, Filter } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export default function DoctorDashboard() {
  const patientVisits = [
    { day: "Mon", visits: 12 },
    { day: "Tue", visits: 18 },
    { day: "Wed", visits: 15 },
    { day: "Thu", visits: 22 },
    { day: "Fri", visits: 16 },
    { day: "Sat", visits: 8 },
    { day: "Sun", visits: 4 },
  ];

  return (
    <DashboardLayout role="doctor">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Doctor Dashboard</h1>
            <p className="text-muted-foreground">Overview of your schedule and patient status.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">View Calendar</Button>
            <Button>Create Appointment</Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> +4%
                </span>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Total Patients</p>
                <h3 className="text-2xl font-bold tracking-tight">1,248</h3>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                  <Calendar className="h-5 w-5" />
                </div>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Appointments Today</p>
                <h3 className="text-2xl font-bold tracking-tight">12</h3>
                <p className="text-muted-foreground text-xs mt-1">4 remaining</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <span className="bg-destructive text-destructive-foreground text-xs font-bold px-1.5 py-0.5 rounded-full">3</span>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Unread Messages</p>
                <h3 className="text-2xl font-bold tracking-tight">5</h3>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                  <Clock className="h-5 w-5" />
                </div>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Avg. Consult Time</p>
                <h3 className="text-2xl font-bold tracking-tight">18m</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Patient Table */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>Manage your daily appointments</CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent>
               <div className="flex items-center gap-4 mb-6">
                 <div className="relative flex-1">
                   <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                   <Input placeholder="Search patient..." className="pl-9" />
                 </div>
                 <Button variant="outline" size="icon">
                   <Filter className="h-4 w-4" />
                 </Button>
               </div>

               <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Alex Morgan", time: "09:00 AM", type: "Check-up", status: "Completed", img: "https://i.pravatar.cc/150?u=1" },
                    { name: "Sarah Miller", time: "10:30 AM", type: "Consultation", status: "In Progress", img: "https://i.pravatar.cc/150?u=2" },
                    { name: "James Wilson", time: "02:00 PM", type: "Follow-up", status: "Upcoming", img: "https://i.pravatar.cc/150?u=3" },
                    { name: "Emma Davis", time: "03:15 PM", type: "Emergency", status: "Upcoming", img: "https://i.pravatar.cc/150?u=4" },
                  ].map((patient, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={patient.img} />
                            <AvatarFallback>{patient.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          {patient.name}
                        </div>
                      </TableCell>
                      <TableCell>{patient.time}</TableCell>
                      <TableCell>{patient.type}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={patient.status === "Upcoming" ? "outline" : patient.status === "In Progress" ? "default" : "secondary"}
                          className="font-normal"
                        >
                          {patient.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="text-primary">Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Weekly Stats Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Patient Visits</CardTitle>
              <CardDescription>Weekly overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={patientVisits}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="day" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis hide />
                    <Tooltip 
                      cursor={{ fill: "hsl(var(--muted)/0.3)" }}
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        borderColor: "hsl(var(--border))", 
                        borderRadius: "var(--radius)" 
                      }}
                    />
                    <Bar 
                      dataKey="visits" 
                      fill="hsl(var(--primary))" 
                      radius={[4, 4, 0, 0]} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">New Patients</p>
                  <span className="font-bold">18</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Returning</p>
                  <span className="font-bold">45</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
