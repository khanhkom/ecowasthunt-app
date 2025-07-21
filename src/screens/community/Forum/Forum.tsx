import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    BookmarkIcon,
    ChatBubbleLeftIcon,
    ClockIcon,
    EyeIcon,
    FireIcon,
    HeartIcon,
    MagnifyingGlassIcon,
    MapPinIcon,
    PlusIcon,
    ShareIcon,
    TrophyIcon,
    UserGroupIcon,
} from 'react-native-heroicons/outline';
import {
    BookmarkIcon as BookmarkSolidIcon,
    HeartIcon as HeartSolidIcon,
} from 'react-native-heroicons/solid';

const { width } = Dimensions.get('window');

// Types
type Category = {
    active: boolean;
    count: number;
    id: number;
    name: string;
}

type LeaderboardUser = {
    avatar: string;
    badge: string;
    id: number;
    name: string;
    points: number;
    posts: number;
    rank: number;
}

type Post = {
    bookmarked: boolean;
    category: string;
    comments: number;
    content: string;
    id: number;
    images: string[];
    liked: boolean;
    likes: number;
    location?: string;
    shares: number;
    tags: string[];
    timestamp: string;
    user: User;
    views: number;
}

type User = {
    avatar: string;
    badge: string;
    name: string;
    verified: boolean;
}

// Mock Data
const communityStats = {
    todayPosts: 89,
    topContributor: 'EcoMaster2024',
    totalMembers: 12_457,
    weeklyActive: 3421,
};

const categories: Category[] = [
    { active: true, count: 245, id: 1, name: 'Tất cả' },
    { active: false, count: 67, id: 2, name: 'Mẹo hay' },
    { active: false, count: 43, id: 3, name: 'Thắc mắc' },
    { active: false, count: 89, id: 4, name: 'Thành tích' },
    { active: false, count: 12, id: 5, name: 'Sự kiện' },
];

const trendingTopics = [
    { id: 1, posts: 234, title: '#PhânLoạiNhựa' },
    { id: 2, posts: 189, title: '#TáiChếGiấy' },
    { id: 3, posts: 156, title: '#BảoVệMôiTrường' },
    { id: 4, posts: 98, title: '#ThửThách7Ngày' },
];

const leaderboard: LeaderboardUser[] = [
    {
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face', badge: 'Eco Hero', id: 1, name: 'EcoMaster2024',
        points: 15_420,
        posts: 89, rank: 1,
    },
    {
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b05b?w=50&h=50&fit=crop&crop=face', badge: 'Champion', id: 2, name: 'GreenWarrior',
        points: 14_230,
        posts: 76, rank: 2,
    },
    {
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face', badge: 'Expert', id: 3, name: 'RecycleQueen',
        points: 13_890,
        posts: 82, rank: 3,
    },
];

const posts: Post[] = [
    {
        bookmarked: true,
        category: 'Mẹo hay',
        comments: 23,
        content: 'Vừa phát hiện một mẹo hay để phân loại chai nhựa! Các bạn có biết rằng số ở đáy chai cho biết loại nhựa không? Số 1 (PET) và số 2 (HDPE) dễ tái chế nhất đấy! 🌱♻️',
        id: 1,
        images: [
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
            'https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=300&h=200&fit=crop',
        ],
        liked: false,
        likes: 124,
        location: 'Quận 1, TP.HCM', shares: 8, tags: ['#PhânLoạiNhựa', '#MẹoHay', '#TáiChế'], timestamp: '2 giờ trước',
        user: {
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b05b?w=50&h=50&fit=crop&crop=face',
            badge: 'Eco Expert',
            name: 'Nguyễn Thị Mai',
            verified: true,
        }, views: 567,
    },
    {
        bookmarked: false,
        category: 'Sự kiện',
        comments: 45,
        content: 'Tổ chức cleanup tại bãi biển Vũng Tàu cuối tuần này! Ai muốn tham gia thì comment bên dưới nhé. Mình sẽ chuẩn bị găng tay và túi rác cho mọi người 🏖️🗑️',
        id: 2,
        images: ['https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop'],
        liked: true,
        likes: 89,
        location: 'Vũng Tàu', shares: 12, tags: ['#Cleanup', '#VũngTàu', '#BảoVệMôiTrường'], timestamp: '4 giờ trước',
        user: {
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
            badge: 'Green Warrior',
            name: 'Trần Văn Hùng',
            verified: false,
        }, views: 234,
    },
    {
        bookmarked: false,
        category: 'Thắc mắc',
        comments: 18,
        content: 'Xin chào mọi người! Mình mới bắt đầu học về phân loại rác. Có ai biết pin lithium bỏ vào thùng nào không ạ? Cảm ơn mọi người! 🔋❓',
        id: 3,
        images: [],
        liked: false,
        likes: 34,
        location: 'Hà Nội', shares: 3, tags: ['#ThắcMắc', '#Pin', '#PhânLoại'], timestamp: '6 giờ trước',
        user: {
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
            badge: 'Beginner',
            name: 'Lê Thị Hoa',
            verified: false,
        }, views: 156,
    },
];

