import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';

import { goBack } from '@/navigation';

function Header(): React.ReactElement {
    return <View style={styles.header}>
        <TouchableOpacity
            onPress={() => { goBack(); }}
            style={styles.backButton}
        >
            <ChevronLeftIcon color="#6B7280" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Báo Cáo Rác Thải</Text>
        <View style={styles.placeholder} />
    </View>
}

const styles = StyleSheet.create({
    backButton: {
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 20,
        height: 40,
        justifyContent: 'center',
        width: 40,
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
    headerTitle: {
        color: '#111827',
        fontSize: 18,
        fontWeight: '600',
    },
    placeholder: {
        width: 40,
    },
});

export default Header;