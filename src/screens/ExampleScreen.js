import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function ExampleScreen() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>

      <Button
        title="Send a local notification"
        onPress={async () => {
          await sendLocalNotification();
        }}
      />

<Button
        title="Schedule a local notification"
        onPress={async () => {
          await sendLocalNotification2();
        }}
      />      

      <Button
        title="Schedule a local notification (alternative)"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
      <Button
        title="Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      />

    <Button
        title="schedule and cancel"
        onPress={async () => {
          await scheduleAndCancel();
        }}
      />

    <Button
        title="Cancel all scheduled notifications"
        onPress={async () => {
          await cancelAllScheduledNotificationsAsync();
        }}
      />


    </View>
  );
 
  async function cancelAllScheduledNotificationsAsync() {
    const identifier = await Notifications.cancelAllScheduledNotificationsAsync();
    console.log("Done: canceled All Scheduled Notification");
  }

  async function scheduleAndCancel() {
    const identifier = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Hey!',
      },
      trigger: { seconds: 5, repeats: true },
    });
    await Notifications.cancelScheduledNotificationAsync(identifier);
  }

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { data: 'goes here' },
  };
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body from Example 2',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 1 },
  });
}

async function sendLocalNotification() {
  let localNotification = {    
    title: 'New Message',
    body: 'Message!!!!',
    android: {
      channelId: 'chat-messages',
    }
  };
  await Notifications.scheduleNotificationAsync({
    content: localNotification,
    trigger: null // null means local notification
  });
}

async function sendLocalNotification2() {
  let localNotification = {    
    title: "You've got mail! 📬",
    body: 'Here is the notification body',
    data: { data: 'goes here' },
  };
  const schedulingOptions = {
    time: new Date().getTime() + Number(3000)
  };  
  await Notifications.scheduleNotificationAsync({
    content: localNotification,
    trigger: null // null means local notification
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
          allowAnnouncements: true,
        },
      });
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("ExpoPushToken: " + token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      sound: true,
      priority: 'max',      
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

}