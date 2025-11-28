import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation, Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Stethoscope, User } from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function Login() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const { login, register, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [phone, setPhone] = useState("");
  
  const isRegisterMode = location === "/auth/register";

  const handlePatientAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegisterMode) {
        await register(email, password, "patient", `${firstName} ${lastName}`, undefined, phone);
      } else {
        await login(email, password, "patient");
      }
      toast({
        title: isRegisterMode ? "Account Created" : "Welcome back!",
        description: isRegisterMode ? "Your account has been created successfully." : "You have successfully logged in.",
      });
      setLocation("/dashboard/patient");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Authentication failed",
        variant: "destructive",
      });
    }
  };

  const handleDoctorAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegisterMode) {
        await register(email, password, "doctor", `${firstName} ${lastName}`, specialty, phone);
      } else {
        await login(email, password, "doctor");
      }
      toast({
        title: isRegisterMode ? "Account Created" : "Welcome back!",
        description: isRegisterMode ? "Your account has been created successfully." : "You have successfully logged in.",
      });
      setLocation("/dashboard/doctor");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Authentication failed",
        variant: "destructive",
      });
    }
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
            {isRegisterMode ? "Create an Account" : "MediCare Connect"}
          </CardTitle>
          <CardDescription>
            {isRegisterMode ? "Enter your details to get started" : "Enter your credentials to access your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="patient" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="patient">Patient</TabsTrigger>
              <TabsTrigger value="doctor">Doctor</TabsTrigger>
            </TabsList>
            
            <TabsContent value="patient">
              <form onSubmit={handlePatientAuth} className="space-y-4">
                {isRegisterMode && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fname-patient">First Name</Label>
                      <Input id="fname-patient" placeholder="Alex" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lname-patient">Last Name</Label>
                      <Input id="lname-patient" placeholder="Morgan" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email-patient">Email</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="email-patient" type="email" placeholder="alex@example.com" className="pl-9" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-patient">Password</Label>
                  <Input id="password-patient" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {isRegisterMode && (
                  <div className="space-y-2">
                    <Label htmlFor="phone-patient">Phone (optional)</Label>
                    <Input id="phone-patient" type="tel" placeholder="+1 (555) 000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                )}
                <Button className="w-full" type="submit" disabled={isLoading} data-testid="button-submit-patient">
                  {isLoading 
                    ? (isRegisterMode ? "Creating account..." : "Signing in...") 
                    : (isRegisterMode ? "Create Patient Account" : "Sign in as Patient")
                  }
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="doctor">
              <form onSubmit={handleDoctorAuth} className="space-y-4">
                 {isRegisterMode && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fname-doctor">First Name</Label>
                      <Input id="fname-doctor" placeholder="Sarah" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lname-doctor">Last Name</Label>
                      <Input id="lname-doctor" placeholder="Jenkins" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email-doctor">Work Email</Label>
                  <div className="relative">
                    <Stethoscope className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="email-doctor" type="email" placeholder="dr.smith@hospital.com" className="pl-9" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-doctor">Password</Label>
                  <Input id="password-doctor" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                 {isRegisterMode && (
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Specialty</Label>
                    <Input id="specialty" placeholder="Cardiology" value={specialty} onChange={(e) => setSpecialty(e.target.value)} required />
                  </div>
                )}
                {isRegisterMode && (
                  <div className="space-y-2">
                    <Label htmlFor="phone-doctor">Phone (optional)</Label>
                    <Input id="phone-doctor" type="tel" placeholder="+1 (555) 000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                )}
                <Button className="w-full" type="submit" disabled={isLoading} data-testid="button-submit-doctor">
                  {isLoading 
                    ? (isRegisterMode ? "Creating account..." : "Signing in...") 
                    : (isRegisterMode ? "Create Doctor Account" : "Sign in as Doctor")
                  }
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 text-center text-sm text-muted-foreground">
          <div>
            {isRegisterMode ? "Already have an account? " : "Don't have an account? "}
            <Link href={isRegisterMode ? "/auth/login" : "/auth/register"} className="text-primary hover:underline font-medium">
              {isRegisterMode ? "Sign in" : "Register"}
            </Link>
          </div>
          <Link href="/" className="text-xs hover:text-foreground">Back to Home</Link>
        </CardFooter>
      </Card>
    </div>
  );
}
