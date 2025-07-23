import { FlatList, Text, View } from 'react-native';

import ActivityItem, { Activity } from './ActivityItem';

const recentActivities: Activity[] = [
    {
        color: '#10B981',
        icon: <Text>✅</Text>,
        id: 1,
        points: '+10',
        subtitle: 'Chai nhựa PET - Có thể tái chế',
        time: '5 phút trước',
        title: 'Phân loại thành công',
        type: 'classification',
    },
    {
        color: '#3B82F6',
        icon: <Text>📍</Text>,
        id: 2,
        points: '+25',
        subtitle: 'Ngã tư Nguyễn Trãi - Trần Hưng Đạo',
        time: '1 giờ trước',
        title: 'Báo cáo điểm rác',
        type: 'report',
    },
    {
        color: '#F59E0B',
        icon: <Text>🏆</Text>,
        id: 3,
        points: '+50',
        subtitle: 'Eco Warrior - 100 báo cáo',
        time: '2 giờ trước',
        title: 'Đạt thành tích mới',
        type: 'achievement',
    },
];

export default function ActivityList() {
    return (
        <View style={{ marginTop: 24, paddingHorizontal: 20 }}>
            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
                <Text style={{ color: '#1F2937', fontSize: 18, fontWeight: 'bold' }}>Hoạt động gần đây</Text>
                <Text style={{ color: '#8B5CF6', fontSize: 14, fontWeight: '600' }}>Xem tất cả</Text>
            </View>
            <View style={{ backgroundColor: '#fff', borderRadius: 16, elevation: 3, shadowColor: '#000', shadowOffset: { height: 2, width: 0 }, shadowOpacity: 0.1, shadowRadius: 8 }}>
                <FlatList
                    data={recentActivities}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <ActivityItem item={item} />}
                    scrollEnabled={false}
                />
            </View>
        </View>
    );
} 