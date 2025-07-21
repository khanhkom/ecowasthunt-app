import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    BellIcon,
    CameraIcon,
    CheckCircleIcon,
    FireIcon,
    MapPinIcon,
    UserGroupIcon,
} from 'react-native-heroicons/outline';
import {
    StarIcon as StarSolidIcon,
    TrophyIcon as TrophySolidIcon,
} from 'react-native-heroicons/solid';

// Types
type Activity = {
    color: string;
    icon: React.ReactNode;
    id: number;
    points: string;
    subtitle: string;
    time: string;
    title: string;
    type: string;
}

type QuickAction = {
    action: string;
    gradient: string[];
    icon: React.ReactNode;
    id: number;
    subtitle: string;
    title: string;
}

type Tip = {
    content: string;
    id: number;
    image: string;
    title: string;
}

type UserData = {
    level: string;
    name: string;
    points: number;
    progress: number;
    streak: number;
    todayReports: number;
    weeklyGoal: number;
}

type WasteType = {
    color: string;
    icon: string;
    name: string;
    percentage: number;
}

// Mock Data
const userData: UserData = {
    level: 'Eco Hero',
    name: 'An',
    points: 2850,
    progress: 8,
    streak: 12,
    todayReports: 3,
    weeklyGoal: 15,
};

const quickActions: QuickAction[] = [
    {
        action: 'camera',
        gradient: ['#8B5CF6', '#A855F7'],
        icon: <CameraIcon color="#fff" size={24} strokeWidth={2} />,
        id: 1,
        subtitle: 'AI nhận diện rác',
        title: 'Chụp & Phân loại',
    },
    {
        action: 'report',
        gradient: ['#10B981', '#059669'],
        icon: <MapPinIcon color="#fff" size={24} strokeWidth={2} />,
        id: 2,
        subtitle: 'Thêm vị trí mới',
        title: 'Báo cáo điểm rác',
    },
    {
        action: 'map',
        gradient: ['#3B82F6', '#2563EB'],
        icon: <MapPinIcon color="#fff" size={24} strokeWidth={2} />,
        id: 3,
        subtitle: 'Điểm thu gom gần nhất',
        title: 'Xem bản đồ',
    },
    {
        action: 'community',
        gradient: ['#F59E0B', '#D97706'],
        icon: <UserGroupIcon color="#fff" size={24} strokeWidth={2} />,
        id: 4,
        subtitle: 'Chia sẻ kinh nghiệm',
        title: 'Cộng đồng',
    },
];

const recentActivities: Activity[] = [
    {
        color: '#10B981',
        icon: <CheckCircleIcon color="#10B981" size={20} strokeWidth={2} />,
        id: 1,
        points: '+10',
        subtitle: 'Chai nhựa PET - Có thể tái chế',
        time: '5 phút trước',
        title: 'Phân loại thành công',
        type: 'classification',
    },
    {
        color: '#3B82F6',
        icon: <MapPinIcon color="#3B82F6" size={20} strokeWidth={2} />,
        id: 2,
        points: '+25',
        subtitle: 'Ngã tư Nguyễn Trãi - Trần Hưng Đạo',
        time: '1 giờ trước',
        title: 'Báo cáo điểm rác',
        type: 'report',
    },
    {
        color: '#F59E0B',
        icon: <TrophySolidIcon color="#F59E0B" size={20} />,
        id: 3,
        points: '+50',
        subtitle: 'Eco Warrior - 100 báo cáo',
        time: '2 giờ trước',
        title: 'Đạt thành tích mới',
        type: 'achievement',
    },
];

const wasteTypes: WasteType[] = [
    { color: '#3B82F6', icon: '🥤', name: 'Nhựa', percentage: 35 },
    { color: '#10B981', icon: '📄', name: 'Giấy', percentage: 25 },
    { color: '#F59E0B', icon: '🥫', name: 'Kim loại', percentage: 20 },
    { color: '#8B5CF6', icon: '🍎', name: 'Hữu cơ', percentage: 15 },
    { color: '#6B7280', icon: '🗑️', name: 'Khác', percentage: 5 },
];

const tips: Tip[] = [
    {
        content: 'Rửa sạch chai lọ trước khi bỏ vào thùng tái chế',
        id: 1,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
        title: 'Mẹo phân loại rác hiệu quả',
    },
    {
        content: 'Pin lithium cần được xử lý tại các điểm thu gom chuyên biệt',
        id: 2,
        image: 'https://images.unsplash.com/photo-1574263867128-a3d5c1b1deac?w=300&h=200&fit=crop',
        title: 'Tái chế pin cũ đúng cách',
    },
];

