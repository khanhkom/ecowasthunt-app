import Slider from '@react-native-community/slider';
import { StyleSheet, Text, View } from 'react-native';

type PrioritySectionProps = {
    readonly priority: number;
    readonly updateField: (field: 'priority', value: number) => void;
}

function PrioritySection({ priority, updateField }: PrioritySectionProps) {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>
                Độ ưu tiên: {priority}/10
            </Text>
            <View style={styles.priorityContainer}>
                <Text style={styles.priorityLabel}>Thấp</Text>
                <Slider
                    maximumTrackTintColor="#E5E7EB"
                    maximumValue={10}
                    minimumTrackTintColor="#8B5CF6"
                    minimumValue={1}
                    onValueChange={(value) => { updateField('priority', value); }}
                    step={1}
                    style={styles.prioritySlider}
                    thumbStyle={styles.priorityThumb}
                    trackStyle={styles.priorityTrack}
                    value={priority}
                />
                <Text style={styles.priorityLabel}>Cao</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    priorityContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 8,
    },
    priorityLabel: {
        color: '#6B7280',
        fontSize: 12,
    },
    prioritySlider: {
        flex: 1,
        height: 40,
        marginHorizontal: 16,
    },
    priorityThumb: {
        backgroundColor: '#8B5CF6',
        borderColor: '#FFFFFF',
        borderRadius: 9,
        borderWidth: 3,
        height: 18,
        width: 18,
    },
    priorityTrack: {
        backgroundColor: '#E5E7EB',
        borderRadius: 3,
        height: 6,
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
});

export default PrioritySection;