import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    Image,
    Linking,
    Modal,
    Platform,
    ScrollView,
    Share,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    ArrowTopRightOnSquareIcon,
    CalendarIcon,
    CheckCircleIcon,
    ChevronLeftIcon,
    ClockIcon,
    Cog6ToothIcon,
    CurrencyDollarIcon,
    EllipsisHorizontalIcon,
    ExclamationTriangleIcon,
    EyeIcon,
    HandThumbDownIcon,
    HandThumbUpIcon,
    MapPinIcon,
    PhotoIcon,
    ScaleIcon,
    ShareIcon,
    TagIcon,
    UserIcon,
    XMarkIcon,
} from 'react-native-heroicons/outline';
import {
    CheckCircleIcon as CheckCircleIconSolid,
    ClockIcon as ClockIconSolid,
    ExclamationTriangleIcon as ExclamationTriangleIconSolid,
    HandThumbDownIcon as HandThumbDownIconSolid,
    HandThumbUpIcon as HandThumbUpIconSolid,
    XCircleIcon as XCircleIconSolid,
} from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';

import { goBack } from '@/navigation';

import { REPORT_STATUS, WASTE_TYPES } from '../ReportHistory/reportConstants';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

// Constants from backend

const SEVERITY_LEVELS = {
    CRITICAL: { color: '#DC2626', description: 'Khẩn cấp', name: 'Rất cao' },
    HIGH: { color: '#EF4444', description: 'Cần xử lý ngay', name: 'Cao' },
    LOW: { color: '#10B981', description: 'Không cấp thiết', name: 'Thấp' },
    MEDIUM: { color: '#F59E0B', description: 'Cần xử lý trong vài ngày', name: 'Trung bình' },
};

