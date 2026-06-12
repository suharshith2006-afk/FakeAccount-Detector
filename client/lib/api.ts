const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API call failed to ${endpoint}:`, error);
    throw error;
  }
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Account endpoints
export async function getAllAccounts() {
  return apiCall<ApiResponse<any>>("/accounts");
}

export async function analyzeAccount(accountId: string) {
  return apiCall<ApiResponse<any>>(`/accounts/${accountId}`);
}

export async function getTrendingHashtags() {
  return apiCall<ApiResponse<any>>("/trending");
}

export async function getMonthlyReports() {
  return apiCall<ApiResponse<any>>("/reports/monthly");
}
