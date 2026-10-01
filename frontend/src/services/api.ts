export interface HealthStatus {
  status: 'UP' | 'DEGRADED' | 'DOWN';
  service: string;
  timestamp: string;
  components?: {
    database: 'UP' | 'DOWN';
    redis: 'UP' | 'DOWN';
  };
}

export async function checkHealth(): Promise<HealthStatus> {
  const response = await fetch('/api/health');
  if (!response.ok) {
    throw new Error('Backend not reachable');
  }
  return response.json();
}
