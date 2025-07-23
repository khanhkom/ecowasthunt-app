export type ReportDetail = unknown;
// types/report.ts

export type AIClassification = {
  confidence: number;
  detectedTypes: string[];
  modelVersion: string;
  processedAt: string;
};

export type Location = {
  address: string;
  city: string;
  coordinates: [number, number]; // [lng, lat]
  district: string;
  ward: string;
};

export type Report = {
  _id: string;
  aiClassification?: AIClassification;
  assignedTo?: User;
  createdAt: string;
  description: string;
  downvotes: number;
  images: string[];
  location: Location;
  priority: number;
  reportedBy: User;
  resolution?: Resolution;
  severity: string;
  status: string;
  tags?: string[];
  title: string;
  updatedAt: string;
  upvotes: number;
  viewCount: number;
  wasteType: string;
};

export type ReportStatus = {
  color: string;
  description: string;
  icon: any;
  name: string;
};

export type Resolution = {
  estimatedWeight?: number;
  processingCost?: number;
  resolutionImages?: string[];
  resolutionNote: string;
  resolvedAt: string;
  resolvedBy: User;
};

export type RouteParams = {
  reportId: string;
};

export type SeverityLevel = {
  color: string;
  name: string;
};

export type User = {
  _id: string;
  email?: string;
  name: string;
};

export type VoteType = 'down' | 'up' | null;

export type WasteType = {
  icon: string;
  name: string;
};
