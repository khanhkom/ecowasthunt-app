import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Tip = {
    content: string;
    id: number;
    image: string;
    title: string;
};

export type { Tip };

type TipItemProps = {
    readonly item: Tip;
};

const tipItemStyles = StyleSheet.create({
    card: {
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
        width: 280,
    },
    content: {
        padding: 16,
    },
    image: {
        height: 120,
        width: '100%',
    },
    text: {
        color: '#6B7280',
        fontSize: 13,
        lineHeight: 18,
    },
    title: {
        color: '#1F2937',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});

function TipItem({ item }: TipItemProps) {
    return (
        <TouchableOpacity style={tipItemStyles.card}>
            <Image source={{ uri: item.image }} style={tipItemStyles.image} />
            <View style={tipItemStyles.content}>
                <Text style={tipItemStyles.title}>{item.title}</Text>
                <Text style={tipItemStyles.text}>{item.content}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default TipItem; 