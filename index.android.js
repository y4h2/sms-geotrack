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

var Contacts = require('react-native-contacts')


export default class smsGeotrack extends Component {
  constructor(props) {
    super(props);
    SmsListener.addListener(message => {
      console.info(message)
    })
  }

  addContact() {
    var newPerson = {
      emailAddresses: [{
        label: "work",
        email: "yuhuang@example.com",
      }],
      familyName: "Huang",
      givenName: "Yu",
    }

    Contacts.addContact(newPerson, (err) => { /*...*/ })

  }

  snedSms() {
    SendIntentAndroid.sendSms('+1 6478929220', 'SMS body text here');
  }

  render() {
    return (
     /*<Navigator 
        initialRoute={{ name: 'StartScreen'}}
      />*/

      <View>
        <StartScreen />
        <TouchableOpacity onPress={this.addContact}>
          <Text>Add Contacts</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          
        </TouchableOpacity>
      </View>

    
    );
  }
}

const styles = StyleSheet.create({
});

AppRegistry.registerComponent('smsGeotrack', () => smsGeotrack);
