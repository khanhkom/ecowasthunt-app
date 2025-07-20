import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

// Import Heroicons
import {
    HomeIcon,
    MapIcon,
    PlusIcon,
    UserGroupIcon,
    UserIcon,
} from 'react-native-heroicons/outline';
import {
    HomeIcon as HomeSolidIcon,
    MapIcon as MapSolidIcon,
    UserGroupIcon as UserGroupSolidIcon,
    UserIcon as UserSolidIcon,
} from 'react-native-heroicons/solid';

import { useTheme } from '@/theme';

import { navigationReference } from './navigationService';
import { Paths } from './paths';

// Import screens
import { Home } from '@/screens/common';
import { Forum } from '@/screens/community';
import { MapView } from '@/screens/map';
import { Profile } from '@/screens/profile';

const Tab = createBottomTabNavigator();

// Enhanced Add Button Component with gradient effect
function AddButton({ onPress }: { readonly onPress: () => void }) {
    const { colors } = useTheme();

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={[
                styles.addButton,
                {
                    backgroundColor: colors.purple500,
                    shadowColor: colors.purple500,
                }
            ]}
        >
            <View style={styles.addButtonInner}>
                <PlusIcon color="#fff" size={28} strokeWidth={3} />
            </View>
        </TouchableOpacity>
    );
}

// Enhanced Icon components with filled/outline states
function TabCommunityIcon({ color, focused }: { readonly color: string; readonly focused: boolean }) {
    return focused ?
        <UserGroupSolidIcon color={color} size={24} /> :
        <UserGroupIcon color={color} size={24} strokeWidth={2} />
}

function TabHomeIcon({ color, focused }: { readonly color: string; readonly focused: boolean }) {
    return focused ?
        <HomeSolidIcon color={color} size={24} /> :
        <HomeIcon color={color} size={24} strokeWidth={2} />
}

function TabMapIcon({ color, focused }: { readonly color: string; readonly focused: boolean }) {
    return focused ?
        <MapSolidIcon color={color} size={24} /> :
        <MapIcon color={color} size={24} strokeWidth={2} />
}

function TabUserIcon({ color, focused }: { readonly color: string; readonly focused: boolean }) {
    return focused ?
        <UserSolidIcon color={color} size={24} /> :
        <UserIcon color={color} size={24} strokeWidth={2} />
}

// Enhanced Tab Navigator
function TabNavigator() {
    const { colors } = useTheme();

    const handleAddPress = () => {
        const navigation = navigationReference.current;
        if (navigation) {
            navigation.navigate(Paths.ReportWaste);
        }
    };

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.purple500,
                tabBarInactiveTintColor: colors.gray500,
                tabBarItemStyle: {
                    paddingVertical: 4,
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '600',
                    marginTop: 2,
                },
                tabBarStyle: {
                    backgroundColor: colors.gray50,
                    borderTopColor: colors.gray200,
                    borderTopWidth: 0.5,
                    elevation: 8,
                    height: Platform.OS === 'ios' ? 85 : 65,
                    paddingBottom: Platform.OS === 'ios' ? 25 : 8,
                    paddingTop: 8,
                    shadowColor: '#000',
                    shadowOffset: {
                        height: -2,
                        width: 0,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                },
            }}
        >
            <Tab.Screen
                component={Home}
                name="Home"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabHomeIcon color={color} focused={focused} />
                    ),
                    tabBarLabel: 'Trang chủ',
                }}
            />

            <Tab.Screen
                component={MapView}
                name="Map"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabMapIcon color={color} focused={focused} />
                    ),
                    tabBarLabel: 'Bản đồ',
                }}
            />

            <Tab.Screen
                component={View}
                listeners={{
                    tabPress: (event) => {
                        event.preventDefault();
                        handleAddPress();
                    },
                }}
                name="Add"
                options={{
                    tabBarButton: () => (
                        <View style={styles.addButtonContainer}>
                            <AddButton onPress={handleAddPress} />
                        </View>
                    ),
                    tabBarLabel: '',
                }}
            />

            <Tab.Screen
                component={Forum}
                name="Community"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabCommunityIcon color={color} focused={focused} />
                    ),
                    tabBarLabel: 'Cộng đồng',
                }}
            />

            <Tab.Screen
                component={Profile}
                name="Profile"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabUserIcon color={color} focused={focused} />
                    ),
                    tabBarLabel: 'Cá nhân',
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    addButton: {
        alignItems: 'center',
        borderRadius: 30,
        elevation: 8,
        height: 60,
        justifyContent: 'center',
        marginBottom: Platform.OS === 'ios' ? 25 : 15,
        shadowOffset: {
            height: 4,
            width: 0,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        width: 60,
    },
    addButtonContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    addButtonInner: {
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 25,
        height: 50,
        justifyContent: 'center',
        width: 50,
    },
});

export default TabNavigator;