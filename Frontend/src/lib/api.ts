import { AssessmentData } from "./careerData";

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

export interface CPSScores {
  total: number;
  technical: number;
  softSkill: number;
  communication: number;
  ei: number;
  experience: number;
  portfolio: number;
  marketDemand: number;
  qpi: number;
}

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

export async function getDashboardStats(token: string, collegeId?: string) {
  let url = `${API_BASE_URL}/assessments/analytics/stats`;
  if (collegeId && collegeId !== 'all') {
    url += `?collegeId=${collegeId}`;
  }
  
  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard stats");
  }

  return response.json();
}

export async function getCounselingRequests(token: string, page = 1, limit = 25) {
  const response = await fetch(`${API_BASE_URL}/counseling?page=${page}&limit=${limit}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch counseling requests");
  }

  return response.json();
}

export async function getLeads(token: string, page = 1, limit = 25) {
  const response = await fetch(`${API_BASE_URL}/leads?page=${page}&limit=${limit}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch leads");
  }

  return response.json();
}
export async function getAssessments(token: string, page = 1, limit = 25, filters: any = {}) {
  let url = `${API_BASE_URL}/assessments?page=${page}&limit=${limit}`;
  if (filters.careerRole) url += `&careerRole=${encodeURIComponent(filters.careerRole)}`;
  if (filters.collegeId && filters.collegeId !== 'all') url += `&collegeId=${filters.collegeId}`;
  if (filters.minScore) url += `&minScore=${filters.minScore}`;
  if (filters.maxScore) url += `&maxScore=${filters.maxScore}`;

  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch assessments");
  }

  return response.json();
}

export async function getAssessmentStats(token: string, collegeId?: string) {
  let url = `${API_BASE_URL}/assessments/stats/course-scores`;
  if (collegeId && collegeId !== 'all') {
    url += `?collegeId=${collegeId}`;
  }

  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch assessment statistics");
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

// College API
export async function loginCollege(credentials: any) {
  const response = await fetch(`${API_BASE_URL}/college/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Invalid college credentials");
  }

  return response.json();
}

export async function getCollegeStudents(token: string): Promise<any[]> {
  const response = await fetch(`${API_BASE_URL}/college/students`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch college students");
  }

  return response.json();
}

export async function getPublicCollegeByCid(cid: string) {
  const response = await fetch(`${API_BASE_URL}/college/public/${cid}`);
  if (!response.ok) {
    throw new Error("College not found");
  }
  return response.json();
}

// Admin College Management
export async function getColleges(token: string) {
  const response = await fetch(`${API_BASE_URL}/admin/colleges`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch colleges");
  return response.json();
}

export async function getDuplicateAssessments(token: string) {
  const response = await fetch(`${API_BASE_URL}/admin/assessments/duplicates`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch duplicates");
  return response.json();
}

export async function createCollege(collegeData: any, token: string) {
  const response = await fetch(`${API_BASE_URL}/admin/colleges`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(collegeData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create college");
  }
  return response.json();
}

export async function updateCollege(id: string, collegeData: any, token: string) {
  const response = await fetch(`${API_BASE_URL}/admin/colleges/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(collegeData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update college");
  }
  return response.json();
}

export async function deleteCollege(id: string, token: string) {
  const response = await fetch(`${API_BASE_URL}/admin/colleges/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete college");
  }
  return response.json();
}

export async function changeCollegePassword(passwordData: any, token: string) {
  const response = await fetch(`${API_BASE_URL}/college/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(passwordData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to change password");
  }
  return response.json();
}
