export const apiCall = async (endpoint: string, options?: RequestInit) => {
  const res = await fetch(endpoint, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (!res.ok) throw new Error(`API error: ${res.statusText}`);
  return res.json();
};

export const getPatientData = (patientId: string) =>
  apiCall(`/api/patients/${patientId}`);

export const getAppointmentsByPatient = (patientId: string) =>
  apiCall(`/api/appointments/patient/${patientId}`);

export const getHealthMetrics = (patientId: string) =>
  apiCall(`/api/health-metrics/${patientId}`);

export const getMedicalRecords = (patientId: string) =>
  apiCall(`/api/medical-records/${patientId}`);

export const getMessages = (userId1: string, userId2: string) =>
  apiCall(`/api/messages/${userId1}/${userId2}`);

export const bookAppointment = (data: any) =>
  apiCall("/api/appointments", { method: "POST", body: JSON.stringify(data) });

export const createMessage = (data: any) =>
  apiCall("/api/messages", { method: "POST", body: JSON.stringify(data) });

export const getAllDoctors = () =>
  apiCall("/api/doctors");
