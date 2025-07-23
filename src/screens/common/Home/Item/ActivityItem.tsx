import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Activity = {
    color: string;
    icon: React.ReactNode;
    id: number;
    points: string;
    subtitle: string;
    time: string;
    title: string;
    type: string;
};

export type { Activity };

type ActivityItemProps = {
    readonly item: Activity;
};

const activityItemStyles = StyleSheet.create({
    content: {
        flex: 1,
    },
    icon: {
        alignItems: 'center',
        borderRadius: 20,
        height: 40,
        justifyContent: 'center',
        marginRight: 12,
        width: 40,
    },
    item: {
        alignItems: 'center',
        borderBottomColor: '#F3F4F6',
        borderBottomWidth: 1,
        flexDirection: 'row',
        padding: 16,
    },
    points: {
        alignItems: 'center',
    },
    pointsText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#6B7280',
        fontSize: 13,
        marginBottom: 2,
    },
    time: {
        color: '#9CA3AF',
        fontSize: 12,
    },
    title: {
        color: '#1F2937',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 2,
    },
});

function ActivityItem({ item }: ActivityItemProps) {
    return (
        <View style={activityItemStyles.item}>
            <View style={[activityItemStyles.icon, { backgroundColor: `${item.color}20` }]}> {item.icon} </View>
            <View style={activityItemStyles.content}>
                <Text style={activityItemStyles.title}>{item.title}</Text>
                <Text style={activityItemStyles.subtitle}>{item.subtitle}</Text>
                <Text style={activityItemStyles.time}>{item.time}</Text>
            </View>
            <View style={activityItemStyles.points}>
                <Text style={[activityItemStyles.pointsText, { color: item.color }]}>{item.points}</Text>
            </View>
        </View>
    );
}

export default ActivityItem; 