import React, { Component } from "react";
import {
  AppRegistry,
  TouchableHighlight,
  StyleSheet,
  Text,
  View
} from "react-native";

import BackgroundJob from 'react-native-background-job';
var PushNotification = require('react-native-push-notification');

PushNotification.configure({
    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

});

const backgroundJob = {
 jobKey: "myJob",
 job: () => {
    console.log("Running in background")
    return fetch('http://192.168.2.98')
      .then((response) => response.json())
      .then((responseJson) => {
        PushNotification.localNotification({
          message: JSON.stringify(responseJson), // (required)
          playSound: false, // (optional) default: true
          actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
        });
      })
      .catch((error) => {
        console.error(error);
      });

    
  }
};

BackgroundJob.register(backgroundJob);


export default class rnapp extends Component {
  constructor(props) {
    super(props);
    this.state = { jobs: [] };
  }

  getAll() {
    BackgroundJob.getAll({
      callback: jobs => {
        this.setState({ jobs });
        console.log("Jobs:", jobs);
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Testing BackgroundJob
        </Text>
        
        <Text>
          Scheduled jobs:
          {this.state.jobs.map(({ jobKey }) => jobKey)}
        </Text>

        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            BackgroundJob.schedule({
              jobKey: "myJob",
              timeout: 3000
            });
            this.getAll();
          }}
        >
          <Text>Schedule</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            BackgroundJob.cancel({ jobKey: jobKey });
            this.getAll();
          }}
        >
          <Text>Cancel</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            BackgroundJob.cancelAll();
            this.getAll();
          }}
        >
          <Text>CancelAll</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            BackgroundJob.getAll({ callback: console.log });
          }}
        >
          <Text>GetAll</Text>
        </TouchableHighlight>
      </View>
    );
  }
  componentDidMount() {
    BackgroundJob.cancelAll();
  }
}

const styles = StyleSheet.create({
  button: { padding: 20, backgroundColor: "#ccc", marginBottom: 10 },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: { fontSize: 20, textAlign: "center", margin: 10 },
  instructions: { textAlign: "center", color: "#333333", marginBottom: 5 }
});

AppRegistry.registerComponent('rnapp', () => rnapp);
