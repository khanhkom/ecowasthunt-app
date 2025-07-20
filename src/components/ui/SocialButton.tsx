import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    type ViewStyle,
} from 'react-native';

type SocialButtonProps = {
    readonly icon: string;
    readonly onPress: () => void;
    readonly style?: ViewStyle;
    readonly title: string;
};

function SocialButton({
    icon,
    onPress,
    style,
    title,
}: SocialButtonProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={[styles.button, style]}
        >
            <Text style={styles.icon}>{icon}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#F2F2F7',
        borderColor: '#E5E5EA',
        borderRadius: 12,
        borderWidth: 1,
        height: 56,
        justifyContent: 'center',
        width: 56,
    },
    icon: {
        color: '#333',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default SocialButton; 