function CommunityScreen() {
    const [activeCategory, setActiveCategory] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [showLeaderboard, setShowLeaderboard] = useState(false);

    const getRankColor = (rank: number) => {
        const colors = { 1: '#F59E0B', 2: '#94A3B8', 3: '#CD7C2F' };
        return colors[rank as keyof typeof colors] || '#6B7280';
    };

    const handlePostAction = (action: string, postId: number) => {
        console.log(`${action} post:`, postId);
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Cộng đồng</Text>
            <View style={styles.headerActions}>
                <TouchableOpacity
                    onPress={() => { setShowLeaderboard(!showLeaderboard); }}
                    style={styles.headerButton}
                >
                    <TrophyIcon color="#1F2937" size={24} strokeWidth={2} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerButton}>
                    <PlusIcon color="#1F2937" size={24} strokeWidth={2} />
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderCommunityStats = () => (
        <View style={styles.statsContainer}>
            <View style={styles.statsCard}>
                <View style={styles.statItem}>
                    <UserGroupIcon color="#8B5CF6" size={20} strokeWidth={2} />
                    <Text style={styles.statNumber}>{communityStats.totalMembers.toLocaleString()}</Text>
                    <Text style={styles.statLabel}>Thành viên</Text>
                </View>
                <View style={styles.statItem}>
                    <FireIcon color="#EF4444" size={20} strokeWidth={2} />
                    <Text style={styles.statNumber}>{communityStats.weeklyActive.toLocaleString()}</Text>
                    <Text style={styles.statLabel}>Hoạt động/tuần</Text>
                </View>
                <View style={styles.statItem}>
                    <ChatBubbleLeftIcon color="#10B981" size={20} strokeWidth={2} />
                    <Text style={styles.statNumber}>{communityStats.todayPosts}</Text>
                    <Text style={styles.statLabel}>Bài hôm nay</Text>
                </View>
            </View>
        </View>
    );

    const renderSearchBar = () => (
        <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
                <MagnifyingGlassIcon color="#9CA3AF" size={20} strokeWidth={2} />
                <TextInput
                    onChangeText={setSearchQuery}
                    placeholder="Tìm kiếm bài viết, người dùng..."
                    placeholderTextColor="#9CA3AF"
                    style={styles.searchInput}
                    value={searchQuery}
                />
            </View>
        </View>
    );

    const renderCategory = ({ item }: { item: Category }) => (
        <TouchableOpacity
            onPress={() => { setActiveCategory(item.id); }}
            style={[styles.categoryChip, item.active && styles.activeCategoryChip]}
        >
            <Text style={[styles.categoryText, item.active && styles.activeCategoryText]}>
                {item.name}
            </Text>
            <Text style={[styles.categoryCount, item.active && styles.activeCategoryCount]}>
                {item.count}
            </Text>
        </TouchableOpacity>
    );

    const renderCategories = () => (
        <View style={styles.categoriesContainer}>
            <FlatList
                contentContainerStyle={styles.categoriesList}
                data={categories}
                horizontal
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderCategory}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );

    const renderPostHeader = (post: Post) => (
        <View style={styles.postHeader}>
            <View style={styles.postUserInfo}>
                <Image source={{ uri: post.user.avatar }} style={styles.userAvatar} />
                <View style={styles.userDetails}>
                    <View style={styles.userNameRow}>
                        <Text style={styles.userName}>{post.user.name}</Text>
                        {post.user.verified ? <View style={styles.verifiedBadge}>
                            <Text style={styles.verifiedText}>✓</Text>
                        </View> : null}
                    </View>
                    <Text style={styles.userBadge}>{post.user.badge}</Text>
                    <View style={styles.postMeta}>
                        <ClockIcon color="#9CA3AF" size={12} strokeWidth={2} />
                        <Text style={styles.postTime}>{post.timestamp}</Text>
                        {post.location ? <>
                            <Text style={styles.metaSeparator}>•</Text>
                            <MapPinIcon color="#9CA3AF" size={12} strokeWidth={2} />
                            <Text style={styles.postLocation}>{post.location}</Text>
                        </> : null}
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.moreButton}>
                <Text style={styles.moreText}>•••</Text>
            </TouchableOpacity>
        </View>
    );

    const renderPostImages = (images: string[]) => {
        if (!images || images.length === 0) return null;

        return (
            <View style={styles.imagesContainer}>
                {images.length === 1 ? (
                    <Image source={{ uri: images[0] }} style={styles.singleImage} />
                ) : (
                    <View style={styles.multipleImages}>
                        {images.slice(0, 2).map((image, index) => (
                            <Image key={index} source={{ uri: image }} style={styles.multiImage} />
                        ))}
                    </View>
                )}
            </View>
        );
    };

    const renderPostActions = (post: Post) => (
        <View style={styles.postActions}>
            <TouchableOpacity
                onPress={() => { handlePostAction('like', post.id); }}
                style={styles.actionButton}
            >
                {post.liked ? (
                    <HeartSolidIcon color="#EF4444" size={20} />
                ) : (
                    <HeartIcon color="#6B7280" size={20} strokeWidth={2} />
                )}
                <Text style={[styles.actionText, post.liked && styles.likedText]}>
                    Thích
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => { handlePostAction('comment', post.id); }}
                style={styles.actionButton}
            >
                <ChatBubbleLeftIcon color="#6B7280" size={20} strokeWidth={2} />
                <Text style={styles.actionText}>Bình luận</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => { handlePostAction('share', post.id); }}
                style={styles.actionButton}
            >
                <ShareIcon color="#6B7280" size={20} strokeWidth={2} />
                <Text style={styles.actionText}>Chia sẻ</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => { handlePostAction('bookmark', post.id); }}
                style={styles.actionButton}
            >
                {post.bookmarked ? (
                    <BookmarkSolidIcon color="#8B5CF6" size={20} />
                ) : (
                    <BookmarkIcon color="#6B7280" size={20} strokeWidth={2} />
                )}
            </TouchableOpacity>
        </View>
    );

    const renderPost = ({ item }: { item: Post }) => (
        <View style={styles.postCard}>
            {renderPostHeader(item)}

            <Text style={styles.postContent}>{item.content}</Text>

            {/* Tags */}
            <View style={styles.tagsContainer}>
                {item.tags.map((tag, index) => (
                    <TouchableOpacity key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {renderPostImages(item.images)}

            {/* Stats */}
            <View style={styles.postStats}>
                <View style={styles.statsLeft}>
                    <EyeIcon color="#9CA3AF" size={14} strokeWidth={2} />
                    <Text style={styles.statsText}>{item.views}</Text>
                </View>
                <View style={styles.statsRight}>
                    <Text style={styles.statsText}>{item.likes} lượt thích</Text>
                    <Text style={styles.statsSeparator}>•</Text>
                    <Text style={styles.statsText}>{item.comments} bình luận</Text>
                </View>
            </View>

            {renderPostActions(item)}
        </View>
    );

    const renderLeaderboardItem = ({ item }: { item: LeaderboardUser }) => (
        <View style={styles.leaderboardItem}>
            <View style={styles.leaderboardLeft}>
                <View style={[styles.rankBadge, { backgroundColor: getRankColor(item.rank) }]}>
                    <Text style={styles.rankText}>{item.rank}</Text>
                </View>
                <Image source={{ uri: item.avatar }} style={styles.leaderAvatar} />
                <View style={styles.leaderInfo}>
                    <Text style={styles.leaderName}>{item.name}</Text>
                    <Text style={styles.leaderBadge}>{item.badge}</Text>
                </View>
            </View>
            <View style={styles.leaderboardRight}>
                <Text style={styles.leaderPoints}>{item.points.toLocaleString()}</Text>
                <Text style={styles.leaderPosts}>{item.posts} bài</Text>
            </View>
        </View>
    );

    const renderTrendingTopic = ({ item }: { item: typeof trendingTopics[0] }) => (
        <TouchableOpacity style={styles.trendingTopic}>
            <Text style={styles.trendingTitle}>{item.title}</Text>
            <Text style={styles.trendingCount}>{item.posts} bài viết</Text>
        </TouchableOpacity>
    );

    const renderLeaderboard = () => (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>🏆 Bảng xếp hạng tuần này</Text>
                <View style={styles.leaderboardContainer}>
                    <FlatList
                        data={leaderboard}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderLeaderboardItem}
                        scrollEnabled={false}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>🔥 Chủ đề thịnh hành</Text>
                <FlatList
                    data={trendingTopics}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderTrendingTopic}
                    scrollEnabled={false}
                />
            </View>
        </ScrollView>
    );

    const renderPostsFeed = () => (
        <FlatList
            contentContainerStyle={styles.postsContainer}
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderPost}
            showsVerticalScrollIndicator={false}
            style={styles.content}
        />
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderCommunityStats()}
            {renderSearchBar()}
            {renderCategories()}

            {showLeaderboard ? renderLeaderboard() : renderPostsFeed()}
        </View>
    );
}

