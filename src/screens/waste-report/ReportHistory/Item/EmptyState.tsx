import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { ExclamationTriangleIcon } from 'react-native-heroicons/outline';

type EmptyStateProps = {
    readonly activeFiltersCount: number;
    readonly onCreateReport?: () => void;
    readonly searchQuery?: string;
}

function EmptyState({
    activeFiltersCount,
    onCreateReport = undefined,
    searchQuery = '',
}: EmptyStateProps) {
    const hasFilters = searchQuery !== '' || activeFiltersCount > 0;

    return (
        <View style={styles.emptyState}>
            <ExclamationTriangleIcon color="#D1D5DB" size={64} />
            <Text style={styles.emptyTitle}>
                {hasFilters ? 'Không tìm thấy báo cáo' : 'Chưa có báo cáo nào'}
            </Text>
            <Text style={styles.emptyText}>
                {hasFilters
                    ? 'Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm'
                    : 'Bạn chưa gửi báo cáo rác thải nào. Hãy bắt đầu đóng góp cho môi trường!'
                }
            </Text>
            {!hasFilters && onCreateReport ? <TouchableOpacity
                onPress={onCreateReport}
                style={styles.createReportButton}
            >
                <Text style={styles.createReportText}>Tạo báo cáo mới</Text>
            </TouchableOpacity> : undefined}
        </View>
    );
}

const styles = StyleSheet.create({
    createReportButton: {
        backgroundColor: '#8B5CF6',
        borderRadius: 12,
        paddingHorizontal: 24,
        paddingVertical: 12,
    },
    createReportText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
        paddingVertical: 60,
    },
    emptyText: {
        color: '#9CA3AF',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 24,
        textAlign: 'center',
    },
    emptyTitle: {
        color: '#6B7280',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
        marginTop: 16,
    },
});

export default EmptyState;