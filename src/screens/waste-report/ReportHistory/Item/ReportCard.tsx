import type { Animated as RNAnimated } from 'react-native';

import {
    Animated,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    EyeIcon,
    HandThumbDownIcon,
    HandThumbUpIcon,
    MapPinIcon,
} from 'react-native-heroicons/outline';

import { REPORT_STATUS, SEVERITY_LEVELS, WASTE_TYPES } from '../reportConstants';

// Định nghĩa type cho report
export type ReportAIClassification = {
    confidence?: number;
    detectedTypes?: string[];
};

export type ReportCardProps = {
    readonly fadeAnim: RNAnimated.AnimatedInterpolation<number> | RNAnimated.Value;
    readonly onPress: (report: ReportCardReport) => void;
    readonly report: ReportCardReport;
};

export type ReportCardReport = {
    _id: string;
    aiClassification?: ReportAIClassification;
    createdAt: Date | string;
    description?: string;
    downvotes?: number;
    images?: string[];
    location?: Partial<ReportLocation>;
    priority?: number;
    severity?: keyof typeof SEVERITY_LEVELS;
    status?: keyof typeof REPORT_STATUS;
    tags?: string[];
    title: string;
    upvotes?: number;
    viewCount?: number;
    wasteType: keyof typeof WASTE_TYPES;
};

export type ReportLocation = {
    address: string;
    city: string;
    coordinates: [number, number];
    district: string;
    ward: string;
};

