const API_BASE_URL = 'https://lrclib.net/api';

export async function fetchFromApi<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.append(key, value);
    });
  }

  const response = await fetch(url.toString());
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('No lyrics found for this song');
    }
    throw new Error(`API request failed (${response.status})`);
  }

  const data = await response.json();
  console.log('API Response:', { url: url.toString(), status: response.status, data });
  return data;
}