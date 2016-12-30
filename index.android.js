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
  AsyncStorage,
} from 'react-native';

var SendIntentAndroid = require('react-native-send-intent');

import SmsListener from 'react-native-android-sms-listener'
import SmsSender from './components/SmsSender'
import SmsParser from './components/SmsParser'

var Contacts = require('react-native-contacts')


export default class smsGeotrack extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ownLat: "",
      ownLng: "",
      timestamp: "",
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position)=>{
        this.setState({ownLat: position.coords.latitude});
        this.setState({ownLng: position.coords.longitude});
        this.setState({timestamp: String(position.timestamp)});
      }, (error)=> alert(JSON.stringify(error)), 
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});

  }


  render() {
    return (

      <View>
        <View>
          <SmsSender lat={this.state.ownLat} lng={this.state.ownLng} timestamp={this.state.timestamp}/>
        </View>
        <View>
          <SmsParser />
        </View>
      </View>

    
    );
  }
}

const styles = StyleSheet.create({
});

AppRegistry.registerComponent('smsGeotrack', () => smsGeotrack);
