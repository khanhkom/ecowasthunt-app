import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    CheckCircleIcon,
    ClockIcon,
    CursorArrowRaysIcon,
    ExclamationTriangleIcon,
    FunnelIcon,
    InformationCircleIcon,
    MagnifyingGlassIcon,
    MapPinIcon,
    PhoneIcon,
    ShareIcon,
    StarIcon,
    XMarkIcon,
} from 'react-native-heroicons/outline';
import {
    MapPinIcon as MapPinSolidIcon,
    StarIcon as StarSolidIcon,
} from 'react-native-heroicons/solid';

const { height, width } = Dimensions.get('window');

// Mock data cho các điểm thu gom rác
const wastePoints = [
    {
        address: '123 Nguyễn Trãi, Quận 1, TP.HCM',
        coordinates: { latitude: 10.7769, longitude: 106.6951 },
        description: 'Trung tâm tái chế hiện đại với công nghệ tiên tiến',
        distance: '0.5 km',
        hours: '7:00 - 18:00',
        id: 1,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
        phone: '028-3925-1234',
        rating: 4.8,
        reviews: 245,
        status: 'open',
        title: 'Trung tâm Tái chế Quận 1',
        type: 'recycling_center',
        verified: true,
        wasteTypes: ['plastic', 'paper', 'metal', 'glass'],
    },
    {
        address: '456 Lê Lợi, Quận 1, TP.HCM',
        coordinates: { latitude: 10.7751, longitude: 106.7 },
        description: 'Điểm thu gom do cộng đồng quản lý',
        distance: '1.2 km',
        hours: '6:00 - 20:00',
        id: 2,
        image: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=300&h=200&fit=crop',
        rating: 4.2,
        reviews: 89,
        status: 'open',
        title: 'Điểm Thu Gom Cộng Đồng',
        type: 'collection_point',
        verified: false,
        wasteTypes: ['organic', 'general'],
    },
    {
        address: 'Ngã tư Nguyễn Huệ - Đồng Khởi',
        coordinates: { latitude: 10.774, longitude: 106.703 },
        description: 'Tập trung rác thải nhựa và giấy tại ngã tư',
        distance: '0.8 km',
        id: 3,
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop',
        reportedBy: 'Nguyễn Văn A',
        reportedTime: '2 giờ trước',
        severity: 'high',
        status: 'pending',
        title: 'Báo cáo: Rác thải tập trung',
        type: 'reported_waste',
        wasteTypes: ['plastic', 'paper'],
    },
    {
        address: 'Công viên Tao Đàn, Quận 1',
        coordinates: { latitude: 10.779, longitude: 106.692 },
        description: 'Thùng rác IoT với cảm biến độ đầy',
        distance: '1.5 km',
        fillLevel: 85,
        id: 4,
        lastUpdated: '30 phút trước',
        status: 'full',
        title: 'Thùng Rác Thông Minh',
        type: 'smart_bin',
        verified: true,
        wasteTypes: ['general'],
    },
];

const wasteTypeConfig = {
    general: { color: '#6B7280', icon: '🗑️', name: 'Thông thường' },
    glass: { color: '#8B5CF6', icon: '🍶', name: 'Thủy tinh' },
    metal: { color: '#F59E0B', icon: '🥫', name: 'Kim loại' },
    organic: { color: '#84CC16', icon: '�', name: 'Hữu cơ' },
    paper: { color: '#10B981', icon: '📄', name: 'Giấy' },
    plastic: { color: '#3B82F6', icon: '🥤', name: 'Nhựa' },
};

const mapStyles = [
    {
        id: 'standard',
        name: 'Chuẩn',
        preview: '🗺️',
    },
    {
        id: 'satellite',
        name: 'Vệ tinh',
        preview: '🛰️',
    },
    {
        id: 'hybrid',
        name: 'Kết hợp',
        preview: '🌍',
    },
];

