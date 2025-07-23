import React, { useCallback, useEffect } from 'react';
import {
    BackHandler,
    Modal,
    Platform,
    ScrollView, // Thêm ScrollView
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { CheckCircleIcon as CheckCircleIconSolid } from 'react-native-heroicons/solid';

import {
    FILTER_OPTIONS,
    SEVERITY_OPTIONS,
    WASTE_TYPE_OPTIONS,
} from '../reportConstants';

type FilterModalProps = {
    readonly filters: {
        readonly severity: string;
        readonly status: string;
        readonly wasteType: string;
    };
    readonly onClose: () => void;
    readonly onResetFilters: () => void;
    readonly onUpdateFilter: (key: 'severity' | 'status' | 'wasteType', value: string) => void;
    readonly visible: boolean;
};

function FilterModal({
    filters,
    onClose,
    onResetFilters,
    onUpdateFilter,
    visible,
}: FilterModalProps) {

    // Backdrop press handler
    const handleBackdropPress = useCallback(() => {
        onClose();
    }, [onClose]);

    return (
        <Modal animationType="slide" onRequestClose={onClose} transparent visible={visible}>
            <View style={styles.modalOverlay}>
                {/* StatusBar for modal */}
                <StatusBar backgroundColor={Platform.OS === 'android' ? 'rgba(0,0,0,0.5)' : 'transparent'} barStyle="dark-content" translucent />
                {/* Backdrop press */}
                <TouchableOpacity activeOpacity={1} onPress={handleBackdropPress} style={StyleSheet.absoluteFill} />
                <View style={styles.modalContent}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.modalTitle}>Bộ lọc</Text>

                        {/* Status Filter */}
                        <View style={styles.filterSection}>
                            <Text style={styles.filterSectionTitle}>Trạng thái</Text>
                            {FILTER_OPTIONS.map((option) => (
                                <TouchableOpacity
                                    key={option.id}
                                    onPress={() => { onUpdateFilter('status', option.id); }}
                                    style={[
                                        styles.modalOption,
                                        filters.status === option.id && styles.modalOptionSelected
                                    ]}
                                >
                                    <Text style={[
                                        styles.modalOptionText,
                                        filters.status === option.id && styles.modalOptionTextSelected
                                    ]}>
                                        {option.name}
                                    </Text>
                                    {filters.status === option.id && (
                                        <CheckCircleIconSolid color="#8B5CF6" size={20} />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Waste Type Filter */}
                        <View style={styles.filterSection}>
                            <Text style={styles.filterSectionTitle}>Loại rác thải</Text>
                            {WASTE_TYPE_OPTIONS.map((option) => (
                                <TouchableOpacity
                                    key={option.id}
                                    onPress={() => { onUpdateFilter('wasteType', option.id); }}
                                    style={[
                                        styles.modalOption,
                                        filters.wasteType === option.id && styles.modalOptionSelected
                                    ]}
                                >
                                    <Text style={[
                                        styles.modalOptionText,
                                        filters.wasteType === option.id && styles.modalOptionTextSelected
                                    ]}>
                                        {option.name}
                                    </Text>
                                    {filters.wasteType === option.id && (
                                        <CheckCircleIconSolid color="#8B5CF6" size={20} />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Severity Filter */}
                        <View style={styles.filterSection}>
                            <Text style={styles.filterSectionTitle}>Mức độ nghiêm trọng</Text>
                            {SEVERITY_OPTIONS.map((option) => (
                                <TouchableOpacity
                                    key={option.id}
                                    onPress={() => { onUpdateFilter('severity', option.id); }}
                                    style={[
                                        styles.modalOption,
                                        filters.severity === option.id && styles.modalOptionSelected
                                    ]}
                                >
                                    <Text style={[
                                        styles.modalOptionText,
                                        filters.severity === option.id && styles.modalOptionTextSelected
                                    ]}>
                                        {option.name}
                                    </Text>
                                    {filters.severity === option.id && (
                                        <CheckCircleIconSolid color="#8B5CF6" size={20} />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                    <View style={styles.modalActions}>
                        <TouchableOpacity
                            onPress={onResetFilters}
                            style={styles.modalActionButton}
                        >
                            <Text style={styles.modalActionText}>Xóa tất cả</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onClose}
                            style={[styles.modalActionButton, styles.modalActionButtonPrimary]}
                        >
                            <Text style={[styles.modalActionText, styles.modalActionTextPrimary]}>
                                Áp dụng
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    filterSection: {
        marginBottom: 24,
    },
    filterSectionTitle: {
        color: '#374151',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 12,
    },
    modalActionButton: {
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        flex: 1,
        marginHorizontal: 6,
        paddingVertical: 12,
    },
    modalActionButtonPrimary: {
        backgroundColor: '#8B5CF6',
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    modalActionText: {
        color: '#6B7280',
        fontSize: 14,
        fontWeight: '500',
    },
    modalActionTextPrimary: {
        color: '#FFFFFF',
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
});

export default FilterModal;