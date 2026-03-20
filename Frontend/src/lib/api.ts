import { AssessmentData } from "./careerData";

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

export type CPSScores = {
  total: number;
  technical: number;
  softSkill: number;
  communication: number;
  ei: number;
  experience: number;
  portfolio: number;
  marketDemand: number;
  qpi: number;
};

export async function submitAssessment(data: AssessmentData, scores: CPSScores) {
  const response = await fetch(`${API_BASE_URL}/assessments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      scores,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to submit assessment");
  }

  return response.json();
}

export async function getAssessment(id: string) {
  const response = await fetch(`${API_BASE_URL}/assessments/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch assessment");
  }

  return response.json();
}

export async function submitLead(leadData: any) {
  const response = await fetch(`${API_BASE_URL}/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(leadData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to submit lead");
  }

  return response.json();
}

export async function adminLogin(credentials: any) {
  const response = await fetch(`${API_BASE_URL}/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Invalid credentials");
  }

  return response.json();
}

export async function verifyAdmin(token: string) {
  const response = await fetch(`${API_BASE_URL}/admin/verify`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Token verification failed");
  }

  return response.json();
}

export async function submitCounseling(counselingData: any) {
  const response = await fetch(`${API_BASE_URL}/counseling`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(counselingData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to submit counseling request");
  }

  return response.json();
}
