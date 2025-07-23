import React from 'react';
import { Modal, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CheckCircleIcon } from 'react-native-heroicons/solid';

import { SEVERITY_LEVELS } from '../constants';

type SeverityLevel = {
    color: string;
    description: string;
    id: string;
    name: string;
};

type SeverityModalProps = {
    readonly onClose: () => void;
    readonly onSelect: (id: string) => void;
    readonly selectedSeverity: string;
    readonly visible: boolean;
}

function SeverityModal({ onClose, onSelect, selectedSeverity, visible }: SeverityModalProps) {
    return <Modal animationType="slide" transparent visible={visible}>
        <View style={styles.modalOverlay}>
            {/* StatusBar cho modal */}
            <StatusBar backgroundColor={Platform.OS === 'android' ? 'rgba(0,0,0,0.5)' : 'transparent'} barStyle="dark-content" translucent />
            {/* Backdrop bấm để đóng modal */}
            <TouchableOpacity activeOpacity={1} onPress={onClose} style={StyleSheet.absoluteFill} />
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Chọn mức độ nghiêm trọng</Text>
                <ScrollView>
                    {SEVERITY_LEVELS.map((level: SeverityLevel) => (
                        <TouchableOpacity
                            key={level.id}
                            onPress={() => { onSelect(level.id); }}
                            style={[
                                styles.optionItem,
                                selectedSeverity === level.id && styles.optionItemSelected
                            ]}
                        >
                            <View style={[styles.severityDot, { backgroundColor: level.color }]} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.optionText}>{level.name}</Text>
                                <Text style={styles.optionDescription}>{level.description}</Text>
                            </View>
                            {selectedSeverity === level.id && (
                                <CheckCircleIcon color="#8B5CF6" size={20} />
                            )}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
                    <Text style={styles.modalCloseText}>Đóng</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
}

const styles = StyleSheet.create({
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
        maxHeight: '70%',
        padding: 24,
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
    optionDescription: {
        color: '#6B7280',
        fontSize: 12,
        marginTop: 2,
    },
    optionItem: {
        alignItems: 'center',
        borderRadius: 12,
        flexDirection: 'row',
        marginBottom: 8,
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    optionItemSelected: {
        backgroundColor: '#F3F4F6',
    },
    optionText: {
        color: '#111827',
        fontSize: 16,
    },
    severityDot: {
        borderRadius: 6,
        height: 12,
        marginRight: 12,
        width: 12,
    },
});

export default SeverityModal;