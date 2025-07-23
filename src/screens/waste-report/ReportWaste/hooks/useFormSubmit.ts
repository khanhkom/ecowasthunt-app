import type { ImageItem } from './useFormData';

import {
  createWasteReport,
  uploadWasteImages,
} from '@/services/functions/wasteReportApi';
import { useState } from 'react';
import { Alert } from 'react-native';

import { goBack } from '@/navigation';

type ReportData = {
  description: string;
  images: string[];
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
};

type WasteImageUploadResponse = {
  data: {
    data: {
      [key: string]: unknown;
      filename?: string;
      originalname?: string;
      path?: string;
      size?: number;
      url?: string;
    }[];
    message: string;
  };
};

export const useFormSubmit = (formData: {
  description: string;
  images: ImageItem[];
  location: {
    address: string;
    city: string;
    coordinates: [number, number];
    district: string;
    ward: string;
  };
  priority: number;
  severity: string;
  tags: string[];
  title: string;
  wasteType: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.title.trim()) errors.push('Vui lòng nhập tiêu đề');
    if (!formData.description.trim()) errors.push('Vui lòng nhập mô tả');
    if (!formData.location.address.trim()) errors.push('Vui lòng nhập địa chỉ');
    if (!formData.wasteType) errors.push('Vui lòng chọn loại rác thải');
    if (formData.images.length === 0)
      errors.push('Vui lòng thêm ít nhất 1 ảnh');

    return errors;
  };

  const handleSubmit = async () => {
    const errors = validateForm();

    if (errors.length > 0) {
      Alert.alert('Thông tin chưa đầy đủ', errors.join('\n'));
      return;
    }

    setIsLoading(true);

    try {
      // 1. Upload ảnh trước, lấy url
      const imageFiles = formData.images.map((img: ImageItem) => ({
        name: `image_${img.id}.jpg`,
        type: 'image/jpeg',
        uri: img.uri,
      }));
      const uploadResponse = (await uploadWasteImages(
        imageFiles,
      )) as WasteImageUploadResponse;
      const uploadedUrls: string[] = Array.isArray(uploadResponse.data.data)
        ? uploadResponse.data.data.map((file) => file.url ?? '')
        : [];
      if (uploadedUrls.length === 0) throw new Error('Upload ảnh thất bại');
      console.log(uploadedUrls);
      // 2. Gửi report với mảng url
      const reportData: ReportData = {
        description: formData.description,
        images: uploadedUrls,
        location: formData.location,
        priority: formData.priority,
        severity: formData.severity || undefined,
        tags: formData.tags,
        title: formData.title,
        wasteType: formData.wasteType,
      };

      await createWasteReport(reportData);

      Alert.alert(
        'Báo cáo thành công!',
        'Cảm ơn bạn đã đóng góp cho môi trường. Báo cáo của bạn đang được xử lý.',
        [
          {
            onPress: () => {
              goBack();
            },
            text: 'Về trang chủ',
          },
        ],
      );
    } catch (error: unknown) {
      const message =
        typeof error === 'object' && error && 'message' in error
          ? (error as { message?: string }).message
          : undefined;
      Alert.alert('Lỗi', message ?? 'Không thể gửi báo cáo. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit, isLoading };
};
