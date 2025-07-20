import { StyleSheet, Text, View } from 'react-native';

function WastePoints() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Waste Points Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        color: '#333',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default WastePoints; 