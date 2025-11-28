import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation, Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Stethoscope, User } from "lucide-react";

export default function Login() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const isRegister = location === "/auth/register";

  const handleAuth = (role: string) => {
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: isRegister ? "Account Created" : "Welcome back!",
        description: isRegister ? "Your account has been created successfully." : "You have successfully logged in.",
      });
      setLocation(role === "doctor" ? "/dashboard/doctor" : "/dashboard/patient");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-3xl"></div>
      </div>

      <Card className="w-full max-w-md z-10 border-white/50 bg-white/80 backdrop-blur-xl shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="h-12 w-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
            <span className="text-primary-foreground font-bold text-2xl">+</span>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            {isRegister ? "Create an Account" : "MediCare Connect"}
          </CardTitle>
          <CardDescription>
            {isRegister ? "Enter your details to get started" : "Enter your credentials to access your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="patient" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="patient">Patient</TabsTrigger>
              <TabsTrigger value="doctor">Doctor</TabsTrigger>
            </TabsList>
            
            <TabsContent value="patient">
              <form onSubmit={(e) => { e.preventDefault(); handleAuth("patient"); }} className="space-y-4">
                {isRegister && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fname-patient">First Name</Label>
                      <Input id="fname-patient" placeholder="Alex" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lname-patient">Last Name</Label>
                      <Input id="lname-patient" placeholder="Morgan" required />
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email-patient">Email</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="email-patient" type="email" placeholder="alex@example.com" className="pl-9" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-patient">Password</Label>
                  <Input id="password-patient" type="password" required />
                </div>
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading 
                    ? (isRegister ? "Creating account..." : "Signing in...") 
                    : (isRegister ? "Create Patient Account" : "Sign in as Patient")
                  }
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="doctor">
              <form onSubmit={(e) => { e.preventDefault(); handleAuth("doctor"); }} className="space-y-4">
                 {isRegister && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fname-doctor">First Name</Label>
                      <Input id="fname-doctor" placeholder="Sarah" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lname-doctor">Last Name</Label>
                      <Input id="lname-doctor" placeholder="Jenkins" required />
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email-doctor">Work Email</Label>
                  <div className="relative">
                    <Stethoscope className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="email-doctor" type="email" placeholder="dr.smith@hospital.com" className="pl-9" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-doctor">Password</Label>
                  <Input id="password-doctor" type="password" required />
                </div>
                 {isRegister && (
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Specialty</Label>
                    <Input id="specialty" placeholder="Cardiology" required />
                  </div>
                )}
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading 
                    ? (isRegister ? "Creating account..." : "Signing in...") 
                    : (isRegister ? "Create Doctor Account" : "Sign in as Doctor")
                  }
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 text-center text-sm text-muted-foreground">
          <div>
            {isRegister ? "Already have an account? " : "Don't have an account? "}
            <Link href={isRegister ? "/auth/login" : "/auth/register"} className="text-primary hover:underline font-medium">
              {isRegister ? "Sign in" : "Register"}
            </Link>
          </div>
          <Link href="/" className="text-xs hover:text-foreground">Back to Home</Link>
        </CardFooter>
      </Card>
    </div>
  );
}
