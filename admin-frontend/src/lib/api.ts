const API_BASE_URL = 'http://localhost:8080/api';

interface ApiRequestInit extends RequestInit {
  token?: string;
}

export class ApiClient {
  private static createHeaders(token?: string): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  static async request<T>(
    endpoint: string,
    options: ApiRequestInit = {}
  ): Promise<T> {
    const { token, ...fetchOptions } = options;
    
    const config: RequestInit = {
      ...fetchOptions,
      headers: {
        ...this.createHeaders(token),
        ...fetchOptions.headers,
      },
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  static async get<T>(endpoint: string, token?: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', token });
  }

  static async post<T>(
    endpoint: string,
    data?: Record<string, unknown>,
    token?: string
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      token,
    });
  }

  static async put<T>(
    endpoint: string,
    data?: Record<string, unknown>,
    token?: string
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      token,
    });
  }

  static async delete<T>(endpoint: string, token?: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE', token });
  }
}
