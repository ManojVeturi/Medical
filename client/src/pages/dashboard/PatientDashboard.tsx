import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MoreHorizontal, TrendingUp, Activity, Droplets } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { bloodPressureData, appointments, recentActivities } from "@/lib/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function PatientDashboard() {
  // Get next appointment
  const nextAppointment = appointments.find(a => a.status === "upcoming");

  return (
    <DashboardLayout role="patient">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Patient Overview</h1>
            <p className="text-muted-foreground">Welcome back, Alex. Here's your health summary.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button>Book Appointment</Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-none shadow-lg text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">Next</span>
              </div>
              <div>
                <p className="text-blue-100 text-sm mb-1">Upcoming Appointment</p>
                <h3 className="text-2xl font-bold tracking-tight truncate">Dr. Sarah Jenkins</h3>
                <p className="text-blue-100 text-sm mt-1 opacity-90">Tomorrow, 10:00 AM</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center">
                  <Activity className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> Normal
                </span>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Heart Rate</p>
                <h3 className="text-2xl font-bold tracking-tight">72 <span className="text-sm font-normal text-muted-foreground">bpm</span></h3>
                <p className="text-muted-foreground text-xs mt-1">Last updated: 2 hrs ago</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center">
                  <Droplets className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">Normal</span>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Blood Pressure</p>
                <h3 className="text-2xl font-bold tracking-tight">120/80</h3>
                <p className="text-muted-foreground text-xs mt-1">Last updated: Yesterday</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
                  <Clock className="h-5 w-5" />
                </div>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Pending Results</p>
                <h3 className="text-2xl font-bold tracking-tight">1</h3>
                <p className="text-muted-foreground text-xs mt-1">Blood Work Panel</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart Area */}
          <Card className="lg:col-span-2 h-full">
            <CardHeader>
              <CardTitle>Health Trends</CardTitle>
              <CardDescription>Blood pressure monitoring over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={bloodPressureData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorBp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="date" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        borderColor: "hsl(var(--border))", 
                        borderRadius: "var(--radius)" 
                      }}
                      itemStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorBp)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity Feed */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest medical updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="relative mt-1">
                      <div className="h-2 w-2 rounded-full bg-primary ring-4 ring-primary/20"></div>
                      {index !== recentActivities.length - 1 && (
                        <div className="absolute top-4 left-[3px] h-full w-[2px] bg-border"></div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{activity.title}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{activity.date}</span>
                        <Badge variant="outline" className="text-[10px] h-5 font-normal">{activity.status}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full mt-4 text-xs">View Full History</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Doctors Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Your Care Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2].map((i) => (
              <Card key={i} className="hover:shadow-md transition-all cursor-pointer group">
                <CardContent className="p-4 flex items-center gap-4">
                  <Avatar className="h-14 w-14 border-2 border-border group-hover:border-primary transition-colors">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${i + 10}`} />
                    <AvatarFallback>DR</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">Dr. Sarah Jenkins</h4>
                    <p className="text-xs text-muted-foreground">Cardiologist</p>
                    <div className="mt-2 flex gap-2">
                      <Button size="sm" variant="secondary" className="h-7 text-xs">Message</Button>
                      <Button size="sm" variant="outline" className="h-7 text-xs">Schedule</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
