import { StyleSheet, Text, View } from 'react-native';

type WasteType = {
    color: string;
    icon: string;
    name: string;
    percentage: number;
};

export type { WasteType };

type WasteTypeItemProps = {
    readonly waste: WasteType;
};

const wasteTypeItemStyles = StyleSheet.create({
    icon: {
        fontSize: 20,
        marginRight: 12,
    },
    item: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    left: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
    },
    name: {
        color: '#1F2937',
        fontSize: 14,
        fontWeight: '500',
    },
    percentage: {
        color: '#6B7280',
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'right',
        width: 30,
    },
    progressBar: {
        backgroundColor: '#F3F4F6',
        borderRadius: 3,
        flex: 1,
        height: 6,
        marginRight: 12,
        overflow: 'hidden',
    },
    progressFill: {
        borderRadius: 3,
        height: '100%',
    },
    right: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
    },
});

function WasteTypeItem({ waste }: WasteTypeItemProps) {
    return (
        <View style={wasteTypeItemStyles.item}>
            <View style={wasteTypeItemStyles.left}>
                <Text style={wasteTypeItemStyles.icon}>{waste.icon}</Text>
                <Text style={wasteTypeItemStyles.name}>{waste.name}</Text>
            </View>
            <View style={wasteTypeItemStyles.right}>
                <View style={wasteTypeItemStyles.progressBar}>
                    <View
                        style={[
                            wasteTypeItemStyles.progressFill,
                            {
                                backgroundColor: waste.color,
                                width: `${waste.percentage}%`,
                            },
                        ]}
                    />
                </View>
                <Text style={wasteTypeItemStyles.percentage}>{waste.percentage}%</Text>
            </View>
        </View>
    );
}

export default WasteTypeItem; 