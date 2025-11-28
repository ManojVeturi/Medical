import { addDays, subDays, format } from "date-fns";

// Types
export interface User {
  id: string;
  name: string;
  role: "doctor" | "patient";
  avatar?: string;
  specialty?: string; // for doctors
  email: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  date: Date;
  type: "Check-up" | "Consultation" | "Follow-up" | "Emergency";
  status: "upcoming" | "completed" | "cancelled";
  notes?: string;
}

export interface HealthMetric {
  date: string;
  value: number;
  unit: string;
  status: "normal" | "warning" | "critical";
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

// Mock Data
export const currentUser: User = {
  id: "u1",
  name: "Alex Morgan",
  role: "patient",
  email: "alex.morgan@example.com",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60",
};

export const currentDoctor: User = {
  id: "d1",
  name: "Dr. Sarah Jenkins",
  role: "doctor",
  specialty: "Cardiology",
  email: "dr.jenkins@hospital.com",
  avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop&q=60",
};

export const appointments: Appointment[] = [
  {
    id: "a1",
    patientName: "Alex Morgan",
    doctorName: "Dr. Sarah Jenkins",
    date: addDays(new Date(), 2),
    type: "Check-up",
    status: "upcoming",
  },
  {
    id: "a2",
    patientName: "Alex Morgan",
    doctorName: "Dr. Michael Chen",
    date: subDays(new Date(), 14),
    type: "Consultation",
    status: "completed",
  },
  {
    id: "a3",
    patientName: "Alex Morgan",
    doctorName: "Dr. Sarah Jenkins",
    date: addDays(new Date(), 10),
    type: "Follow-up",
    status: "upcoming",
  },
];

export const bloodPressureData: HealthMetric[] = [
  { date: "Mon", value: 120, unit: "mmHg", status: "normal" },
  { date: "Tue", value: 122, unit: "mmHg", status: "normal" },
  { date: "Wed", value: 118, unit: "mmHg", status: "normal" },
  { date: "Thu", value: 135, unit: "mmHg", status: "warning" },
  { date: "Fri", value: 125, unit: "mmHg", status: "normal" },
  { date: "Sat", value: 120, unit: "mmHg", status: "normal" },
  { date: "Sun", value: 119, unit: "mmHg", status: "normal" },
];

export const heartRateData: HealthMetric[] = [
  { date: "Mon", value: 72, unit: "bpm", status: "normal" },
  { date: "Tue", value: 75, unit: "bpm", status: "normal" },
  { date: "Wed", value: 70, unit: "bpm", status: "normal" },
  { date: "Thu", value: 85, unit: "bpm", status: "warning" },
  { date: "Fri", value: 74, unit: "bpm", status: "normal" },
  { date: "Sat", value: 71, unit: "bpm", status: "normal" },
  { date: "Sun", value: 68, unit: "bpm", status: "normal" },
];

export const recentActivities = [
  { id: 1, type: "appointment", title: "Cardiology Check-up", date: "2 days ago", status: "Completed" },
  { id: 2, type: "lab", title: "Blood Test Results", date: "3 days ago", status: "Available" },
  { id: 3, type: "prescription", title: "Prescription Renewed", date: "1 week ago", status: "Sent to Pharmacy" },
];
