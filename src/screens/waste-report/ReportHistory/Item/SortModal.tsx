import React, { useCallback } from 'react';
import {
    Modal,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { CheckCircleIcon as CheckCircleIconSolid } from 'react-native-heroicons/solid';

import { SORT_OPTIONS } from '../reportConstants';

// Define the props interface
export type SortModalProps = {
    readonly filters: {
        readonly severity: string;
        readonly sortBy: string;
        readonly sortOrder: string;
        readonly status: string;
        readonly wasteType: string;
    };
    readonly onClose: () => void;
    readonly onUpdateFilter: (key: 'sortBy' | 'sortOrder', value: string) => void;
    readonly visible: boolean;
};

function SortModal({
    filters,
    onClose,
    onUpdateFilter,
    visible,
}: SortModalProps) {
    // Backdrop press handler
    const handleBackdropPress = useCallback(() => {
        onClose();
    }, [onClose]);

    return (
        <Modal
            animationType="slide"
            onRequestClose={onClose}
            transparent
            visible={visible}
        >
            <View style={styles.modalOverlay}>
                {/* StatusBar for modal */}
                <StatusBar backgroundColor={Platform.OS === 'android' ? 'rgba(0,0,0,0.5)' : 'transparent'} barStyle="dark-content" translucent />
                {/* Backdrop press */}
                <TouchableOpacity activeOpacity={1} onPress={handleBackdropPress} style={StyleSheet.absoluteFill} />
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Sắp xếp</Text>

                    {SORT_OPTIONS.map((option) => (
                        <TouchableOpacity
                            key={option.id}
                            onPress={() => {
                                onUpdateFilter('sortBy', option.id);
                                onClose();
                            }}
                            style={[
                                styles.modalOption,
                                filters.sortBy === option.id && styles.modalOptionSelected
                            ]}
                        >
                            <Text style={[
                                styles.modalOptionText,
                                filters.sortBy === option.id && styles.modalOptionTextSelected
                            ]}>
                                {option.name}
                            </Text>
                            {filters.sortBy === option.id && (
                                <CheckCircleIconSolid color="#8B5CF6" size={20} />
                            )}
                        </TouchableOpacity>
                    ))}

                    <View style={styles.sortOrderSection}>
                        <Text style={styles.filterSectionTitle}>Thứ tự</Text>
                        <TouchableOpacity
                            onPress={() => {
                                onUpdateFilter('sortOrder', 'desc');
                                onClose();
                            }}
                            style={[
                                styles.modalOption,
                                filters.sortOrder === 'desc' && styles.modalOptionSelected
                            ]}
                        >
                            <Text style={[
                                styles.modalOptionText,
                                filters.sortOrder === 'desc' && styles.modalOptionTextSelected
                            ]}>
                                Giảm dần
                            </Text>
                            {filters.sortOrder === 'desc' && (
                                <CheckCircleIconSolid color="#8B5CF6" size={20} />
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                onUpdateFilter('sortOrder', 'asc');
                                onClose();
                            }}
                            style={[
                                styles.modalOption,
                                filters.sortOrder === 'asc' && styles.modalOptionSelected
                            ]}
                        >
                            <Text style={[
                                styles.modalOptionText,
                                filters.sortOrder === 'asc' && styles.modalOptionTextSelected
                            ]}>
                                Tăng dần
                            </Text>
                            {filters.sortOrder === 'asc' && (
                                <CheckCircleIconSolid color="#8B5CF6" size={20} />
                            )}
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={onClose}
                        style={styles.modalCloseButton}
                    >
                        <Text style={styles.modalCloseText}>Đóng</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    filterSectionTitle: {
        color: '#374151',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 12,
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
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '80%',
        paddingBottom: 40,
        paddingHorizontal: 24,
        paddingTop: 24,
    },
    modalOption: {
        alignItems: 'center',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    modalOptionSelected: {
        backgroundColor: '#F3F4F6',
    },
    modalOptionText: {
        color: '#111827',
        fontSize: 14,
    },
    modalOptionTextSelected: {
        color: '#8B5CF6',
        fontWeight: '500',
    },
    modalOverlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalTitle: {
        color: '#111827',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 20,
        textAlign: 'center',
    },
    sortOrderSection: {
        borderTopColor: '#E5E7EB',
        borderTopWidth: 1,
        marginTop: 16,
        paddingTop: 16,
    },
});

export default SortModal;