function ReportDetailScreen({ route }) {
    const { reportId } = route.params;
    const [report, setReport] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userVote, setUserVote] = useState(null); // 'up', 'down', or null
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [showMoreOptions, setShowMoreOptions] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;

    useEffect(() => {
        loadReportDetail();
        // Entrance animation
        Animated.parallel([
            Animated.timing(fadeAnim, {
                duration: 600,
                toValue: 1,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                friction: 8,
                tension: 50,
                toValue: 1,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const loadReportDetail = async () => {
        try {
            setIsLoading(true);

            // Simulate API call - replace with actual API
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock data based on IWasteReport interface
            const mockReport = {
                _id: reportId,
                aiClassification: {
                    confidence: 0.89,
                    detectedTypes: ['BULKY', 'PLASTIC'],
                    modelVersion: 'v1.2.0',
                    processedAt: new Date('2024-01-15T10:30:00Z'),
                },
                assignedAt: new Date('2024-01-15T14:20:00Z'),
                assignedTo: {
                    _id: 'staff456',
                    avatar: 'https://picsum.photos/40/40?random=11',
                    name: 'Phòng Tài nguyên & Môi trường',
                },
                createdAt: new Date('2024-01-15T09:15:00Z'),
                description: 'Phát hiện bãi rác lớn với đồ nội thất cũ, vật liệu xây dựng và rác sinh hoạt. Tình trạng này đã kéo dài nhiều ngày, gây ô nhiễm môi trường và cản trở giao thông. Cần có biện pháp xử lý khẩn cấp để đảm bảo vệ sinh môi trường khu vực.',
                downvotes: 2,
                images: [
                    `https://picsum.photos/400/300?random=1`,
                    `https://picsum.photos/400/300?random=2`,
                    `https://picsum.photos/400/300?random=3`,
                    `https://picsum.photos/400/300?random=4`,
                ],
                location: {
                    address: 'Số 1 Đại Cồ Việt',
                    city: 'Hà Nội',
                    coordinates: [105.8542, 21.0285],
                    district: 'Hai Bà Trưng',
                    ward: 'Bách Khoa',
                },
                priority: 8,
                reportedBy: {
                    _id: 'user123',
                    avatar: 'https://picsum.photos/40/40?random=10',
                    name: 'Nguyễn Văn An',
                },
                resolution: null, // Will be set if status is RESOLVED
                severity: 'HIGH',
                status: 'IN_PROGRESS',
                tags: ['public_area', 'near_school', 'urgent'],
                title: 'Bãi rác tự phát tại vỉa hè đường Đại Cồ Việt',
                updatedAt: new Date('2024-01-15T14:20:00Z'),
                upvotes: 45,
                viewCount: 234,
                wasteType: 'BULKY',
            };

            // Add resolution data if resolved
            if (mockReport.status === 'RESOLVED') {
                mockReport.resolution = {
                    estimatedWeight: 250, // kg
                    processingCost: 500_000, // VND
                    resolutionImages: [
                        `https://picsum.photos/400/300?random=20`,
                        `https://picsum.photos/400/300?random=21`,
                    ],
                    resolutionNote: 'Đã thu gom và xử lý toàn bộ rác thải. Khu vực đã được làm sạch và khử trùng.',
                    resolvedAt: new Date('2024-01-16T16:45:00Z'),
                    resolvedBy: {
                        _id: 'staff456',
                        name: 'Phòng Tài nguyên & Môi trường',
                    },
                };
            }

            setReport(mockReport);
        } catch {
            Alert.alert('Lỗi', 'Không thể tải chi tiết báo cáo');
            goBack();
        } finally {
            setIsLoading(false);
        }
    };

    const handleVote = async (voteType) => {
        try {
            if (userVote === voteType) {
                // Remove vote
                setUserVote(null);
                if (voteType === 'up') {
                    setReport(previous => ({ ...previous, upvotes: previous.upvotes - 1 }));
                } else {
                    setReport(previous => ({ ...previous, downvotes: previous.downvotes - 1 }));
                }
            } else {
                // Change vote or add new vote
                const previousVote = userVote;
                setUserVote(voteType);

                setReport(previous => {
                    let newUpvotes = previous.upvotes;
                    let newDownvotes = previous.downvotes;

                    if (previousVote === 'up') newUpvotes--;
                    if (previousVote === 'down') newDownvotes--;

                    if (voteType === 'up') newUpvotes++;
                    if (voteType === 'down') newDownvotes++;

                    return { ...previous, downvotes: newDownvotes, upvotes: newUpvotes };
                });
            }

            // TODO: Call API to update vote
            console.log('Vote:', voteType, 'for report:', reportId);
        } catch {
            Alert.alert('Lỗi', 'Không thể cập nhật đánh giá');
        }
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Báo cáo rác thải: ${report.title}\n\nVị trí: ${report.location.address}, ${report.location.district}, ${report.location.city}\n\nXem chi tiết trong ứng dụng.`,
                title: 'Chia sẻ báo cáo rác thải',
            });
        } catch (error) {
            console.log('Share error:', error);
        }
    };

    const openMap = () => {
        const [lng, lat] = report.location.coordinates;
        const url = Platform.select({
            android: `geo:${lat},${lng}`,
            ios: `maps:${lat},${lng}`,
        });

        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                Alert.alert('Lỗi', 'Không thể mở ứng dụng bản đồ');
            }
        });
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleString('vi-VN', {
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            currency: 'VND',
            style: 'currency',
        }).format(amount);
    };

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#F9FAFB" barStyle="dark-content" />
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Đang tải...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (!report) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#F9FAFB" barStyle="dark-content" />
                <View style={styles.errorContainer}>
                    <ExclamationTriangleIcon color="#EF4444" size={64} />
                    <Text style={styles.errorTitle}>Không tìm thấy báo cáo</Text>
                    <TouchableOpacity
                        onPress={() => { goBack(); }}
                        style={styles.backButton}
                    >
                        <Text style={styles.backButtonText}>Quay lại</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    const wasteType = WASTE_TYPES[report.wasteType];
    const status = REPORT_STATUS[report.status];
    const severity = SEVERITY_LEVELS[report.severity];
    const StatusIcon = status.icon;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#F9FAFB" barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => { goBack(); }}
                    style={styles.headerButton}
                >
                    <ChevronLeftIcon color="#6B7280" size={24} />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Chi tiết báo cáo</Text>

                <View style={styles.headerActions}>
                    <TouchableOpacity
                        onPress={handleShare}
                        style={styles.headerButton}
                    >
                        <ShareIcon color="#6B7280" size={24} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => { setShowMoreOptions(true); }}
                        style={styles.headerButton}
                    >
                        <EllipsisHorizontalIcon color="#6B7280" size={24} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.content}
            >
                <Animated.View style={[
                    styles.animatedContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    },
                ]}>

                    {/* Status Card */}
                    <View style={styles.statusCard}>
                        <View style={styles.statusHeader}>
                            <View style={[styles.statusBadge, { backgroundColor: status.color }]}>
                                <StatusIcon color="#FFFFFF" size={16} />
                                <Text style={styles.statusText}>{status.name}</Text>
                            </View>

                            <Text style={styles.reportId}>#{report._id.slice(-6)}</Text>
                        </View>

                        <Text style={styles.statusDescription}>{status.description}</Text>

                        {report.assignedTo ? <View style={styles.assignedInfo}>
                            <UserIcon color="#6B7280" size={16} />
                            <Text style={styles.assignedText}>
                                Phụ trách: {report.assignedTo.name}
                            </Text>
                        </View> : null}
                    </View>

                    {/* Title & Description */}
                    <View style={styles.contentCard}>
                        <Text style={styles.reportTitle}>{report.title}</Text>
                        <Text style={styles.reportDescription}>{report.description}</Text>

                        {/* Meta info */}
                        <View style={styles.metaInfo}>
                            <View style={styles.metaItem}>
                                <CalendarIcon color="#6B7280" size={16} />
                                <Text style={styles.metaText}>{formatDate(report.createdAt)}</Text>
                            </View>

                            <View style={styles.metaItem}>
                                <UserIcon color="#6B7280" size={16} />
                                <Text style={styles.metaText}>Báo cáo bởi: {report.reportedBy.name}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Images Gallery */}
                    <View style={styles.contentCard}>
                        <Text style={styles.sectionTitle}>Hình ảnh ({report.images.length})</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.imageGallery}
                        >
                            {report.images.map((image, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        setSelectedImageIndex(index);
                                        setShowImageModal(true);
                                    }}
                                    style={styles.imageContainer}
                                >
                                    <Image source={{ uri: image }} style={styles.galleryImage} />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Location */}
                    <View style={styles.contentCard}>
                        <Text style={styles.sectionTitle}>Vị trí</Text>
                        <TouchableOpacity onPress={openMap} style={styles.locationInfo}>
                            <View style={styles.locationText}>
                                <MapPinIcon color="#8B5CF6" size={20} />
                                <View style={styles.locationDetails}>
                                    <Text style={styles.locationAddress}>{report.location.address}</Text>
                                    <Text style={styles.locationSub}>
                                        {report.location.ward}, {report.location.district}, {report.location.city}
                                    </Text>
                                </View>
                            </View>
                            <ArrowTopRightOnSquareIcon color="#8B5CF6" size={20} />
                        </TouchableOpacity>
                    </View>

                    {/* Waste Info */}
                    <View style={styles.contentCard}>
                        <Text style={styles.sectionTitle}>Thông tin rác thải</Text>

                        <View style={styles.wasteInfoGrid}>
                            <View style={styles.wasteInfoItem}>
                                <Text style={styles.wasteInfoLabel}>Loại rác thải</Text>
                                <View style={styles.wasteTypeContainer}>
                                    <Text style={styles.wasteTypeIcon}>{wasteType.icon}</Text>
                                    <Text style={styles.wasteTypeText}>{wasteType.name}</Text>
                                </View>
                            </View>

                            <View style={styles.wasteInfoItem}>
                                <Text style={styles.wasteInfoLabel}>Mức độ nghiêm trọng</Text>
                                <View style={[styles.severityContainer, { backgroundColor: severity.color }]}>
                                    <Text style={styles.severityText}>{severity.name}</Text>
                                </View>
                            </View>

                            <View style={styles.wasteInfoItem}>
                                <Text style={styles.wasteInfoLabel}>Độ ưu tiên</Text>
                                <Text style={[
                                    styles.priorityText,
                                    { color: report.priority >= 7 ? '#EF4444' : report.priority >= 4 ? '#F59E0B' : '#10B981' }
                                ]}>
                                    {report.priority}/10
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Tags */}
                    {report.tags && report.tags.length > 0 ? <View style={styles.contentCard}>
                        <Text style={styles.sectionTitle}>Thẻ phân loại</Text>
                        <View style={styles.tagsContainer}>
                            {report.tags.map((tag, index) => (
                                <View key={index} style={styles.tag}>
                                    <TagIcon color="#6B7280" size={12} />
                                    <Text style={styles.tagText}>{tag}</Text>
                                </View>
                            ))}
                        </View>
                    </View> : null}

                    {/* AI Classification */}
                    {report.aiClassification ? <View style={styles.contentCard}>
                        <Text style={styles.sectionTitle}>Phân loại AI</Text>
                        <View style={styles.aiContainer}>
                            <View style={styles.aiHeader}>
                                <Text style={styles.aiTitle}>
                                    Phát hiện: {report.aiClassification.detectedTypes.join(', ')}
                                </Text>
                                <Text style={styles.aiConfidence}>
                                    {Math.round(report.aiClassification.confidence * 100)}%
                                </Text>
                            </View>
                            <Text style={styles.aiMeta}>
                                Xử lý: {formatDate(report.aiClassification.processedAt)} •
                                Model: {report.aiClassification.modelVersion}
                            </Text>
                        </View>
                    </View> : null}

                    {/* Resolution (if resolved) */}
                    {report.resolution ? <View style={styles.contentCard}>
                        <Text style={styles.sectionTitle}>Kết quả xử lý</Text>
                        <View style={styles.resolutionContainer}>
                            <View style={styles.resolutionHeader}>
                                <CheckCircleIconSolid color="#10B981" size={20} />
                                <Text style={styles.resolutionTitle}>Đã xử lý hoàn tất</Text>
                            </View>

                            <Text style={styles.resolutionNote}>{report.resolution.resolutionNote}</Text>

                            <View style={styles.resolutionMeta}>
                                <View style={styles.resolutionMetaItem}>
                                    <Text style={styles.resolutionMetaLabel}>Xử lý bởi:</Text>
                                    <Text style={styles.resolutionMetaValue}>{report.resolution.resolvedBy.name}</Text>
                                </View>

                                <View style={styles.resolutionMetaItem}>
                                    <Text style={styles.resolutionMetaLabel}>Thời gian:</Text>
                                    <Text style={styles.resolutionMetaValue}>{formatDate(report.resolution.resolvedAt)}</Text>
                                </View>

                                {report.resolution.estimatedWeight ? <View style={styles.resolutionMetaItem}>
                                    <ScaleIcon color="#6B7280" size={16} />
                                    <Text style={styles.resolutionMetaValue}>{report.resolution.estimatedWeight} kg</Text>
                                </View> : null}

                                {report.resolution.processingCost ? <View style={styles.resolutionMetaItem}>
                                    <CurrencyDollarIcon color="#6B7280" size={16} />
                                    <Text style={styles.resolutionMetaValue}>{formatCurrency(report.resolution.processingCost)}</Text>
                                </View> : null}
                            </View>

                            {/* Resolution Images */}
                            {report.resolution.resolutionImages && report.resolution.resolutionImages.length > 0 ? <View style={styles.resolutionImagesContainer}>
                                <Text style={styles.resolutionImagesTitle}>Hình ảnh sau xử lý:</Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    {report.resolution.resolutionImages.map((image, index) => (
                                        <Image
                                            key={index}
                                            source={{ uri: image }}
                                            style={styles.resolutionImage}
                                        />
                                    ))}
                                </ScrollView>
                            </View> : null}
                        </View>
                    </View> : null}

                    {/* Stats & Actions */}
                    <View style={styles.contentCard}>
                        <View style={styles.statsContainer}>
                            <View style={styles.statsItem}>
                                <EyeIcon color="#6B7280" size={20} />
                                <Text style={styles.statsText}>{report.viewCount} lượt xem</Text>
                            </View>
                        </View>

                        <View style={styles.actionsContainer}>
                            <TouchableOpacity
                                onPress={() => handleVote('up')}
                                style={[
                                    styles.voteButton,
                                    userVote === 'up' && styles.voteButtonActive,
                                ]}
                            >
                                {userVote === 'up' ? (
                                    <HandThumbUpIconSolid color="#10B981" size={20} />
                                ) : (
                                    <HandThumbUpIcon color="#6B7280" size={20} />
                                )}
                                <Text style={[
                                    styles.voteText,
                                    userVote === 'up' && styles.voteTextActive,
                                ]}>
                                    {report.upvotes}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => handleVote('down')}
                                style={[
                                    styles.voteButton,
                                    userVote === 'down' && styles.voteButtonActive,
                                ]}
                            >
                                {userVote === 'down' ? (
                                    <HandThumbDownIconSolid color="#EF4444" size={20} />
                                ) : (
                                    <HandThumbDownIcon color="#6B7280" size={20} />
                                )}
                                <Text style={[
                                    styles.voteText,
                                    userVote === 'down' && styles.voteTextActive,
                                ]}>
                                    {report.downvotes}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </Animated.View>
            </ScrollView>

            {/* Image Modal */}
            <Modal animationType="fade" transparent visible={showImageModal}>
                <View style={styles.imageModalOverlay}>
                    <TouchableOpacity
                        onPress={() => { setShowImageModal(false); }}
                        style={styles.imageModalClose}
                    >
                        <XMarkIcon color="#FFFFFF" size={24} />
                    </TouchableOpacity>

                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        style={styles.imageModalScroll}
                    >
                        {report.images.map((image, index) => (
                            <View key={index} style={styles.imageModalContainer}>
                                <Image source={{ uri: image }} style={styles.imageModalImage} />
                            </View>
                        ))}
                    </ScrollView>

                    <View style={styles.imageModalIndicator}>
                        <Text style={styles.imageModalIndicatorText}>
                            {selectedImageIndex + 1} / {report.images.length}
                        </Text>
                    </View>
                </View>
            </Modal>

            {/* More Options Modal */}
            <Modal animationType="slide" transparent visible={showMoreOptions}>
                <View style={styles.modalOverlay}>
                    <View style={styles.optionsModal}>
                        <Text style={styles.optionsTitle}>Tùy chọn</Text>

                        <TouchableOpacity style={styles.optionItem}>
                            <Text style={styles.optionText}>Báo cáo vi phạm</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.optionItem}>
                            <Text style={styles.optionText}>Sao chép liên kết</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { setShowMoreOptions(false); }}
                            style={styles.optionItem}
                        >
                            <Text style={[styles.optionText, styles.optionTextCancel]}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    actionsContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    aiConfidence: {
        color: '#10B981',
        fontSize: 14,
        fontWeight: '600',
    },
    aiContainer: {
        backgroundColor: '#F8FAFC',
        borderColor: '#E2E8F0',
        borderRadius: 12,
        borderWidth: 1,
        padding: 16,
    },
    aiHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    aiMeta: {
        color: '#64748B',
        fontSize: 12,
    },
    aiTitle: {
        color: '#475569',
        flex: 1,
        fontSize: 14,
        fontWeight: '500',
    },
    animatedContainer: {
        padding: 20,
    },
    assignedInfo: {
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    assignedText: {
        color: '#6B7280',
        fontSize: 12,
        marginLeft: 6,
    },
    backButton: {
        backgroundColor: '#8B5CF6',
        borderRadius: 12,
        paddingHorizontal: 24,
        paddingVertical: 12,
    },
    backButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
    container: {
        backgroundColor: '#F9FAFB',
        flex: 1,
    },
    content: {
        flex: 1,
    },
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
    errorContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding: 40,
    },
    errorTitle: {
        color: '#EF4444',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 24,
        marginTop: 16,
    },
    galleryImage: {
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        height: 120,
        width: 120,
    },
    header: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderBottomColor: '#E5E7EB',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    headerActions: {
        flexDirection: 'row',
        gap: 8,
    },
    headerButton: {
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 20,
        height: 40,
        justifyContent: 'center',
        width: 40,
    },
    headerTitle: {
        color: '#111827',
        flex: 1,
        fontSize: 18,
        fontWeight: '600',
        marginHorizontal: 16,
        textAlign: 'center',
    },
    imageContainer: {
        marginHorizontal: 4,
    },
    imageGallery: {
        marginHorizontal: -4,
    },
    loadingContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    loadingText: {
        color: '#6B7280',
        fontSize: 16,
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
    metaInfo: {
        gap: 8,
    },
    metaItem: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    metaText: {
        color: '#6B7280',
        fontSize: 14,
        marginLeft: 8,
    },
    priorityText: {
        fontSize: 14,
        fontWeight: '600',
    },
    reportDescription: {
        color: '#4B5563',
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 16,
    },
    reportId: {
        color: '#6B7280',
        fontFamily: 'monospace',
        fontSize: 12,
    },
    reportTitle: {
        color: '#111827',
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 28,
        marginBottom: 12,
    },
    resolutionContainer: {
        backgroundColor: '#F0FDF4',
        borderColor: '#BBF7D0',
        borderRadius: 12,
        borderWidth: 1,
        padding: 16,
    },
    resolutionHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 12,
    },
    resolutionImage: {
        borderRadius: 8,
        height: 80,
        marginRight: 8,
        width: 80,
    },
    resolutionImagesContainer: {
        marginTop: 16,
    },
    resolutionImagesTitle: {
        color: '#065F46',
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
    },
    resolutionMeta: {
        gap: 8,
    },
    resolutionMetaItem: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    resolutionMetaLabel: {
        color: '#065F46',
        fontSize: 12,
        fontWeight: '500',
        marginRight: 8,
    },
    resolutionMetaValue: {
        color: '#047857',
        fontSize: 12,
        marginLeft: 4,
    },
    resolutionNote: {
        color: '#047857',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 16,
    },
    resolutionTitle: {
        color: '#065F46',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    sectionTitle: {
        color: '#111827',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
    },
    severityContainer: {
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    severityText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
    statsContainer: {
        marginBottom: 16,
    },
    statsItem: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    statsText: {
        color: '#6B7280',
        fontSize: 14,
        marginLeft: 8,
    },
    statusBadge: {
        alignItems: 'center',
        borderRadius: 12,
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    statusCard: {
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
    statusDescription: {
        color: '#6B7280',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 12,
    },
    statusHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    statusText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 6,
    },
    tag: {
        alignItems: 'center',
        backgroundColor: '#EFF6FF',
        borderColor: '#DBEAFE',
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    tagText: {
        color: '#1E40AF',
        fontSize: 12,
        fontWeight: '500',
        marginLeft: 4,
    },
    voteButton: {
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    voteButtonActive: {
        backgroundColor: '#EEF2FF',
    },
    voteText: {
        color: '#6B7280',
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 8,
    },
    voteTextActive: {
        color: '#8B5CF6',
    },
    wasteInfoGrid: {
        gap: 16,
    },
    wasteInfoItem: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    wasteInfoLabel: {
        color: '#6B7280',
        fontSize: 14,
    },
    wasteTypeContainer: {
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    wasteTypeIcon: {
        fontSize: 16,
        marginRight: 6,
    },
    wasteTypeText: {
        color: '#374151',
        fontSize: 14,
        fontWeight: '500',
    },
    // Image Modal
    imageModalClose: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        height: 40,
        justifyContent: 'center',
        position: 'absolute',
        right: 20,
        top: 60,
        width: 40,
        zIndex: 10,
    },
    imageModalContainer: {
        alignItems: 'center',
        height: screenHeight,
        justifyContent: 'center',
        width: screenWidth,
    },
    imageModalImage: {
        borderRadius: 12,
        height: screenWidth - 40,
        width: screenWidth - 40,
    },
    imageModalIndicator: {
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        bottom: 60,
        paddingHorizontal: 16,
        paddingVertical: 8,
        position: 'absolute',
    },
    imageModalIndicatorText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '500',
    },
    imageModalOverlay: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.9)',
        flex: 1,
        justifyContent: 'center',
    },
    imageModalScroll: {
        flex: 1,
    },
    // Options Modal
    modalOverlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        justifyContent: 'flex-end',
    },
    optionItem: {
        borderBottomColor: '#F3F4F6',
        borderBottomWidth: 1,
        paddingVertical: 16,
    },
    optionsModal: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 24,
    },
    optionsTitle: {
        color: '#111827',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 20,
        textAlign: 'center',
    },
    optionText: {
        color: '#111827',
        fontSize: 16,
        textAlign: 'center',
    },
    optionTextCancel: {
        color: '#EF4444',
        fontWeight: '500',
    },
});

export default ReportDetailScreen;