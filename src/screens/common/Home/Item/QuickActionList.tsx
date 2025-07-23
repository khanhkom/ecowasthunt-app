import { FlatList, Text, View } from 'react-native';

import QuickActionItem, { QuickAction } from './QuickActionItem';

const quickActions: QuickAction[] = [
    {
        action: 'camera',
        gradient: ['#8B5CF6', '#A855F7'],
        icon: <Text>📷</Text>,
        id: 1,
        subtitle: 'AI nhận diện rác',
        title: 'Chụp & Phân loại',
    },
    {
        action: 'report',
        gradient: ['#10B981', '#059669'],
        icon: <Text>📍</Text>,
        id: 2,
        subtitle: 'Thêm vị trí mới',
        title: 'Báo cáo điểm rác',
    },
    {
        action: 'map',
        gradient: ['#3B82F6', '#2563EB'],
        icon: <Text>🗺️</Text>,
        id: 3,
        subtitle: 'Điểm thu gom gần nhất',
        title: 'Xem bản đồ',
    },
    {
        action: 'community',
        gradient: ['#F59E0B', '#D97706'],
        icon: <Text>👥</Text>,
        id: 4,
        subtitle: 'Chia sẻ kinh nghiệm',
        title: 'Cộng đồng',
    },
];

export default function QuickActionList() {
    return (
        <View style={{ marginTop: 24, paddingHorizontal: 20 }}>
            <Text style={{ color: '#1F2937', fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>Hành động nhanh</Text>
            <FlatList
                contentContainerStyle={{ paddingRight: 20 }}
                data={quickActions}
                horizontal
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <QuickActionItem item={item} onPress={() => { }} />}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
} 