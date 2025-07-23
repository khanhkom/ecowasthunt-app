// components/LocationInfo.tsx

import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    ArrowTopRightOnSquareIcon,
    MapPinIcon,
} from 'react-native-heroicons/outline';

import { Location } from '../report';

type LocationInfoProps = {
    readonly location: Location;
    readonly onMapPress: () => void;
}

const LocationInfo: React.FC<LocationInfoProps> = ({
    location,
    onMapPress,
}) => {
    return (
        <View style={styles.contentCard}>
            <Text style={styles.sectionTitle}>Vị trí</Text>
            <TouchableOpacity onPress={onMapPress} style={styles.locationInfo}>
                <View style={styles.locationText}>
                    <MapPinIcon color="#8B5CF6" size={20} />
                    <View style={styles.locationDetails}>
                        <Text style={styles.locationAddress}>{location.address}</Text>
                        <Text style={styles.locationSub}>
                            {location.ward}, {location.district}, {location.city}
                        </Text>
                    </View>
                </View>
                <ArrowTopRightOnSquareIcon color="#8B5CF6" size={20} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    contentCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        elevation: 3,
        marginBottom: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            height: 2,
            width: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    locationAddress: {
        color: '#111827',
        fontSize: 16,
        fontWeight: '600',
    },
    locationDetails: {
        flex: 1,
        marginLeft: 12,
    },
    locationInfo: {
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        borderColor: '#E2E8F0',
        borderRadius: 12,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    },
    locationSub: {
        color: '#6B7280',
        fontSize: 14,
        marginTop: 2,
    },
    locationText: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
    },
    sectionTitle: {
        color: '#111827',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
    },
});

export default LocationInfo;