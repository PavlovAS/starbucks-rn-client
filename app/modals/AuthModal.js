import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    SafeAreaView,
    ScrollView
} from "react-native";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import PropTypes from 'prop-types';
import Spinner from '../components/Spinner';

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
});

import { COLOR_GREY, BACKGROUND_MAIN, STARBUCKS_DARK } from '../constants';

const mapDispatchToProps = (dispatch) => ({
    login: (data) => dispatch(login(data)),
});

class AuthModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            isValid: true
        };
    }

    componentDidMount() { }

    closeModal() {
        this.props.close();
    }

    async submit() {
        const { login, password } = this.state;
        if (!login || !password) {
            this.setState({ isValid: false });
        } else {
            await this.props.login({ login, password });
            this.setState({ isValid: true });
            if (this.props.isAuthenticated) {
                this.closeModal();
                this.props.navigation.navigate("Stores");
            } else {
                this.setState({ isValid: false });
            }
        }
    }

    loginInputChange(text) {
        this.setState({ login: text, isValid: true });
    }

    passwordInputChange(text) {
        this.setState({ password: text, isValid: true });
    }

    render() {
        const { modalVisible, isValid } = this.state;

        if (this.props.loading) {
            return (
                <Spinner />
            )
        } else {
            return (
                <SafeAreaView>
                    <ScrollView
                        contentInsetAdjustmentBehavior="automatic"
                        style={styles.scrollView}>
                        <View style={styles.modalContainer}>
                            <View style={styles.headerContainer}>
                                <FontAwesomeIcon style={styles.closeIcon} icon={faTimes} size={25} onPress={() => this.closeModal()} />
                                <Text style={styles.header}>
                                    Sign in to Rewards
                            </Text>
                            </View>
                            <View style={styles.formContainer}>
                                <View style={styles.rowContainer}>
                                    <TextInput
                                        autoCorrect={false}
                                        onChangeText={(text) => this.loginInputChange(text)}
                                        value={this.state.login}
                                        style={isValid ? styles.textInputValid : styles.textInputInValid}
                                        placeholder="Username"
                                        placeholderTextColor="#000"
                                    />
                                </View>
                                <View style={styles.rowContainer}>
                                    <TextInput
                                        autoCorrect={false}
                                        onChangeText={(text) => this.passwordInputChange(text)}
                                        value={this.state.password}
                                        style={isValid ? styles.textInputValid : styles.textInputInValid}
                                        secureTextEntry={true}
                                        placeholder="Password"
                                        placeholderTextColor="#000"
                                    />
                                </View>
                                <View
                                    style={styles.validationContainer}
                                    display={this.state.isValid ? 'none' : 'flex'}
                                >
                                    <Text style={styles.validationText}>The email and password you entered don't match</Text>
                                </View>
                                <TouchableHighlight
                                    style={styles.loginButton}
                                    onPress={() => this.submit()}
                                >
                                    <Text style={styles.loginText}>Sign In</Text>
                                </TouchableHighlight>
                            </View>
                        </View >
                    </ScrollView>
                </SafeAreaView>
            )
        }
    }
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: "white"
    },
    modalContainer: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column'
    },
    closeIcon: {
        position: "absolute",
        top: 0,
        left: 0,
        color: COLOR_GREY,
        backgroundColor: BACKGROUND_MAIN,
        margin: 0,
        padding: 0
    },
    headerContainer: {
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomWidth: 1,
    },
    header: {
        fontSize: 30
    },
    formContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    root: {
        flex: 1,
        flexDirection: "column",
    },
    rowContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 20
    },
    text: {
        flex: 1
    },
    inputLabel: {
        flex: 1,
        fontSize: 16
    },
    textInputValid: {
        flex: 1,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    textInputInValid: {
        flex: 1,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'red',
    },
    buttonContainer: {
        flex: 1,
        alignItems: "center"
    },
    submitButton: {
        borderRadius: 20,
        padding: 20,
        margin: 20,
        backgroundColor: 'red'
    },
    buttonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    loginButton: {
        backgroundColor: STARBUCKS_DARK,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 30
    },
    loginText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    validationContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    validationText: {
        color: 'red'
    }
});

AuthModal.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthModal);