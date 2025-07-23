export enum ReportStatus {
  ASSIGNED = 'assigned',
  DUPLICATE = 'duplicate',
  IN_PROGRESS = 'in_progress',
  INVALID = 'invalid',
  PENDING = 'pending',
  REJECTED = 'rejected',
  RESOLVED = 'resolved',
  VERIFIED = 'verified',
}

export enum SeverityLevel {
  CRITICAL = 'critical',
  HIGH = 'high',
  LOW = 'low',
  MEDIUM = 'medium',
}

export enum WasteType {
  BULKY = 'bulky',
  CONSTRUCTION = 'construction',
  ELECTRONIC = 'electronic',
  GENERAL = 'general',
  HAZARDOUS = 'hazardous',
  ILLEGAL_DUMPING = 'illegal_dumping',
  MEDICAL = 'medical',
  MIXED = 'mixed',
  ORGANIC = 'organic',
  RECYCLABLE = 'recyclable',
}
export type AIClassification = {
  confidence: number;
  detectedTypes: string[];
  modelVersion?: string;
  processedAt: Date;
};

export type IWasteReport = {
  aiClassification?: AIClassification;
  assignedAt?: Date;
  assignedTo?: string;
  description: string;
  downvotes: number;
  images: string[];
  location: Location;
  priority: number;
  reportedBy: string;
  resolution?: Resolution;
  severity: SeverityLevel;
  status: ReportStatus;
  tags?: string[];
  title: string;
  upvotes: number;
  viewCount: number;
  wasteType: WasteType;
};

export type Location = {
  address: string;
  city?: string;
  coordinates: [number, number];
  district?: string;
  ward?: string;
};

export type Resolution = {
  estimatedWeight?: number;
  processingCost?: number;
  resolutionImages?: string[];
  resolutionNote: string;
  resolvedAt: Date;
  resolvedBy: string;
};
