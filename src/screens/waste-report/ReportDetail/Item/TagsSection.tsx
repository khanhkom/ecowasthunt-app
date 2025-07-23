// components/TagsSection.tsx

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { TagIcon } from 'react-native-heroicons/outline';

type TagsSectionProps = {
    readonly tags: string[];
}

const TagsSection: React.FC<TagsSectionProps> = ({ tags }) => {
    if (!tags || tags.length === 0) {
        return null;
    }

    return (
        <View style={styles.contentCard}>
            <Text style={styles.sectionTitle}>Thẻ phân loại</Text>
            <View style={styles.tagsContainer}>
                {tags.map((tag, index) => (
                    <View key={index} style={styles.tag}>
                        <TagIcon color="#6B7280" size={12} />
                        <Text style={styles.tagText}>{tag}</Text>
                    </View>
                ))}
            </View>
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
    sectionTitle: {
        color: '#111827',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
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
});

export default TagsSection;