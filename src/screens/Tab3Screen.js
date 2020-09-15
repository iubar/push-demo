import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
 


export default class Tab3Screen extends React.Component {
 
  
  state = {
    
  };

 

  constructor(props){
    super(props);
 
  }
 
 
 
  render() {
    return (
      <View style={{ flex: 1 }}>
         <View style={{ backgroundColor: 'black', height: 100, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{ color: 'white'}}>Hello 3 ?!</Text>
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