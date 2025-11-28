import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Shield, Activity, Clock } from "lucide-react";
import heroImage from "@assets/generated_images/modern_healthcare_technology_concept.png";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-heading font-bold text-xl text-primary">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
              +
            </div>
            MediCare
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#testimonials" className="hover:text-foreground transition-colors">Testimonials</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">For Doctors</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/auth/login">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              New: AI-Powered Health Insights
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
              Healthcare <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Reimagined.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
              Experience a new standard of medical care with our integrated digital platform. Connect with top specialists, track your health, and manage records securely.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/login">
                <Button size="lg" className="h-12 px-8 text-base">
                  Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            <Link href="/auth/login">
              <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                View Demo
              </Button>
            </Link>
            </div>
            
            <div className="pt-8 flex items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" /> HIPAA Compliant
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" /> 24/7 Support
              </div>
            </div>
          </div>
          
          <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-3xl blur-2xl opacity-50"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20">
               <img 
                src={heroImage} 
                alt="Doctor using digital dashboard" 
                className="w-full h-auto object-cover"
              />
              
              {/* Floating UI Card */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50 max-w-xs animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Health Score</p>
                    <p className="text-xs text-muted-foreground">Updated just now</p>
                  </div>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-foreground">98%</span>
                  <span className="text-xs text-green-600 font-medium mb-1">↑ 2.4%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-muted/30" id="features">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need for better health</h2>
            <p className="text-muted-foreground text-lg">Comprehensive tools for patients and healthcare providers, all in one secure place.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Activity,
                title: "Real-time Monitoring",
                desc: "Track vital signs and health metrics with easy-to-read charts and daily logs."
              },
              {
                icon: Shield,
                title: "Secure Records",
                desc: "Your medical history, prescriptions, and lab results stored with bank-level encryption."
              },
              {
                icon: Clock,
                title: "Instant Scheduling",
                desc: "Book appointments with your preferred specialists in seconds, 24/7."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-card p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-all hover:-translate-y-1">
                <div className="h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-background" id="testimonials">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by thousands</h2>
            <p className="text-muted-foreground text-lg">Hear from patients and doctors who have transformed their healthcare experience.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-muted/20 p-8 rounded-2xl border border-border/50">
              <div className="flex gap-1 text-amber-500 mb-4">★★★★★</div>
              <p className="text-lg italic mb-6">"MediCare has completely changed how I manage my chronic condition. I can share my logs with my doctor instantly."</p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100"></div>
                <div>
                  <p className="font-bold">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">Patient since 2023</p>
                </div>
              </div>
            </div>
            <div className="bg-muted/20 p-8 rounded-2xl border border-border/50">
              <div className="flex gap-1 text-amber-500 mb-4">★★★★★</div>
              <p className="text-lg italic mb-6">"The streamlined dashboard saves me hours of administrative work every week. I can focus more on patient care."</p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-100"></div>
                <div>
                  <p className="font-bold">Dr. James Wilson</p>
                  <p className="text-sm text-muted-foreground">Cardiologist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Doctors / Pricing Section */}
      <section className="py-24 bg-primary text-primary-foreground" id="pricing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Empower your medical practice</h2>
              <p className="text-primary-foreground/80 text-lg mb-8">
                Join the network of top-tier healthcare providers using MediCare to deliver better patient outcomes.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Streamlined patient onboarding",
                  "Integrated telehealth video calls",
                  "Automated appointment reminders",
                  "Secure digital prescriptions"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/auth/register">
                <Button size="lg" variant="secondary" className="h-12 px-8 font-semibold">
                  Partner with Us
                </Button>
              </Link>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
               <h3 className="text-2xl font-bold mb-2">Professional Plan</h3>
               <div className="text-4xl font-bold mb-4">$49<span className="text-lg font-normal opacity-80">/mo</span></div>
               <p className="text-primary-foreground/70 mb-8">Everything you need to run a modern digital clinic.</p>
               <Button className="w-full bg-white text-primary hover:bg-white/90 font-bold h-12">
                 Start Free Trial
               </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="mt-auto py-12 border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-heading font-bold text-xl text-foreground">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
              +
            </div>
            MediCare
          </div>
          <p className="text-sm text-muted-foreground">© 2024 MediCare Connect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
