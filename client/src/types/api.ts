export interface ApiError {
  message?: string;
  status?: number;
  details?: { error?: string };
}
