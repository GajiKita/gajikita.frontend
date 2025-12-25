import { redirect } from "next/navigation";

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const BASE_URL = "/api/proxy";

type HttpOptions = RequestInit & {
  params?: Record<string, string | number | boolean | undefined>;
};

async function request<T>(endpoint: string, options: HttpOptions = {}): Promise<T> {
  const { params, ...init } = options;

  let url = `${BASE_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  const headers = {
    "Content-Type": "application/json",
    ...init.headers,
  };

  const response = await fetch(url, {
    ...init,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      // Optional: Handle 401 unauthorized globally
      // window.location.href = '/login';
    }

    const data = await response.json().catch(() => ({}));
    throw new ApiError(
      response.status,
      data.message || response.statusText,
      data
    );
  }

  // Handle empty responses (e.g. 204 No Content)
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

export const httpClient = {
  get: <T>(endpoint: string, options?: HttpOptions) =>
    request<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, body?: any, options?: HttpOptions) =>
    request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),

  patch: <T>(endpoint: string, body?: any, options?: HttpOptions) =>
    request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  del: <T>(endpoint: string, options?: HttpOptions) =>
    request<T>(endpoint, { ...options, method: "DELETE" }),
};
