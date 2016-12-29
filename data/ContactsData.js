import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ListView,
} from 'react-native';

var Contacts = require('react-native-contacts');

class ContactsList extends Component {

	loadContacts() {
		// read json file
		var newPerson = {
		  emailAddresses: [{
		    label: "work",
		    email: "mrniet@example.com",
		  }],
		  familyName: "Nietzsche",
		  givenName: "Friedrich",
		}
		Contacts.addContact(newPerson, (err)=>{});
	}

	// dump data to the file 
	dumpContacts() {
		// load all contacts
		Contacts.getAll((err, contacts) => {
		  if(err && err.type === 'permissionDenied'){
		    // x.x
		  } else {
		    console.log(contacts)
		  }
		})
	}

	render() {
		return (
			<View>
				<View>
					<TouchableOpacity>
						<Text>
							Dump Contacts Data
						</Text>
					</TouchableOpacity>
				</View>
				<View>
					<TouchableOpacity>
						<Text>
							Load Contacts Data
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}