const styles = StyleSheet.create({
    actionButton: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 8,
    },
    actionText: {
        color: '#6B7280',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 6,
    },
    activeCategoryChip: {
        backgroundColor: '#8B5CF6',
    },
    activeCategoryCount: {
        backgroundColor: '#fff',
        color: '#8B5CF6',
    },
    activeCategoryText: {
        color: '#fff',
    },
    categoriesContainer: {
        marginTop: 16,
    },
    categoriesList: {
        paddingHorizontal: 20,
    },
    categoryChip: {
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 20,
        flexDirection: 'row',
        marginRight: 12,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    categoryCount: {
        backgroundColor: '#E5E7EB',
        borderRadius: 10,
        color: '#9CA3AF',
        fontSize: 12,
        marginLeft: 6,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    categoryText: {
        color: '#6B7280',
        fontSize: 14,
        fontWeight: '600',
    },
    container: {
        backgroundColor: '#F9FAFB',
        flex: 1,
    },
    content: {
        flex: 1,
        marginTop: 16,
    },
    header: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 20,
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
    },
    headerActions: {
        flexDirection: 'row',
        gap: 12,
    },
    headerButton: {
        padding: 8,
    },
    headerTitle: {
        color: '#1F2937',
        fontSize: 24,
        fontWeight: 'bold',
    },
    imagesContainer: {
        marginBottom: 12,
    },
    leaderAvatar: {
        borderRadius: 20,
        height: 40,
        marginRight: 12,
        width: 40,
    },
    leaderBadge: {
        color: '#6B7280',
        fontSize: 12,
        marginTop: 2,
    },
    leaderboardContainer: {
        backgroundColor: '#fff',
        borderRadius: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    leaderboardItem: {
        alignItems: 'center',
        borderBottomColor: '#F3F4F6',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    },
    leaderboardLeft: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
    },
    leaderboardRight: {
        alignItems: 'flex-end',
    },
    leaderInfo: {
        flex: 1,
    },
    leaderName: {
        color: '#1F2937',
        fontSize: 14,
        fontWeight: '600',
    },
    leaderPoints: {
        color: '#8B5CF6',
        fontSize: 16,
        fontWeight: 'bold',
    },
    leaderPosts: {
        color: '#6B7280',
        fontSize: 12,
        marginTop: 2,
    },
    likedText: {
        color: '#EF4444',
    },
    metaSeparator: {
        color: '#9CA3AF',
        fontSize: 12,
        marginHorizontal: 6,
    },
    moreButton: {
        padding: 4,
    },
    moreText: {
        color: '#9CA3AF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    multiImage: {
        borderRadius: 12,
        flex: 1,
        height: 150,
    },
    multipleImages: {
        flexDirection: 'row',
        gap: 8,
    },
    postActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 8,
    },
    postCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        elevation: 3,
        marginBottom: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    postContent: {
        color: '#1F2937',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 12,
    },
    postHeader: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    postLocation: {
        color: '#9CA3AF',
        fontSize: 12,
        marginLeft: 4,
    },
    postMeta: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 4,
    },
    postsContainer: {
        paddingBottom: 100,
        paddingHorizontal: 20,
    },
    postStats: {
        alignItems: 'center',
        borderTopColor: '#F3F4F6',
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        paddingVertical: 8,
    },
    postTime: {
        color: '#9CA3AF',
        fontSize: 12,
        marginLeft: 4,
    },
    postUserInfo: {
        flex: 1,
        flexDirection: 'row',
    },
    rankBadge: {
        alignItems: 'center',
        borderRadius: 12,
        height: 24,
        justifyContent: 'center',
        marginRight: 12,
        width: 24,
    },
    rankText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    searchBar: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 2,
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 12,
        shadowColor: '#000',
        shadowOffset: { height: 1, width: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    searchContainer: {
        marginTop: 16,
        paddingHorizontal: 20,
    },
    searchInput: {
        color: '#1F2937',
        flex: 1,
        fontSize: 16,
        marginLeft: 12,
    },
    section: {
        marginBottom: 24,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        color: '#1F2937',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    singleImage: {
        borderRadius: 12,
        height: 200,
        width: '100%',
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statLabel: {
        color: '#6B7280',
        fontSize: 12,
        marginTop: 4,
        textAlign: 'center',
    },
    statNumber: {
        color: '#1F2937',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8,
    },
    statsCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    statsLeft: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    statsRight: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    statsSeparator: {
        color: '#9CA3AF',
        fontSize: 12,
        marginHorizontal: 8,
    },
    statsText: {
        color: '#6B7280',
        fontSize: 12,
        marginLeft: 4,
    },
    tag: {
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        marginBottom: 4,
        marginRight: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 12,
    },
    tagText: {
        color: '#8B5CF6',
        fontSize: 12,
        fontWeight: '600',
    },
    trendingCount: {
        color: '#6B7280',
        fontSize: 12,
    },
    trendingTitle: {
        color: '#8B5CF6',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
    },
    trendingTopic: {
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 2,
        marginBottom: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { height: 1, width: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    userAvatar: {
        borderRadius: 24,
        height: 48,
        marginRight: 12,
        width: 48,
    },
    userBadge: {
        color: '#8B5CF6',
        fontSize: 12,
        fontWeight: '600',
        marginTop: 2,
    },
    userDetails: {
        flex: 1,
    },
    userName: {
        color: '#1F2937',
        fontSize: 16,
        fontWeight: 'bold',
    },
    userNameRow: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    verifiedBadge: {
        alignItems: 'center',
        backgroundColor: '#10B981',
        borderRadius: 8,
        height: 16,
        justifyContent: 'center',
        marginLeft: 6,
        width: 16,
    },
    verifiedText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
});

export default CommunityScreen;