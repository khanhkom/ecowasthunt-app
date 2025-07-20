import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    type TextStyle,
    TouchableOpacity,
    type ViewStyle,
} from 'react-native';

type CustomButtonProps = {
    readonly disabled?: boolean;
    readonly loading?: boolean;
    readonly onPress: () => void;
    readonly style?: ViewStyle;
    readonly textStyle?: TextStyle;
    readonly title: string;
    readonly variant?: 'outline' | 'primary' | 'secondary';
};

function CustomButton({
    disabled = false,
    loading = false,
    onPress,
    style,
    textStyle,
    title,
    variant = 'primary',
}: CustomButtonProps) {
    const buttonStyle = [
        styles.button,
        styles[variant],
        disabled && styles.disabled,
        style,
    ];

    const textStyleCombined = [
        styles.text,
        styles[`${variant}Text`],
        disabled && styles.disabledText,
        textStyle,
    ];

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            disabled={disabled || loading}
            onPress={onPress}
            style={buttonStyle}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'primary' ? '#fff' : '#007AFF'} />
            ) : (
                <Text style={textStyleCombined}>{title}</Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        borderRadius: 12,
        justifyContent: 'center',
        minHeight: 56,
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    disabled: {
        backgroundColor: '#E5E5EA',
        opacity: 0.6,
    },
    disabledText: {
        color: '#8E8E93',
    },
    outline: {
        backgroundColor: 'transparent',
        borderColor: '#007AFF',
        borderWidth: 1,
    },
    outlineText: {
        color: '#007AFF',
    },
    primary: {
        backgroundColor: '#007AFF',
    },
    primaryText: {
        color: '#fff',
    },
    secondary: {
        backgroundColor: '#F2F2F7',
    },
    secondaryText: {
        color: '#007AFF',
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export default CustomButton; 