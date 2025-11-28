import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq, and, desc } from "drizzle-orm";
import {
  users,
  patients,
  doctors,
  appointments,
  healthMetrics,
  medicalRecords,
  messages,
  type User,
  type InsertUser,
  type Patient,
  type InsertPatient,
  type Doctor,
  type InsertDoctor,
  type Appointment,
  type InsertAppointment,
  type HealthMetric,
  type InsertHealthMetric,
  type MedicalRecord,
  type InsertMedicalRecord,
  type Message,
  type InsertMessage,
} from "@shared/schema";

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client);

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Patient operations
  getPatient(id: string): Promise<Patient | undefined>;
  getPatientByUserId(userId: string): Promise<Patient | undefined>;
  createPatient(patient: InsertPatient): Promise<Patient>;
  updatePatient(id: string, patient: Partial<InsertPatient>): Promise<Patient | undefined>;
  
  // Doctor operations
  getDoctor(id: string): Promise<Doctor | undefined>;
  getDoctorByUserId(userId: string): Promise<Doctor | undefined>;
  getAllDoctors(): Promise<Doctor[]>;
  createDoctor(doctor: InsertDoctor): Promise<Doctor>;
  updateDoctor(id: string, doctor: Partial<InsertDoctor>): Promise<Doctor | undefined>;
  
  // Appointment operations
  getAppointment(id: string): Promise<Appointment | undefined>;
  getAppointmentsByPatient(patientId: string): Promise<Appointment[]>;
  getAppointmentsByDoctor(doctorId: string): Promise<Appointment[]>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  updateAppointment(id: string, appointment: Partial<InsertAppointment>): Promise<Appointment | undefined>;
  deleteAppointment(id: string): Promise<void>;
  
  // Health metrics operations
  getHealthMetricsByPatient(patientId: string): Promise<HealthMetric[]>;
  createHealthMetric(metric: InsertHealthMetric): Promise<HealthMetric>;
  
  // Medical records operations
  getMedicalRecordsByPatient(patientId: string): Promise<MedicalRecord[]>;
  createMedicalRecord(record: InsertMedicalRecord): Promise<MedicalRecord>;
  deleteMedicalRecord(id: string): Promise<void>;
  
  // Message operations
  getMessagesBetweenUsers(userId1: string, userId2: string): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessageAsRead(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  // Patient operations
  async getPatient(id: string): Promise<Patient | undefined> {
    const result = await db.select().from(patients).where(eq(patients.id, id));
    return result[0];
  }

  async getPatientByUserId(userId: string): Promise<Patient | undefined> {
    const result = await db.select().from(patients).where(eq(patients.userId, userId));
    return result[0];
  }

  async createPatient(patient: InsertPatient): Promise<Patient> {
    const result = await db.insert(patients).values(patient).returning();
    return result[0];
  }

  async updatePatient(id: string, patient: Partial<InsertPatient>): Promise<Patient | undefined> {
    const result = await db.update(patients).set(patient).where(eq(patients.id, id)).returning();
    return result[0];
  }

  // Doctor operations
  async getDoctor(id: string): Promise<Doctor | undefined> {
    const result = await db.select().from(doctors).where(eq(doctors.id, id));
    return result[0];
  }

  async getDoctorByUserId(userId: string): Promise<Doctor | undefined> {
    const result = await db.select().from(doctors).where(eq(doctors.userId, userId));
    return result[0];
  }

  async getAllDoctors(): Promise<Doctor[]> {
    return await db.select().from(doctors);
  }

  async createDoctor(doctor: InsertDoctor): Promise<Doctor> {
    const result = await db.insert(doctors).values(doctor).returning();
    return result[0];
  }

  async updateDoctor(id: string, doctor: Partial<InsertDoctor>): Promise<Doctor | undefined> {
    const result = await db.update(doctors).set(doctor).where(eq(doctors.id, id)).returning();
    return result[0];
  }

  // Appointment operations
  async getAppointment(id: string): Promise<Appointment | undefined> {
    const result = await db.select().from(appointments).where(eq(appointments.id, id));
    return result[0];
  }

  async getAppointmentsByPatient(patientId: string): Promise<Appointment[]> {
    return await db
      .select()
      .from(appointments)
      .where(eq(appointments.patientId, patientId))
      .orderBy(desc(appointments.appointmentDate));
  }

  async getAppointmentsByDoctor(doctorId: string): Promise<Appointment[]> {
    return await db
      .select()
      .from(appointments)
      .where(eq(appointments.doctorId, doctorId))
      .orderBy(desc(appointments.appointmentDate));
  }

  async createAppointment(appointment: InsertAppointment): Promise<Appointment> {
    const result = await db.insert(appointments).values(appointment).returning();
    return result[0];
  }

  async updateAppointment(id: string, appointment: Partial<InsertAppointment>): Promise<Appointment | undefined> {
    const result = await db.update(appointments).set(appointment).where(eq(appointments.id, id)).returning();
    return result[0];
  }

  async deleteAppointment(id: string): Promise<void> {
    await db.delete(appointments).where(eq(appointments.id, id));
  }

  // Health metrics operations
  async getHealthMetricsByPatient(patientId: string): Promise<HealthMetric[]> {
    return await db
      .select()
      .from(healthMetrics)
      .where(eq(healthMetrics.patientId, patientId))
      .orderBy(desc(healthMetrics.recordedAt));
  }

  async createHealthMetric(metric: InsertHealthMetric): Promise<HealthMetric> {
    const result = await db.insert(healthMetrics).values(metric).returning();
    return result[0];
  }

  // Medical records operations
  async getMedicalRecordsByPatient(patientId: string): Promise<MedicalRecord[]> {
    return await db
      .select()
      .from(medicalRecords)
      .where(eq(medicalRecords.patientId, patientId))
      .orderBy(desc(medicalRecords.createdAt));
  }

  async createMedicalRecord(record: InsertMedicalRecord): Promise<MedicalRecord> {
    const result = await db.insert(medicalRecords).values(record).returning();
    return result[0];
  }

  async deleteMedicalRecord(id: string): Promise<void> {
    await db.delete(medicalRecords).where(eq(medicalRecords.id, id));
  }

  // Message operations
  async getMessagesBetweenUsers(userId1: string, userId2: string): Promise<Message[]> {
    return await db
      .select()
      .from(messages)
      .where(
        and(
          eq(messages.senderId, userId1),
          eq(messages.receiverId, userId2)
        )
      )
      .orderBy(messages.createdAt);
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const result = await db.insert(messages).values(message).returning();
    return result[0];
  }

  async markMessageAsRead(id: string): Promise<void> {
    await db.update(messages).set({ read: true }).where(eq(messages.id, id));
  }
}

export const storage = new DatabaseStorage();
