export const WASTE_TYPES = [
  { color: '#3B82F6', icon: '♻️', id: 'recyclable', name: 'Có thể tái chế' },
  { color: '#84CC16', icon: '🥬', id: 'organic', name: 'Hữu cơ' },
  { color: '#EF4444', icon: '📦', id: 'bulky', name: 'Cồng kềnh' },
  { color: '#DC2626', icon: '☢️', id: 'hazardous', name: 'Nguy hại' },
  { color: '#7C3AED', icon: '💻', id: 'electronic', name: 'Điện tử' },
  { color: '#F59E0B', icon: '🏗️', id: 'construction', name: 'Xây dựng' },
  { color: '#EC4899', icon: '🏥', id: 'medical', name: 'Y tế' },
  { color: '#6B7280', icon: '🗑️', id: 'general', name: 'Thông thường' },
  { color: '#7F1D1D', icon: '🚫', id: 'illegal_dumping', name: 'Đổ trái phép' },
  { color: '#8B5A2B', icon: '🔄', id: 'mixed', name: 'Hỗn hợp' },
];

export const SEVERITY_LEVELS = [
  { color: '#10B981', description: 'Không cấp thiết', id: 'low', name: 'Thấp' },
  {
    color: '#F59E0B',
    description: 'Cần xử lý trong vài ngày',
    id: 'medium',
    name: 'Trung bình',
  },
  { color: '#EF4444', description: 'Cần xử lý ngay', id: 'high', name: 'Cao' },
  {
    color: '#DC2626',
    description: 'Khẩn cấp',
    id: 'critical',
    name: 'Rất cao',
  },
];
