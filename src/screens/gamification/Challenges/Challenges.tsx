import { StyleSheet, Text, View } from 'react-native';

function Challenges() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Challenges Screen</Text>
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

export default Challenges; 