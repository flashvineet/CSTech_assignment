export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface Agent {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  createdAt: string;
}

export interface DistributedData {
  agentId: string;
  agentName: string;
  data: Array<{
    firstName: string;
    phone: string;
    notes: string;
  }>;
}