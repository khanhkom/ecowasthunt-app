// components/ResolutionInfo.tsx

import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {
    CurrencyDollarIcon,
    ScaleIcon,
} from 'react-native-heroicons/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from 'react-native-heroicons/solid';

import { Resolution } from '../report';

type ResolutionInfoProps = {
    readonly formatCurrency: (amount: number) => string;
    readonly formatDate: (date: string) => string;
    readonly resolution: Resolution;
}

const ResolutionInfo: React.FC<ResolutionInfoProps> = ({
    formatCurrency,
    formatDate,
    resolution,
}) => {
    if (!resolution.resolvedBy) {
        return null;
    }

    return (
        <View style={styles.contentCard}>
            <Text style={styles.sectionTitle}>Kết quả xử lý</Text>
            <View style={styles.resolutionContainer}>
                <View style={styles.resolutionHeader}>
                    <CheckCircleIconSolid color="#10B981" size={20} />
                    <Text style={styles.resolutionTitle}>Đã xử lý hoàn tất</Text>
                </View>

                <Text style={styles.resolutionNote}>{resolution.resolutionNote}</Text>

                <View style={styles.resolutionMeta}>
                    <View style={styles.resolutionMetaItem}>
                        <Text style={styles.resolutionMetaLabel}>Xử lý bởi:</Text>
                        <Text style={styles.resolutionMetaValue}>{resolution.resolvedBy.name}</Text>
                    </View>

                    <View style={styles.resolutionMetaItem}>
                        <Text style={styles.resolutionMetaLabel}>Thời gian:</Text>
                        <Text style={styles.resolutionMetaValue}>{formatDate(resolution.resolvedAt)}</Text>
                    </View>

                    {resolution.estimatedWeight ? <View style={styles.resolutionMetaItem}>
                        <ScaleIcon color="#6B7280" size={16} />
                        <Text style={styles.resolutionMetaValue}>{resolution.estimatedWeight} kg</Text>
                    </View> : null}

                    {resolution.processingCost ? <View style={styles.resolutionMetaItem}>
                        <CurrencyDollarIcon color="#6B7280" size={16} />
                        <Text style={styles.resolutionMetaValue}>{formatCurrency(resolution.processingCost)}</Text>
                    </View> : null}
                </View>

                {/* Resolution Images */}
                {resolution.resolutionImages && resolution.resolutionImages.length > 0 ? <View style={styles.resolutionImagesContainer}>
                    <Text style={styles.resolutionImagesTitle}>Hình ảnh sau xử lý:</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {resolution.resolutionImages.map((image, index) => (
                            <Image
                                key={index}
                                source={{ uri: image }}
                                style={styles.resolutionImage}
                            />
                        ))}
                    </ScrollView>
                </View> : null}
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
    resolutionContainer: {
        backgroundColor: '#F0FDF4',
        borderColor: '#BBF7D0',
        borderRadius: 12,
        borderWidth: 1,
        padding: 16,
    },
    resolutionHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 12,
    },
    resolutionImage: {
        borderRadius: 8,
        height: 80,
        marginRight: 8,
        width: 80,
    },
    resolutionImagesContainer: {
        marginTop: 16,
    },
    resolutionImagesTitle: {
        color: '#065F46',
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
    },
    resolutionMeta: {
        gap: 8,
    },
    resolutionMetaItem: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    resolutionMetaLabel: {
        color: '#065F46',
        fontSize: 12,
        fontWeight: '500',
        marginRight: 8,
    },
    resolutionMetaValue: {
        color: '#047857',
        fontSize: 12,
        marginLeft: 4,
    },
    resolutionNote: {
        color: '#047857',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 16,
    },
    resolutionTitle: {
        color: '#065F46',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    sectionTitle: {
        color: '#111827',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
    },
});

export default ResolutionInfo;