import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import {createStackNavigator} from "react-navigation-stack";
import {
  Button,
  Text,
  Container,
  Body,
  Header,
  Left,
  Right,
  Icon,
  Title,
  Input,
  Item,
  Form,
  Picker
} from "native-base";
import { RNCamera } from 'react-native-camera';

import MyDatepicker from './datepicker.js'
import Login from "../login/login.js"
const url =  "http://35.153.212.32:8000/lostandfound/lost-items";



export default class Lost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: undefined,
      size: undefined,
      category: undefined,
      isCameraVisiable: false
    };

    this.data = {}
  }

  showCameraView = () => {
    this.setState({ isCameraVisible: true });
  }

  onValueChange(key: string, value: string) {

    if(key == "feature_color")
      this.setState({color: value});
    else if(key == "feature_size")
      this.setState({size: value});
    else if(key == "feature_category")
      this.setState({category: value});

    this.data[key] = value
  }

  onChangeText(key:string, value: string) {
    this.data[key]= value
    //console.log(this.data)
  }

  onChangeDate(value: string) {
    this.data["date"]= value
    //console.log(this.data)
  }

  handlePress = async () => {
    this.data["location_lat"] = 99.0
    this.data["location_long"] = 65.1

    console.log(this.data);
    try {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Token " + Login.getToken()
        },
        body: JSON.stringify(this.data),
    })
    const result = await response.json();
    console.log('Success:', JSON.stringify(result));
    this.props.navigation.navigate("HomePage");
    } catch (error) {
      console.error('Error:', error);
    }
  }

  

