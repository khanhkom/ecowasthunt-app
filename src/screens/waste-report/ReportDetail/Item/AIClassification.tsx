// components/AIClassification.tsx

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { AIClassification } from '../report';

type AIClassificationProps = {
    readonly aiClassification: AIClassification;
    readonly formatDate: (date: string) => string;
}

const AIClassificationComponent: React.FC<AIClassificationProps> = ({
    aiClassification,
    formatDate,
}) => {
    if (!aiClassification) {
        return null;
    }

    return (
        <View style={styles.contentCard}>
            <Text style={styles.sectionTitle}>Phân loại AI</Text>
            <View style={styles.aiContainer}>
                <View style={styles.aiHeader}>
                    <Text style={styles.aiTitle}>
                        Phát hiện: {aiClassification.detectedTypes.join(', ')}
                    </Text>
                    <Text style={styles.aiConfidence}>
                        {Math.round(aiClassification.confidence * 100)}%
                    </Text>
                </View>
                <Text style={styles.aiMeta}>
                    Xử lý: {formatDate(aiClassification.processedAt)} •{' '}
                    Model: {aiClassification.modelVersion}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    aiConfidence: {
        color: '#10B981',
        fontSize: 14,
        fontWeight: '600',
    },
    aiContainer: {
        backgroundColor: '#F8FAFC',
        borderColor: '#E2E8F0',
        borderRadius: 12,
        borderWidth: 1,
        padding: 16,
    },
    aiHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    aiMeta: {
        color: '#64748B',
        fontSize: 12,
    },
    aiTitle: {
        color: '#475569',
        flex: 1,
        fontSize: 14,
        fontWeight: '500',
    },
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
    sectionTitle: {
        color: '#111827',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
    },
});

export default AIClassificationComponent;