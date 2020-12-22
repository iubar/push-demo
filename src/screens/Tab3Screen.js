import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';

export default class Tab3Screen extends React.Component {
 
  
  state = {
    
  };

 
  constructor(props){
    super(props);
 
  }
 
askPermissions = async () => {
	console.log('askPermissions');
    let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS); // Permissions.NOTIFICATIONS
    if (permission.status === 'granted') {
       console.log("You didn't get permission")
      }
    return permission;
}

sendNotificationImmediately = async () => {
	console.log('sendNotificationImmediately');
	await this.getPermission();
  let notificationId = await Notifications.presentLocalNotificationAsync({
    title: 'This is crazy',
    body: 'Your mind will blow after reading this',
	ios: {
		sound: true
	},
	android: {
		sound: true,
		vibrate: true,
		color: '#512DA8'
    }	
  });
  console.log(notificationId); // can be saved in AsyncStorage or send to server
};

scheduleNotification = async () => {
	console.log('scheduleNotification');
  let notificationId = Notifications.scheduleLocalNotificationAsync(
    {
      title: "I'm Scheduled",
      body: 'Wow, I can show up even when app is closed',
    },
    {
      repeat: 'minute',
      time: new Date().getTime() + 10000,
    },
  );
  console.log(notificationId);
};
 
 
  render() {
    return (
      <View style={{ flex: 1 }}>
         <View style={{ backgroundColor: 'black', height: 100, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{ color: 'white'}}>Hello 3 ?!</Text>
      <Button
        title="Send local notification"
        onPress={this.sendNotificationImmediately}
      />	
	        <Button
        title="Schedule a notification"
        onPress={this.scheduleNotification}
      />
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