// components/ImageGallery.tsx

import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type ImageGalleryProps = {
    readonly images: string[];
    readonly onImagePress: (index: number) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
    images,
    onImagePress,
}) => {
    return (
        <View style={styles.contentCard}>
            <Text style={styles.sectionTitle}>Hình ảnh ({images.length})</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.imageGallery}
            >
                {images.map((image, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => { onImagePress(index); }}
                        style={styles.imageContainer}
                    >
                        <Image source={{ uri: image }} style={styles.galleryImage} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    contentCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        elevation: 3,
        marginBottom: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            height: 2,
            width: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    galleryImage: {
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        height: 120,
        width: 120,
    },
    imageContainer: {
        marginHorizontal: 4,
    },
    imageGallery: {
        marginHorizontal: -4,
    },
    sectionTitle: {
        color: '#111827',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
    },
});

export default ImageGallery;