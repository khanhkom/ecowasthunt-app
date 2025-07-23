// components/OptionsModal.tsx

import React from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type OptionsModalProps = {
    readonly onClose: () => void;
    readonly onCopyLink?: () => void;
    readonly onReportViolation?: () => void;
    readonly visible: boolean;
}

const OptionsModal: React.FC<OptionsModalProps> = ({
    onClose,
    onCopyLink,
    onReportViolation,
    visible,
}) => {
    return (
        <Modal animationType="slide" transparent visible={visible}>
            <View style={styles.modalOverlay}>
                <View style={styles.optionsModal}>
                    <Text style={styles.optionsTitle}>Tùy chọn</Text>

                    {onReportViolation ? <TouchableOpacity onPress={onReportViolation} style={styles.optionItem}>
                        <Text style={styles.optionText}>Báo cáo vi phạm</Text>
                    </TouchableOpacity> : null}

                    {onCopyLink ? <TouchableOpacity onPress={onCopyLink} style={styles.optionItem}>
                        <Text style={styles.optionText}>Sao chép liên kết</Text>
                    </TouchableOpacity> : null}

                    <TouchableOpacity onPress={onClose} style={styles.optionItem}>
                        <Text style={[styles.optionText, styles.optionTextCancel]}>Hủy</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
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

export default OptionsModal;