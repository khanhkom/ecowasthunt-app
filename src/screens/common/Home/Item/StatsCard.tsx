import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FireIcon } from 'react-native-heroicons/outline';
import { StarIcon as StarSolidIcon, TrophyIcon as TrophySolidIcon } from 'react-native-heroicons/solid';

import { navigate, Paths } from '@/navigation';

type StatsCardProps = {
    readonly level: string;
    readonly points: number;
    readonly progress: number;
    readonly streak: number;
    readonly weeklyGoal: number;
}

function StatsCard({ level, points, progress, streak, weeklyGoal }: StatsCardProps) {
    return (
        <View style={styles.statsContainer}>
            <View style={styles.statsCard}>
                <View style={styles.statItem}>
                    <View style={styles.statIconContainer}>
                        <StarSolidIcon color="#8B5CF6" size={20} />
                    </View>
                    <View>
                        <Text style={styles.statValue}>{points.toLocaleString()}</Text>
                        <Text style={styles.statLabel}>Điểm</Text>
                    </View>
                </View>
                <View style={styles.statItem}>
                    <View style={styles.statIconContainer}>
                        <TrophySolidIcon color="#F59E0B" size={20} />
                    </View>
                    <View>
                        <Text style={styles.statValue}>{level}</Text>
                        <Text style={styles.statLabel}>Cấp độ</Text>
                    </View>
                </View>
                <View style={styles.statItem}>
                    <View style={styles.statIconContainer}>
                        <FireIcon color="#EF4444" size={20} strokeWidth={2} />
                    </View>
                    <View>
                        <Text style={styles.statValue}>{streak}</Text>
                        <Text style={styles.statLabel}>Ngày liên tiếp</Text>
                    </View>
                </View>
            </View>
            <Pressable onPress={() => { navigate(Paths.ReportHistory) }} style={styles.progressCard}>
                <Text style={styles.progressTitle}>Tiến độ hôm nay</Text>
                <View style={styles.progressInfo}>
                    <Text style={styles.progressText}>
                        {progress}/{weeklyGoal} báo cáo trong tuần
                    </Text>
                    <Text style={styles.progressPercentage}>
                        {Math.round((progress / weeklyGoal) * 100)}%
                    </Text>
                </View>
                <View style={styles.progressBarContainer}>
                    <View
                        style={[
                            styles.progressBarFill,
                            { width: `${(progress / weeklyGoal) * 100}%` },
                        ]}
                    />
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    progressBarContainer: {
        backgroundColor: '#F3F4F6',
        borderRadius: 4,
        height: 8,
        overflow: 'hidden',
    },
    progressBarFill: {
        backgroundColor: '#8B5CF6',
        borderRadius: 4,
        height: '100%',
    },
    progressCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        elevation: 3,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    progressInfo: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    progressPercentage: {
        color: '#8B5CF6',
        fontSize: 14,
        fontWeight: '600',
    },
    progressText: {
        color: '#6B7280',
        fontSize: 14,
    },
    progressTitle: {
        color: '#1F2937',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
    },
    statIconContainer: {
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 20,
        height: 40,
        justifyContent: 'center',
        marginBottom: 8,
        width: 40,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statLabel: {
        color: '#6B7280',
        fontSize: 12,
        marginTop: 2,
        textAlign: 'center',
    },
    statsCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    statsContainer: {
        marginTop: 10,
        paddingHorizontal: 20,
    },
    statValue: {
        color: '#1F2937',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default StatsCard; 