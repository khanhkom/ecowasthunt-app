// components/ContentCard.tsx

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {
    CalendarIcon,
    UserIcon,
} from 'react-native-heroicons/outline';

import { User } from '../report';

type ContentCardProps = {
    readonly createdAt: string;
    readonly description: string;
    readonly formatDate: (date: string) => string;
    readonly reportedBy: User;
    readonly title: string;
}

const ContentCard: React.FC<ContentCardProps> = ({
    createdAt,
    description,
    formatDate,
    reportedBy,
    title,
}) => {
    return (
        <View style={styles.contentCard}>
            <Text style={styles.reportTitle}>{title}</Text>
            <Text style={styles.reportDescription}>{description}</Text>

            {/* Meta info */}
            <View style={styles.metaInfo}>
                <View style={styles.metaItem}>
                    <CalendarIcon color="#6B7280" size={16} />
                    <Text style={styles.metaText}>{formatDate(createdAt)}</Text>
                </View>

                <View style={styles.metaItem}>
                    <UserIcon color="#6B7280" size={16} />
                    <Text style={styles.metaText}>Báo cáo bởi: {reportedBy.name}</Text>
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
    metaInfo: {
        gap: 8,
    },
    metaItem: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    metaText: {
        color: '#6B7280',
        fontSize: 14,
        marginLeft: 8,
    },
    reportDescription: {
        color: '#4B5563',
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 16,
    },
    reportTitle: {
        color: '#111827',
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 28,
        marginBottom: 12,
    },
});

export default ContentCard;