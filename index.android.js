/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
} from 'react-native';

var SendIntentAndroid = require('react-native-send-intent');


import StartScreen from './components/StartScreen'
import SmsListener from 'react-native-android-sms-listener'
import ContactsList from './components/ContactsList'

var Contacts = require('react-native-contacts')


export default class smsGeotrack extends Component {
  constructor(props) {
    super(props);
    SmsListener.addListener(message => {
      console.info(message)
    })
    state = {
      initialPosition: 'unknown',
    };
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }


  render() {
    return (
     /*<Navigator 
        initialRoute={{ name: 'StartScreen'}}
      />*/

      <View>

        <ContactsList />
  
      </View>

    
    );
  }
}

const styles = StyleSheet.create({
});

AppRegistry.registerComponent('smsGeotrack', () => smsGeotrack);
