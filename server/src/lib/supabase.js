import { config } from '../config/app.js';

const defaultHeaders = {
  apikey: config.supabase.serviceRoleKey,
  Authorization: `Bearer ${config.supabase.serviceRoleKey}`
};

const buildUrl = (path, query = {}) => {
  const url = new URL(`${config.supabase.url}/rest/v1/${path}`);

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, value);
    }
  });

  return url;
};

const parseResponse = async (response) => {
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = data?.message || data?.error_description || data?.hint || data?.error || 'Supabase request failed';
    throw new Error(message);
  }

  return data;
};

const request = async (path, { method = 'GET', query, body, headers } = {}) => {
  const response = await fetch(buildUrl(path, query), {
    method,
    headers: {
      ...defaultHeaders,
      ...(body ? { 'Content-Type': 'application/json', Prefer: 'return=representation' } : {}),
      ...headers
    },
    ...(body ? { body: JSON.stringify(body) } : {})
  });

  return parseResponse(response);
};

export const supabase = {
  select: (table, query, headers) => request(table, { method: 'GET', query, headers }),
  insert: (table, body, headers) => request(table, { method: 'POST', body, headers })
};
