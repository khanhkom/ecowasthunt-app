// components/WasteInfo.tsx

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { SeverityLevel, WasteType } from '../report';

type WasteInfoProps = {
    readonly priority: number;
    readonly severity: SeverityLevel;
    readonly wasteType: WasteType;
}

const WasteInfo: React.FC<WasteInfoProps> = ({
    priority,
    severity,
    wasteType,
}) => {
    const getPriorityColor = (priority: number): string => {
        if (priority >= 7) return '#EF4444';
        if (priority >= 4) return '#F59E0B';
        return '#10B981';
    };

    return (
        <View style={styles.contentCard}>
            <Text style={styles.sectionTitle}>Thông tin rác thải</Text>

            <View style={styles.wasteInfoGrid}>
                <View style={styles.wasteInfoItem}>
                    <Text style={styles.wasteInfoLabel}>Loại rác thải</Text>
                    <View style={styles.wasteTypeContainer}>
                        <Text style={styles.wasteTypeIcon}>{wasteType.icon}</Text>
                        <Text style={styles.wasteTypeText}>{wasteType.name}</Text>
                    </View>
                </View>

                <View style={styles.wasteInfoItem}>
                    <Text style={styles.wasteInfoLabel}>Mức độ nghiêm trọng</Text>
                    <View style={[styles.severityContainer, { backgroundColor: severity.color }]}>
                        <Text style={styles.severityText}>{severity.name}</Text>
                    </View>
                </View>

                <View style={styles.wasteInfoItem}>
                    <Text style={styles.wasteInfoLabel}>Độ ưu tiên</Text>
                    <Text style={[
                        styles.priorityText,
                        { color: getPriorityColor(priority) }
                    ]}>
                        {priority}/10
                    </Text>
                </View>
            </View>
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
    priorityText: {
        fontSize: 14,
        fontWeight: '600',
    },
    sectionTitle: {
        color: '#111827',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
    },
    severityContainer: {
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    severityText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
    wasteInfoGrid: {
        gap: 16,
    },
    wasteInfoItem: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    wasteInfoLabel: {
        color: '#6B7280',
        fontSize: 14,
    },
    wasteTypeContainer: {
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    wasteTypeIcon: {
        fontSize: 16,
        marginRight: 6,
    },
    wasteTypeText: {
        color: '#374151',
        fontSize: 14,
        fontWeight: '500',
    },
});

export default WasteInfo;