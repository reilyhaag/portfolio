// Supabase REST API client
export class SupabaseClient {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(endpoint: string, apiKey: string) {
    this.baseUrl = `${endpoint}/rest/v1`;
    this.headers = {
      'apikey': apiKey,
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    };
  }

  async get(table: string, filters: Record<string, string> = {}): Promise<any[]> {
    const url = new URL(`${this.baseUrl}/${table}`);
    Object.entries(filters).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.headers
    });

    if (!response.ok) {
      throw new Error(`Supabase API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async post(table: string, data: any): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${table}`, {
      method: 'POST',
      headers: {
        ...this.headers,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Supabase API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return Array.isArray(result) ? result[0] : result;
  }

  async patch(table: string, id: string, data: any): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${table}?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        ...this.headers,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Supabase API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return Array.isArray(result) ? result[0] : result;
  }

  async delete(table: string, id: string): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/${table}?id=eq.${id}`, {
      method: 'DELETE',
      headers: this.headers
    });

    return response.ok;
  }
}

// Create and export the Supabase client instance
const supabaseEndpoint = process.env.SUPABASE_ENDPOINT;
const supabaseKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseEndpoint || !supabaseKey) {
  throw new Error("SUPABASE_ENDPOINT and SUPABASE_SECRET_KEY are required");
}

export const supabase = new SupabaseClient(supabaseEndpoint, supabaseKey);