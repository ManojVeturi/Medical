import { 
  User, Calendar, Activity, MessageSquare, FileText, 
  Settings, LogOut, Bell, Search, Menu, X, ChevronRight, Home 
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Phone, Mail, MessageCircle } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role?: "patient" | "doctor";
}

export function DashboardLayout({ children, role = "patient" }: DashboardLayoutProps) {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "See you soon!",
    });
    setLocation("/auth/login");
  };

  const patientLinks = [
    { icon: Home, label: "Home Page", href: "/" },
    { icon: Activity, label: "Overview", href: "/dashboard/patient" },
    { icon: Calendar, label: "Appointments", href: "/appointments" },
    { icon: FileText, label: "Medical Records", href: "/records" },
    { icon: MessageSquare, label: "Messages", href: "/messages" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  const doctorLinks = [
    { icon: Home, label: "Home Page", href: "/" },
    { icon: Activity, label: "Overview", href: "/dashboard/doctor" },
    { icon: User, label: "Patients", href: "/patients" },
    { icon: Calendar, label: "Schedule", href: "/appointments" },
    { icon: MessageSquare, label: "Messages", href: "/messages" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  const links = role === "doctor" ? doctorLinks : patientLinks;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-sidebar-border flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
          +
        </div>
        <span className="font-heading font-bold text-xl tracking-tight text-sidebar-foreground">
          MediCare
        </span>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4">
        <nav className="space-y-1">
          {links.map((link) => {
            const isActive = location === link.href;
            return (
              <Link key={link.href} href={link.href}>
                <div
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer
                    ${isActive 
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm" 
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    }
                  `}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <link.icon className={`h-4 w-4 ${isActive ? "text-current" : "text-sidebar-foreground/50"}`} />
                  {link.label}
                  {isActive && <ChevronRight className="ml-auto h-4 w-4 opacity-50" />}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <div className="bg-sidebar-accent/50 rounded-lg p-4">
          <h4 className="text-xs font-semibold uppercase text-sidebar-foreground/60 mb-2">Need Help?</h4>
          <p className="text-xs text-sidebar-foreground/50 mb-3">Contact support for any technical issues.</p>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="w-full text-xs h-8 bg-sidebar">
                Support
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Contact Support</DialogTitle>
                <DialogDescription>
                  Our team is available 24/7 to assist you with any issues.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => toast({ title: "Calling Support...", description: "Connecting you to the next available agent." })}>
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Call Us</h4>
                    <p className="text-sm text-muted-foreground">+1 (800) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => toast({ title: "Email Client Opened", description: "Drafting a new support ticket." })}>
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email Support</h4>
                    <p className="text-sm text-muted-foreground">help@medicare.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => setLocation("/messages")}>
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Live Chat</h4>
                    <p className="text-sm text-muted-foreground">Chat with an agent now</p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 border-r border-sidebar-border bg-sidebar fixed inset-y-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="p-0 w-64 bg-sidebar border-r border-sidebar-border">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen transition-all duration-300 ease-in-out">
        {/* Header */}
        <header className="sticky top-0 z-20 h-16 bg-background/80 backdrop-blur-md border-b border-border px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden -ml-2"
              onClick={() => setIsMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="relative hidden sm:block w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="w-full h-9 pl-9 pr-4 rounded-full bg-muted/50 border-none focus:ring-2 focus:ring-primary/20 text-sm transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative rounded-full">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-destructive rounded-full border-2 border-background"></span>
            </Button>

            <div className="h-8 w-[1px] bg-border mx-1 hidden sm:block"></div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="pl-2 pr-1 py-1 rounded-full h-auto hover:bg-muted/50">
                  <div className="flex items-center gap-2 text-left">
                    <Avatar className="h-8 w-8 border border-border">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:block">
                      <p className="text-sm font-medium leading-none">Dr. John Doe</p>
                      <p className="text-xs text-muted-foreground mt-0.5 capitalize">{role}</p>
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive cursor-pointer focus:text-destructive" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-x-hidden">
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