function HomeScreen() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60_000);
        return () => { clearInterval(timer); };
    }, []);

    const getGreeting = () => {
        const hour = currentTime.getHours();
        if (hour < 12) return 'Chào buổi sáng';
        if (hour < 18) return 'Chào buổi chiều';
        return 'Chào buổi tối';
    };

    const handleQuickAction = (action: string) => {
        console.log(`Action: ${action}`);
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <View style={styles.headerLeft}>
                <Text style={styles.greeting}>{getGreeting()}</Text>
                <Text style={styles.userName}>{userData.name}!</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
                <BellIcon color="#1F2937" size={24} strokeWidth={2} />
                <View style={styles.notificationDot} />
            </TouchableOpacity>
        </View>
    );

    const renderStatsCards = () => (
        <View style={styles.statsContainer}>
            <View style={styles.statsCard}>
                <View style={styles.statItem}>
                    <View style={styles.statIconContainer}>
                        <StarSolidIcon color="#8B5CF6" size={20} />
                    </View>
                    <View>
                        <Text style={styles.statValue}>{userData.points.toLocaleString()}</Text>
                        <Text style={styles.statLabel}>Điểm</Text>
                    </View>
                </View>

                <View style={styles.statItem}>
                    <View style={styles.statIconContainer}>
                        <TrophySolidIcon color="#F59E0B" size={20} />
                    </View>
                    <View>
                        <Text style={styles.statValue}>{userData.level}</Text>
                        <Text style={styles.statLabel}>Cấp độ</Text>
                    </View>
                </View>

                <View style={styles.statItem}>
                    <View style={styles.statIconContainer}>
                        <FireIcon color="#EF4444" size={20} strokeWidth={2} />
                    </View>
                    <View>
                        <Text style={styles.statValue}>{userData.streak}</Text>
                        <Text style={styles.statLabel}>Ngày liên tiếp</Text>
                    </View>
                </View>
            </View>

            <View style={styles.progressCard}>
                <Text style={styles.progressTitle}>Tiến độ hôm nay</Text>
                <View style={styles.progressInfo}>
                    <Text style={styles.progressText}>
                        {userData.progress}/{userData.weeklyGoal} báo cáo trong tuần
                    </Text>
                    <Text style={styles.progressPercentage}>
                        {Math.round((userData.progress / userData.weeklyGoal) * 100)}%
                    </Text>
                </View>
                <View style={styles.progressBarContainer}>
                    <View
                        style={[
                            styles.progressBarFill,
                            { width: `${(userData.progress / userData.weeklyGoal) * 100}%` },
                        ]}
                    />
                </View>
            </View>
        </View>
    );

    const renderQuickAction = ({ item }: { item: QuickAction }) => (
        <TouchableOpacity
            onPress={() => { handleQuickAction(item.action); }}
            style={[
                styles.quickActionCard,
                {
                    backgroundColor: item.gradient[0],
                    shadowColor: item.gradient[0],
                },
            ]}
        >
            <View style={styles.quickActionIcon}>{item.icon}</View>
            <Text style={styles.quickActionTitle}>{item.title}</Text>
            <Text style={styles.quickActionSubtitle}>{item.subtitle}</Text>
        </TouchableOpacity>
    );

    const renderQuickActions = () => (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hành động nhanh</Text>
            <FlatList
                contentContainerStyle={styles.quickActionsContainer}
                data={quickActions}
                horizontal
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderQuickAction}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );

    const renderActivity = ({ item }: { item: Activity }) => (
        <View style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: `${item.color}20` }]}>
                {item.icon}
            </View>
            <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{item.title}</Text>
                <Text style={styles.activitySubtitle}>{item.subtitle}</Text>
                <Text style={styles.activityTime}>{item.time}</Text>
            </View>
            <View style={styles.activityPoints}>
                <Text style={[styles.pointsText, { color: item.color }]}>{item.points}</Text>
            </View>
        </View>
    );

    const renderRecentActivities = () => (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Hoạt động gần đây</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAllText}>Xem tất cả</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.activitiesContainer}>
                <FlatList
                    data={recentActivities}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderActivity}
                    scrollEnabled={false}
                />
            </View>
        </View>
    );

    const renderWasteType = (waste: WasteType, index: number) => (
        <View key={index} style={styles.wasteTypeItem}>
            <View style={styles.wasteTypeLeft}>
                <Text style={styles.wasteIcon}>{waste.icon}</Text>
                <Text style={styles.wasteTypeName}>{waste.name}</Text>
            </View>
            <View style={styles.wasteTypeRight}>
                <View style={styles.progressBar}>
                    <View
                        style={[
                            styles.progressFill,
                            {
                                backgroundColor: waste.color,
                                width: `${waste.percentage}%`,
                            },
                        ]}
                    />
                </View>
                <Text style={styles.wastePercentage}>{waste.percentage}%</Text>
            </View>
        </View>
    );

    const renderWasteStatistics = () => (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thống kê loại rác (tuần này)</Text>
            <View style={styles.wasteStatsCard}>
                {wasteTypes.map(renderWasteType)}
            </View>
        </View>
    );

    const renderTip = ({ item }: { item: Tip }) => (
        <TouchableOpacity style={styles.tipCard}>
            <Image source={{ uri: item.image }} style={styles.tipImage} />
            <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>{item.title}</Text>
                <Text style={styles.tipText}>{item.content}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderTipsSection = () => (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mẹo và kiến thức</Text>
            <FlatList
                contentContainerStyle={styles.tipsContainer}
                data={tips}
                horizontal
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderTip}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            {renderHeader()}
            {renderStatsCards()}
            {renderQuickActions()}
            {renderRecentActivities()}
            {renderWasteStatistics()}
            {renderTipsSection()}
            <View style={styles.bottomPadding} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    activitiesContainer: {
        backgroundColor: '#fff',
        borderRadius: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    activityContent: {
        flex: 1,
    },
    activityIcon: {
        alignItems: 'center',
        borderRadius: 20,
        height: 40,
        justifyContent: 'center',
        marginRight: 12,
        width: 40,
    },
    activityItem: {
        alignItems: 'center',
        borderBottomColor: '#F3F4F6',
        borderBottomWidth: 1,
        flexDirection: 'row',
        padding: 16,
    },
    activityPoints: {
        alignItems: 'center',
    },
    activitySubtitle: {
        color: '#6B7280',
        fontSize: 13,
        marginBottom: 2,
    },
    activityTime: {
        color: '#9CA3AF',
        fontSize: 12,
    },
    activityTitle: {
        color: '#1F2937',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 2,
    },
    bottomPadding: {
        height: 100,
    },
    container: {
        backgroundColor: '#F9FAFB',
        flex: 1,
    },
    greeting: {
        color: '#6B7280',
        fontSize: 16,
    },
    header: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 20,
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 40 : 20,

    },
    headerLeft: {
        flex: 1,
    },
    notificationButton: {
        padding: 8,
        position: 'relative',
    },
    notificationDot: {
        backgroundColor: '#EF4444',
        borderRadius: 4,
        height: 8,
        position: 'absolute',
        right: 6,
        top: 6,
        width: 8,
    },
    pointsText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    progressBar: {
        backgroundColor: '#F3F4F6',
        borderRadius: 3,
        flex: 1,
        height: 6,
        marginRight: 12,
        overflow: 'hidden',
    },
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
    progressFill: {
        borderRadius: 3,
        height: '100%',
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
    quickActionCard: {
        borderRadius: 16,
        elevation: 5,
        height: 120,
        justifyContent: 'space-between',
        marginRight: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        width: 140,
    },
    quickActionIcon: {
        alignSelf: 'flex-start',
    },
    quickActionsContainer: {
        paddingRight: 20,
    },
    quickActionSubtitle: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 12,
    },
    quickActionTitle: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    section: {
        marginTop: 24,
        paddingHorizontal: 20,
    },
    sectionHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    sectionTitle: {
        color: '#1F2937',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    seeAllText: {
        color: '#8B5CF6',
        fontSize: 14,
        fontWeight: '600',
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
    tipCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        elevation: 3,
        marginBottom: 3,
        marginRight: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        width: 280
    },
    tipContent: {
        padding: 16,
    },
    tipImage: {
        height: 120,
        width: '100%',
    },
    tipsContainer: {
        paddingRight: 20,
    },
    tipText: {
        color: '#6B7280',
        fontSize: 13,
        lineHeight: 18,
    },
    tipTitle: {
        color: '#1F2937',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    userName: {
        color: '#1F2937',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 4,
    },
    wasteIcon: {
        fontSize: 20,
        marginRight: 12,
    },
    wastePercentage: {
        color: '#6B7280',
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'right',
        width: 30,
    },
    wasteStatsCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        elevation: 3,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    wasteTypeItem: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    wasteTypeLeft: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
    },
    wasteTypeName: {
        color: '#1F2937',
        fontSize: 14,
        fontWeight: '500',
    },
    wasteTypeRight: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
    },
});

export default HomeScreen;