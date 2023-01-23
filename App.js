import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import { NavigationContainer, DarkTheme as DarkThemeNav, DefaultTheme as DefaultThemeNav } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Notifications from 'expo-notifications';
import Tab1Screen from './src/screens/Tab1Screen';
import ReceivingScreen from './src/screens/ReceivingScreen';
import Tab3Screen from './src/screens/Tab3Screen';
import ExampleScreen from './src/screens/ExampleScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default class App extends React.Component {
	/**
	 * @see https://github.com/facebook/react-native/issues/22211#issuecomment-667034125
	 */
	render() {
		return (
			<SafeAreaView style={{ flex: 1, paddingTop: 30 }}>
				<NavigationContainer>
					<Tab.Navigator>
						<Tab.Screen
							name="Tab1"
							component={Tab1Screen}
							options={{
								tabBarLabel: 'Expo',
								tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={size} />,
							}}
						/>

						<Tab.Screen
							name="Tab2"
							component={ReceivingScreen}
							options={{
								tabBarLabel: 'Receiving',
								tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="bell" color={color} size={size} />,
								tabBarBadge: () => {
									return <Text>31</Text>;
								},
							}}
						/>

						<Tab.Screen
							name="Tab3"
							component={Tab3Screen}
							options={{
								tabBarLabel: 'Local',
								tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={size} />,
							}}
						/>

						<Tab.Screen
							name="Tab4"
							component={ExampleScreen}
							options={{
								tabBarLabel: 'Example',
								tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account" color={color} size={size} />,
							}}
						/>
					</Tab.Navigator>
				</NavigationContainer>
			</SafeAreaView>
		);
	}
}
