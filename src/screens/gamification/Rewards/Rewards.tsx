import { StyleSheet, Text, View } from 'react-native';

function Rewards() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Rewards Screen</Text>
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

export default Rewards; 