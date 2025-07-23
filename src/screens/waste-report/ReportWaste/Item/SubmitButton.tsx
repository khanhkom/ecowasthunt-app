import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { DocumentTextIcon } from 'react-native-heroicons/outline';

type SubmitButtonProps = {
    readonly isLoading: boolean;
    readonly onSubmit: () => void;
}

function SubmitButton({ isLoading, onSubmit }: SubmitButtonProps) {
    const buttonScale = useRef(new Animated.Value(1)).current;

    const animateButton = (toValue: number) => {
        Animated.spring(buttonScale, {
            friction: 8,
            tension: 50,
            toValue,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity
                disabled={isLoading}
                onPress={onSubmit}
                onPressIn={() => { animateButton(0.95); }}
                onPressOut={() => { animateButton(1); }}
                style={styles.submitButton}
            >
                {isLoading ? (
                    <Text style={styles.submitButtonText}>Đang gửi báo cáo...</Text>
                ) : (
                    <>
                        <DocumentTextIcon color="#FFFFFF" size={20} />
                        <Text style={styles.submitButtonText}>Gửi Báo Cáo</Text>
                    </>
                )}
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    submitButton: {
        alignItems: 'center',
        backgroundColor: '#8B5CF6',
        borderRadius: 12,
        elevation: 6,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
        paddingHorizontal: 20,
        paddingVertical: 16,
        shadowColor: '#8B5CF6',
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
});

export default SubmitButton;