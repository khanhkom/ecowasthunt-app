import { FlatList, Text, View } from 'react-native';

import TipItem, { Tip } from './TipItem';

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

export default function TipList() {
    return (
        <View style={{ marginTop: 24, paddingHorizontal: 20 }}>
            <Text style={{ color: '#1F2937', fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>Mẹo và kiến thức</Text>
            <FlatList
                contentContainerStyle={{ paddingRight: 20 }}
                data={tips}
                horizontal
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <TipItem item={item} />}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
} 