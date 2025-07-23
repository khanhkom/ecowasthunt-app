import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    FlatList,
    RefreshControl,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    ChevronLeftIcon,
    ChevronUpDownIcon,
    FunnelIcon,
    MagnifyingGlassIcon,
    XMarkIcon,
} from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';

// Item
import EmptyState from './Item/EmptyState';
import FilterModal from './Item/FilterModal';
import ReportCard from './Item/ReportCard';
import SortModal from './Item/SortModal';

// Constants
import { SORT_OPTIONS } from './reportConstants';

// API
import { getMyWasteReports } from '@/services/functions/wasteReportApi';

import { goBack, navigate, Paths } from '@/navigation';

const INITIAL_FILTERS = {
    severity: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    status: '',
    wasteType: '',
};

const INITIAL_PAGINATION = {
    hasMore: true,
    limit: 10,
    page: 1,
    total: 0,
};

function MyReportsScreen() {
    // State management
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [pagination, setPagination] = useState(INITIAL_PAGINATION);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState(INITIAL_FILTERS);

    // Modal states
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [showSortModal, setShowSortModal] = useState(false);
    const [showSearchInput, setShowSearchInput] = useState(false);

    // Animation
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const searchInputReference = useRef(null);

    // Initialize screen
    useEffect(() => {
        loadReports(true);
        Animated.timing(fadeAnim, {
            duration: 600,
            toValue: 1,
            useNativeDriver: true,
        }).start();
    }, []);

    // Load reports function
    const loadReports = useCallback(async (reset = false) => {
        try {
            if (reset) {
                setIsLoading(true);
                setPagination(previous => ({ ...previous, hasMore: true, page: 1 }));
            } else {
                setIsLoadingMore(true);
            }

            const currentPage = reset ? 1 : pagination.page;
            const parameters = {
                limit: pagination.limit,
                page: currentPage,
                search: searchQuery.trim() || undefined,
                severity: filters.severity || undefined,
                sortBy: filters.sortBy,
                sortOrder: filters.sortOrder,
                status: filters.status || undefined,
                wasteType: filters.wasteType || undefined,
            };

            // Remove undefined values
            for (const key of Object.keys(parameters)) {
                if (parameters[key] === undefined) {
                    delete parameters[key];
                }
            }

            const response = await getMyWasteReports(parameters);

            if (response.data?.data) {
                const newReports = response.data.data;

                if (reset) {
                    setReports(newReports);
                } else {
                    setReports(previous => [...previous, ...newReports]);
                }

                setPagination({
                    hasMore: newReports.length === pagination.limit &&
                        (response.page * response.limit) < response.total,
                    limit: response.limit || pagination.limit,
                    page: response.page || currentPage,
                    total: response.total || 0,
                });
            }
        } catch (error) {
            console.error('Error loading reports:', error);
            Alert.alert(
                'Lỗi',
                'Không thể tải danh sách báo cáo. Vui lòng thử lại.',
                [
                    { onPress: () => loadReports(reset), text: 'Thử lại' },
                    { style: 'cancel', text: 'Hủy' }
                ]
            );
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
            setIsLoadingMore(false);
        }
    }, [searchQuery, filters, pagination.page, pagination.limit]);

    // Event handlers
    const handleRefresh = useCallback(async () => {
        setIsRefreshing(true);
        await loadReports(true);
    }, [loadReports]);

    const handleLoadMore = useCallback(() => {
        if (!isLoadingMore && pagination.hasMore) {
            setPagination(previous => ({ ...previous, page: previous.page + 1 }));
            loadReports(false);
        }
    }, [isLoadingMore, pagination.hasMore, loadReports]);

    const updateFilter = useCallback((key, value) => {
        setFilters(previous => ({ ...previous, [key]: value }));
        // Trigger reload when filters change
        setTimeout(() => loadReports(true), 100);
    }, [loadReports]);

    const resetFilters = useCallback(() => {
        setFilters(INITIAL_FILTERS);
        setSearchQuery('');
        setTimeout(() => loadReports(true), 100);
    }, [loadReports]);

    const toggleSearch = useCallback(() => {
        setShowSearchInput(!showSearchInput);
        if (showSearchInput) {
            setSearchQuery('');
        } else {
            setTimeout(() => searchInputReference.current?.focus(), 100);
        }
    }, [showSearchInput]);

    const handleReportPress = useCallback((report) => {
        navigate(Paths.ReportDetail, { reportId: report._id });
    }, []);

    const handleCreateReport = useCallback(() => {
        navigate('WasteReport');
    }, []);

    // Helper functions
    const getActiveFiltersCount = useCallback(() => {
        return Object.values(filters).filter(value =>
            value !== '' && value !== 'createdAt' && value !== 'desc'
        ).length + (searchQuery ? 1 : 0);
    }, [filters, searchQuery]);

    // Search with debounce
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchQuery !== '' || Object.values(filters).some(value =>
                value !== '' && value !== 'createdAt' && value !== 'desc')) {
                loadReports(true);
            }
        }, 500);

        return () => { clearTimeout(timeoutId); };
    }, [searchQuery, filters]);

    // Render functions
    const renderLoadingMore = useCallback(() => {
        if (!isLoadingMore) return null;
        return (
            <View style={styles.loadingMore}>
                <Text style={styles.loadingMoreText}>Đang tải thêm...</Text>
            </View>
        );
    }, [isLoadingMore]);

    const renderEmptyState = useCallback(() => (
        <EmptyState
            activeFiltersCount={getActiveFiltersCount()}
            onCreateReport={handleCreateReport}
            searchQuery={searchQuery}
        />
    ), [searchQuery, getActiveFiltersCount, handleCreateReport]);

    const renderReportCard = useCallback(({ item }) => (
        <ReportCard
            fadeAnim={fadeAnim}
            onPress={handleReportPress}
            report={item}
        />
    ), [handleReportPress, fadeAnim]);

    const renderSeparator = useCallback(() => (
        <View style={styles.separator} />
    ), []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#F9FAFB" barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => { goBack(); }}
                    style={styles.backButton}
                >
                    <ChevronLeftIcon color="#6B7280" size={24} />
                </TouchableOpacity>

                <View style={styles.headerCenter}>
                    <Text style={styles.headerTitle}>Báo Cáo Của Tôi</Text>
                    <Text style={styles.headerSubtitle}>
                        {pagination.total} báo cáo
                    </Text>
                </View>

                <View style={styles.headerActions}>
                    <TouchableOpacity
                        onPress={toggleSearch}
                        style={styles.actionButton}
                    >
                        {showSearchInput ? (
                            <XMarkIcon color="#6B7280" size={20} />
                        ) : (
                            <MagnifyingGlassIcon color="#6B7280" size={20} />
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => { setShowFilterModal(true); }}
                        style={[
                            styles.actionButton,
                            getActiveFiltersCount() > 0 && styles.actionButtonActive
                        ]}
                    >
                        <FunnelIcon
                            color={getActiveFiltersCount() > 0 ? "#8B5CF6" : "#6B7280"}
                            size={20}
                        />
                        {getActiveFiltersCount() > 0 && (
                            <View style={styles.filterBadge}>
                                <Text style={styles.filterBadgeText}>
                                    {getActiveFiltersCount()}
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            {/* Search Input */}
            {showSearchInput ? <View style={styles.searchContainer}>
                <TextInput
                    clearButtonMode="while-editing"
                    onChangeText={setSearchQuery}
                    placeholder="Tìm kiếm báo cáo..."
                    ref={searchInputReference}
                    style={styles.searchInput}
                    value={searchQuery}
                />
            </View> : null}

            {/* Quick Filters */}
            <View style={styles.quickFilters}>
                <TouchableOpacity
                    onPress={() => { setShowSortModal(true); }}
                    style={styles.sortButton}
                >
                    <ChevronUpDownIcon color="#6B7280" size={16} />
                    <Text style={styles.sortButtonText}>
                        {SORT_OPTIONS.find(opt => opt.id === filters.sortBy)?.name}
                        ({filters.sortOrder === 'desc' ? 'Giảm dần' : 'Tăng dần'})
                    </Text>
                </TouchableOpacity>

                {getActiveFiltersCount() > 0 && (
                    <TouchableOpacity
                        onPress={resetFilters}
                        style={styles.resetButton}
                    >
                        <Text style={styles.resetButtonText}>Xóa bộ lọc</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Reports List */}
            <FlatList
                contentContainerStyle={styles.listContainer}
                data={reports}
                ItemSeparatorComponent={renderSeparator}
                keyExtractor={(item) => item._id}
                ListEmptyComponent={isLoading ? null : renderEmptyState}
                ListFooterComponent={renderLoadingMore}
                maxToRenderPerBatch={5}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.3}
                refreshControl={
                    <RefreshControl
                        colors={['#8B5CF6']}
                        onRefresh={handleRefresh}
                        refreshing={isRefreshing}
                        tintColor="#8B5CF6"
                    />
                }
                removeClippedSubviews
                renderItem={renderReportCard}
                showsVerticalScrollIndicator={false}
                windowSize={10}
            />

            {/* Modals */}
            <FilterModal
                filters={filters}
                onClose={() => { setShowFilterModal(false); }}
                onResetFilters={resetFilters}
                onUpdateFilter={updateFilter}
                visible={showFilterModal}
            />

            <SortModal
                filters={filters}
                onClose={() => { setShowSortModal(false); }}
                onUpdateFilter={updateFilter}
                visible={showSortModal}
            />

            {/* Loading Overlay */}
            {isLoading ? <View style={styles.loadingOverlay}>
                <Text style={styles.loadingText}>Đang tải...</Text>
            </View> : null}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    actionButton: {
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 20,
        height: 40,
        justifyContent: 'center',
        marginLeft: 8,
        position: 'relative',
        width: 40,
    },
    actionButtonActive: {
        backgroundColor: '#EEF2FF',
    },
    backButton: {
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 20,
        height: 40,
        justifyContent: 'center',
        width: 40,
    },
    container: {
        backgroundColor: '#F9FAFB',
        flex: 1,
    },
    filterBadge: {
        alignItems: 'center',
        backgroundColor: '#8B5CF6',
        borderRadius: 8,
        height: 16,
        justifyContent: 'center',
        minWidth: 16,
        position: 'absolute',
        right: -4,
        top: -4,
    },
    filterBadgeText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: '600',
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
        alignItems: 'center',
        flexDirection: 'row',
    },
    headerCenter: {
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 16,
    },
    headerSubtitle: {
        color: '#6B7280',
        fontSize: 12,
        marginTop: 2,
    },
    headerTitle: {
        color: '#111827',
        fontSize: 18,
        fontWeight: '600',
    },
    listContainer: {
        padding: 20,
    },
    loadingMore: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    loadingMoreText: {
        color: '#6B7280',
        fontSize: 14,
    },
    loadingOverlay: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        bottom: 0,
        justifyContent: 'center',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    loadingText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
    quickFilters: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    resetButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    resetButtonText: {
        color: '#8B5CF6',
        fontSize: 12,
        fontWeight: '500',
    },
    searchContainer: {
        backgroundColor: '#FFFFFF',
        borderBottomColor: '#E5E7EB',
        borderBottomWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    searchInput: {
        backgroundColor: '#F9FAFB',
        borderColor: '#E5E7EB',
        borderRadius: 12,
        borderWidth: 1,
        color: '#111827',
        fontSize: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    separator: {
        height: 12,
    },
    sortButton: {
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    sortButtonText: {
        color: '#6B7280',
        flex: 1,
        fontSize: 12,
        marginLeft: 6,
    },
});

export default MyReportsScreen;