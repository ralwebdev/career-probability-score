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

export async function submitAssessment(data: AssessmentData) {
  const response = await fetch(`${API_BASE_URL}/assessments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
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

export async function getDashboardStats(token: string) {
  const response = await fetch(`${API_BASE_URL}/assessments/analytics/stats`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard stats");
  }

  return response.json();
}

export async function getCounselingRequests(token: string) {
  const response = await fetch(`${API_BASE_URL}/counseling`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch counseling requests");
  }

  return response.json();
}

export async function getLeads(token: string) {
  const response = await fetch(`${API_BASE_URL}/leads`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch leads");
  }

  return response.json();
}
export async function getAssessments(token: string) {
  const response = await fetch(`${API_BASE_URL}/assessments`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch assessments");
  }

  return response.json();
}

// Course Management
export async function getCourses() {
  const response = await fetch(`${API_BASE_URL}/courses`);
  if (!response.ok) throw new Error("Failed to fetch courses");
  return response.json();
}

export async function getApiCourseById(id: string) {
  const response = await fetch(`${API_BASE_URL}/courses/${id}`);
  if (!response.ok) throw new Error("Failed to fetch course details");
  return response.json();
}

export async function createCourse(courseData: any, token: string) {
  const response = await fetch(`${API_BASE_URL}/courses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(courseData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create course");
  }
  return response.json();
}

export async function updateCourse(id: string, courseData: any, token: string) {
  const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(courseData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update course");
  }
  return response.json();
}

export async function deleteCourse(id: string, token: string) {
  const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete course");
  }
  return response.json();
}

// Webinar Management
export async function getWebinars() {
  const response = await fetch(`${API_BASE_URL}/webinars`);
  if (!response.ok) throw new Error("Failed to fetch webinars");
  return response.json();
}

export async function createWebinar(webinarData: any, token: string) {
  const response = await fetch(`${API_BASE_URL}/webinars`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(webinarData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create webinar");
  }
  return response.json();
}

export async function deleteWebinar(id: string, token: string) {
  const response = await fetch(`${API_BASE_URL}/webinars/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete webinar");
  }
  return response.json();
}
