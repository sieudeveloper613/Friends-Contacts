import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';


// create tabs
const Tab = createBottomTabNavigator();

import ContactsScreen from '../screens/Contacts'
import ProfileScreen from '../screens/Profile'
import FavoritesScreen from '../screens/Favorites';
import UserScreen from '../screens/User'
import OptionsScreen from '../screens/Options'
import colors from '../utils/colors';
import { Badge } from '@rneui/themed'

// const getTabBarIcon = icon => ({ tintColor }) => (
//     <Icon name={icon} size={26} style={{ color: tintColor }} />
//     );


export default class AppNavigator extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator screenOptions={{ headerShown: false, 
                                                tabBarLabelPosition: 'beside-icon',
                                                tabBarShowLabel: true,
                                                tabBarActiveTintColor: colors.blue,
                                                tabBarInactiveTintColor: colors.greyDark
                                                }}  
                               initialRouteName='Contacts'>
                    <Tab.Screen
                        name='Contacts'
                        component={ContactsStackScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Icon name='list' color={color} size={size}/>
                            )
                        }}
                    />

                    <Tab.Screen
                        name='Favorites'
                        component={FavoritesStackScreen}
                        options={{
                            // tabBarIcon: getTabBarIcon('favorite')
                            tabBarIcon: ({ color, size }) => (
                                <Icon name='favorite' color={color} size={size}/>
                            )
                        }}
                    />

                    <Tab.Screen
                        name='User'
                        component={UserStackScreen}
                        options={{
                            // tabBarIcon: getTabBarIcon('person')
                            tabBarIcon: ({ color, size }) => (
                                <Icon name='person' color={color} size={size}/>
                            )
                        }}
                    />
                </Tab.Navigator> 
            </NavigationContainer>
          );
    }
  
}

// create contacts stack navigation
const ContactsStack = createNativeStackNavigator();

function ContactsStackScreen() {
    return (
        <ContactsStack.Navigator>
            <ContactsStack.Screen name='Contacts' component={ContactsScreen}/>
            <ContactsStack.Screen name='Profile' component={ProfileScreen}/>
        </ContactsStack.Navigator>
    );
}

// create favorites stack navigation
const FavoritesStack = createNativeStackNavigator();

function FavoritesStackScreen() {
    return (
        <FavoritesStack.Navigator>
            <ContactsStack.Screen name='Favorites' component={FavoritesScreen}/>
            <ContactsStack.Screen name='Profile' component={ProfileScreen}/>
        </FavoritesStack.Navigator>
    );
}

// create favorites stack navigation
const UserStack = createNativeStackNavigator();

function UserStackScreen() {
    return (
        <UserStack.Navigator initialRouteName='User' 
                             screenOptions={{
                                presentation: 'modal',
                                
                            }}>
            <UserStack.Screen name='User' component={UserScreen}/>
            <UserStack.Screen name='Options' component={OptionsScreen}
                options={{
                    tabBarStyle: { display: 'none' },
                }}/>
        </UserStack.Navigator>
    );
}

