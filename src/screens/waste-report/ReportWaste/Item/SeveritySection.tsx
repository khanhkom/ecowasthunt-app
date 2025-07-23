import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type SeverityLevel = {
    color: string;
    description: string;
    id: string;
    name: string;
};

type SeveritySectionProps = {
    readonly onPress: () => void;
    readonly selectedSeverity?: SeverityLevel;
}

function SeveritySection({ onPress, selectedSeverity }: SeveritySectionProps) {
    return <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mức độ nghiêm trọng (tùy chọn)</Text>

        <TouchableOpacity
            onPress={onPress}
            style={[styles.selector, selectedSeverity && styles.selectorSelected]}
        >
            {selectedSeverity ? (
                <View style={styles.selectedItem}>
                    <View style={[styles.severityDot, { backgroundColor: selectedSeverity.color }]} />
                    <Text style={styles.selectedText}>{selectedSeverity.name}</Text>
                </View>
            ) : (
                <Text style={styles.selectorPlaceholder}>Chọn mức độ</Text>
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
    severityDot: {
        borderRadius: 6,
        height: 12,
        marginRight: 12,
        width: 12,
    },
});

export default SeveritySection;