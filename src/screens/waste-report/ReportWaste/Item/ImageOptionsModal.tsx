import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraIcon, PhotoIcon } from 'react-native-heroicons/outline';

type ImageOptionsModalProps = {
    readonly onClose: () => void;
    readonly onPickImage: (source: 'camera' | 'gallery') => void;
    readonly visible: boolean;
}

function ImageOptionsModal({ onClose, onPickImage, visible }: ImageOptionsModalProps) {
    return <Modal animationType="fade" transparent visible={visible}>
        <View style={styles.modalOverlay}>
            <View style={styles.imageOptionsModal}>
                <Text style={styles.modalTitle}>Thêm ảnh</Text>

                <TouchableOpacity
                    onPress={() => {
                        onPickImage('camera');
                        onClose();
                    }}
                    style={styles.imageOption}
                >
                    <CameraIcon color="#8B5CF6" size={24} />
                    <Text style={styles.imageOptionText}>Chụp ảnh</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        onPickImage('gallery');
                        onClose();
                    }}
                    style={styles.imageOption}
                >
                    <PhotoIcon color="#8B5CF6" size={24} />
                    <Text style={styles.imageOptionText}>Chọn từ thư viện</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
                    <Text style={styles.modalCloseText}>Huỷ</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
}

const styles = StyleSheet.create({
    imageOption: {
        alignItems: 'center',
        borderBottomColor: '#F3F4F6',
        borderBottomWidth: 1,
        flexDirection: 'row',
        paddingVertical: 16,
    },
    imageOptionsModal: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        margin: 20,
        minWidth: 280,
        padding: 24,
    },
    imageOptionText: {
        color: '#111827',
        fontSize: 16,
        marginLeft: 16,
    },
    modalCloseButton: {
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        marginTop: 16,
        paddingVertical: 12,
    },
    modalCloseText: {
        color: '#6B7280',
        fontSize: 16,
        fontWeight: '500',
    },
    modalOverlay: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        justifyContent: 'center',
    },
    modalTitle: {
        color: '#111827',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default ImageOptionsModal;