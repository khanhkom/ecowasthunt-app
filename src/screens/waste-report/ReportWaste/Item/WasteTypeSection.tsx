import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type WasteType = {
    color: string;
    icon: string;
    id: string;
    name: string;
};

type WasteTypeSectionProps = {
    readonly onPress: () => void;
    readonly selectedWasteType?: WasteType;
}

function WasteTypeSection({ onPress, selectedWasteType }: WasteTypeSectionProps) {
    return <View style={styles.section}>
        <Text style={styles.sectionTitle}>Loại rác thải</Text>

        <TouchableOpacity
            onPress={onPress}
            style={[styles.selector, selectedWasteType && styles.selectorSelected]}
        >
            {selectedWasteType ? (
                <View style={styles.selectedItem}>
                    <Text style={styles.selectedIcon}>{selectedWasteType.icon}</Text>
                    <Text style={styles.selectedText}>{selectedWasteType.name}</Text>
                </View>
            ) : (
                <Text style={styles.selectorPlaceholder}>Chọn loại rác thải *</Text>
            )}
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        color: '#111827',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 16,
    },
    selectedIcon: {
        fontSize: 20,
        marginRight: 12,
    },
    selectedItem: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    selectedText: {
        color: '#111827',
        fontSize: 16,
        fontWeight: '500',
    },
    selector: {
        backgroundColor: '#FFFFFF',
        borderColor: '#E5E7EB',
        borderRadius: 12,
        borderWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    selectorPlaceholder: {
        color: '#9CA3AF',
        fontSize: 16,
    },
    selectorSelected: {
        backgroundColor: '#F8FAFC',
        borderColor: '#8B5CF6',
    },
});

export default WasteTypeSection;