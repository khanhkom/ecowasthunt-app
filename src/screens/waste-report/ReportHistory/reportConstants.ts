import {
  CalendarIcon,
  CheckBadgeIcon,
  CheckCircleIcon,
  ClockIcon,
  CogIcon,
  DocumentDuplicateIcon,
  ExclamationTriangleIcon,
  UserIcon,
  XCircleIcon,
} from 'react-native-heroicons/outline';

export const WASTE_TYPES = {
  BULKY: { color: '#EF4444', icon: '🪑', name: 'Cồng kềnh' },
  ELECTRONIC: { color: '#7C3AED', icon: '📱', name: 'Điện tử' },
  GLASS: { color: '#8B5CF6', icon: '🍶', name: 'Thủy tinh' },
  HAZARDOUS: { color: '#DC2626', icon: '☢️', name: 'Nguy hại' },
  METAL: { color: '#F59E0B', icon: '🔩', name: 'Kim loại' },
  ORGANIC: { color: '#84CC16', icon: '🍎', name: 'Hữu cơ' },
  PAPER: { color: '#10B981', icon: '📄', name: 'Giấy' },
  PLASTIC: { color: '#3B82F6', icon: '♻️', name: 'Nhựa' },
};

export const REPORT_STATUS = {
  assigned: {
    color: '#8B5CF6',
    icon: UserIcon,
    name: 'Đã phân công',
  },
  duplicate: {
    color: '#6B7280',
    icon: DocumentDuplicateIcon,
    name: 'Trùng lặp',
  },
  in_progress: {
    color: '#3B82F6',
    icon: CogIcon,
    name: 'Đang xử lý',
  },
  invalid: {
    color: '#DC2626',
    icon: ExclamationTriangleIcon,
    name: 'Không hợp lệ',
  },
  pending: {
    color: '#F59E0B',
    icon: ClockIcon,
    name: 'Chờ xử lý',
  },
  rejected: {
    color: '#EF4444',
    icon: XCircleIcon,
    name: 'Từ chối',
  },
  resolved: {
    color: '#10B981',
    icon: CheckCircleIcon,
    name: 'Đã giải quyết',
  },
  verified: {
    color: '#06B6D4',
    icon: CheckBadgeIcon,
    name: 'Đã xác minh',
  },
};

export const SEVERITY_LEVELS = {
  CRITICAL: { color: '#DC2626', name: 'Khẩn cấp' },
  HIGH: { color: '#EF4444', name: 'Cao' },
  LOW: { color: '#10B981', name: 'Thấp' },
  MEDIUM: { color: '#F59E0B', name: 'TB' },
};

export const FILTER_OPTIONS = [
  { id: '', name: 'Tất cả' },
  { id: 'pending', name: 'Chờ xử lý' },
  { id: 'in_progress', name: 'Đang xử lý' },
  { id: 'resolved', name: 'Đã giải quyết' },
  { id: 'rejected', name: 'Từ chối' },
  { id: 'verified', name: 'Đã xác minh' },
  { id: 'assigned', name: 'Đã phân công' },
  { id: 'duplicate', name: 'Trùng lặp' },
  { id: 'invalid', name: 'Không hợp lệ' },
];

export const SORT_OPTIONS = [
  { field: 'createdAt', id: 'createdAt', name: 'Ngày tạo' },
  { field: 'priority', id: 'priority', name: 'Độ ưu tiên' },
  { field: 'severity', id: 'severity', name: 'Mức độ nghiêm trọng' },
];

export const WASTE_TYPE_OPTIONS = [
  { id: '', name: 'Tất cả loại' },
  ...Object.entries(WASTE_TYPES).map(([key, value]) => ({
    id: key,
    name: value.name,
  })),
];

export const SEVERITY_OPTIONS = [
  { id: '', name: 'Tất cả mức độ' },
  ...Object.entries(SEVERITY_LEVELS).map(([key, value]) => ({
    id: key,
    name: value.name,
  })),
];
