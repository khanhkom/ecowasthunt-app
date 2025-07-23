import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

type BasicInfoSectionProps = {
    readonly formData: {
        description: string;
        title: string;
    };
    readonly updateField: (field: 'description' | 'title', value: string) => void;
}

function BasicInfoSection({ formData, updateField }: BasicInfoSectionProps) {
    return <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin cơ bản</Text>

        <View style={styles.inputGroup}>
            <Text style={styles.label}>
                Tiêu đề <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
                maxLength={100}
                onChangeText={(text) => { updateField('title', text); }}
                placeholder="VD: Bãi rác tự phát tại vỉa hè"
                style={styles.textInput}
                value={formData.title}
            />
            <Text style={styles.charCount}>{formData.title.length}/100</Text>
        </View>

        <View style={styles.inputGroup}>
            <Text style={styles.label}>
                Mô tả chi tiết <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
                maxLength={500}
                multiline
                numberOfLines={4}
                onChangeText={(text) => { updateField('description', text); }}
                placeholder="Mô tả tình trạng rác thải, kích thước, tác động..."
                style={[styles.textInput, styles.textArea]}
                value={formData.description}
            />
            <Text style={styles.charCount}>{formData.description.length}/500</Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    charCount: {
        color: '#6B7280',
        fontSize: 12,
        marginTop: 4,
        textAlign: 'right',
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        color: '#374151',
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
    },
    required: {
        color: '#EF4444',
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
    textArea: {
        height: 100,
        textAlignVertical: 'top',
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

export default BasicInfoSection;