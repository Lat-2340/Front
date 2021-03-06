import React from "react";
import { View, StyleSheet } from "react-native";
//import { NavigationActions } from "react-navigation";
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
//import dopoffLocations from '../App.js'
const url =  "http://35.153.212.32:8000/users/login";

export default class Lost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: undefined,
      size: undefined,
      category: undefined,
      dropoffLoc: undefined
    };
    this.arr = ["grainger", "siebel"]
    this.data = {"features":{}}
  }

  onValueChange(key: string, value: string) {

    if(key == "color")
      this.setState({color: value});
    else if(key == "size")
      this.setState({size: value});
    else if(key == "category")
      this.setState({category: value});
    else if(key == "dropoffLocation")
      this.setState({dropoffLoc: value});
 
    this.data["features"][key] = value;
    console.log(this.data)
  }

  onChangeText(key:string, value: string) {
    this.data[key]= value
    //console.log(this.data)
  }

  onChangeDate(value: string) {
    this.data["date_time"]= value
    //console.log(this.data)
  }

  handlePress = async () => {
    console.log(this.data);
    try {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.data),
    })
    const result = await response.json();
    console.log('Success:', JSON.stringify(result));
  } catch (error) {
    console.error('Error:', error);
  }
}

    // static navigationOptions = {
    //   header: (
    //   <Header>
    //     <Left>
    //       {/* <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
    //         <Icon name="menu" />
    //       </Button> */}
    //     </Left>
    //     <Body>
    //       <Title>Found</Title>
    //     </Body>
    //     <Right />
    //   </Header>
    //   )
    // }

  render() {
    let locationItems = this.arr.map( (s, i) => {
      return <Picker.Item key={i} value={s} label={s} />
    });

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent transparent onPress={() => this.props.navigation.navigate("HomePage")}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Found</Title>
          </Body>
          <Right />
        </Header>

        <View style={styles.content}>  
          <Item style={{top:20}}>
            <Icon active name='home' />
            <Text style = {{paddingBottom:2}}> Where did you find this lost item? </Text>
          </Item>
          <Item regular style={{top:30, borderColor: 'gray', width: 250, height:50}}>
            <Input placeholder='Grainger Library' onChangeText={text => this.onChangeText("location", text)}/>         
          </Item>
  
         <Item style={{top:50}}>
            <Icon active name='time' />
            <Text style = {{paddingBottom:2}}> In which day did you find this lost item? </Text>
          </Item>
          
          <MyDatepicker style={styles.container} handler = {date => this.onChangeDate(date)}  />
      
          <Item style={{top:80}}>
            <Icon active name='ios-checkbox' />
            <Text style = {{paddingBottom:2}}> Pick one avaliable drop-off location </Text>
          </Item>
          <Form style={{top:90}}>
            <Picker 
              mode="dropdown"
              iosHeader="Drop-off place"
              iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "white", fontSize: 25}}/>}
              style={{ width: 220, paddingLeft:4, borderBottomWidth: 1, borderLeftWidth:1, borderRightWidth:1, borderTopWidth:1, borderColor:"lightslategrey", backgroundColor:"lightslategrey"}}
              placeholder="Drop-off place"
              placeholderStyle={{color: 'white', paddingLeft:4}}
              selectedValue={this.state.dropoffLoc}
              onValueChange={(label)=> this.onValueChange("dropoffLocation", label)}
            >
              {locationItems}
            </Picker>
          </Form>



          <Item style={{top:120}}>
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
              onValueChange={(label, value)=> this.onValueChange("color", label)}
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
              onValueChange={(label, value)=> this.onValueChange("size", label)}
            >
              <Picker.Item label="< 10 cm" value="< 10 cm" />
              <Picker.Item label="< 20 cm" value="< 20 cm" />
              <Picker.Item label="< 30 cm" value="< 30 cm" />
              <Picker.Item label="< 40 cm" value="< 40 cm" />


            </Picker>
          </Form>

          <Form style={{top:190}}>
            <Picker 
              mode="dropdown"
              iosHeader="Select Category"
              iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "white", fontSize: 25}}/>}
              style={{ width: 200, paddingLeft:4, borderBottomWidth: 1, borderLeftWidth:1, borderRightWidth:1, borderTopWidth:1, borderColor:"palevioletred", backgroundColor:"palevioletred"}}
              placeholder="Select Category"
              placeholderStyle={{color: 'white', paddingLeft:4}}
              selectedValue={this.state.category}
              onValueChange={(label, value)=> this.onValueChange("category", label)}
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

          <Item regular style={{top: 200, height: 200}}>
            <Input style={{marginTop:1}} placeholder='Additional Description:' onChangeText={text => this.onChangeText("description", text)}/>
          </Item>

          <Button success style={{top: 210, width: 100, marginLeft: 270}} onPress={this.handlePress}>
            <Text> Submit</Text>
          </Button>
          
        
          <Icon active name='camera' style={{marginTop: 170, marginLeft: 20, width: 60}} />
       

        </View>
      </Container>
    );
  }
}
  const styles = StyleSheet.create({
    container: {
      width: "90%",
      top: 30,
      marginTop: 30 
    },
    content: {
      width: "90%",
      margin: 20
    },
  });