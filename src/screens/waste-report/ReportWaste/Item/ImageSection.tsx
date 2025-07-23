import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PlusIcon, XMarkIcon } from 'react-native-heroicons/outline';

import { ImageItem } from '../hooks/useFormData';

type ImageSectionProps = {
    readonly images: ImageItem[];
    readonly onAddImage: () => void;
    readonly removeImage: (id: number) => void;
}

function ImageSection({ images, onAddImage, removeImage }: ImageSectionProps) {
    return <View style={styles.section}>
        <Text style={styles.sectionTitle}>
            Hình ảnh <Text style={styles.required}>*</Text>
            <Text style={styles.subText}> (Tối đa 5 ảnh)</Text>
        </Text>

        <View style={styles.imageGrid}>
            {images.map((image) => (
                <View key={image.id} style={styles.imageContainer}>
                    <Image source={{ uri: image.uri }} style={styles.imagePreview} />
                    <TouchableOpacity
                        onPress={() => { removeImage(image.id); }}
                        style={styles.removeImageButton}
                    >
                        <XMarkIcon color="#FFFFFF" size={16} />
                    </TouchableOpacity>
                </View>
            ))}

            {images.length < 5 && (
                <TouchableOpacity
                    onPress={onAddImage}
                    style={styles.addImageButton}
                >
                    <PlusIcon color="#6B7280" size={24} />
                    <Text style={styles.addImageText}>Thêm ảnh</Text>
                </TouchableOpacity>
            )}
        </View>
    </View>
}

const styles = StyleSheet.create({
    addImageButton: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: '#E5E7EB',
        borderRadius: 12,
        borderStyle: 'dashed',
        borderWidth: 2,
        height: 80,
        justifyContent: 'center',
        width: 80,
    },
    addImageText: {
        color: '#6B7280',
        fontSize: 12,
        marginTop: 4,
    },
    imageContainer: {
        marginBottom: 12,
        marginRight: 12,
        position: 'relative',
    },
    imageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
    },
    imagePreview: {
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        height: 80,
        width: 80,
    },
    removeImageButton: {
        alignItems: 'center',
        backgroundColor: '#EF4444',
        borderRadius: 12,
        height: 24,
        justifyContent: 'center',
        position: 'absolute',
        right: -6,
        top: -6,
        width: 24,
    },
    required: {
        color: '#EF4444',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        color: '#111827',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 16,
    },
    subText: {
        color: '#6B7280',
        fontSize: 12,
        fontWeight: '400',
    },
});

export default ImageSection;