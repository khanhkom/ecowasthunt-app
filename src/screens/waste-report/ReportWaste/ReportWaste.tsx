import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
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
    ArrowPathIcon,
    BoltIcon,
    CameraIcon,
    CheckIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    PhotoIcon,
    PlusIcon,
    SparklesIcon,
    XMarkIcon,
} from 'react-native-heroicons/outline';
import {
    CheckCircleIcon,
    BoltSlashIcon as FlashSolidIcon,
} from 'react-native-heroicons/solid';

const { height, width } = Dimensions.get('window');

// Types
type CameraScreenProps = {
    readonly navigation: {
        goBack: () => void;
    };
}

type CapturedImage = {
    fromGallery?: boolean;
    id: number;
    timestamp: string;
    uri: string;
}

type ClassificationResult = {
    binType: string;
    category: string;
    color: string;
    confidence: number;
    description: string;
    icon: string;
    id: number;
    recyclable: boolean;
    tips: string;
}

type FlashMode = {
    icon: any;
    id: 'auto' | 'off' | 'on';
    label: string;
}

// Constants
const FLASH_MODES: FlashMode[] = [
    { icon: BoltIcon, id: 'off', label: 'Tắt' },
    { icon: FlashSolidIcon, id: 'on', label: 'Bật' },
    { icon: BoltIcon, id: 'auto', label: 'Tự động' },
];

const MOCK_CLASSIFICATION_RESULTS: ClassificationResult[] = [
    {
        binType: 'Thùng xanh - Tái chế',
        category: 'Nhựa PET',
        color: '#3B82F6',
        confidence: 94,
        description: 'Chai nhựa có thể tái chế',
        icon: '🥤',
        id: 1,
        recyclable: true,
        tips: 'Rửa sạch trước khi bỏ vào thùng tái chế',
    },
    {
        binType: 'Thùng xanh - Tái chế',
        category: 'Giấy carton',
        color: '#10B981',
        confidence: 89,
        description: 'Hộp giấy carton sạch',
        icon: '📦',
        id: 2,
        recyclable: true,
        tips: 'Gỡ băng keo và làm phẳng trước khi vứt',
    },
    {
        binType: 'Thùng nâu - Hữu cơ',
        category: 'Rác thực phẩm',
        color: '#84CC16',
        confidence: 76,
        description: 'Thức ăn thừa, vỏ trái cây',
        icon: '🍎',
        id: 3,
        recyclable: false,
        tips: 'Có thể làm phân compost tại nhà',
    },
];

const CAMERA_TIPS = [
    { icon: '💡', text: 'Chụp từ nhiều góc độ khác nhau' },
    { icon: '🔍', text: 'Đảm bảo vật thể nằm giữa khung hình' },
    { icon: '☀️', text: 'Chụp ở nơi có ánh sáng tự nhiên' },
    { icon: '🧽', text: 'Làm sạch vật thể trước khi chụp' },
    { icon: '📏', text: 'Chụp cận cảnh để thấy rõ chi tiết' },
];

