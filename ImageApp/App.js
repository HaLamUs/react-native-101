import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

export default class ImageApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <Image resizeMode="cover" style= {{width: 300, height: 60,
          borderWidth: 1, borderRadius: 10}} source={ require('./Imgs/logo.png') } /> */}
        {/* <Image resizeMode="cover" style= {{tintColor:'red', width: 100, height: 100,
            borderWidth: 1, borderRadius: 10}} source={ require('./Imgs/add.png') } />
      </View> */}
      <Image resizeMode="cover" style= {{ width: 100, height: 100,
          borderWidth: 1, borderRadius: 10}} source={
             {uri: 'https://raw.githubusercontent.com/peppy/wallpapers/master/Mobile/wallpaper_10_640x1136.jpg'} } />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CE93D8',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
