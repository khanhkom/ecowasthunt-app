import React, { useState } from 'react';
import {
    Dimensions,
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
    ArrowPathIcon,
    ArrowRightOnRectangleIcon,
    BellIcon,
    CameraIcon,
    ChartBarIcon,
    CogIcon,
    MapPinIcon,
    QuestionMarkCircleIcon,
    StarIcon,
    TrophyIcon,
} from 'react-native-heroicons/outline';
import {
    StarIcon as StarSolidIcon,
    TrophyIcon as TrophySolidIcon,
} from 'react-native-heroicons/solid';

const { width } = Dimensions.get('window');

// Types
type Badge = {
    earned: boolean;
    icon: string;
    id: number;
    name: string;
}

type UserData = {
    avatar: string;
    badges: Badge[];
    carbonSaved: number;
    correctClassifications: number;
    email: string;
    joinDate: string;
    level: string;
    name: string;
    points: number;
    streak: number;
    totalReports: number;
    wasteCollected: number;
}

// Mock data
const userData: UserData = {
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    badges: [
        { earned: true, icon: '🗂️', id: 1, name: 'Newbie Sorter' },
        { earned: true, icon: '⚔️', id: 2, name: 'Waste Warrior' },
        { earned: true, icon: '🌱', id: 3, name: 'Eco Champion' },
        { earned: false, icon: '🤖', id: 4, name: 'AI Master' },
        { earned: false, icon: '🛡️', id: 5, name: 'Green Guardian' },
    ],
    carbonSaved: 12.8,
    correctClassifications: 89,
    email: 'nguyenvanan@gmail.com',
    joinDate: '2024-01-15',
    level: 'Eco Hero',
    name: 'Nguyễn Văn An',
    points: 2850,
    streak: 12,
    totalReports: 156,
    wasteCollected: 45.2,
};

