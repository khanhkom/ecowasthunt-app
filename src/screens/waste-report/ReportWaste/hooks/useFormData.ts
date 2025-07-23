import { useState } from 'react';
import { Alert } from 'react-native';

export type ImageItem = {
  id: number;
  uri: string;
};

type FormData = {
  description: string;
  images: ImageItem[];
  location: Location;
  priority: number;
  severity: string;
  tags: string[];
  title: string;
  wasteType: string;
};

type Location = {
  address: string;
  city: string;
  coordinates: [number, number];
  district: string;
  ward: string;
};

const INITIAL_STATE: FormData = {
  description: '',
  images: [],
  location: {
    address: '',
    city: 'Hà Nội',
    coordinates: [105.8542, 21.0285],
    district: '',
    ward: '',
  },
  priority: 5,
  severity: '',
  tags: [],
  title: '',
  wasteType: '',
};

export const useFormData = () => {
  const [formData, setFormData] = useState<FormData>(INITIAL_STATE);

  const updateField = (
    field: keyof FormData,
    value: FormData[keyof FormData],
  ) => {
    setFormData((previous) => ({ ...previous, [field]: value }));
  };

  const updateLocation = (
    field: keyof Location,
    value: Location[keyof Location],
  ) => {
    setFormData((previous) => ({
      ...previous,
      location: { ...previous.location, [field]: value },
    }));
  };

  const addTag = (tag: string) => {
    if (!formData.tags.includes(tag)) {
      updateField('tags', [...formData.tags, tag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    updateField(
      'tags',
      formData.tags.filter((tag) => tag !== tagToRemove),
    );
  };

  const addImage = (image: ImageItem) => {
    if (formData.images.length < 5) {
      updateField('images', [...formData.images, image]);
    } else {
      Alert.alert('Giới hạn ảnh', 'Chỉ có thể tải lên tối đa 5 ảnh');
    }
  };

  const removeImage = (imageId: number) => {
    updateField(
      'images',
      formData.images.filter((img) => img.id !== imageId),
    );
  };

  return {
    addImage,
    addTag,
    formData,
    removeImage,
    removeTag,
    updateField,
    updateLocation,
  };
};
