import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

export default class Tab1Screen extends React.Component {
  
  state = {
    permissionMsg: ''
  };

  constructor(props){
    super(props);
  }
 
  async componentDidMount() {
    let msg = '';
    if (!Constants.isDevice){
      msg = 'It\'s not a device so there is no notification support'
    }else{
      let result = await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
          allowAnnouncements: true,
        },
      });
      if (result.status === 'granted') {
        msg  = 'Notification permissions granted.';
      }else{
        msg = 'Notification permissions not granted. Status is ' + result.status;
      }
    }
    console.log(msg);
    this.setState({ permissionMsg : msg })
  }
 
  render() {
    return (
      <View style={{ flex: 1 }}>
         <View style={{ backgroundColor: 'black', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{ color: 'white'}}>Hello !</Text>
          <Text style={{ color: 'white'}}>{this.state.permissionMsg}</Text>
        </View>        
      </View>
    );
 
}
 
} // end class


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });