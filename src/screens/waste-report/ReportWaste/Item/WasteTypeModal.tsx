import { Modal, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CheckCircleIcon } from 'react-native-heroicons/solid';

import { WASTE_TYPES } from '../constants';

type WasteType = {
    color: string;
    icon: string;
    id: string;
    name: string;
};

type WasteTypeModalProps = {
    readonly onClose: () => void;
    readonly onSelect: (id: string) => void;
    readonly selectedType: string;
    readonly visible: boolean;
}

function WasteTypeModal({ onClose, onSelect, selectedType, visible }: WasteTypeModalProps) {
    return <Modal animationType="slide" transparent visible={visible}>
        <View style={styles.modalOverlay}>
            <TouchableOpacity activeOpacity={1} onPress={onClose} style={styles.backdrop} />
            <View style={styles.modalContent}>
                <StatusBar backgroundColor="rgba(0,0,0,0.5)" barStyle="light-content" />
                <Text style={styles.modalTitle}>Chọn loại rác thải</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {WASTE_TYPES.map((type: WasteType) => (
                        <TouchableOpacity
                            key={type.id}
                            onPress={() => { onSelect(type.id); }}
                            style={[
                                styles.optionItem,
                                selectedType === type.id && styles.optionItemSelected
                            ]}
                        >
                            <Text style={styles.optionIcon}>{type.icon}</Text>
                            <Text style={styles.optionText}>{type.name}</Text>
                            {selectedType === type.id && (
                                <CheckCircleIcon color="#8B5CF6" size={20} />
                            )}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
                    <Text style={styles.modalCloseText}>Đóng</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
}

const styles = StyleSheet.create({
    backdrop: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
    },
    modalCloseButton: {
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        marginTop: 16,
        paddingVertical: 12,
    },
    modalCloseText: {
        color: '#6B7280',
        fontSize: 16,
        fontWeight: '500',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '70%',
        padding: 24,
        zIndex: 2,
    },
    modalOverlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalTitle: {
        color: '#111827',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 20,
        textAlign: 'center',
    },
    optionIcon: {
        fontSize: 24,
        marginRight: 16,
    },
    optionItem: {
        alignItems: 'center',
        borderRadius: 12,
        flexDirection: 'row',
        marginBottom: 8,
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    optionItemSelected: {
        backgroundColor: '#F3F4F6',
    },
    optionText: {
        color: '#111827',
        flex: 1,
        fontSize: 16,
    },
});

export default WasteTypeModal;