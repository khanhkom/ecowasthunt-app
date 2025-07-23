import { get, post } from '../api';

/**
 * Tạo báo cáo rác thải mới
 * @param data Thông tin báo cáo rác thải
 * @returns Promise<{ message: string; data: any }>
 */
export const createWasteReport = async (data: {
  description: string;
  images: string[]; // Tối đa 5 URL ảnh
  location: {
    address: string;
    city: string;
    coordinates: [number, number];
    district: string;
    ward: string;
  };
  priority?: number;
  severity?: string;
  tags?: string[];
  title: string;
  wasteType: string;
}) => {
  return post('/waste-reports', data);
};

/**
 * Lấy danh sách báo cáo của tôi
 * @param params Các tham số filter, phân trang, sắp xếp
 * @returns Promise<{ message: string; data: any[]; total: number; page: number; limit: number }>
 */
export const getMyWasteReports = async (parameters?: {
  limit?: number;
  page?: number;
  search?: string;
  severity?: string;
  sortBy?: 'createdAt' | 'distance' | 'priority' | 'severity';
  sortOrder?: 'asc' | 'desc';
  status?: string;
  wasteType?: string;
}) => {
  return get(`/waste-reports/user/my-reports`, { params: parameters });
};

/**
 * Lấy danh sách báo cáo rác thải gần vị trí hiện tại
 * @param params { longitude, latitude, radius }
 * @returns Promise<{ message: string; data: any[] }>
 */
export const getNearbyWasteReports = async (parameters: {
  latitude: number;
  longitude: number;
  radius?: number;
}) => {
  const { latitude, longitude, radius } = parameters;
  const query =
    `?longitude=${longitude}&latitude=${latitude}` +
    (radius ? `&radius=${radius}` : '');
  return get(`/waste-reports/nearby${query}`);
};

/**
 * Lấy chi tiết báo cáo rác thải theo ID
 * @param wasteReportId ID của báo cáo rác thải
 * @returns Promise<{ message: string; data: any }>
 */
export const getWasteReportDetail = async (wasteReportId: string) => {
  return get(`/waste-reports/${wasteReportId}`);
};

/**
 * Upload tối đa 5 ảnh báo cáo rác thải (tự động nén và tối ưu hóa ảnh)
 * @param images Mảng file ảnh (File, Blob, hoặc { uri, name, type } cho React Native)
 * @param extraData Các trường khác (nếu có) theo UploadWasteImagesDto
 * @returns Promise<{ message: string; data: any[] }>
 */
export const uploadWasteImages = async (
  images: ({ name: string; type: string; uri: string } | Blob | File)[],
  extraData?: Record<string, boolean | number | string>,
) => {
  if (images.length > 5) {
    throw new Error('Chỉ được upload tối đa 5 ảnh');
  }
  const formData = new FormData();
  for (const [index, img] of images.entries()) {
    if (typeof img === 'object' && 'uri' in img) {
      // React Native: { uri, name, type }
      formData.append('images', {
        name: img.name || `image_${index}.jpg`,
        type: img.type || 'image/jpeg',
        uri: img.uri,
      });
    } else {
      // Web: File/Blob
      formData.append('images', img);
    }
  }
  if (extraData) {
    for (const [key, value] of Object.entries(extraData)) {
      formData.append(key, String(value));
    }
  }
  return post('/uploads/waste-images', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
