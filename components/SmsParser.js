import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import SmsListener from 'react-native-android-sms-listener'
 
var subscription;

function isJSON(str) {
	try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

class SmsParser extends Component {
	constructor(props) {
		super(props);

		this.state = {
			lat: "92.12312",
			lng: "93.12332",
			message: { body: '92.12312, 93.12332', originatingAddress: "123456789"},
			command: "",
			received: [],
		}
	}

	//{"lat": "12.2213", "lng": "32.2321", "command": "response"}
	componentDidMount() {
		subscription = SmsListener.addListener(message => {
			console.log(message);
			this.setState({message: message})
			var messageBody = message.body;
			if (isJSON(messageBody)) {
				var json = JSON.parse(messageBody);
				this.setState({lat: json.lat, lng: json.lng, command: json.command});
			}
		});
	}



	render() {
		return (
			<View>
				<Text style={styles.infoHeader}>
					Information
				</Text>
				<Text>
					{this.state.message.body}
				</Text>
				<Text>
					{this.state.message.originatingAddress}
				</Text>
				<Text>
					lat: {this.state.lat}
				</Text>
				<Text>
					lng: {this.state.lng}
				</Text>
				<Text>
					command: {this.state.command}
				</Text>
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
	},
	infoHeader: {
		fontSize: 20,
		textAlign: "center",
		fontWeight: "bold",
	}
});

export default SmsParser