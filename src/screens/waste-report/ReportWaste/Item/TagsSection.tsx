import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { PlusIcon, XMarkIcon } from 'react-native-heroicons/outline';

const COMMON_TAGS = [
    'khu_vuc_cong_cong', 'gan_truong_hoc', 'gan_benh_vien', 'khu_dan_cu',
    'thuong_mai', 'cong_nghiep', 'gieng_nuoc', 'cong_vien', 'le_duong', 'cong_trinh_xay_dung'
];

type TagsSectionProps = {
    readonly addTag: (tag: string) => void;
    readonly removeTag: (tag: string) => void;
    readonly tags: string[];
}

function TagsSection({ addTag, removeTag, tags }: TagsSectionProps) {
    const [newTag, setNewTag] = useState('');

    const addCustomTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim())) {
            addTag(newTag.trim());
            setNewTag('');
        }
    };

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thẻ phân loại (tùy chọn)</Text>

            {tags.length > 0 && (
                <View style={styles.selectedTags}>
                    {tags.map((tag) => (
                        <TouchableOpacity
                            key={tag}
                            onPress={() => { removeTag(tag); }}
                            style={styles.tagChip}
                        >
                            <Text style={styles.tagText}>{tag}</Text>
                            <XMarkIcon color="#6B7280" size={14} />
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            <Text style={styles.subLabel}>Thẻ phổ biến:</Text>
            <View style={styles.commonTags}>
                {COMMON_TAGS.map((tag) => (
                    <TouchableOpacity
                        key={tag}
                        onPress={() => { tags.includes(tag) ? removeTag(tag) : addTag(tag); }}
                        style={[
                            styles.commonTag,
                            tags.includes(tag) && styles.commonTagSelected
                        ]}
                    >
                        <Text style={[
                            styles.commonTagText,
                            tags.includes(tag) && styles.commonTagTextSelected
                        ]}>
                            {tag}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.customTagInput}>
                <TextInput
                    onChangeText={setNewTag}
                    onSubmitEditing={addCustomTag}
                    placeholder="Thêm thẻ tuỳ chỉnh"
                    style={styles.tagInput}
                    value={newTag}
                />
                <TouchableOpacity
                    onPress={addCustomTag}
                    style={styles.addTagButton}
                >
                    <PlusIcon color="#8B5CF6" size={16} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    addTagButton: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: '#8B5CF6',
        borderRadius: 12,
        borderWidth: 1,
        height: 44,
        justifyContent: 'center',
        width: 44,
    },
    commonTag: {
        backgroundColor: '#FFFFFF',
        borderColor: '#E5E7EB',
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 8,
        marginRight: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    commonTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    commonTagSelected: {
        backgroundColor: '#F3F4F6',
        borderColor: '#8B5CF6',
    },
    commonTagText: {
        color: '#6B7280',
        fontSize: 12,
    },
    commonTagTextSelected: {
        color: '#8B5CF6',
        fontWeight: '500',
    },
    customTagInput: {
        alignItems: 'center',
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
    selectedTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    subLabel: {
        color: '#6B7280',
        fontSize: 12,
        marginBottom: 8,
    },
    tagChip: {
        alignItems: 'center',
        backgroundColor: '#8B5CF6',
        borderRadius: 16,
        flexDirection: 'row',
        marginBottom: 8,
        marginRight: 8,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    tagInput: {
        backgroundColor: '#FFFFFF',
        borderColor: '#E5E7EB',
        borderRadius: 12,
        borderWidth: 1,
        flex: 1,
        fontSize: 14,
        marginRight: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    tagText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '500',
        marginRight: 6,
    },
});

export default TagsSection;