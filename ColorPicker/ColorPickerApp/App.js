import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Platform,
  Slider,
  TextInput,
  View
} from 'react-native';

class ColorControl extends Component {

  constructor(props) {
    super(props);
    this.state = props;
  }

  render() {
    return (
      <View style = {{ flex: 1,
       flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
      }}>
        <Text>{ this.props.title }</Text>
        <Slider onValueChange={ (val) => {
          this.props.onValueChanged(val);
          // this.setState({ value: val})
        }} value = { this.props.value } step={1} minimumValue={0} maximumValue={255} style = {{ width: 200, marginLeft: 5, marginRight: 5 }}></Slider>
        <TextInput value = { `${this.props.value}` } style = {styles.textInput}></TextInput>
      </View>
    )
  }
}

export default class ColorPickerApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      red: 100,
      green: 150,
      blue: 200
    }
  }

  onSliderValueChanged = (color) => {
    console.log(color);
    this.setState(color);
  }

  renderHeader = () => {
    return (
      <View style = {styles.header} >
        <Text style = {styles.textHeader}> Color Picker </Text>
      </View>
    )
  }

  render() {
    return (
      <View style = {styles.container} >
        { this.renderHeader() }

        <View style = {{ flex: 1, alignItems: 'center'
         , justifyContent: 'center'}}>
          <View style = {{ width: 300, height: 350}}>
            <ColorControl title="R" value={this.state.red} onValueChanged={(val) => {
                /*
                xem clip ban đầu trả về giá trị nhưng đến spread operator
                 thì trả về object
                */
                 const currentColor = this.state;
                 const newColor = { currentColor, red: val };
                 this.onSliderValueChanged(newColor);
               }}/>
            <ColorControl title="G" value={this.state.green} onValueChanged={(val) => {
                 const currentColor = this.state;
                 const newColor = { ...currentColor, green: val };
                 this.onSliderValueChanged(newColor);
               }}/>
            <ColorControl title="B" value={this.state.blue} onValueChanged={(val) => {
                 const currentColor = this.state;
                 const newColor = { ...currentColor, blue: val };
                 this.onSliderValueChanged(newColor);
               }}/>
            <View style = {{ flex: 2, backgroundColor: `rgb( ${this.state.red},
             ${this.state.green}, ${this.state.blue})` }}></View>
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },

  header: {
    height: 65,
    backgroundColor: '#F06292',
    alignItems: 'center',
    justifyContent: 'center'
  },

  textHeader: {
    fontSize: 17,
    marginTop: Platform.select( {
      ios: 15,
      android: 0
     } )
  },

  textInput: {
    width: 40,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: 'center',
    textAlign: 'center'
  }

});
