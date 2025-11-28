import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, User, MapPin, Video, Phone, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function Appointments() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBook = () => {
    setIsBookingOpen(false);
    toast({
      title: "Appointment Requested",
      description: "Dr. Jenkins will review your request shortly.",
    });
  };

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Jenkins",
      specialty: "Cardiologist",
      date: "Today, Nov 28",
      time: "10:00 AM",
      type: "Follow-up",
      mode: "In-person",
      location: "Room 304, Main Wing",
      avatar: "https://i.pravatar.cc/150?u=12"
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Dermatologist",
      date: "Tue, Dec 02",
      time: "02:30 PM",
      type: "Consultation",
      mode: "Video Call",
      location: "Online",
      avatar: "https://i.pravatar.cc/150?u=22"
    }
  ];

  return (
    <DashboardLayout role="patient">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Appointments</h1>
            <p className="text-muted-foreground">Manage your visits and schedule new consultations.</p>
          </div>
          <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" /> Book Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Book an Appointment</DialogTitle>
                <DialogDescription>Select a doctor and preferred time slot.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="dermatology">Dermatology</SelectItem>
                      <SelectItem value="general">General Practice</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Doctor</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sarah">Dr. Sarah Jenkins</SelectItem>
                      <SelectItem value="michael">Dr. Michael Chen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Time Preference</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (1PM - 5PM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleBook}>Confirm Booking</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-lg font-semibold">Upcoming Visits</h2>
            {upcomingAppointments.map((apt) => (
              <Card key={apt.id} className="overflow-hidden border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                    <div className="flex-1 flex items-center gap-4">
                      <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-border">
                        <img src={apt.avatar} alt={apt.doctor} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{apt.doctor}</h3>
                        <p className="text-sm text-muted-foreground">{apt.specialty}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="font-normal text-xs gap-1">
                            {apt.mode === "Video Call" ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                            {apt.mode}
                          </Badge>
                          <Badge variant="outline" className="font-normal text-xs">
                            {apt.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-row md:flex-col gap-4 md:gap-2 items-center md:items-end w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <CalendarIcon className="h-4 w-4 text-primary" />
                        {apt.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {apt.time}
                      </div>
                      <div className="flex gap-2 mt-2 w-full md:w-auto">
                        <Button variant="outline" size="sm" className="flex-1">Reschedule</Button>
                        <Button size="sm" className="flex-1">Details</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="pt-8">
              <h2 className="text-lg font-semibold mb-4">Past Visits</h2>
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/20 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground">
                            <User className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">General Checkup</p>
                            <p className="text-xs text-muted-foreground">Dr. Michael Chen • Oct {10 + i}, 2024</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-primary">View Summary</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground border-none">
              <CardContent className="p-6 space-y-4">
                <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Emergency?</h3>
                  <p className="text-primary-foreground/80 text-sm">Call our 24/7 support line for immediate assistance.</p>
                </div>
                <Button variant="secondary" className="w-full text-primary font-bold">Call 911-000-0000</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
