import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    PermissionsAndroid,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { MapPinIcon } from 'react-native-heroicons/outline';
import Toast from 'react-native-toast-message';

type Location = {
    address: string;
    city: string;
    district: string;
    ward: string;


}

type LocationSectionProps = {
    readonly location: Location;
    readonly updateLocation: (field: 'address' | 'city' | 'district' | 'ward', value: string) => void;
}

function LocationSection({ location, updateLocation }: LocationSectionProps) {
    const [isGettingLocation, setIsGettingLocation] = useState(false);

    // Yêu cầu quyền truy cập vị trí
    const requestLocationPermission = async (): Promise<boolean> => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        buttonNegative: 'Hủy',
                        buttonNeutral: 'Hỏi lại sau',
                        buttonPositive: 'OK',
                        message: 'Ứng dụng cần truy cập vị trí để xác định địa điểm báo cáo',
                        title: 'Quyền truy cập vị trí',
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (error) {
                console.warn('Error requesting location permission:', error);
                return false;
            }
        }
        return true; // iOS permissions are handled in Info.plist
    };

    // Reverse geocoding để lấy địa chỉ từ coordinates
    const reverseGeocode = async (latitude: number, longitude: number): Promise<void> => {
        try {
            // Sử dụng OpenStreetMap Nominatim API (miễn phí)
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1&accept-language=vi`
            );
            const data = await response.json();
            console.log("data", data?.address)
            if (data?.address) {
                const address = data.address;

                // Tạo địa chỉ chi tiết
                const houseNumber = address.house_number || '';
                const road = address.road || '';
                const fullAddress = `${houseNumber} ${road}`.trim();

                // Cập nhật thông tin địa chỉ
                updateLocation('address', fullAddress || data.display_name || '');
                updateLocation('ward',
                    address.suburb ||
                    address.village ||
                    address.quarter ||
                    address.neighbourhood || ''
                );
                updateLocation('city',
                    address.city
                );
            }
        } catch (error) {
            console.log('Reverse geocoding error:', error);
            // Không hiển thị lỗi cho user vì đây là tính năng phụ
        }
    };

    const getCurrentLocation = async () => {
        setIsGettingLocation(true);

        try {
            const hasPermission = await requestLocationPermission();

            if (!hasPermission) {
                Alert.alert(
                    'Quyền truy cập bị từ chối',
                    'Vui lòng cấp quyền truy cập vị trí trong cài đặt để sử dụng tính năng này',
                    [{ style: 'default', text: 'OK' }]
                );
                setIsGettingLocation(false);
                return;
            }

            Geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    // Thực hiện reverse geocoding để lấy địa chỉ
                    await reverseGeocode(latitude, longitude);
                    Toast.show({
                        text1: 'Thành công',
                        text2: `Đã cập nhật vị trí thành công!\nTọa độ: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
                        type: 'success',
                    });
                    setIsGettingLocation(false);
                },
                (error) => {
                    console.log('Geolocation error:', error);

                    let errorMessage = 'Không thể lấy vị trí hiện tại';
                    let errorTitle = 'Lỗi';

                    switch (error.code) {
                        case 1: { // PERMISSION_DENIED
                            errorTitle = 'Quyền truy cập bị từ chối';
                            errorMessage = 'Vui lòng cấp quyền truy cập vị trí cho ứng dụng';
                            break;
                        }
                        case 2: { // POSITION_UNAVAILABLE
                            errorTitle = 'Vị trí không khả dụng';
                            errorMessage = 'Không thể xác định vị trí. Vui lòng kiểm tra GPS và kết nối mạng';
                            break;
                        }
                        case 3: { // TIMEOUT
                            errorTitle = 'Hết thời gian chờ';
                            errorMessage = 'Việc lấy vị trí mất quá nhiều thời gian. Vui lòng thử lại';
                            break;
                        }
                        default: {
                            errorMessage = error.message || 'Lỗi không xác định khi lấy vị trí';
                        }
                    }

                    Alert.alert(errorTitle, errorMessage, [
                        { onPress: getCurrentLocation, text: 'Thử lại' },
                        { style: 'cancel', text: 'Hủy' }
                    ]);
                    setIsGettingLocation(false);
                },
                {
                    distanceFilter: 0,
                    enableHighAccuracy: true,
                    maximumAge: 10_000,
                    timeout: 20_000,
                }
            );
        } catch (error) {
            console.log('Error in getCurrentLocation:', error);
            Alert.alert(
                'Lỗi',
                'Có lỗi xảy ra khi lấy vị trí. Vui lòng thử lại.',
                [{ style: 'default', text: 'OK' }]
            );
            setIsGettingLocation(false);
        }
    };

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vị trí</Text>

            <TouchableOpacity
                disabled={isGettingLocation}
                onPress={getCurrentLocation}
                style={[
                    styles.locationButton,
                    isGettingLocation && styles.locationButtonDisabled
                ]}
            >
                {isGettingLocation ? (
                    <>
                        <ActivityIndicator color="#8B5CF6" size="small" />
                        <Text style={styles.locationButtonText}>Đang lấy vị trí...</Text>
                    </>
                ) : (
                    <>
                        <MapPinIcon color="#8B5CF6" size={20} />
                        <Text style={styles.locationButtonText}>Lấy vị trí hiện tại</Text>
                    </>
                )}
            </TouchableOpacity>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>
                    Địa chỉ <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                    onChangeText={(text) => { updateLocation('address', text); }}
                    placeholder="Địa chỉ cụ thể"
                    style={styles.textInput}
                    value={location.address}
                />
            </View>

            <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                    <Text style={styles.label}>Phường/Xã</Text>
                    <TextInput
                        onChangeText={(text) => { updateLocation('ward', text); }}
                        placeholder="Phường/Xã"
                        style={styles.textInput}
                        value={location.ward}
                    />
                </View>
                <View style={styles.spacer} />
                <View style={[styles.inputGroup, { flex: 1 }]}>
                    <Text style={styles.label}>Tỉnh/Thành phố</Text>
                    <TextInput
                        onChangeText={(text) => { updateLocation('city', text); }}
                        placeholder="Tỉnh/Thành phố"
                        style={styles.textInput}
                        value={location.city}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        color: '#374151',
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
    },
    locationButton: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: '#8B5CF6',
        borderRadius: 12,
        borderWidth: 1,
        flexDirection: 'row',
        marginBottom: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    locationButtonDisabled: {
        opacity: 0.6,
    },
    locationButtonText: {
        color: '#8B5CF6',
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 8,
    },
    required: {
        color: '#EF4444',
    },
    row: {
        alignItems: 'flex-end',
        flexDirection: 'row',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        color: '#111827',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 16,
    },
    spacer: {
        width: 12,
    },
    textInput: {
        backgroundColor: '#FFFFFF',
        borderColor: '#E5E7EB',
        borderRadius: 12,
        borderWidth: 1,
        color: '#111827',
        fontSize: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
});

export default LocationSection;