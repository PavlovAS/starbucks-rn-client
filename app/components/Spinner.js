import React from 'react';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

class Spinner extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <FastImage
                    source={require('../assets/spinner.gif')}
                    style={styles.spinner}
                    alt="Loading..."
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        flex: 1,
        alignItems: 'center'
    },
    spinner: {
        width: 200,
        height: 200,
    }
});

export default Spinner;