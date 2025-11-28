import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Login from "@/pages/auth/Login";
import PatientDashboard from "@/pages/dashboard/PatientDashboard";
import DoctorDashboard from "@/pages/dashboard/DoctorDashboard";
import Appointments from "@/pages/appointments/Appointments";
import MedicalRecords from "@/pages/records/MedicalRecords";
import Messages from "@/pages/messages/Messages";
import Settings from "@/pages/Settings";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/register" component={Login} /> 
      
      {/* Patient Routes */}
      <Route path="/dashboard/patient" component={PatientDashboard} />
      <Route path="/appointments" component={Appointments} />
      <Route path="/records" component={MedicalRecords} />
      <Route path="/messages" component={Messages} />
      <Route path="/settings" component={Settings} />
      
      {/* Doctor Routes - reusing some components for mockup purposes */}
      <Route path="/dashboard/doctor" component={DoctorDashboard} />
      <Route path="/patients" component={DoctorDashboard} /> {/* Redirect to dashboard for now */}
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
