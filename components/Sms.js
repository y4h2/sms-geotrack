import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import SmsListener from 'react-native-android-sms-listener'
 

class Sms extends Component {
	render() {
		return (
			<View>
				<TouchableOpacity style={styles.button}>
					<Text>Send SMS!</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: 'grey',
	    borderRadius:20,
	    padding: 10,
	    marginBottom:20,
	    alignItems:'center',
	    justifyContent: 'center',
	}
});

export default Sms