function ReportCard({ fadeAnim, onPress, report }: ReportCardProps) {
    const wasteType = WASTE_TYPES[report.wasteType ?? 'PLASTIC'];
    const status = REPORT_STATUS[report.status ?? 'pending'];
    const severity = SEVERITY_LEVELS[report.severity ?? 'LOW'];
    const StatusIcon = status.icon;

    const formatDate = (date: Date | number | string) => {
        const now = new Date();
        const reportDate = new Date(date);
        const diffTime = Math.abs(now.getTime() - reportDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return 'Hôm qua';
        if (diffDays <= 7) return `${diffDays} ngày trước`;
        return reportDate.toLocaleDateString('vi-VN');
    };

    const getPriorityColor = (priority) => {
        if (priority >= 7) return '#EF4444';
        if (priority >= 4) return '#F59E0B';
        return '#10B981';
    };

    return (
        <Animated.View style={[styles.reportCard, { opacity: fadeAnim }]}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { onPress(report); }}
            >
                {/* Header */}
                <View style={styles.cardHeader}>
                    <View style={styles.cardHeaderLeft}>
                        {status ? <View style={[styles.statusBadge, { backgroundColor: status.color }]}>
                            {StatusIcon ? <StatusIcon color="#FFFFFF" size={12} /> : undefined}
                            <Text style={styles.statusText}>{status.name}</Text>
                        </View> : undefined}

                        {report.aiClassification ? <View style={styles.aiBadge}>
                            <Text style={styles.aiText}>AI</Text>
                        </View> : undefined}
                    </View>

                    <Text style={styles.dateText}>{formatDate(report.createdAt)}</Text>
                </View>

                {/* Main Content */}
                <View style={styles.cardContent}>
                    {/* Image and Info */}
                    <View style={styles.contentRow}>
                        <Image
                            defaultSource={{ uri: 'https://via.placeholder.com/80x80?text=No+Image' }}
                            source={{ uri: report.images?.[0] ?? 'https://via.placeholder.com/80x80?text=No+Image' }}
                            style={styles.reportImage}
                        />

                        <View style={styles.reportInfo}>
                            <Text numberOfLines={2} style={styles.reportTitle}>
                                {report.title}
                            </Text>

                            <View style={styles.locationRow}>
                                <MapPinIcon color="#6B7280" size={14} />
                                <Text numberOfLines={1} style={styles.locationText}>
                                    {report.location?.district}, {report.location?.city}
                                </Text>
                            </View>

                            <View style={styles.typeRow}>
                                {wasteType ? <View style={styles.wasteTypeChip}>
                                    <Text style={styles.wasteTypeIcon}>{wasteType.icon}</Text>
                                    <Text style={styles.wasteTypeText}>{wasteType.name}</Text>
                                </View> : undefined}

                                {severity ? <View style={[styles.severityChip, { backgroundColor: severity.color }]}>
                                    <Text style={styles.severityText}>{severity.name}</Text>
                                </View> : undefined}
                            </View>
                        </View>
                    </View>

                    {/* Tags */}
                    {report.tags && report.tags.length > 0 ? <View style={styles.tagsContainer}>
                        {report.tags.slice(0, 3).map((tag, index) => (
                            <View key={typeof tag === 'string' ? tag : index} style={styles.tag}>
                                <Text style={styles.tagText}>{tag}</Text>
                            </View>
                        ))}
                        {report.tags.length > 3 && (
                            <Text style={styles.moreTagsText}>+{report.tags.length - 3}</Text>
                        )}
                    </View> : undefined}

                    {/* Stats Row */}
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <HandThumbUpIcon color="#10B981" size={14} />
                            <Text style={styles.statText}>{report.upvotes ?? 0}</Text>
                        </View>

                        <View style={styles.statItem}>
                            <HandThumbDownIcon color="#EF4444" size={14} />
                            <Text style={styles.statText}>{report.downvotes ?? 0}</Text>
                        </View>

                        <View style={styles.statItem}>
                            <EyeIcon color="#6B7280" size={14} />
                            <Text style={styles.statText}>{report.viewCount ?? 0}</Text>
                        </View>

                        <View style={styles.priorityContainer}>
                            <Text style={styles.priorityLabel}>Ưu tiên: </Text>
                            <Text style={[
                                styles.priorityValue,
                                { color: getPriorityColor(report.priority ?? 1) }
                            ]}>
                                {report.priority ?? 1}/10
                            </Text>
                        </View>
                    </View>

                    {/* AI Classification */}
                    {report.aiClassification ? <View style={styles.aiClassification}>
                        <Text style={styles.aiLabel}>
                            AI phân loại: {report.aiClassification.detectedTypes?.join(', ')}
                        </Text>
                        <Text style={styles.aiConfidence}>
                            Độ tin cậy: {Math.round((report.aiClassification.confidence ?? 0) * 100)}%
                        </Text>
                    </View> : undefined}
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    aiBadge: {
        backgroundColor: '#8B5CF6',
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    aiClassification: {
        backgroundColor: '#F8FAFC',
        borderColor: '#E2E8F0',
        borderRadius: 8,
        borderWidth: 1,
        padding: 8,
    },
    aiConfidence: {
        color: '#64748B',
        fontSize: 10,
        marginTop: 2,
    },
    aiLabel: {
        color: '#475569',
        fontSize: 11,
        fontWeight: '500',
    },
    aiText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: '600',
    },
    cardContent: {
        gap: 12,
    },
    cardHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    cardHeaderLeft: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    contentRow: {
        flexDirection: 'row',
    },
    dateText: {
        color: '#6B7280',
        fontSize: 12,
    },
    locationRow: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 4,
    },
    locationText: {
        color: '#6B7280',
        flex: 1,
        fontSize: 12,
        marginLeft: 4,
    },
    moreTagsText: {
        color: '#6B7280',
        fontSize: 10,
        fontStyle: 'italic',
    },
    priorityContainer: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    priorityLabel: {
        color: '#6B7280',
        fontSize: 12,
    },
    priorityValue: {
        fontSize: 12,
        fontWeight: '600',
    },
    reportCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        elevation: 3,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            height: 2,
            width: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    reportImage: {
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        height: 80,
        marginRight: 12,
        width: 80,
    },
    reportInfo: {
        flex: 1,
        justifyContent: 'space-between',
    },
    reportTitle: {
        color: '#111827',
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 20,
    },
    severityChip: {
        borderRadius: 6,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    severityText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: '600',
    },
    statItem: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    statsRow: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statText: {
        color: '#6B7280',
        fontSize: 12,
        fontWeight: '500',
        marginLeft: 4,
    },
    statusBadge: {
        alignItems: 'center',
        borderRadius: 8,
        flexDirection: 'row',
        marginRight: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    statusText: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: '600',
        marginLeft: 4,
    },
    tag: {
        backgroundColor: '#EFF6FF',
        borderColor: '#DBEAFE',
        borderRadius: 6,
        borderWidth: 1,
        marginBottom: 4,
        marginRight: 6,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    tagsContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tagText: {
        color: '#1E40AF',
        fontSize: 10,
        fontWeight: '500',
    },
    typeRow: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 8,
    },
    wasteTypeChip: {
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        flexDirection: 'row',
        marginRight: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    wasteTypeIcon: {
        fontSize: 12,
        marginRight: 4,
    },
    wasteTypeText: {
        color: '#374151',
        fontSize: 11,
        fontWeight: '500',
    },
});

export default ReportCard;