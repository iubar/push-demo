import React from 'react';
import { StyleSheet, Button, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import * as Notifications from 'expo-notifications';

export default class Tab3Screen extends React.Component {
  
  state = {
    
  };

  constructor(props){
    super(props); 
  }
 
askPermissions = async () => {
	console.log('askPermissions');
    let permission = await Notifications.getPermissionsAsync();
    if (permission.status === 'granted') {
       console.log("You didn't get permission")
      }
    return permission;
}
 
  schedulePushNotification = async () => {  
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

sendNotificationImmediately = async () => {
	console.log('sendNotificationImmediately');
 
  let notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'This is crazy',
      body: 'Your mind will blow after reading this',
    },
	ios: {
    allowAlert: true,
    allowBadge: true,
    allowSound: true,
    allowAnnouncements: true,
	},
	android: {
		sound: true,
		vibrate: true,
		color: '#512DA8'
    },
  trigger: null // null means local notification  
  });

  console.log(notificationId); // can be saved in AsyncStorage or send to server
};

scheduleNotification = async () => {
	console.log('scheduleNotification');
  let notificationId = Notifications.scheduleNotificationAsync({
    content: {
      title: "I'm a notification",
      body: 'Wow, I can show up even when app is closed',
    },
    trigger: {
      seconds: 20, // seconds
      repeats: true,
    },    
  });
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