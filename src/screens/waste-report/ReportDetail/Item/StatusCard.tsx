// components/StatusCard.tsx

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { UserIcon } from 'react-native-heroicons/outline';

import { ReportStatus, User } from '../report';

type StatusCardProps = {
    readonly assignedTo?: User;
    readonly status: ReportStatus;
}

const StatusCard: React.FC<StatusCardProps> = ({
    assignedTo,
    status,
}) => {
    const StatusIcon = status.icon;

    return (
        <View style={styles.statusCard}>
            <View style={styles.statusHeader}>
                <View style={[styles.statusBadge, { backgroundColor: status.color }]}>
                    <StatusIcon color="#FFFFFF" size={16} />
                    <Text style={styles.statusText}>{status.name}</Text>
                </View>
            </View>

            <Text style={styles.statusDescription}>{status.description}</Text>

            {assignedTo ? <View style={styles.assignedInfo}>
                <UserIcon color="#6B7280" size={16} />
                <Text style={styles.assignedText}>
                    Phụ trách: {assignedTo.name}
                </Text>
            </View> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    assignedInfo: {
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    assignedText: {
        color: '#6B7280',
        fontSize: 12,
        marginLeft: 6,
    },
    statusBadge: {
        alignItems: 'center',
        borderRadius: 12,
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    statusCard: {
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
    statusDescription: {
        color: '#6B7280',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 12,
    },
    statusHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    statusText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 6,
    },
});

export default StatusCard;