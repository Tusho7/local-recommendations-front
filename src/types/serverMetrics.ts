export interface ServerMetrics {
  uptime: string;
  freeMemory: number;
  totalMemory: number;
  loadAverage: number[];
}
