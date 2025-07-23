import React from 'react';
import { Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BellIcon } from 'react-native-heroicons/outline';

type HeaderProps = {
    readonly greeting: string;
    readonly hasNotification?: boolean;
    readonly onNotificationPress?: () => void;
    readonly userName: string;
}

function Header({ greeting, hasNotification, onNotificationPress, userName }: HeaderProps) {
    return (
        <View style={styles.header}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <View style={styles.headerLeft}>
                <Text style={styles.greeting}>{greeting}</Text>
                <Text style={styles.userName}>{userName}!</Text>
            </View>
            <TouchableOpacity onPress={onNotificationPress} style={styles.notificationButton}>
                <BellIcon color="#1F2937" size={24} strokeWidth={2} />
                {hasNotification ? <View style={styles.notificationDot} /> : null}
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    greeting: {
        color: '#6B7280',
        fontSize: 16,
    },
    header: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 20,
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 40 : 20,
    },
    headerLeft: {
        flex: 1,
    },
    notificationButton: {
        padding: 8,
        position: 'relative',
    },
    notificationDot: {
        backgroundColor: '#EF4444',
        borderRadius: 4,
        height: 8,
        position: 'absolute',
        right: 6,
        top: 6,
        width: 8,
    },
    userName: {
        color: '#1F2937',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 4,
    },
});

export default Header; 