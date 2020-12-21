import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import { SliderBox } from "react-native-image-slider-box";
import { COLOR_GREY } from '../constants';

export default class HomeImageSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                require('../assets/home/1.jpg'),
                require('../assets/home/2.jpg'),
                require('../assets/home/3.jpg'),
                require('../assets/home/4.jpg'),
            ],
            desc: [
                "Welcome! You are on your way to earning Stars however you choose to pay",
                "Scan in store to earn Stars, then redeem for foodm drinks and more",
                "Pay directly (even cash) or preload a Starbucks Card to get Rewards faster"
            ],
            currentIndex: 0
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>STARBUCKS&#174; REWARDS</Text>
                </View>
                <SliderBox
                    images={this.state.images}
                    currentImageEmitter={i => this.setState({ currentIndex: i })}
                    autoplay
                    ImageComponentStyle={{
                        borderRadius: 25, width: '85%', marginTop: 1
                    }}
                    autoplayInterval={5000}
                //sliderBoxHeight={200}
                />
                <View style={styles.descContainer}>
                    <Text style={styles.descText}>{this.state.desc[this.state.currentIndex]}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerTextContainer: {
        margin: 10
    },
    headerText: {
        color: COLOR_GREY,
        alignSelf: 'center',
        fontSize: 18
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