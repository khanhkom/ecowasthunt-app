export const WASTE_TYPES = [
  { color: '#3B82F6', icon: '♻️', id: 'PLASTIC', name: 'Nhựa' },
  { color: '#10B981', icon: '📄', id: 'PAPER', name: 'Giấy' },
  { color: '#F59E0B', icon: '🔧', id: 'METAL', name: 'Kim loại' },
  { color: '#8B5CF6', icon: '🍶', id: 'GLASS', name: 'Thủy tinh' },
  { color: '#84CC16', icon: '🥬', id: 'ORGANIC', name: 'Hữu cơ' },
  { color: '#EF4444', icon: '📦', id: 'BULKY', name: 'Cồng kềnh' },
  { color: '#DC2626', icon: '☢️', id: 'HAZARDOUS', name: 'Nguy hại' },
  { color: '#7C3AED', icon: '💻', id: 'ELECTRONIC', name: 'Điện tử' },
];

export const SEVERITY_LEVELS = [
  { color: '#10B981', description: 'Không cấp thiết', id: 'LOW', name: 'Thấp' },
  {
    color: '#F59E0B',
    description: 'Cần xử lý trong vài ngày',
    id: 'MEDIUM',
    name: 'Trung bình',
  },
  { color: '#EF4444', description: 'Cần xử lý ngay', id: 'HIGH', name: 'Cao' },
  {
    color: '#DC2626',
    description: 'Khẩn cấp',
    id: 'CRITICAL',
    name: 'Rất cao',
  },
];
