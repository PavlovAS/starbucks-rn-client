import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";

import { COLOR_GREY } from '../constants';

export default class Rewards extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { width } = Dimensions.get('window');

        const ratio = 425 / 710;

        const style = {
            height: width * ratio,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15
        }

        return (
            <View style={styles.container} elevation={10}>
                <Image
                    source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/photomap-9caa6.appspot.com/o/starbucks%2Fpay.jpg?alt=media&token=4301c5bc-c1a5-4511-a9c1-431c169794ff' }}
                    style={style}
                />
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>Pay your way and be merry</Text>
                    <Text style={styles.text}>Start earning Rewards this holiday. Starbucks Rewards members can now use credit, debit or cash to earn Stars towards free drinks, food and more at participating stores.</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        marginBottom: 75,
        marginLeft: 25,
        marginRight: 25,
        backgroundColor: 'white',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3
    },
    headerTextContainer: {
        margin: 12,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    headerText: {
        color: 'black',
        alignSelf: 'flex-start',
        fontSize: 18,
        marginBottom: 5
    },
    text: {
        color: 'black',
        alignSelf: 'center',
        fontSize: 14
    },
    descContainer: {
        margin: 10
    },
    descText: {
        color: 'black',
        alignSelf: 'center',
        fontSize: 15
    }
});