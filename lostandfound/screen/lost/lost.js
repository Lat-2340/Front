import React, { Component } from 'react';
import { View, StyleSheet } from "react-native";
import {createStackNavigator} from "react-navigation-stack";
import { TextInput } from 'react-native';
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

import MyDatepicker from './datepicker.js'
import Login from "../login/login.js"
const url =  "http://127.0.0.1:8000/lostandfound/add-item";

export default class Lost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: undefined,
      size: undefined,
      category: undefined,
      image: undefined,
      isCameraVisiable: false
    };

    this.data = {
      "is_lost": true,
      "description":{},
      "features":{}

    }
  }

  showCameraView = () => {
    this.setState({ isCameraVisible: true });
  }

  closeCameraView = () => {
    this.setState({ isCameraVisible: false });
    console.log(this.state.image)
    this.props.navigation.navigate("CameraPage", {
          image: null,
          callback: (data)=>{
              console.log(data);
              console.log("???");
                this.setState({
                  image:data,
                });
                this.data["image"]= data;
                console.log(this.data);
                 }
      }
       );
    console.log("back success");
    console.log(this.state.image);
    // this.data["image"]= this.state.image;
    console.log("back success?");
    console.log(this.data);
  }

  onValueChange(key: string, value: string) {

    if(key == "feature_color")
      this.setState({color: value});
    else if(key == "feature_size")
      this.setState({size: value});
    else if(key == "feature_category")
      this.setState({category: value});

    this.data["features"][key] = value
  }

  onChangeDescription(key:string, value: string) {
    this.data["description"][key]= value
    //console.log(this.data)
  }

  onChangeDate(value: string) {
    this.data["date_time"]= value
    //console.log(this.data)
  }

  onChangeLocation(value: string) {
    this.data["location"]= value
    //console.log(this.data)
  }

//   handlePress = async () => {
//     this.data["location_lat"] = 99.0
//     this.data["location_long"] = 65.1

//     console.log(this.data);
//     try {
//     const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           "Authorization": "Token " + Login.getToken()
//         },
//         body: JSON.stringify(this.data),
//     })
//     const result = await response.json();
//     console.log('Success:', JSON.stringify(result));
//     this.props.navigation.navigate("HomePage");
//   } catch (error) {
//     console.error('Error:', error.text());
//   }
// }

  handlePress = async () => {
    var formData = new FormData();
    formData.append("is_lost",this.data["is_lost"]);
    if(this.data.hasOwnProperty("date_time")){
      formData.append("date_time",this.data["date_time"]);
    }
    // if(this.data.hasOwnProperty("location")){
    //   formData.append("location",this.data["location"]);
    // }
    console.log(JSON.stringify(this.data["description"]))
    formData.append("description",JSON.stringify(this.data["description"]));
    
    formData.append("features",this.data["features"]);
    if(this.data.hasOwnProperty("image")){
      formData.append("image",this.data["image"]);
    }
    console.log(formData);

    // console.log(this.data);
    try {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization": "Token " + Login.getToken()
        },
        body: formData,
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
    let cam_bnt;
    if (isCameraVisible){
      cam_bnt = <Button title="Camera" onPress={this.showCameraView}>
                  <Icon name='camera' />
                </Button>;          
    }else{
      cam_bnt = <Button title="Camera" onPress={this.closeCameraView}>
                  <Icon name='camera' />
                </Button>; ;  
    }

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
          <Item style={{top:10}}>
            <Icon active name='bulb' />
            <Text style = {{paddingBottom:2}}> Name this item first: </Text>
          </Item>
          <Item regular style={{top:25, borderColor: 'gray', width: 250, height:50}}>
            <Input placeholder='Nickname' onChangeText={text => this.onChangeDescription("name",text)}/>
          </Item>

          <Item style={{top:40}}>
            <Icon active name='home' />
            <Text style = {{paddingBottom:2}}> Where did you lose your favoriate item? </Text>
          </Item>
          <Item regular style={{top:55, borderColor: 'gray', width: 250, height:50}}>
            <Input placeholder='Grainger Library' onChangeText={text => this.onChangeLocation(text)}/>
          </Item>

         <Item style={{top:70}}>
            <Icon active name='time' />
            <Text style = {{paddingBottom:2}}> In which day did you lose your favoriate item? </Text>
          </Item>
          <MyDatepicker handler = {date => this.onChangeDate(date)} style={styles.container} />

          <Item style={{top:110}}>
            <Icon active name='ios-add-circle-outline' />
            <Text style = {{paddingBottom:2}}> Describe your favoriate item </Text>
          </Item>

          <Form style={{top:130, flex: 0.9, flexDirection:"row", justifyContent:'space-between'}}>
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

          <Item regular style={{top: 220, height: 160}}>
            <Input style={{marginTop:1}} placeholder='Additional Description:' onChangeText={text => this.onChangeDescription("addtional", text)}/>
          </Item>

          <View style={{top:240, flex: 0.9, flexDirection:"column", justifyContent:'space-between'}}>
            <View style={{width: 100, marginLeft: 275}}>
            <Button success  onPress={this.handlePress}>
              <Text> Submit</Text>
            </Button>
            </View>

            <View style={{width: 50, marginLeft: 5}}>
              {/* {!isCameraVisible &&<Button title="Show me Camera" onPress={this.showCameraView} />}
              {isCameraVisible &&
              this.props.navigation.navigate("CameraPage")} */}
              {cam_bnt}

            </View>
          </View>

        </View>
      </Container>
    );
  }
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
  });