// components/ReportHeader.tsx

import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    ChevronLeftIcon,
    EllipsisHorizontalIcon,
    ShareIcon,
} from 'react-native-heroicons/outline';

type ReportHeaderProps = {
    readonly onBack: () => void;
    readonly onMoreOptions: () => void;
    readonly onShare: () => void;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({
    onBack,
    onMoreOptions,
    onShare,
}) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={onBack} style={styles.headerButton}>
                <ChevronLeftIcon color="#6B7280" size={24} />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Chi tiết báo cáo</Text>

            <View style={styles.headerActions}>
                <TouchableOpacity onPress={onShare} style={styles.headerButton}>
                    <ShareIcon color="#6B7280" size={24} />
                </TouchableOpacity>

                <TouchableOpacity onPress={onMoreOptions} style={styles.headerButton}>
                    <EllipsisHorizontalIcon color="#6B7280" size={24} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderBottomColor: '#E5E7EB',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    headerActions: {
        flexDirection: 'row',
        gap: 8,
    },
    headerButton: {
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 20,
        height: 40,
        justifyContent: 'center',
        width: 40,
    },
    headerTitle: {
        color: '#111827',
        flex: 1,
        fontSize: 18,
        fontWeight: '600',
        marginHorizontal: 16,
        textAlign: 'center',
    },
});

export default ReportHeader;