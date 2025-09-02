const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';
const IS_DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === 'true';

interface ApiRequestInit extends RequestInit {
  token?: string;
}

// Dummy data for development mode
const DUMMY_USER = {
  id: 1,
  username: process.env.NEXT_PUBLIC_DUMMY_USERNAME || 'admin'
};

const DUMMY_TOKEN = 'dummy-jwt-token-for-development';

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
    // Development mode mock responses
    if (IS_DEV_MODE) {
      return this.getMockResponse<T>(endpoint, options);
    }

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

  private static async getMockResponse<T>(
    endpoint: string,
    options: ApiRequestInit
  ): Promise<T> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock login endpoint
    if (endpoint === '/login' && options.method === 'POST') {
      const body = options.body ? JSON.parse(options.body as string) : {};
      const dummyUsername = process.env.NEXT_PUBLIC_DUMMY_USERNAME || 'admin';
      const dummyPassword = process.env.NEXT_PUBLIC_DUMMY_PASSWORD || 'password123';
      
      if (body.username === dummyUsername && body.password === dummyPassword) {
        return {
          token: DUMMY_TOKEN,
          user: DUMMY_USER
        } as T;
      } else {
        throw new Error('Invalid credentials');
      }
    }

    // Mock other endpoints as needed
    if (endpoint.startsWith('/news')) {
      if (options.method === 'GET') {
        return [] as T; // Empty array for news list
      }
    }

    if (endpoint.startsWith('/blog')) {
      if (options.method === 'GET') {
        return [] as T; // Empty array for blog list
      }
    }

    // Default mock response
    return {} as T;
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
