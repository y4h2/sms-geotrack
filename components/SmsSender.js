import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ListView,
} from 'react-native';

var Contacts = require('react-native-contacts')
var SendIntentAndroid = require('react-native-send-intent');

var ds = new ListView.DataSource({
	rowHasChanged: (r1, r2) => r1 !== r2
});
class SmsSender extends Component {
	constructor (props) {
		super(props)

		this.state = {
			contacts: [],
			selectedContacts: [],
		}

		this.refreshContacts = this.refreshContacts.bind(this)
		this.renderRow = this.renderRow.bind(this)

	}

	componentDidMount() {
		var ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
		Contacts.getAll((err, contacts) => {
			if (err && err.type === 'permissionDenied') {
				console.log("permissionDenied")
			} else {
				this.setState({contacts: contacts});
				// this.setState({dataSource: ds.cloneWithRows()})
			}
		})
	}
	

	// send SMS to specific phone number
	// data format
	// {"lat": "12.2213", "lng": "32.2321", "command": "response"}
	sendSms(phoneNumber) {
		var obj = {
			"lat": this.props.lat, 
			"lng": this.props.lng, 
			"timestamp": this.props.timestamp,
			"command": "response"
		};
		var message = JSON.stringify(obj);
    	
    	SendIntentAndroid.sendSms(phoneNumber, message);
  	}

  	// send SMS to multiple phone number
  	sendMultiSms() {
  		if (this.state.selectedContacts.length == 0) {
  			console.log("Please select people to request their position");
  		}
  	}

  	refreshContacts() {
  		Contacts.getAll((err, contacts) => {
			if (err && err.type === 'permissionDenied') {
				console.log("permissionDenied");
			} else {
				// console.log(this.state.contacts);
				console.log('refresh contacts');
				this.setState({contacts: contacts});
				// this.setState({dataSource: ds.cloneWithRows()})
			}
		})
  	}



  	renderRow(records) {
  		var name = records.givenName + ' ' + records.familyName;
  		var phoneNumber = records.phoneNumbers.length > 0 ? records.phoneNumbers[0].number : "No avaible number";

  		return (
  			<View>
  				<View>
	  				<TouchableOpacity 
	  					onPress={()=>this.sendSms(phoneNumber)}>
	  					<Text>{name}: {phoneNumber}</Text>
  					</TouchableOpacity>
  				</View>
  			</View>
  		)
  	}


	render() {
		return (
			<View>
				<View>
					<ListView 
						renderHeader={()=> <Text style={styles.contactsHeader}>Contacts</Text>}
						dataSource={ds.cloneWithRows(this.state.contacts)}
						renderRow={this.renderRow}/>
				</View>

				<TouchableOpacity style={styles.button} onPress={this.refreshContacts}>
					<Text>Get Contacts</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={this.sendSms}>
					<Text>Send SMS</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	contactsHeader: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	button: {
		backgroundColor: 'grey',
	    borderRadius:20,
	    padding: 10,
	    marginBottom:20,
	    alignItems:'center',
	    justifyContent: 'center',
	}
});

export default SmsSender