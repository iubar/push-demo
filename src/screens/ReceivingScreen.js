import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default class ReceivingScreen extends React.Component {
 
  
  state = {
    notification: {
      request: {
        content: {

        }
      }
    },
  };

  componentDidMount() {

    this.registerForPushNotificationsAsync;

    Notifications.addNotificationReceivedListener(this._handleNotification);
    
    Notifications.addNotificationResponseReceivedListener(this._handleNotificationResponse);
    }

  _handleNotification = notification => {
    this.setState({ notification: notification });
    };

  _handleNotificationResponse = response => {
    console.log(response);
    };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>Title: {this.state.notification.request.content.title}</Text>
          <Text>Body: {this.state.notification.request.content.body}</Text>
          <Text>Data: {JSON.stringify(this.state.notification.request.content.data)}</Text>
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