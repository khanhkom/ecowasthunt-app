import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type QuickAction = {
    action: string;
    gradient: string[];
    icon: React.ReactNode;
    id: number;
    subtitle: string;
    title: string;
};

export type { QuickAction };

type QuickActionItemProps = {
    readonly item: QuickAction;
    readonly onPress: (action: string) => void;
};

const quickActionItemStyles = StyleSheet.create({
    card: {
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
    icon: {
        alignSelf: 'flex-start',
    },
    subtitle: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 12,
    },
    title: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
    },
});

function QuickActionItem({ item, onPress }: QuickActionItemProps) {
    return (
        <TouchableOpacity
            onPress={() => { onPress(item.action); }}
            style={[
                quickActionItemStyles.card,
                {
                    backgroundColor: item.gradient[0],
                    shadowColor: item.gradient[0],
                },
            ]}
        >
            <View style={quickActionItemStyles.icon}>{item.icon}</View>
            <Text style={quickActionItemStyles.title}>{item.title}</Text>
            <Text style={quickActionItemStyles.subtitle}>{item.subtitle}</Text>
        </TouchableOpacity>
    );
}

export default QuickActionItem; 