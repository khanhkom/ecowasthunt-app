import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'; // Ensure this import is present
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
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

import { Home } from '@/screens/common';
import { Forum } from '@/screens/community';
import { MapView } from '@/screens/map';
import { Profile } from '@/screens/profile';

import { navigationReference } from './navigationService';
import { Paths } from './paths';

const Tab = createBottomTabNavigator();

type AddButtonProps = {
    readonly onPress: () => void;
}

type TabIconProps = {
    readonly color: string;
    readonly focused: boolean;
}

// Reusable tab icon component
const createTabIcon = (
    OutlineIcon: React.ComponentType<{ color: string; size: number; strokeWidth?: number }>,
    SolidIcon: React.ComponentType<{ color: string; size: number; strokeWidth?: number }>
) => {
    function Component({ color, focused }: TabIconProps) {
        const Icon = focused ? SolidIcon : OutlineIcon;
        return <Icon color={color} size={24} strokeWidth={focused ? undefined : 2} />;
    }
    Component.displayName = 'TabIcon';
    return Component;
};

// Tab icon components
const TabHomeIcon = createTabIcon(HomeIcon, HomeSolidIcon);
const TabMapIcon = createTabIcon(MapIcon, MapSolidIcon);
const TabCommunityIcon = createTabIcon(UserGroupIcon, UserGroupSolidIcon);
const TabUserIcon = createTabIcon(UserIcon, UserSolidIcon);

// Add button component
function AddButton({ onPress }: AddButtonProps) {
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
                },
            ]}
        >
            <View style={styles.addButtonInner}>
                <PlusIcon color="#fff" size={28} strokeWidth={3} />
            </View>
        </TouchableOpacity>
    );
}

// Tab configuration
const tabs = [
    {
        component: Home,
        icon: TabHomeIcon,
        label: 'Trang chủ',
        name: 'Home',
    },
    {
        component: MapView,
        icon: TabMapIcon,
        label: 'Bản đồ',
        name: 'Map',
    },
    {
        component: Forum,
        icon: TabCommunityIcon,
        label: 'Cộng đồng',
        name: 'Community',
    },
    {
        component: Profile,
        icon: TabUserIcon,
        label: 'Cá nhân',
        name: 'Profile',
    },
];

function TabNavigator() {
    const { colors } = useTheme();

    const handleAddPress = () => {
        navigationReference.current?.navigate(Paths.ReportWaste);
    };

    const tabBarStyle = {
        backgroundColor: colors.gray50,
        borderTopColor: colors.gray200,
        borderTopWidth: 0.5,
        elevation: 8,
        height: Platform.OS === 'ios' ? 85 : 65,
        paddingBottom: Platform.OS === 'ios' ? 25 : 8,
        paddingTop: 8,
        shadowColor: '#000',
        shadowOffset: { height: -2, width: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    };

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.purple500,
                tabBarInactiveTintColor: colors.gray400,
                tabBarItemStyle: { paddingVertical: 4 },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '600',
                    marginTop: 2,
                },
                tabBarStyle,
            }}
        >
            {tabs.slice(0, 2).map(({ component, icon, label, name }) => (
                <Tab.Screen
                    component={component}
                    key={name}
                    name={name}
                    options={{
                        tabBarIcon: icon,
                        tabBarLabel: label,
                    }}
                />
            ))}

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

            {tabs.slice(2).map(({ component, icon, label, name }) => (
                <Tab.Screen
                    component={component}
                    key={name}
                    name={name}
                    options={{
                        tabBarIcon: icon,
                        tabBarLabel: label,
                    }}
                />
            ))}
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
        shadowOffset: { height: 4, width: 0 },
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