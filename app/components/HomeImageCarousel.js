import React, { useRef, useState, useEffect } from 'react';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { COLOR_GREY } from '../constants';


const URL_BASE = 'https://firebasestorage.googleapis.com/v0/b/photomap-9caa6.appspot.com/o/starbucks%2F';

const ENTRIES1 = [
    {
        title: 'Welcome! You are on your way to earning Stars however you choose to pay',
        illustration: `${URL_BASE}1.jpg?alt=media&token=b4241adc-eccd-413c-b000-d45bbded69a6`,
    },
    {
        title: 'Scan in store to earn Stars, then redeem for foodm drinks and more',
        illustration: `${URL_BASE}2.jpg?alt=media&token=6543d901-f35f-4e4e-9398-d7f478f1daa0`,
    },
    {
        title: 'Pay directly (even cash) or preload a Starbucks Card to get Rewards faster',
        illustration: `${URL_BASE}3.jpg?alt=media&token=9a0b240d-fbd8-4da9-8cf6-3fd37f6a10c2`,
    },
    {
        title: 'Keep an eye out for games, offers, a treat on your birthday, and more!',
        illustration: `${URL_BASE}4.jpg?alt=media&token=00648e2c-1560-4300-bf7a-605790b08dd4`,
    }
];
const { width: screenWidth } = Dimensions.get('window');

const HomeImageCarousel = props => {
    const [entries, setEntries] = useState([]);
    const carouselRef = useRef(null);

    const goForward = () => {
        carouselRef.current.snapToNext();
    };

    useEffect(() => {
        setEntries(ENTRIES1);
    }, []);

    const renderItem = ({ item, index }, parallaxProps) => {
        return (
            <View style={styles.item}>
                <ParallaxImage
                    source={{ uri: item.illustration }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.1}
                    {...parallaxProps}
                />
                <View style={styles.descContainer}>
                    <Text style={styles.descText} numberOfLines={2}>
                        {item.title}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerTextContainer}>
                <Text style={styles.headerText}>STARBUCKS&#174; REWARDS</Text>
            </View>
            <Carousel
                ref={carouselRef}
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 60}
                data={entries}
                renderItem={renderItem}
                hasParallaxImages={true}
            />
        </View>
    );
};

export default HomeImageCarousel;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginBottom: 25
    },
    headerTextContainer: {
        margin: 5,
        marginTop: 1
    },
    headerText: {
        color: COLOR_GREY,
        alignSelf: 'center',
        fontSize: 18
    },
    item: {
        width: screenWidth - 60,
        height: screenWidth - 120,
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }),
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFill,
        resizeMode: 'cover',
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