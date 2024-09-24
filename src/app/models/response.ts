export interface DiscoverPageContent<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface Response {
  success: boolean;
  status_code: number;
  status_message: string;
};