import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    Modal,
    Image,
    Dimensions
} from 'react-native';

import AuthModal from '../modals/AuthModal';
import SignUpModal from '../modals/SignUpModal';
import HomeImageCarousel from '../components/HomeImageCarousel';
import Rewards from '../components/Rewards';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignInAlt, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons'
import { COLOR_GREY, STARBUCKS_DARK, STARBUCKS_LIGHT } from '../constants';

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
});

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAuthModal: false,
            showSignUpModal: false
        }
        this.openAuthModal = this.openAuthModal.bind(this);
        this.closeAuthModal = this.closeAuthModal.bind(this);
        this.openSignUpModal = this.openSignUpModal.bind(this);
        this.closeSignUpModal = this.closeSignUpModal.bind(this);
    }

    componentDidMount() { }

    openAuthModal() {
        this.setState({ showAuthModal: true });
    }

    closeAuthModal() {
        this.setState({ showAuthModal: false });
    }

    openSignUpModal() {
        this.setState({ showSignUpModal: true });
    }

    closeSignUpModal() {
        this.setState({ showSignUpModal: false });
    }

    render() {
        const { navigation } = this.props;
        const { height } = Dimensions.get('window');
        const joinNowPosition = {
            top: height - 150
        };

        return (
            <React.Fragment>
                <SafeAreaView>
                    <ScrollView
                        contentInsetAdjustmentBehavior="automatic"
                        style={styles.scrollView}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.header}>
                                It's a great day for coffee
                            </Text>
                            {this.props.user ? (
                                <Text style={styles.headerName}>
                                    Welcome {this.props.user}!
                                </Text>
                            )
                                : null
                            }
                            <View style={styles.coffeeImageContainer}>
                                <Image
                                    source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/photomap-9caa6.appspot.com/o/starbucks%2Fcoffee.jpg?alt=media&token=a9d95067-08bf-46c9-8806-89c21e9633b4' }}
                                    style={styles.coffeeImage}
                                />
                            </View>
                        </View>
                        <View style={styles.buttonsContainer}>
                            <View style={styles.buttonsInnerContainer}>
                                <TouchableHighlight
                                    style={styles.signInButton}
                                    underlayColor="#DDDDDD"
                                    onPress={() => {
                                        if (this.props.isAuthenticated) {
                                            this.props.logout();
                                        } else {
                                            this.openAuthModal()
                                        }
                                    }}
                                >
                                    <View style={styles.signInButtonContainer}>
                                        <FontAwesomeIcon icon={faSignInAlt} color={COLOR_GREY} style={styles.fontAwesomeIcon} size={20} />
                                        <Text style={styles.signInText}>{!this.props.isAuthenticated ? 'Sign In' : 'Log Out'}</Text>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    style={styles.signInButton}
                                    underlayColor="#DDDDDD"
                                >
                                    <View style={styles.signInButtonContainer}>
                                        <FontAwesomeIcon icon={faEnvelope} color={COLOR_GREY} style={styles.fontAwesomeIcon} size={20} />
                                        <Text style={styles.signInText}>Inbox</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                            <View
                                style={styles.signInButton}
                                underlayColor="#DDDDDD"
                            >
                                <View style={styles.signInButtonContainer}>
                                    <FontAwesomeIcon icon={faUser} color={COLOR_GREY} style={styles.fontAwesomeIcon} size={20} />
                                </View>
                            </View>
                        </View>
                        <HomeImageCarousel />
                        <Rewards />
                    </ScrollView>
                    {!this.props.isAuthenticated ?
                        <TouchableHighlight
                            style={[styles.joinNowButton, joinNowPosition]}
                            underlayColor={STARBUCKS_LIGHT}
                            onPress={() => this.openSignUpModal()}
                        >
                            <View style={styles.signInButtonContainer}>
                                <Text style={styles.joinText}>Join now</Text>
                            </View>
                        </TouchableHighlight>
                        : null
                    }
                </SafeAreaView>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.showAuthModal}
                >
                    <AuthModal close={this.closeAuthModal} navigation={this.props.navigation} />
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.showSignUpModal}
                >
                    <SignUpModal close={this.closeSignUpModal} navigation={this.props.navigation} />
                </Modal>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: "#eee"
    },
    headerContainer: {
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    header: {
        fontSize: 30
    },
    headerName: {
        fontSize: 30,
        color: STARBUCKS_DARK
    },
    coffeeImageContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    signInButtonContainer: {
        flex: 1,
        flexDirection: "row"
    },
    signInButton: {
        backgroundColor: "white",
        borderRadius: 10,
        borderWidth: 0,
        padding: 10,
        margin: 1
    },
    signInText: {
        color: COLOR_GREY,
        fontWeight: "bold",
        textAlign: "center"
    },
    // joinNowButton: {
    //     backgroundColor: STARBUCKS_DARK,
    //     color: 'white',
    //     borderRadius: 20,
    //     borderWidth: 0,
    //     padding: 12,
    //     elevation: 2,
    //     marginLeft: 20,
    //     marginRight: 20,
    //     marginTop: 10,
    //     marginBottom: 30
    // },
    joinNowButton: {
        backgroundColor: STARBUCKS_DARK,
        color: 'white',
        borderRadius: 20,
        borderWidth: 0,
        padding: 12,
        elevation: 2,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 30,
        position: 'absolute',
        right: 0
    },
    joinText: {
        color: 'white',
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 20,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    buttonsContainer: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    buttonsInnerContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    fontAwesomeIcon: {
        marginRight: 10
    },
    coffeeImage: {
        width: 40,
        height: 45,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
