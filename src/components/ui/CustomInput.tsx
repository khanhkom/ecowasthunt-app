import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    type TextInputProps,
    View,
    type ViewStyle,
} from 'react-native';

type CustomInputProps = {
    readonly error?: string;
    readonly label?: string;
    readonly placeholder?: string;
    readonly style?: ViewStyle;
    readonly value: string;
} & Omit<TextInputProps, 'style'>;

function CustomInput({
    error,
    label,
    placeholder,
    style,
    value,
    ...props
}: CustomInputProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={[styles.container, style]}>
            {label ? <Text style={styles.label}>{label}</Text> : null}
            <TextInput
                onBlur={() => { setIsFocused(false); }}
                onFocus={() => { setIsFocused(true); }}
                placeholder={placeholder}
                placeholderTextColor="#8E8E93"
                style={[
                    styles.input,
                    isFocused && styles.inputFocused,
                    error && styles.inputError,
                ]}
                value={value}
                {...props}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 12,
        marginTop: 4,
    },
    input: {
        backgroundColor: '#fff',
        borderColor: '#E5E5EA',
        borderRadius: 12,
        borderWidth: 1,
        color: '#333',
        fontSize: 16,
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    inputError: {
        borderColor: '#FF3B30',
    },
    inputFocused: {
        borderColor: '#007AFF',
    },
    label: {
        color: '#333',
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
    },
});

export default CustomInput; 