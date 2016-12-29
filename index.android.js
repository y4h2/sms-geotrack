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
import SmsParser from './components/SmsParser'

var Contacts = require('react-native-contacts')


export default class smsGeotrack extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ownLat: "",
      ownLng: ""
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position)=>{
        this.setState({ownLat: position.coords.latitude});
        this.setState({ownLng: position.coords.longitude})
      }, (error)=> alert(JSON.stringify(error)), 
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
  }


  render() {
    return (

      <View>
        <View>
          <ContactsList lat={this.state.ownLat} lng={this.state.ownLng}/>
        </View>
        <View>
          <SmsParser />
        </View>
        <Text>{this.state.ownLat}</Text>
        <Text>{this.state.ownLng}</Text>
      </View>

    
    );
  }
}

const styles = StyleSheet.create({
});

AppRegistry.registerComponent('smsGeotrack', () => smsGeotrack);
