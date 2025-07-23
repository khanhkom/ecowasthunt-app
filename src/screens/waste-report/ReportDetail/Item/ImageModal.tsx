// components/ImageModal.tsx

import React from 'react';
import {
    Dimensions,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/outline';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

type ImageModalProps = {
    readonly images: string[];
    readonly onClose: () => void;
    readonly selectedIndex: number;
    readonly visible: boolean;
}

const ImageModal: React.FC<ImageModalProps> = ({
    images,
    onClose,
    selectedIndex,
    visible,
}) => {
    return (
        <Modal animationType="fade" transparent visible={visible}>
            <View style={styles.imageModalOverlay}>
                <TouchableOpacity onPress={onClose} style={styles.imageModalClose}>
                    <XMarkIcon color="#FFFFFF" size={24} />
                </TouchableOpacity>

                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    style={styles.imageModalScroll}
                >
                    {images.map((image, index) => (
                        <View key={index} style={styles.imageModalContainer}>
                            <Image source={{ uri: image }} style={styles.imageModalImage} />
                        </View>
                    ))}
                </ScrollView>

                <View style={styles.imageModalIndicator}>
                    <Text style={styles.imageModalIndicatorText}>
                        {selectedIndex + 1} / {images.length}
                    </Text>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    imageModalClose: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        height: 40,
        justifyContent: 'center',
        position: 'absolute',
        right: 20,
        top: 60,
        width: 40,
        zIndex: 10,
    },
    imageModalContainer: {
        alignItems: 'center',
        height: screenHeight,
        justifyContent: 'center',
        width: screenWidth,
    },
    imageModalImage: {
        borderRadius: 12,
        height: screenWidth - 40,
        width: screenWidth - 40,
    },
    imageModalIndicator: {
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        bottom: 60,
        paddingHorizontal: 16,
        paddingVertical: 8,
        position: 'absolute',
    },
    imageModalIndicatorText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '500',
    },
    imageModalOverlay: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.9)',
        flex: 1,
        justifyContent: 'center',
    },
    imageModalScroll: {
        flex: 1,
    },
});

export default ImageModal;