function MapScreen() {
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [mapType, setMapType] = useState('standard');
    const [activeFilters, setActiveFilters] = useState({
        collection_point: true,
        recycling_center: true,
        reported_waste: true,
        smart_bin: true,
    });
    const [showMapStyles, setShowMapStyles] = useState(false);

    const slideAnim = useRef(new Animated.Value(height)).current;

    useEffect(() => {
        if (selectedPoint) {
            Animated.spring(slideAnim, {
                friction: 8,
                tension: 50,
                toValue: 0,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.spring(slideAnim, {
                friction: 8,
                tension: 50,
                toValue: height,
                useNativeDriver: true,
            }).start();
        }
    }, [selectedPoint]);

    const getMarkerColor = (point) => {
        switch (point.type) {
            case 'collection_point': {
                return '#3B82F6';
            }
            case 'recycling_center': {
                return '#10B981';
            }
            case 'reported_waste': {
                return '#EF4444';
            }
            case 'smart_bin': {
                return '#8B5CF6';
            }
            default: {
                return '#6B7280';
            }
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'closed': {
                return '#EF4444';
            }
            case 'full': {
                return '#F59E0B';
            }
            case 'open': {
                return '#10B981';
            }
            case 'pending': {
                return '#F59E0B';
            }
            default: {
                return '#6B7280';
            }
        }
    };

    const getStatusText = (point) => {
        if (point.type === 'smart_bin') {
            if (point.status === 'full') return 'Đầy';
            return `${point.fillLevel}% đầy`;
        }
        if (point.type === 'reported_waste') {
            return point.status === 'pending' ? 'Chờ xử lý' : 'Đã xử lý';
        }
        return point.status === 'open' ? 'Đang mở' : 'Đã đóng';
    };

    const renderWasteTypes = (wasteTypes) => (
        <View style={styles.wasteTypesContainer}>
            {wasteTypes.map((type, index) => (
                <View key={index} style={[styles.wasteTypeChip, { borderColor: wasteTypeConfig[type]?.color }]}>
                    <Text style={styles.wasteTypeIcon}>{wasteTypeConfig[type]?.icon}</Text>
                    <Text style={[styles.wasteTypeText, { color: wasteTypeConfig[type]?.color }]}>
                        {wasteTypeConfig[type]?.name}
                    </Text>
                </View>
            ))}
        </View>
    );

    const renderMapMarker = (point) => (
        <TouchableOpacity
            key={point.id}
            onPress={() => { setSelectedPoint(point); }}
            style={[styles.mapMarker, { backgroundColor: getMarkerColor(point) }]}
        >
            {point.type === 'recycling_center' && <MapPinSolidIcon color="#fff" size={16} />}
            {point.type === 'collection_point' && <MapPinIcon color="#fff" size={16} strokeWidth={2} />}
            {point.type === 'reported_waste' && <ExclamationTriangleIcon color="#fff" size={16} strokeWidth={2} />}
            {point.type === 'smart_bin' && <InformationCircleIcon color="#fff" size={16} strokeWidth={2} />}

            {point.verified ? <View style={styles.verifiedBadge}>
                <CheckCircleIcon color="#10B981" size={8} strokeWidth={2} />
            </View> : null}
        </TouchableOpacity>
    );

    const renderFilterChip = (type, label, icon) => (
        <TouchableOpacity
            onPress={() => { setActiveFilters(previous => ({ ...previous, [type]: !previous[type] })); }}
            style={[styles.filterChip, activeFilters[type] && styles.activeFilterChip]}
        >
            <Text style={styles.filterIcon}>{icon}</Text>
            <Text style={[styles.filterText, activeFilters[type] && styles.activeFilterText]}>
                {label}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Map Area - Placeholder */}
            <View style={styles.mapContainer}>
                <View style={styles.mapPlaceholder}>
                    <Text style={styles.mapPlaceholderText}>🗺️ Bản đồ tương tác</Text>
                    <Text style={styles.mapSubtext}>Hiển thị các điểm thu gom và báo cáo rác</Text>

                    {/* Render markers on placeholder */}
                    <View style={styles.markersContainer}>
                        {wastePoints
                            .filter(point => activeFilters[point.type])
                            .map(renderMapMarker)}
                    </View>
                </View>
            </View>

            {/* Top Controls */}
            <View style={styles.topControls}>
                <TouchableOpacity style={styles.searchButton}>
                    <MagnifyingGlassIcon color="#1F2937" size={20} strokeWidth={2} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { setShowFilters(!showFilters); }}
                    style={styles.filterButton}
                >
                    <FunnelIcon color="#1F2937" size={20} strokeWidth={2} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { setShowMapStyles(!showMapStyles); }}
                    style={styles.mapStyleButton}
                >
                    <Text style={styles.mapStyleText}>🗺️</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.locationButton}>
                    <CursorArrowRaysIcon color="#1F2937" size={20} strokeWidth={2} />
                </TouchableOpacity>
            </View>

            {/* Filters Panel */}
            {showFilters ? <View style={styles.filtersPanel}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {renderFilterChip('recycling_center', 'Trung tâm tái chế', '♻️')}
                    {renderFilterChip('collection_point', 'Điểm thu gom', '📍')}
                    {renderFilterChip('reported_waste', 'Báo cáo rác', '⚠️')}
                    {renderFilterChip('smart_bin', 'Thùng thông minh', '🤖')}
                </ScrollView>
            </View> : null}

            {/* Map Styles Panel */}
            {showMapStyles ? <View style={styles.mapStylesPanel}>
                {mapStyles.map(style => (
                    <TouchableOpacity
                        key={style.id}
                        onPress={() => {
                            setMapType(style.id);
                            setShowMapStyles(false);
                        }}
                        style={[styles.mapStyleOption, mapType === style.id && styles.activeMapStyle]}
                    >
                        <Text style={styles.mapStylePreview}>{style.preview}</Text>
                        <Text style={styles.mapStyleName}>{style.name}</Text>
                    </TouchableOpacity>
                ))}
            </View> : null}

            {/* Legend */}
            <View style={styles.legend}>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
                    <Text style={styles.legendText}>Tái chế</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#3B82F6' }]} />
                    <Text style={styles.legendText}>Thu gom</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
                    <Text style={styles.legendText}>Báo cáo</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#8B5CF6' }]} />
                    <Text style={styles.legendText}>Thông minh</Text>
                </View>
            </View>

            {/* Point Details Modal */}
            {selectedPoint ? <Modal
                animationType="none"
                onRequestClose={() => { setSelectedPoint(null); }}
                transparent
                visible={!!selectedPoint}
            >
                <View style={styles.modalOverlay}>
                    <TouchableOpacity
                        onPress={() => { setSelectedPoint(null); }}
                        style={styles.modalBackdrop}
                    />

                    <Animated.View
                        style={[
                            styles.pointDetailsModal,
                            { transform: [{ translateY: slideAnim }] }
                        ]}
                    >
                        <View style={styles.modalHandle} />

                        <ScrollView showsVerticalScrollIndicator={false} style={styles.modalContent}>
                            {/* Header */}
                            <View style={styles.modalHeader}>
                                <View style={styles.modalTitleContainer}>
                                    <Text style={styles.modalTitle}>{selectedPoint.title}</Text>
                                    {selectedPoint.verified ? <View style={styles.verifiedModalBadge}>
                                        <CheckCircleIcon color="#10B981" size={16} strokeWidth={2} />
                                    </View> : null}
                                </View>
                                <TouchableOpacity
                                    onPress={() => { setSelectedPoint(null); }}
                                    style={styles.closeButton}
                                >
                                    <XMarkIcon color="#6B7280" size={24} strokeWidth={2} />
                                </TouchableOpacity>
                            </View>

                            {/* Image */}
                            {selectedPoint.image ? <Image source={{ uri: selectedPoint.image }} style={styles.modalImage} /> : null}

                            {/* Status */}
                            <View style={styles.statusContainer}>
                                <View style={[styles.statusDot, { backgroundColor: getStatusColor(selectedPoint.status) }]} />
                                <Text style={[styles.statusText, { color: getStatusColor(selectedPoint.status) }]}>
                                    {getStatusText(selectedPoint)}
                                </Text>
                                {selectedPoint.distance ? <>
                                    <Text style={styles.statusSeparator}>•</Text>
                                    <Text style={styles.distanceText}>{selectedPoint.distance}</Text>
                                </> : null}
                            </View>

                            {/* Rating */}
                            {selectedPoint.rating ? <View style={styles.ratingContainer}>
                                <StarSolidIcon color="#F59E0B" size={16} />
                                <Text style={styles.ratingText}>{selectedPoint.rating}</Text>
                                <Text style={styles.reviewsText}>({selectedPoint.reviews} đánh giá)</Text>
                            </View> : null}

                            {/* Address */}
                            <View style={styles.addressContainer}>
                                <MapPinIcon color="#6B7280" size={16} strokeWidth={2} />
                                <Text style={styles.addressText}>{selectedPoint.address}</Text>
                            </View>

                            {/* Description */}
                            <Text style={styles.descriptionText}>{selectedPoint.description}</Text>

                            {/* Waste Types */}
                            {selectedPoint.wasteTypes ? renderWasteTypes(selectedPoint.wasteTypes) : null}

                            {/* Additional Info */}
                            <View style={styles.infoContainer}>
                                {selectedPoint.hours ? <View style={styles.infoItem}>
                                    <ClockIcon color="#6B7280" size={16} strokeWidth={2} />
                                    <Text style={styles.infoText}>Giờ hoạt động: {selectedPoint.hours}</Text>
                                </View> : null}

                                {selectedPoint.phone ? <View style={styles.infoItem}>
                                    <PhoneIcon color="#6B7280" size={16} strokeWidth={2} />
                                    <Text style={styles.infoText}>{selectedPoint.phone}</Text>
                                </View> : null}

                                {selectedPoint.reportedBy ? <View style={styles.infoItem}>
                                    <InformationCircleIcon color="#6B7280" size={16} strokeWidth={2} />
                                    <Text style={styles.infoText}>Báo cáo bởi: {selectedPoint.reportedBy}</Text>
                                </View> : null}

                                {selectedPoint.lastUpdated ? <View style={styles.infoItem}>
                                    <ClockIcon color="#6B7280" size={16} strokeWidth={2} />
                                    <Text style={styles.infoText}>Cập nhật: {selectedPoint.lastUpdated}</Text>
                                </View> : null}
                            </View>

                            {/* Action Buttons */}
                            <View style={styles.actionButtons}>
                                <TouchableOpacity style={styles.actionButton}>
                                    <CursorArrowRaysIcon color="#fff" size={20} strokeWidth={2} />
                                    <Text style={styles.actionButtonText}>Chỉ đường</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
                                    <ShareIcon color="#8B5CF6" size={20} strokeWidth={2} />
                                    <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>Chia sẻ</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </Animated.View>
                </View>
            </Modal> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    actionButton: {
        alignItems: 'center',
        backgroundColor: '#8B5CF6',
        borderRadius: 12,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 6,
    },
    activeFilterChip: {
        backgroundColor: '#8B5CF6',
    },
    activeFilterText: {
        color: '#fff',
    },
    activeMapStyle: {
        backgroundColor: '#F3F4F6',
    },
    addressContainer: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginBottom: 12,
    },
    addressText: {
        color: '#6B7280',
        flex: 1,
        fontSize: 14,
        marginLeft: 8,
    },
    closeButton: {
        padding: 4,
    },
    container: {
        backgroundColor: '#F9FAFB',
        flex: 1,
    },
    descriptionText: {
        color: '#1F2937',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 16,
    },
    distanceText: {
        color: '#6B7280',
        fontSize: 14,
    },
    filterButton: {
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 3,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    filterChip: {
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 20,
        flexDirection: 'row',
        marginRight: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    filterIcon: {
        fontSize: 16,
        marginRight: 6,
    },
    filtersPanel: {
        backgroundColor: '#fff',
        elevation: 3,
        left: 0,
        paddingHorizontal: 20,
        paddingVertical: 16,
        position: 'absolute',
        right: 0,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        top: Platform.OS === 'ios' ? 120 : 100,
    },
    filterText: {
        color: '#6B7280',
        fontSize: 14,
        fontWeight: '600',
    },
    infoContainer: {
        marginBottom: 24,
    },
    infoItem: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 8,
    },
    infoText: {
        color: '#6B7280',
        fontSize: 14,
        marginLeft: 8,
    },
    legend: {
        backgroundColor: '#fff',
        borderRadius: 12,
        bottom: 100,
        elevation: 3,
        left: 20,
        padding: 12,
        position: 'absolute',
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    legendDot: {
        borderRadius: 4,
        height: 8,
        marginRight: 8,
        width: 8,
    },
    legendItem: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 6,
    },
    legendText: {
        color: '#6B7280',
        fontSize: 12,
    },
    locationButton: {
        backgroundColor: '#8B5CF6',
        borderRadius: 12,
        elevation: 3,
        padding: 12,
        shadowColor: '#8B5CF6',
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    mapContainer: {
        flex: 1,
    },
    mapMarker: {
        alignItems: 'center',
        borderRadius: 16,
        elevation: 5,
        height: 32,
        justifyContent: 'center',
        position: 'absolute',
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        width: 32,
        // Positioned randomly for demo
        left: Math.random() * (width - 100) + 50,
        top: Math.random() * 300 + 100,
    },
    mapPlaceholder: {
        alignItems: 'center',
        backgroundColor: '#E5E7EB',
        flex: 1,
        justifyContent: 'center',
        position: 'relative',
    },
    mapPlaceholderText: {
        color: '#6B7280',
        fontSize: 24,
        marginBottom: 8,
    },
    mapStyleButton: {
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 3,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    mapStyleName: {
        color: '#1F2937',
        fontSize: 14,
        fontWeight: '600',
    },
    mapStyleOption: {
        alignItems: 'center',
        borderRadius: 8,
        flexDirection: 'row',
        padding: 12,
    },
    mapStylePreview: {
        fontSize: 20,
        marginRight: 12,
    },
    mapStylesPanel: {
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 3,
        padding: 8,
        position: 'absolute',
        right: 20,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        top: Platform.OS === 'ios' ? 180 : 160,
    },
    mapStyleText: {
        fontSize: 16,
    },
    mapSubtext: {
        color: '#9CA3AF',
        fontSize: 14,
        textAlign: 'center',
    },
    markersContainer: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    modalBackdrop: {
        flex: 1,
    },
    modalContent: {
        paddingBottom: 40,
        paddingHorizontal: 20,
    },
    modalHandle: {
        alignSelf: 'center',
        backgroundColor: '#D1D5DB',
        borderRadius: 2,
        height: 4,
        marginBottom: 16,
        marginTop: 8,
        width: 40,
    },
    modalHeader: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    modalImage: {
        borderRadius: 12,
        height: 200,
        marginBottom: 16,
        width: '100%',
    },
    modalOverlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
    },
    modalTitle: {
        color: '#1F2937',
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalTitleContainer: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
    },
    pointDetailsModal: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        bottom: 0,
        left: 0,
        maxHeight: height * 0.8,
        position: 'absolute',
        right: 0,
    },
    ratingContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 12,
    },
    ratingText: {
        color: '#1F2937',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 4,
    },
    reviewsText: {
        color: '#6B7280',
        fontSize: 14,
        marginLeft: 4,
    },
    searchButton: {
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 3,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    secondaryButton: {
        backgroundColor: '#fff',
        borderColor: '#8B5CF6',
        borderWidth: 1,
    },
    secondaryButtonText: {
        color: '#8B5CF6',
    },
    statusContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 12,
    },
    statusDot: {
        borderRadius: 4,
        height: 8,
        marginRight: 8,
        width: 8,
    },
    statusSeparator: {
        color: '#9CA3AF',
        fontSize: 14,
        marginHorizontal: 8,
    },
    statusText: {
        fontSize: 14,
        fontWeight: '600',
    },
    topControls: {
        flexDirection: 'column',
        gap: 12,
        position: 'absolute',
        right: 20,
        top: Platform.OS === 'ios' ? 60 : 40,
    },
    verifiedBadge: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 6,
        height: 12,
        justifyContent: 'center',
        position: 'absolute',
        right: -2,
        top: -2,
        width: 12,
    },
    verifiedModalBadge: {
        marginLeft: 8,
    },
    wasteTypeChip: {
        alignItems: 'center',
        borderRadius: 16,
        borderWidth: 1,
        flexDirection: 'row',
        marginBottom: 8,
        marginRight: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    wasteTypeIcon: {
        fontSize: 12,
        marginRight: 4,
    },
    wasteTypesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    wasteTypeText: {
        fontSize: 12,
        fontWeight: '600',
    },
});

export default MapScreen;