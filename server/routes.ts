import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertPatientSchema, insertDoctorSchema, insertAppointmentSchema, insertHealthMetricSchema, insertMedicalRecordSchema, insertMessageSchema } from "@shared/schema";
import { z } from "zod";
import bcrypt from "bcrypt";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // ============ AUTH ROUTES ============
  
  // Register
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { email, password, role, fullName, specialty, phone } = req.body;
      
      // Validate input
      const userData = insertUserSchema.parse({ email, password, role, fullName });
      
      // Check if user exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create user
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword,
      });
      
      // Create profile based on role
      if (role === "patient") {
        await storage.createPatient({
          userId: user.id,
          phone: phone || null,
          dateOfBirth: null,
          address: null,
          bloodType: null,
          allergies: [],
        });
      } else if (role === "doctor") {
        await storage.createDoctor({
          userId: user.id,
          specialty: specialty || "General Practice",
          phone: phone || null,
          licenseNumber: null,
        });
      }
      
      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(400).json({ error: "Registration failed" });
    }
  });
  
  // Login
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Get user
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      // Verify password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      // Get profile data
      let profile = null;
      if (user.role === "patient") {
        profile = await storage.getPatientByUserId(user.id);
      } else if (user.role === "doctor") {
        profile = await storage.getDoctorByUserId(user.id);
      }
      
      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword, profile });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });
  
  // ============ PATIENT ROUTES ============
  
  app.get("/api/patients/:userId", async (req, res) => {
    try {
      const patient = await storage.getPatientByUserId(req.params.userId);
      if (!patient) {
        return res.status(404).json({ error: "Patient not found" });
      }
      res.json(patient);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch patient" });
    }
  });
  
  app.patch("/api/patients/:id", async (req, res) => {
    try {
      const updated = await storage.updatePatient(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ error: "Patient not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update patient" });
    }
  });
  
  // ============ DOCTOR ROUTES ============
  
  app.get("/api/doctors", async (req, res) => {
    try {
      const doctors = await storage.getAllDoctors();
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch doctors" });
    }
  });
  
  app.get("/api/doctors/:userId", async (req, res) => {
    try {
      const doctor = await storage.getDoctorByUserId(req.params.userId);
      if (!doctor) {
        return res.status(404).json({ error: "Doctor not found" });
      }
      res.json(doctor);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch doctor" });
    }
  });
  
  // ============ APPOINTMENT ROUTES ============
  
  app.get("/api/appointments/patient/:patientId", async (req, res) => {
    try {
      const appointments = await storage.getAppointmentsByPatient(req.params.patientId);
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch appointments" });
    }
  });
  
  app.get("/api/appointments/doctor/:doctorId", async (req, res) => {
    try {
      const appointments = await storage.getAppointmentsByDoctor(req.params.doctorId);
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch appointments" });
    }
  });
  
  app.post("/api/appointments", async (req, res) => {
    try {
      const appointmentData = insertAppointmentSchema.parse(req.body);
      const appointment = await storage.createAppointment(appointmentData);
      res.json(appointment);
    } catch (error) {
      console.error("Create appointment error:", error);
      res.status(400).json({ error: "Failed to create appointment" });
    }
  });
  
  app.patch("/api/appointments/:id", async (req, res) => {
    try {
      const updated = await storage.updateAppointment(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ error: "Appointment not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update appointment" });
    }
  });
  
  app.delete("/api/appointments/:id", async (req, res) => {
    try {
      await storage.deleteAppointment(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete appointment" });
    }
  });
  
  // ============ HEALTH METRICS ROUTES ============
  
  app.get("/api/health-metrics/:patientId", async (req, res) => {
    try {
      const metrics = await storage.getHealthMetricsByPatient(req.params.patientId);
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch health metrics" });
    }
  });
  
  app.post("/api/health-metrics", async (req, res) => {
    try {
      const metricData = insertHealthMetricSchema.parse(req.body);
      const metric = await storage.createHealthMetric(metricData);
      res.json(metric);
    } catch (error) {
      res.status(400).json({ error: "Failed to create health metric" });
    }
  });
  
  // ============ MEDICAL RECORDS ROUTES ============
  
  app.get("/api/medical-records/:patientId", async (req, res) => {
    try {
      const records = await storage.getMedicalRecordsByPatient(req.params.patientId);
      res.json(records);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch medical records" });
    }
  });
  
  app.post("/api/medical-records", async (req, res) => {
    try {
      const recordData = insertMedicalRecordSchema.parse(req.body);
      const record = await storage.createMedicalRecord(recordData);
      res.json(record);
    } catch (error) {
      res.status(400).json({ error: "Failed to create medical record" });
    }
  });
  
  app.delete("/api/medical-records/:id", async (req, res) => {
    try {
      await storage.deleteMedicalRecord(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete medical record" });
    }
  });
  
  // ============ MESSAGE ROUTES ============
  
  app.get("/api/messages/:userId1/:userId2", async (req, res) => {
    try {
      const messages = await storage.getMessagesBetweenUsers(
        req.params.userId1,
        req.params.userId2
      );
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });
  
  app.post("/api/messages", async (req, res) => {
    try {
      const messageData = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(messageData);
      res.json(message);
    } catch (error) {
      res.status(400).json({ error: "Failed to send message" });
    }
  });
  
  app.patch("/api/messages/:id/read", async (req, res) => {
    try {
      await storage.markMessageAsRead(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to mark message as read" });
    }
  });

  return httpServer;
}
