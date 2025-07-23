// components/StatsAndActions.tsx

import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    EyeIcon,
    HandThumbDownIcon,
    HandThumbUpIcon,
} from 'react-native-heroicons/outline';
import {
    HandThumbDownIcon as HandThumbDownIconSolid,
    HandThumbUpIcon as HandThumbUpIconSolid,
} from 'react-native-heroicons/solid';

import { VoteType } from '../report';

type StatsAndActionsProps = {
    readonly downvotes: number;
    readonly onVote: (voteType: 'down' | 'up') => void;
    readonly upvotes: number;
    readonly userVote: VoteType;
    readonly viewCount: number;
}

const StatsAndActions: React.FC<StatsAndActionsProps> = ({
    downvotes,
    onVote,
    upvotes,
    userVote,
    viewCount,
}) => {
    return (
        <View style={styles.contentCard}>
            <View style={styles.statsContainer}>
                <View style={styles.statsItem}>
                    <EyeIcon color="#6B7280" size={20} />
                    <Text style={styles.statsText}>{viewCount} lượt xem</Text>
                </View>
            </View>

            <View style={styles.actionsContainer}>
                <TouchableOpacity
                    onPress={() => { onVote('up'); }}
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
                        {upvotes}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { onVote('down'); }}
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
                        {downvotes}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    actionsContainer: {
        flexDirection: 'row',
        gap: 12,
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
});

export default StatsAndActions;