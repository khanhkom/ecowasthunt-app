// screens/ReportDetailScreen.tsx

import { getWasteReportDetail } from '@/services/functions/wasteReportApi';
import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Linking,
    Platform,
    ScrollView,
    Share,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { ExclamationTriangleIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';

import { goBack } from '@/navigation';

import { REPORT_STATUS, SEVERITY_LEVELS, WASTE_TYPES } from '../ReportHistory/reportConstants';

// Item
import AIClassificationComponent from './Item/AIClassification';
import ContentCard from './Item/ContentCard';
import ImageGallery from './Item/ImageGallery';
import ImageModal from './Item/ImageModal';
import LocationInfo from './Item/LocationInfo';
import OptionsModal from './Item/OptionsModal';
import ReportHeader from './Item/ReportHeader';
import ResolutionInfo from './Item/ResolutionInfo';
import StatsAndActions from './Item/StatsAndActions';
import StatusCard from './Item/StatusCard';
import TagsSection from './Item/TagsSection';
import WasteInfo from './Item/WasteInfo';

// Types
import { Report, RouteParams as RouteParameters, VoteType } from './report';

type ReportDetailScreenProps = {
    readonly route: RouteProp<{ ReportDetail: RouteParameters }, 'ReportDetail'>;
}

const ReportDetailScreen: React.FC<ReportDetailScreenProps> = ({ route }) => {
    const { reportId } = route.params;

    // State
    const [report, setReport] = useState<null | Report>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userVote, setUserVote] = useState<VoteType>(null);
    const [showImageModal, setShowImageModal] = useState<boolean>(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
    const [showMoreOptions, setShowMoreOptions] = useState<boolean>(false);

    // Animations
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

    const loadReportDetail = async (): Promise<void> => {
        try {
            setIsLoading(true);
            console.log("response::", reportId);
            const response = await getWasteReportDetail(reportId);
            console.log("response::", response.data?.data);
            if (response.data?.data) {
                setReport(response.data.data);
            }
        } catch {
            Alert.alert('Lỗi', 'Không thể tải chi tiết báo cáo');
            goBack();
        } finally {
            setIsLoading(false);
        }
    };

    const handleVote = async (voteType: 'down' | 'up'): Promise<void> => {
        try {
            if (userVote === voteType) {
                // Remove vote
                setUserVote(null);
                if (voteType === 'up') {
                    setReport(previous => previous ? { ...previous, upvotes: previous.upvotes - 1 } : null);
                } else {
                    setReport(previous => previous ? { ...previous, downvotes: previous.downvotes - 1 } : null);
                }
            } else {
                // Change vote or add new vote
                const previousVote = userVote;
                setUserVote(voteType);

                setReport(previous => {
                    if (!previous) return null;

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

    const handleShare = async (): Promise<void> => {
        try {
            if (!report) return;

            await Share.share({
                message: `Báo cáo rác thải: ${report.title}\n\nVị trí: ${report.location.address}, ${report.location.district}, ${report.location.city}\n\nXem chi tiết trong ứng dụng.`,
                title: 'Chia sẻ báo cáo rác thải',
            });
        } catch (error) {
            console.log('Share error:', error);
        }
    };

    const openMap = (): void => {
        if (!report) return;

        const [lng, lat] = report.location.coordinates;
        const url = Platform.select({
            android: `geo:${lat},${lng}`,
            ios: `maps:${lat},${lng}`,
        });

        if (url) {
            Linking.canOpenURL(url).then(supported => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    Alert.alert('Lỗi', 'Không thể mở ứng dụng bản đồ');
                }
            });
        }
    };

    const handleImagePress = (index: number): void => {
        setSelectedImageIndex(index);
        setShowImageModal(true);
    };

    const formatDate = (date: string): string => {
        return new Date(date).toLocaleString('vi-VN', {
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    };

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('vi-VN', {
            currency: 'VND',
            style: 'currency',
        }).format(amount);
    };

    // Loading state
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

    // Error state
    if (!report) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#F9FAFB" barStyle="dark-content" />
                <View style={styles.errorContainer}>
                    <ExclamationTriangleIcon color="#EF4444" size={64} />
                    <Text style={styles.errorTitle}>Không tìm thấy báo cáo</Text>
                    <TouchableOpacity onPress={goBack} style={styles.backButton}>
                        <Text style={styles.backButtonText}>Quay lại</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    // Get data from constants
    const wasteType = WASTE_TYPES[report.wasteType];
    const status = REPORT_STATUS[report.status];
    const severity = SEVERITY_LEVELS[report.severity];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#F9FAFB" barStyle="dark-content" />

            <ReportHeader
                onBack={goBack}
                onMoreOptions={() => { setShowMoreOptions(true); }}
                onShare={handleShare}
            />

            <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
                <Animated.View style={[
                    styles.animatedContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    },
                ]}>
                    <StatusCard assignedTo={report.assignedTo} status={status} />

                    <ContentCard
                        createdAt={report.createdAt}
                        description={report.description}
                        formatDate={formatDate}
                        reportedBy={report.reportedBy}
                        title={report.title}
                    />

                    <ImageGallery images={report.images} onImagePress={handleImagePress} />

                    <LocationInfo location={report.location} onMapPress={openMap} />

                    <WasteInfo
                        priority={report.priority}
                        severity={severity}
                        wasteType={wasteType}
                    />

                    <TagsSection tags={report.tags} />

                    <AIClassificationComponent
                        aiClassification={report.aiClassification}
                        formatDate={formatDate}
                    />

                    <ResolutionInfo
                        formatCurrency={formatCurrency}
                        formatDate={formatDate}
                        resolution={report.resolution}
                    />

                    <StatsAndActions
                        downvotes={report.downvotes}
                        onVote={handleVote}
                        upvotes={report.upvotes}
                        userVote={userVote}
                        viewCount={report.viewCount}
                    />
                </Animated.View>
            </ScrollView>

            <ImageModal
                images={report.images}
                onClose={() => { setShowImageModal(false); }}
                selectedIndex={selectedImageIndex}
                visible={showImageModal}
            />

            <OptionsModal
                onClose={() => { setShowMoreOptions(false); }}
                onCopyLink={() => {
                    // TODO: Implement copy link
                    setShowMoreOptions(false);
                }}
                onReportViolation={() => {
                    // TODO: Implement report violation
                    setShowMoreOptions(false);
                }}
                visible={showMoreOptions}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    animatedContainer: {
        padding: 20,
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
    loadingContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    loadingText: {
        color: '#6B7280',
        fontSize: 16,
    },
});

export default ReportDetailScreen;