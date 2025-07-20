import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/theme';

type CustomIconProps = {
    color?: string;
    name: string;
    size?: number;
    style?: React.ComponentProps<typeof View>['style'];
};

const DEFAULT_ICON_SIZE = 24;

const CustomIcon: React.FC<CustomIconProps> = ({
    color,
    name,
    size = DEFAULT_ICON_SIZE,
    style
}) => {
    const { colors } = useTheme();

    // Simple icon mapping - you can replace this with your preferred icon library
    const getIconComponent = () => {
        const iconColor = color ?? colors.gray800;

        switch (name) {
            case 'add': {
                return (
                    <View style={[styles.icon, { height: size, width: size }, style]}>
                        {/* Simple add icon */}
                        <View style={[styles.addIcon, { backgroundColor: iconColor }]} />
                    </View>
                );
            }
            case 'home': {
                return (
                    <View style={[styles.icon, { height: size, width: size }, style]}>
                        {/* Simple home icon */}
                        <View style={[styles.homeIcon, { backgroundColor: iconColor }]} />
                    </View>
                );
            }
            case 'map': {
                return (
                    <View style={[styles.icon, { height: size, width: size }, style]}>
                        {/* Simple map icon */}
                        <View style={[styles.mapIcon, { backgroundColor: iconColor }]} />
                    </View>
                );
            }
            case 'trophy': {
                return (
                    <View style={[styles.icon, { height: size, width: size }, style]}>
                        {/* Simple trophy icon */}
                        <View style={[styles.trophyIcon, { backgroundColor: iconColor }]} />
                    </View>
                );
            }
            case 'user': {
                return (
                    <View style={[styles.icon, { height: size, width: size }, style]}>
                        {/* Simple user icon */}
                        <View style={[styles.userIcon, { backgroundColor: iconColor }]} />
                    </View>
                );
            }
            case 'users': {
                return (
                    <View style={[styles.icon, { height: size, width: size }, style]}>
                        {/* Simple users icon */}
                        <View style={[styles.usersIcon, { backgroundColor: iconColor }]} />
                    </View>
                );
            }
            default: {
                return (
                    <View style={[styles.icon, { height: size, width: size }, style]}>
                        <View style={[styles.defaultIcon, { backgroundColor: iconColor }]} />
                    </View>
                );
            }
        }
    };

    return getIconComponent();
};

const styles = StyleSheet.create({
    addIcon: {
        borderRadius: 8,
        height: 16,
        width: 16,
    },
    defaultIcon: {
        borderRadius: 2,
        height: 16,
        width: 16,
    },
    homeIcon: {
        borderRadius: 2,
        height: 16,
        width: 16,
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapIcon: {
        borderRadius: 2,
        height: 16,
        width: 16,
    },
    trophyIcon: {
        borderRadius: 2,
        height: 16,
        width: 16,
    },
    userIcon: {
        borderRadius: 8,
        height: 16,
        width: 16,
    },
    usersIcon: {
        borderRadius: 8,
        height: 16,
        width: 16,
    },
});

export default CustomIcon; 