import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import CameraExample from './camera'
import Mainfile from './app/mainfile'

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header} >
        <Text style={styles.h1}>Controlling Camera </Text>
        <Text style={styles.h1}> Todo App </Text>
      </View>
      <View style={styles.mainComponent}>
        <Mainfile />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Todo App for Add, Edit or Delet Images</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    // color: 'white',
    // backgroundColor: 'grey'
  },
  header: {
    flex: 0.15,
    paddingTop: 35,
    borderWidth: 1,
    width: '100%',
    backgroundColor: 'grey',
    // color: 'white',

  },
  footer: {
    flex: 0.03,
    borderWidth: 1,
    width: '100%',
    backgroundColor: 'grey',
    color: 'white',

  },
  mainComponent: {
    flex: 1,
    borderWidth: 1,
    width: '100%',
  },
  h1: {
    fontSize: 30,
    textAlign: 'center',
    color: 'black',
    letterSpacing: 3,
    fontStyle: 'italic',
    fontWeight: '500',
    textShadowColor: 'white',
    textShadowRadius: 25,
  },
  footerText: {
    textAlign: 'center',
    color: 'black',
    letterSpacing: 2,
    fontStyle: 'italic',
    fontWeight: '500',
    textShadowColor: 'white',
    textShadowRadius: 15,
  },
});
