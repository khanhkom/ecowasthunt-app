import type { WasteType } from './WasteTypeItem';

import { Text, View } from 'react-native';

import WasteTypeItem from './WasteTypeItem';

const wasteTypes: WasteType[] = [
    { color: '#3B82F6', icon: '🥤', name: 'Nhựa', percentage: 35 },
    { color: '#10B981', icon: '📄', name: 'Giấy', percentage: 25 },
    { color: '#F59E0B', icon: '🥫', name: 'Kim loại', percentage: 20 },
    { color: '#8B5CF6', icon: '🍎', name: 'Hữu cơ', percentage: 15 },
    { color: '#6B7280', icon: '🗑️', name: 'Khác', percentage: 5 },
];

export default function WasteTypeList() {
    return (
        <View style={{ marginTop: 24, paddingHorizontal: 20 }}>
            <Text style={{ color: '#1F2937', fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>Thống kê loại rác (tuần này)</Text>
            <View style={{ backgroundColor: '#fff', borderRadius: 16, elevation: 3, padding: 20, shadowColor: '#000', shadowOffset: { height: 2, width: 0 }, shadowOpacity: 0.1, shadowRadius: 8 }}>
                {wasteTypes.map((waste) => (
                    <WasteTypeItem key={waste.name} waste={waste} />
                ))}
            </View>
        </View>
    );
} 