function ProfileScreen() {
    const [activeTab, setActiveTab] = useState('stats');

    const renderHeader = () => (
        <View style={styles.header}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <Text style={styles.headerTitle}>Trang Cá Nhân</Text>
            <TouchableOpacity style={styles.notificationButton}>
                <BellIcon color="#1F2937" size={24} strokeWidth={2} />
                <View style={styles.notificationDot} />
            </TouchableOpacity>
        </View>
    );

    const renderProfileCard = () => (
        <View style={styles.profileCard}>
            <View style={styles.profileHeader}>
                <View style={styles.avatarContainer}>
                    <Image source={{ uri: userData.avatar }} style={styles.avatar} />
                    <TouchableOpacity style={styles.cameraButton}>
                        <CameraIcon color="#fff" size={16} strokeWidth={2} />
                    </TouchableOpacity>
                </View>

                <View style={styles.profileInfo}>
                    <Text style={styles.userName}>{userData.name}</Text>
                    <Text style={styles.userEmail}>{userData.email}</Text>

                    <View style={styles.levelContainer}>
                        <TrophySolidIcon color="#F59E0B" size={16} />
                        <Text style={styles.levelText}>{userData.level}</Text>
                        <View style={styles.pointsContainer}>
                            <StarSolidIcon color="#8B5CF6" size={14} />
                            <Text style={styles.pointsText}>{userData.points.toLocaleString()} điểm</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.streakContainer}>
                <View style={styles.streakContent}>
                    <Text style={styles.streakNumber}>{userData.streak}</Text>
                    <Text style={styles.streakText}>ngày liên tiếp</Text>
                </View>
                <Text style={styles.streakLabel}>🔥 Chuỗi hoạt động</Text>
            </View>
        </View>
    );

    const renderTabs = () => (
        <View style={styles.tabContainer}>
            <TouchableOpacity
                onPress={() => { setActiveTab('stats'); }}
                style={[styles.tab, activeTab === 'stats' && styles.activeTab]}
            >
                <ChartBarIcon color={activeTab === 'stats' ? '#8B5CF6' : '#6B7280'} size={20} strokeWidth={2} />
                <Text style={[styles.tabText, activeTab === 'stats' && styles.activeTabText]}>
                    Thống kê
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => { setActiveTab('badges'); }}
                style={[styles.tab, activeTab === 'badges' && styles.activeTab]}
            >
                <TrophyIcon color={activeTab === 'badges' ? '#8B5CF6' : '#6B7280'} size={20} strokeWidth={2} />
                <Text style={[styles.tabText, activeTab === 'badges' && styles.activeTabText]}>
                    Huy hiệu
                </Text>
            </TouchableOpacity>
        </View>
    );

    const renderStatCard = (title: string, value: number, unit: string, icon: React.ReactNode, color: string) => (
        <View style={[styles.statCard, { borderLeftColor: color }]}>
            <View style={styles.statIcon}>{icon}</View>
            <View style={styles.statContent}>
                <Text style={styles.statValue}>{value}</Text>
                <Text style={styles.statUnit}>{unit}</Text>
                <Text style={styles.statTitle}>{title}</Text>
            </View>
        </View>
    );

    const renderStatsTab = () => (
        <View style={styles.tabContent}>
            <View style={styles.statsGrid}>
                {renderStatCard(
                    'Báo cáo đã gửi',
                    userData.totalReports,
                    'báo cáo',
                    <MapPinIcon color="#10B981" size={24} strokeWidth={2} />,
                    '#10B981'
                )}

                {renderStatCard(
                    'Độ chính xác AI',
                    userData.correctClassifications,
                    '%',
                    <CogIcon color="#3B82F6" size={24} strokeWidth={2} />,
                    '#3B82F6'
                )}

                {renderStatCard(
                    'Rác đã thu gom',
                    userData.wasteCollected,
                    'kg',
                    <ArrowPathIcon color="#F59E0B" size={24} strokeWidth={2} />,
                    '#F59E0B'
                )}

                {renderStatCard(
                    'Carbon tiết kiệm',
                    userData.carbonSaved,
                    'kg CO₂',
                    <StarIcon color="#8B5CF6" size={24} strokeWidth={2} />,
                    '#8B5CF6'
                )}
            </View>
        </View>
    );

    const renderBadge = (badge: Badge) => (
        <View key={badge.id} style={[styles.badge, !badge.earned && styles.badgeInactive]}>
            <Text style={styles.badgeIcon}>{badge.icon}</Text>
            <Text style={[styles.badgeName, !badge.earned && styles.badgeNameInactive]}>
                {badge.name}
            </Text>
        </View>
    );

    const renderBadgesTab = () => (
        <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Huy hiệu của bạn</Text>
            <View style={styles.badgesGrid}>
                {userData.badges.map(renderBadge)}
            </View>
        </View>
    );

    const renderMenuItem = (
        icon: React.ReactNode,
        title: string,
        subtitle?: string,
        onPress = () => { },
        showBadge = false,
        isLogout = false
    ) => (
        <TouchableOpacity onPress={onPress} style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
                <View style={styles.menuIcon}>{icon}</View>
                <View>
                    <Text style={[styles.menuTitle, isLogout && { color: '#EF4444' }]}>
                        {title}
                    </Text>
                    {subtitle ? <Text style={styles.menuSubtitle}>{subtitle}</Text> : null}
                </View>
            </View>
            <View style={styles.menuItemRight}>
                {showBadge ? <View style={styles.notificationBadge} /> : null}
                <ArrowRightOnRectangleIcon
                    color={isLogout ? '#EF4444' : '#9CA3AF'}
                    size={16}
                    strokeWidth={2}
                />
            </View>
        </TouchableOpacity>
    );

    const renderMenuSection = () => (
        <View style={styles.menuSection}>
            <Text style={styles.sectionTitle}>Cài đặt & Hỗ trợ</Text>

            {renderMenuItem(
                <CogIcon color="#6B7280" size={20} strokeWidth={2} />,
                'Cài đặt tài khoản',
                'Chỉnh sửa thông tin cá nhân'
            )}

            {renderMenuItem(
                <BellIcon color="#6B7280" size={20} strokeWidth={2} />,
                'Thông báo',
                'Quản lý thông báo push',
                () => { },
                true
            )}

            {renderMenuItem(
                <QuestionMarkCircleIcon color="#6B7280" size={20} strokeWidth={2} />,
                'Trợ giúp & FAQ',
                'Hướng dẫn sử dụng ứng dụng'
            )}

            {renderMenuItem(
                <ArrowRightOnRectangleIcon color="#EF4444" size={20} strokeWidth={2} />,
                'Đăng xuất',
                undefined,
                () => { },
                false,
                true
            )}
        </View>
    );

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            {renderHeader()}
            {renderProfileCard()}
            {renderTabs()}

            {activeTab === 'stats' && renderStatsTab()}
            {activeTab === 'badges' && renderBadgesTab()}

            {renderMenuSection()}
            <View style={styles.bottomPadding} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    activeTab: {
        backgroundColor: '#fff',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { height: 1, width: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    activeTabText: {
        color: '#8B5CF6',
    },
    avatar: {
        borderRadius: 40,
        height: 80,
        width: 80,
    },
    avatarContainer: {
        position: 'relative',
    },
    badge: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: '#10B981',
        borderRadius: 12,
        borderWidth: 2,
        elevation: 2,
        marginBottom: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { height: 1, width: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        width: (width - 60) / 2,
    },
    badgeIcon: {
        fontSize: 32,
        marginBottom: 8,
    },
    badgeInactive: {
        backgroundColor: '#F9FAFB',
        borderColor: '#E5E7EB',
    },
    badgeName: {
        color: '#1F2937',
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
    },
    badgeNameInactive: {
        color: '#9CA3AF',
    },
    badgesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    bottomPadding: {
        height: 100,
    },
    cameraButton: {
        alignItems: 'center',
        backgroundColor: '#8B5CF6',
        borderRadius: 12,
        bottom: 0,
        height: 24,
        justifyContent: 'center',
        position: 'absolute',
        right: 0,
        width: 24,
    },
    container: {
        backgroundColor: '#F9FAFB',
        flex: 1,
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
    headerTitle: {
        color: '#1F2937',
        fontSize: 24,
        fontWeight: 'bold',
    },
    levelContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    levelText: {
        color: '#F59E0B',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 4,
        marginRight: 12,
    },
    menuIcon: {
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 20,
        height: 40,
        justifyContent: 'center',
        marginRight: 12,
        width: 40,
    },
    menuItem: {
        alignItems: 'center',
        borderBottomColor: '#F3F4F6',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
    },
    menuItemLeft: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
    },
    menuItemRight: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    menuSection: {
        backgroundColor: '#fff',
        borderRadius: 16,
        elevation: 3,
        marginHorizontal: 20,
        marginTop: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    menuSubtitle: {
        color: '#6B7280',
        fontSize: 14,
        marginTop: 2,
    },
    menuTitle: {
        color: '#1F2937',
        fontSize: 16,
        fontWeight: '600',
    },
    notificationBadge: {
        backgroundColor: '#EF4444',
        borderRadius: 3,
        height: 6,
        marginRight: 8,
        width: 6,
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
    pointsContainer: {
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    pointsText: {
        color: '#8B5CF6',
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 4,
    },
    profileCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        elevation: 3,
        marginHorizontal: 20,
        marginTop: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    profileHeader: {
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    profileInfo: {
        flex: 1,
        marginLeft: 16,
    },
    sectionTitle: {
        color: '#1F2937',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    statCard: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderLeftWidth: 4,
        borderRadius: 12,
        elevation: 2,
        flexDirection: 'row',
        marginBottom: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { height: 1, width: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        width: (width - 60) / 2,
    },
    statContent: {
        flex: 1,
    },
    statIcon: {
        marginRight: 12,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    statTitle: {
        color: '#6B7280',
        fontSize: 12,
        marginTop: 4,
    },
    statUnit: {
        color: '#6B7280',
        fontSize: 12,
    },
    statValue: {
        color: '#1F2937',
        fontSize: 20,
        fontWeight: 'bold',
    },
    streakContainer: {
        alignItems: 'center',
        backgroundColor: '#FEF3C7',
        borderRadius: 12,
        flexDirection: 'row',
        marginTop: 16,
        padding: 16,
    },
    streakContent: {
        alignItems: 'center',
        marginRight: 12,
    },
    streakLabel: {
        color: '#92400E',
        fontSize: 14,
        fontWeight: '600',
    },
    streakNumber: {
        color: '#F59E0B',
        fontSize: 24,
        fontWeight: 'bold',
    },
    streakText: {
        color: '#92400E',
        fontSize: 12,
    },
    tab: {
        alignItems: 'center',
        borderRadius: 8,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 12,
    },
    tabContainer: {
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 20,
        padding: 4,
    },
    tabContent: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    tabText: {
        color: '#6B7280',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 6,
    },
    userEmail: {
        color: '#6B7280',
        fontSize: 14,
        marginBottom: 12,
    },
    userName: {
        color: '#1F2937',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
});

export default ProfileScreen;