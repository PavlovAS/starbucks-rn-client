import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    Dimensions
} from 'react-native';

import { connect } from 'react-redux';
import { STARBUCKS_DARK } from '../constants';

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

class StoresScreen extends React.Component {
    render() {
        const { width } = Dimensions.get('window');

        const ratio = 538 / 726;

        const style = {
            width,
            height: width * ratio
        }

        return (
            <>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                    <ScrollView
                        contentInsetAdjustmentBehavior="automatic"
                        style={styles.scrollView}>
                        <View style={styles.headerContainer}>
                            {this.props.user ? (
                                <Text style={styles.headerName}>
                                    Hello {this.props.user}!
                                </Text>
                            )
                                : null
                            }
                            <Text style={styles.header}>
                                Find your store
                            </Text>
                        </View>
                        <View style={styles.mapImageContainer}>
                            <Image
                                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/photomap-9caa6.appspot.com/o/starbucks%2Fmap.jpg?alt=media&token=995e1ed2-65b2-4a00-8a9f-946f3ae92768' }}
                                style={style}
                            />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </>
        )
    }
};

const styles = StyleSheet.create({
    scrollView: {},
    headerContainer: {
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        alignItems: 'center',
        borderBottomWidth: 1
    },
    header: {
        fontSize: 30
    },
    headerName: {
        fontSize: 30,
        color: STARBUCKS_DARK
    },
    mapImageContainer: {
        margin: 0,
        padding: 0,
        display: 'flex'
    },
});

export default connect(mapStateToProps)(StoresScreen);
