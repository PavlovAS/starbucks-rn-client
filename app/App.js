import React from 'react';
import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faGlobeEurope, faMapMarkerAlt, faQrcode, faGift, faCoffee } from '@fortawesome/free-solid-svg-icons'

import HomeScreen from './screens/HomeScreen';
import ScanScreen from './screens/ScanScreen';
import OrderScreen from './screens/OrderScreen';
import GiftScreen from './screens/GiftScreen';
import StoresScreen from './screens/StoresScreen';
import Alert from './components/Alert';
import { COLOR_GREY, STARBUCKS_DARK, STARBUCKS_LIGHT, COLOR_GRAY_GREEN } from './constants';

// Redux
import { Provider } from 'react-redux';
import store from './store';

const Tab = createBottomTabNavigator();

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Tab.Navigator
                    tabBarOptions={{
                        activeTintColor: STARBUCKS_DARK,
                        inactiveTintColor: COLOR_GREY,
                        style: {
                            backgroundColor: COLOR_GRAY_GREEN,
                            padding: 2
                        },
                        labelStyle: {
                            fontSize: 13,
                            margin: 0,
                            padding: 0,
                        },
                    }}
                >
                    <Tab.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{
                            tabBarLabel: 'Home',
                            tabBarIcon: ({ color, size }) => (
                                <FontAwesomeIcon icon={faHome} color={color} size={28} />
                            )
                        }}
                    />
                    <Tab.Screen
                        name="Scan"
                        component={ScanScreen}
                        options={{
                            tabBarLabel: 'Scan',
                            tabBarIcon: ({ color, size }) => (
                                <FontAwesomeIcon icon={faQrcode} color={color} size={28} />
                            )
                        }}
                    />
                    <Tab.Screen
                        name="Order"
                        component={OrderScreen}
                        options={{
                            tabBarLabel: 'Order',
                            tabBarIcon: ({ color, size }) => (
                                <FontAwesomeIcon icon={faCoffee} color={color} size={28} />
                            )
                        }}
                    />
                    <Tab.Screen
                        name="Gift"
                        component={GiftScreen}
                        options={{
                            tabBarLabel: 'Gift',
                            tabBarIcon: ({ color, size }) => (
                                <FontAwesomeIcon icon={faGift} color={color} size={28} />
                            )
                        }}
                    />
                    <Tab.Screen
                        name="Stores"
                        component={StoresScreen}
                        options={{
                            tabBarLabel: 'Stores',
                            tabBarIcon: ({ color, size }) => (
                                <FontAwesomeIcon icon={faMapMarkerAlt} color={color} size={28} />
                            )
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red'
    }
});

export default App;
