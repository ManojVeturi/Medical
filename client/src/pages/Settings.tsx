import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, Lock, User, Moon, Globe, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useState } from "react";

export default function Settings() {
  const { toast } = useToast();
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [firstName, setFirstName] = useState(user?.fullName.split(" ")[0] || "");
  const [lastName, setLastName] = useState(user?.fullName.split(" ")[1] || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSave = () => {
    if (!firstName || !lastName) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated.",
    });
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    setLocation("/");
  };

  return (
    <DashboardLayout role="patient">
      <div className="space-y-8 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and application settings.</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" /> Profile Information
              </CardTitle>
              <CardDescription>Update your personal details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label data-testid="label-first-name">First Name</Label>
                  <Input data-testid="input-first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label data-testid="label-last-name">Last Name</Label>
                  <Input data-testid="input-last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label data-testid="label-email">Email</Label>
                  <Input data-testid="input-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label data-testid="label-role">Account Type</Label>
                  <Input disabled value={user?.role === "patient" ? "Patient" : "Doctor"} className="bg-muted" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" /> Notifications
              </CardTitle>
              <CardDescription>Choose what you want to be notified about.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Appointment Reminders</Label>
                  <p className="text-sm text-muted-foreground">Receive emails about upcoming visits.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Test Results</Label>
                  <p className="text-sm text-muted-foreground">Get notified when new lab results are available.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">Receive news and wellness tips.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-900">
                <LogOut className="h-5 w-5" /> Sign Out
              </CardTitle>
              <CardDescription className="text-red-800">Securely end your session.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleLogout} variant="destructive" className="w-full md:w-auto" data-testid="button-logout">
                Sign Out
              </Button>
            </CardContent>
          </Card>
          
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setLocation(user?.role === "patient" ? "/dashboard/patient" : "/dashboard/doctor")} data-testid="button-cancel">Cancel</Button>
            <Button onClick={handleSave} size="lg" data-testid="button-save">Save Changes</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