function CameraScreen({ navigation }: CameraScreenProps) {
    const [capturedImages, setCapturedImages] = useState<CapturedImage[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [classificationResults, setClassificationResults] = useState<ClassificationResult[]>([]);
    const [flashMode, setFlashMode] = useState<'auto' | 'off' | 'on'>('off');
    const [cameraFacing, setCameraFacing] = useState<'back' | 'front'>('back');
    const [showPreview, setShowPreview] = useState(false);
    const [selectedImage, setSelectedImage] = useState<CapturedImage | null>(null);
    const [showTips, setShowTips] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (isProcessing) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(fadeAnim, {
                        duration: 1000,
                        toValue: 1,
                        useNativeDriver: true,
                    }),
                    Animated.timing(fadeAnim, {
                        duration: 1000,
                        toValue: 0.3,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        } else {
            fadeAnim.setValue(0);
        }
    }, [isProcessing, fadeAnim]);

    const generateMockImage = (fromGallery = false): CapturedImage => ({
        fromGallery,
        id: Date.now(),
        timestamp: new Date().toISOString(),
        uri: `https://images.unsplash.com/photo-${fromGallery ? '1567306301408-9b74779a11af' : '1558618666-fcd25c85cd64'}?w=300&h=400&fit=crop&t=${Date.now()}`,
    });

    const simulateImageCapture = () => {
        const newImage = generateMockImage();
        setCapturedImages(previous => [...previous, newImage]);

        // Animate capture button
        Animated.sequence([
            Animated.timing(scaleAnim, {
                duration: 100,
                toValue: 0.9,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                duration: 100,
                toValue: 1,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const removeImage = (imageId: number) => {
        setCapturedImages(previous => previous.filter(img => img.id !== imageId));
    };

    const openGallery = () => {
        const galleryImage = generateMockImage(true);
        setCapturedImages(previous => [...previous, galleryImage]);
    };

    const toggleFlashMode = () => {
        const currentIndex = FLASH_MODES.findIndex(mode => mode.id === flashMode);
        const nextIndex = (currentIndex + 1) % FLASH_MODES.length;
        setFlashMode(FLASH_MODES[nextIndex].id);
    };

    const toggleCameraFacing = () => {
        setCameraFacing(previous => previous === 'back' ? 'front' : 'back');
    };

    const processImages = async () => {
        if (capturedImages.length === 0) {
            Alert.alert('Thông báo', 'Vui lòng chụp ít nhất một ảnh trước khi phân tích');
            return;
        }

        setIsProcessing(true);

        // Simulate AI processing
        setTimeout(() => {
            setClassificationResults(MOCK_CLASSIFICATION_RESULTS.slice(0, capturedImages.length));
            setIsProcessing(false);
            setShowResults(true);
        }, 3000);
    };

    const retakePhotos = () => {
        setCapturedImages([]);
        setShowResults(false);
        setClassificationResults([]);
    };

    const openImagePreview = (image: CapturedImage) => {
        setSelectedImage(image);
        setShowPreview(true);
    };

    const renderCameraViewfinder = () => (
        <View style={styles.cameraViewfinder}>
            <Text style={styles.viewfinderText}>📷 Camera AI</Text>
            <Text style={styles.viewfinderSubtext}>Chụp ảnh rác để phân loại</Text>

            {/* Camera Frame Overlay */}
            <View style={styles.cameraFrame}>
                <View style={[styles.frameCorner, styles.topLeft]} />
                <View style={[styles.frameCorner, styles.topRight]} />
                <View style={[styles.frameCorner, styles.bottomLeft]} />
                <View style={[styles.frameCorner, styles.bottomRight]} />
            </View>
        </View>
    );

    const renderCameraControls = () => (
        <View style={styles.cameraControls}>
            <TouchableOpacity onPress={toggleFlashMode} style={styles.controlButton}>
                {flashMode === 'off' && <BoltIcon color="#fff" size={24} strokeWidth={2} />}
                {flashMode === 'on' && <FlashSolidIcon color="#F59E0B" size={24} />}
                {flashMode === 'auto' && <BoltIcon color="#8B5CF6" size={24} strokeWidth={2} />}
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleCameraFacing} style={styles.controlButton}>
                <ArrowPathIcon color="#fff" size={24} strokeWidth={2} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { setShowTips(true); }} style={styles.controlButton}>
                <InformationCircleIcon color="#fff" size={24} strokeWidth={2} />
            </TouchableOpacity>
        </View>
    );

    const renderCaptureArea = () => (
        <View style={styles.captureArea}>
            <TouchableOpacity onPress={openGallery} style={styles.galleryButton}>
                <PhotoIcon color="#fff" size={24} strokeWidth={2} />
            </TouchableOpacity>

            <Animated.View style={[styles.captureButtonContainer, { transform: [{ scale: scaleAnim }] }]}>
                <TouchableOpacity
                    disabled={isProcessing}
                    onPress={simulateImageCapture}
                    style={styles.captureButton}
                >
                    <View style={styles.captureButtonInner}>
                        <CameraIcon color="#fff" size={32} strokeWidth={2} />
                    </View>
                </TouchableOpacity>
            </Animated.View>

            <TouchableOpacity
                disabled={isProcessing || capturedImages.length === 0}
                onPress={processImages}
                style={[styles.processButton, capturedImages.length === 0 && styles.processButtonDisabled]}
            >
                {isProcessing ? (
                    <ActivityIndicator color="#fff" size="small" />
                ) : (
                    <SparklesIcon color="#fff" size={24} strokeWidth={2} />
                )}
            </TouchableOpacity>
        </View>
    );

    const renderImageThumbnails = () => {
        if (capturedImages.length === 0) return null;

        return (
            <View style={styles.thumbnailContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {capturedImages.map((image, index) => (
                        <View key={image.id} style={styles.thumbnail}>
                            <TouchableOpacity onPress={() => { openImagePreview(image); }}>
                                <Image source={{ uri: image.uri }} style={styles.thumbnailImage} />
                                {image.fromGallery ? <View style={styles.galleryBadge}>
                                    <PhotoIcon color="#fff" size={12} strokeWidth={2} />
                                </View> : null}
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => { removeImage(image.id); }}
                                style={styles.removeButton}
                            >
                                <XMarkIcon color="#fff" size={16} strokeWidth={2} />
                            </TouchableOpacity>

                            <Text style={styles.thumbnailIndex}>{index + 1}</Text>
                        </View>
                    ))}

                    {capturedImages.length < 5 && (
                        <TouchableOpacity onPress={simulateImageCapture} style={styles.addMoreButton}>
                            <PlusIcon color="#8B5CF6" size={24} strokeWidth={2} />
                            <Text style={styles.addMoreText}>Thêm ảnh</Text>
                        </TouchableOpacity>
                    )}
                </ScrollView>
            </View>
        );
    };

    const renderStatusBar = () => (
        <View style={styles.statusBar}>
            <Text style={styles.statusText}>
                {capturedImages.length}/5 ảnh • Chụp nhiều góc độ để kết quả chính xác hơn
            </Text>
        </View>
    );

    const renderProcessingOverlay = () => (
        <Modal transparent visible={isProcessing}>
            <View style={styles.processingOverlay}>
                <Animated.View style={[styles.processingCard, { opacity: fadeAnim }]}>
                    <SparklesIcon color="#8B5CF6" size={48} strokeWidth={2} />
                    <Text style={styles.processingTitle}>AI đang phân tích...</Text>
                    <Text style={styles.processingSubtitle}>
                        Đang nhận diện và phân loại {capturedImages.length} ảnh
                    </Text>
                    <ActivityIndicator color="#8B5CF6" size="large" style={styles.processingSpinner} />
                </Animated.View>
            </View>
        </Modal>
    );

    const renderResultsSummary = () => {
        const recyclableCount = classificationResults.filter(r => r.recyclable).length;
        const nonRecyclableCount = classificationResults.filter(r => !r.recyclable).length;

        return (
            <View style={styles.resultsSummary}>
                <View style={styles.summaryItem}>
                    <CheckCircleIcon color="#10B981" size={20} />
                    <Text style={styles.summaryText}>{recyclableCount} có thể tái chế</Text>
                </View>
                <View style={styles.summaryItem}>
                    <ExclamationTriangleIcon color="#F59E0B" size={20} strokeWidth={2} />
                    <Text style={styles.summaryText}>{nonRecyclableCount} không tái chế</Text>
                </View>
            </View>
        );
    };

    const renderResultCard = (result: ClassificationResult, index: number) => (
        <View key={result.id} style={styles.resultCard}>
            <View style={styles.resultHeader}>
                <View style={styles.resultImageContainer}>
                    <Image source={{ uri: capturedImages[index]?.uri }} style={styles.resultImage} />
                    <View style={[styles.confidenceBadge, { backgroundColor: result.color }]}>
                        <Text style={styles.confidenceText}>{result.confidence}%</Text>
                    </View>
                </View>

                <View style={styles.resultInfo}>
                    <View style={styles.resultTitleRow}>
                        <Text style={styles.resultIcon}>{result.icon}</Text>
                        <Text style={styles.resultCategory}>{result.category}</Text>
                        {result.recyclable ? <CheckCircleIcon color="#10B981" size={16} /> : null}
                    </View>
                    <Text style={styles.resultDescription}>{result.description}</Text>
                    <View style={[styles.binTypeChip, { backgroundColor: `${result.color}20` }]}>
                        <Text style={[styles.binTypeText, { color: result.color }]}>
                            {result.binType}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.tipsContainer}>
                <Text style={styles.tipsTitle}>💡 Mẹo xử lý:</Text>
                <Text style={styles.tipsText}>{result.tips}</Text>
            </View>
        </View>
    );

    const renderClassificationResults = () => (
        <Modal animationType="slide" visible={showResults}>
            <View style={styles.resultsContainer}>
                <View style={styles.resultsHeader}>
                    <Text style={styles.resultsTitle}>Kết quả phân loại</Text>
                    <TouchableOpacity
                        onPress={() => { setShowResults(false); }}
                        style={styles.closeResultsButton}
                    >
                        <XMarkIcon color="#6B7280" size={24} strokeWidth={2} />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} style={styles.resultsContent}>
                    {renderResultsSummary()}
                    {classificationResults.map(renderResultCard)}

                    <View style={styles.resultActions}>
                        <TouchableOpacity onPress={retakePhotos} style={styles.retakeButton}>
                            <CameraIcon color="#6B7280" size={20} strokeWidth={2} />
                            <Text style={styles.retakeButtonText}>Chụp lại</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                setShowResults(false);
                                navigation.goBack();
                            }}
                            style={styles.saveButton}
                        >
                            <CheckIcon color="#fff" size={20} strokeWidth={2} />
                            <Text style={styles.saveButtonText}>Lưu kết quả</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );

    const renderPreviewModal = () => (
        <Modal transparent visible={showPreview}>
            <View style={styles.previewOverlay}>
                <TouchableOpacity
                    onPress={() => { setShowPreview(false); }}
                    style={styles.previewBackdrop}
                />
                <View style={styles.previewContainer}>
                    <Image source={{ uri: selectedImage?.uri }} style={styles.previewImage} />
                    <TouchableOpacity
                        onPress={() => { setShowPreview(false); }}
                        style={styles.previewClose}
                    >
                        <XMarkIcon color="#fff" size={24} strokeWidth={2} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

    const renderTipsModal = () => (
        <Modal transparent visible={showTips}>
            <View style={styles.tipsOverlay}>
                <View style={styles.tipsModal}>
                    <View style={styles.tipsModalHeader}>
                        <Text style={styles.tipsModalTitle}>📸 Mẹo chụp ảnh tốt</Text>
                        <TouchableOpacity onPress={() => { setShowTips(false); }}>
                            <XMarkIcon color="#6B7280" size={24} strokeWidth={2} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.tipsModalContent}>
                        {CAMERA_TIPS.map((tip, index) => (
                            <View key={index} style={styles.tipItem}>
                                <Text style={styles.tipIcon}>{tip.icon}</Text>
                                <Text style={styles.tipText}>{tip.text}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );

    return (
        <View style={styles.container}>
            <View style={styles.cameraContainer}>
                {renderCameraViewfinder()}
                {renderCameraControls()}
            </View>

            {renderImageThumbnails()}
            {renderCaptureArea()}
            {renderStatusBar()}

            {/* Modals */}
            {renderProcessingOverlay()}
            {renderClassificationResults()}
            {renderPreviewModal()}
            {renderTipsModal()}
        </View>
    );
}

const styles = StyleSheet.create({
    addMoreButton: {
        alignItems: 'center',
        borderColor: '#8B5CF6',
        borderRadius: 8,
        borderStyle: 'dashed',
        borderWidth: 2,
        height: 80,
        justifyContent: 'center',
        width: 60,
    },
    addMoreText: {
        color: '#8B5CF6',
        fontSize: 10,
        fontWeight: '600',
        marginTop: 4,
    },
    binTypeChip: {
        alignSelf: 'flex-start',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    binTypeText: {
        fontSize: 12,
        fontWeight: '600',
    },
    bottomLeft: {
        borderRightWidth: 0,
        borderTopWidth: 0,
        bottom: 0,
        left: 0,
    },
    bottomRight: {
        borderLeftWidth: 0,
        borderTopWidth: 0,
        bottom: 0,
        right: 0,
    },
    cameraContainer: {
        flex: 1,
        position: 'relative',
    },
    cameraControls: {
        flexDirection: 'column',
        gap: 16,
        position: 'absolute',
        right: 20,
        top: Platform.OS === 'ios' ? 60 : 40,
    },
    cameraFrame: {
        bottom: '20%',
        left: '10%',
        position: 'absolute',
        right: '10%',
        top: '20%',
    },
    cameraViewfinder: {
        alignItems: 'center',
        backgroundColor: '#1F2937',
        flex: 1,
        justifyContent: 'center',
        position: 'relative',
    },
    captureArea: {
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 40,
        paddingVertical: 30,
    },
    captureButton: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 40,
        elevation: 8,
        height: 80,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        width: 80,
    },
    captureButtonContainer: {
        alignItems: 'center',
    },
    captureButtonInner: {
        alignItems: 'center',
        backgroundColor: '#8B5CF6',
        borderRadius: 32,
        height: 64,
        justifyContent: 'center',
        width: 64,
    },
    closeResultsButton: {
        padding: 8,
    },
    confidenceBadge: {
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        position: 'absolute',
        right: -8,
        top: -8,
    },
    confidenceText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    container: {
        backgroundColor: '#000',
        flex: 1,
    },
    controlButton: {
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 24,
        height: 48,
        justifyContent: 'center',
        width: 48,
    },
    frameCorner: {
        borderColor: '#8B5CF6',
        borderWidth: 3,
        height: 30,
        position: 'absolute',
        width: 30,
    },
    galleryBadge: {
        alignItems: 'center',
        backgroundColor: '#8B5CF6',
        borderRadius: 8,
        height: 16,
        justifyContent: 'center',
        left: 4,
        position: 'absolute',
        top: 4,
        width: 16,
    },
    galleryButton: {
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 28,
        height: 56,
        justifyContent: 'center',
        width: 56,
    },
    previewBackdrop: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    previewClose: {
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 20,
        height: 40,
        justifyContent: 'center',
        position: 'absolute',
        right: 16,
        top: 16,
        width: 40,
    },
    previewContainer: {
        margin: 20,
        position: 'relative',
    },
    previewImage: {
        borderRadius: 16,
        height: (width - 40) * 1.33,
        width: width - 40,
    },
    previewOverlay: {
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        flex: 1,
        justifyContent: 'center',
    },
    processButton: {
        alignItems: 'center',
        backgroundColor: '#8B5CF6',
        borderRadius: 28,
        height: 56,
        justifyContent: 'center',
        width: 56,
    },
    processButtonDisabled: {
        backgroundColor: 'rgba(139, 92, 246, 0.3)',
    },
    processingCard: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        marginHorizontal: 40,
        padding: 32,
    },
    processingOverlay: {
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        flex: 1,
        justifyContent: 'center',
    },
    processingSpinner: {
        marginTop: 16,
    },
    processingSubtitle: {
        color: '#6B7280',
        fontSize: 14,
        marginBottom: 24,
        textAlign: 'center',
    },
    processingTitle: {
        color: '#1F2937',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        marginTop: 16,
    },
    removeButton: {
        alignItems: 'center',
        backgroundColor: '#EF4444',
        borderRadius: 12,
        height: 24,
        justifyContent: 'center',
        position: 'absolute',
        right: -8,
        top: -8,
        width: 24,
    },
    resultActions: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 40,
        marginTop: 24,
    },
    resultCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        elevation: 3,
        marginBottom: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    resultCategory: {
        color: '#1F2937',
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
    },
    resultDescription: {
        color: '#6B7280',
        fontSize: 14,
        marginBottom: 8,
    },
    resultHeader: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    resultIcon: {
        fontSize: 20,
        marginRight: 8,
    },
    resultImage: {
        borderRadius: 12,
        height: 80,
        width: 80,
    },
    resultImageContainer: {
        marginRight: 16,
        position: 'relative',
    },
    resultInfo: {
        flex: 1,
    },
    resultsContainer: {
        backgroundColor: '#F9FAFB',
        flex: 1,
    },
    resultsContent: {
        flex: 1,
        paddingHorizontal: 20,
    },
    resultsHeader: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 20,
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
    },
    resultsSummary: {
        backgroundColor: '#fff',
        borderRadius: 16,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    resultsTitle: {
        color: '#1F2937',
        fontSize: 24,
        fontWeight: 'bold',
    },
    resultTitleRow: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 8,
    },
    retakeButton: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: '#6B7280',
        borderRadius: 12,
        borderWidth: 1,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    retakeButtonText: {
        color: '#6B7280',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 6,
    },
    saveButton: {
        alignItems: 'center',
        backgroundColor: '#8B5CF6',
        borderRadius: 12,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 6,
    },
    statusBar: {
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    statusText: {
        color: '#9CA3AF',
        fontSize: 12,
        textAlign: 'center',
    },
    summaryItem: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    summaryText: {
        color: '#1F2937',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 8,
    },
    thumbnail: {
        marginRight: 12,
        position: 'relative',
    },
    thumbnailContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    thumbnailImage: {
        borderRadius: 8,
        height: 80,
        width: 60,
    },
    thumbnailIndex: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 4,
        bottom: 4,
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
        left: 4,
        paddingHorizontal: 4,
        paddingVertical: 2,
        position: 'absolute',
    },
    tipIcon: {
        fontSize: 20,
        marginRight: 12,
        marginTop: 2,
    },
    tipItem: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginBottom: 16,
    },
    tipsContainer: {
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        padding: 12,
    },
    tipsModal: {
        backgroundColor: '#fff',
        borderRadius: 20,
        marginHorizontal: 20,
        maxHeight: height * 0.7,
    },
    tipsModalContent: {
        padding: 20,
    },
    tipsModalHeader: {
        alignItems: 'center',
        borderBottomColor: '#F3F4F6',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    tipsModalTitle: {
        color: '#1F2937',
        fontSize: 18,
        fontWeight: 'bold',
    },
    tipsOverlay: {
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        justifyContent: 'center',
    },
    tipsText: {
        color: '#6B7280',
        fontSize: 13,
        lineHeight: 18,
    },
    tipsTitle: {
        color: '#1F2937',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
    },
    tipText: {
        color: '#6B7280',
        flex: 1,
        fontSize: 14,
        lineHeight: 20,
    },
    topLeft: {
        borderBottomWidth: 0,
        borderRightWidth: 0,
        left: 0,
        top: 0,
    },
    topRight: {
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        right: 0,
        top: 0,
    },
    viewfinderSubtext: {
        color: '#9CA3AF',
        fontSize: 16,
        textAlign: 'center',
    },
    viewfinderText: {
        color: '#fff',
        fontSize: 24,
        marginBottom: 8,
    },
});

export default CameraScreen;