// static navigationOptions = {
//       header: (
//       <Header>
//         <Left>
//           {/* <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
//             <Icon name="menu" />
//           </Button> */}
//         </Left>
//         <Body>
//           <Title>Lost</Title>
//         </Body>
//         <Right />
//       </Header>
//       )
//     }

  render() {
    //const { navigate } = this.props.navigation;
    const { isCameraVisible } = this.state;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent transparent onPress={() => this.props.navigation.navigate("HomePage")}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Lost</Title>
          </Body>
          <Right />
        </Header>

        <View style={styles.content}>

          <Item style={{top:20}}>
            <Icon active name='home' />
            <Text style = {{paddingBottom:2}}> Where did you lose your favoriate item? </Text>
          </Item>
          <Item regular style={{top:30, borderColor: 'gray', width: 250, height:50}}>
            <Input placeholder='Grainger Library'/>         
          </Item>
  
         <Item style={{top:70}}>
            <Icon active name='time' />
            <Text style = {{paddingBottom:2}}> In which day did you lose your favoriate item? </Text>
          </Item>
          <MyDatepicker handler = {date => this.onChangeDate(date)} style={styles.container} />

          <Item style={{top:130}}>
            <Icon active name='ios-add-circle-outline' />
            <Text style = {{paddingBottom:2}}> Describe your favoriate item </Text>
          </Item>

          <Form style={{top:140, flex: 0.9, flexDirection:"row", justifyContent:'space-between'}}>
            <Picker 
              mode="dropdown"
              iosHeader="Select Color"
              iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "white", fontSize: 25}}/>}
              style={{ width: 170, paddingLeft:4, borderBottomWidth: 1, borderLeftWidth:1, borderRightWidth:1, borderTopWidth:1, borderColor:"goldenrod", backgroundColor:"goldenrod"}}
              placeholder="Select Color"
              placeholderStyle={{ color: 'white', paddingLeft:4}}
              selectedValue={this.state.color}
              onValueChange={(label, value)=> this.onValueChange("feature_color", label)}
            >
              <Picker.Item label="Black" value="Black" />
              <Picker.Item label="White" value="White" />
              <Picker.Item label="Green" value="Green" />
              <Picker.Item label="Yellow" value="Yellow" />
              <Picker.Item label="Orange" value="Orange" />
              <Picker.Item label="Silver" value="Silver" />
              <Picker.Item label="Transparent" value="Transparent" />
              <Picker.Item label="Purple" value="Purple" />

            </Picker>

            <Picker 
              mode="dropdown"
              iosHeader="Select Size"
              iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "white", fontSize: 25}}/>}
              style={{ width: 170, paddingLeft:4, borderBottomWidth: 1, borderLeftWidth:1, borderRightWidth:1, borderTopWidth:1, borderColor:"#007aff", backgroundColor:"#007aff"}}
              placeholder="Select Size"
              placeholderStyle={{ color: 'white', paddingLeft:4}}
              selectedValue={this.state.size}
              onValueChange={(label, value)=> this.onValueChange("feature_size", label)}
            >
              <Picker.Item label="< 10 cm" value="< 10 cm" />
              <Picker.Item label="< 20 cm" value="< 20 cm" />
              <Picker.Item label="< 30 cm" value="< 30 cm" />
              <Picker.Item label="< 40 cm" value="< 40 cm" />


            </Picker>
          </Form>

          <Form style={{top:200}}>
            <Picker 
              mode="dropdown"
              iosHeader="Select Category"
              iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "white", fontSize: 25}}/>}
              style={{ width: 200, paddingLeft:4, borderBottomWidth: 1, borderLeftWidth:1, borderRightWidth:1, borderTopWidth:1, borderColor:"palevioletred", backgroundColor:"palevioletred"}}
              placeholder="Select Category"
              placeholderStyle={{color: 'white', paddingLeft:4}}
              selectedValue={this.state.category}
              onValueChange={(label, value)=> this.onValueChange("feature_category", label)}
            >
              <Picker.Item label="Electronic Items" value="Electronic Items" />
              <Picker.Item label="Daily Items" value="Daily Items" />
              <Picker.Item label="Study Items" value="Study Items" />
              <Picker.Item label="Keys" value="Keys" />
              <Picker.Item label="Cards" value="Cards" />
              <Picker.Item label="Wallets" value="Wallets" />
              <Picker.Item label="Books" value="key6" />

            </Picker>
          </Form>

          <Item regular style={{top: 220, height: 200}}>
            <Input style={{marginTop:1}} placeholder='Additional Description:' onChangeText={text => this.onChangeText("description", text)}/>
          </Item>

          <Button success style={{top: 240, width: 100, marginLeft: 275}} onPress={this.handlePress}>
            <Text> Submit</Text>
          </Button>
          
          
          {!isCameraVisible &&<Button success title="Show me Camera" onPress={this.showCameraView} />}
          {isCameraVisible &&
          <View style={styles.content}>
            <RNCamera
              ref={ref => {
                console.log("1111111");
                this.camera = ref;
                console.log("111122222111");
              }}
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.on}
              captureAudio={false}
              permissionDialogTitle={'Permission to use camera'}
              permissionDialogMessage={'We need your permission to use your camera phone'}
            />
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', backgroundColor:"black" }}>
              <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                <Text style={{ fontSize: 14 }}> SNAP </Text>
              </TouchableOpacity>
            </View>
          </View>}

        </View>
      </Container>
    );
  }

  // takePicture() {
  //   const options = {};
  //   //options.location = ...
  //   this.camera.capture({metadata: options})
  //     .then((data) => {
  //        console.log(data),
  //        this.setState({ isCameraVisible: false }),}.catch(err => console.error(err));
  // }

  takePicture = async() => {
    if (this.camera) {
      console.log("test");
      const options = { quality: 0.5, base64: true };
      console.log("test1");
      // const data = await this.camera.takePictureAsync();
      try {
      const cameraData = await this.camera.takePictureAsync()
      console.log(cameraData.uri);
    } catch (e) {
     // This logs the error
     console.log(
       'err'
     )
      console.log(e)
    }
    }
  };
}
  const styles = StyleSheet.create({
    container: {
      width: "90%",
      top: 70
    },
    content: {
      width: "90%",
      margin: 20
    },
    content1: {
      width: "90%",
      margin: 20,
      color: "black"
    },
    capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  });