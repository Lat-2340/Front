import React, { Component } from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Item,
  Label,
  Input,
  Body,
  Left,
  Right,
  Icon,
  Form,
  Text
} from "native-base";
import {
  StyleSheet,
  View,
  Alert,
  Image,
} from 'react-native';

import {
  IP_PORT,
  USERS,
  LOST_AND_FOUND,
  LOGIN,
  PICKUP_LOCATIONS
} from '../../const.js';

// const url = "http://127.0.0.1:8000/users/login";
const LOGIN_URL = IP_PORT + USERS + LOGIN
// const pickup_url =  "http://127.0.0.1:8000/users/pickup-locations";
const PICKUP_LOCATIONS_URL = IP_PORT + USERS + PICKUP_LOCATIONS

// export const user_token = this.token

export default class Login extends Component {
  static token = null;
  static name = null;

  constructor(props) {
      super(props);
      this.state = {
      };
      this.data = {};
      this.pickUpLocArr = [];
      //this.token = undefined;
    }

    static getToken(){
      return token;
    }

    static getName(){
      return name;
    }

    static getPickUpLoc(){
      return this.pickUpLocArr;
    }
  fetchPickUpLoc = async() => {
    //console.log(token)
    try {
      const response = await fetch(PICKUP_LOCATIONS_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Token " + token
          }
      })

      if (response.status == 200){
        let content = await response.json();
        console.log("pickup", content)

        var place;
        for (index in content){
          this.pickUpLocArr.push(content[index].office)
        }
        console.log(this.pickUpLocArr)
        // this.pickUpLocArr = content;
      }
      else{
        console.error("Something wrong!")
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  postRegister = async () => {
    name = this.data["username"];
    console.log("postRegistration")
    try {
      const response = await fetch(LOGIN_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.data),
      })

      if (response.status == 200){
        let content = await response.json();
        token = content.token;

        this.fetchPickUpLoc();
        this.props.navigation.navigate("HomePage");
      }
      else{
        Alert.alert("Invalid login credentials.")
        console.error(response)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  onChangeText(key:string, value:string){
    // console.log(this.data);
    this.data[key] = value;
    // console.log("are we here?");
    // console.log(this.data);
  }

  // onClick(){
  //   // console.log("are we here?");
  //   console.log(this.data);
  //   // console.log("are we here?");
  //   this.postRegister();
  // }

  static navigationOptions = {
      header: (
      <Header>
        <Left>
          {/* <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
            <Icon name="menu" />
          </Button> */}
        </Left>
        <Body>
          <Title>Login</Title>
        </Body>
        <Right />
      </Header>
      )
    }
  render() {
    // const { navigate } = this.props.navigation;

    return (
      <Container style={styles.container}>
        {/* <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Login</Title>
          </Body>
          <Right/>
        </Header> */}

        <View>
          <View>
          <Image
            source={
              require('../../picture/icon.jpg')
            }
            style={{
              marginTop: 30,
              height: 120,
              width: 120,
              alignSelf: "center",
              position: "absolute"
            }}
          />
          </View>
          <Form style={{alignItems: 'center',justifyContent: 'center', marginTop: 150}}>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input onChangeText={text => this.onChangeText("username", text)}/>
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input secureTextEntry onChangeText={text => this.onChangeText("password", text)}/>
            </Item>
          </Form>
        </View>
        <View style={{alignItems: 'center',justifyContent: 'center', marginTop: 50}}>
          <Button block style={styles.button}
          onPress={this.postRegister}>
            <Text>Sign In</Text>
          </Button>
          <Button block bordered primary style={styles.button}
          onPress={() => this.props.navigation.navigate("Signon")}>
            <Text>Sign On</Text>
          </Button>
          {/* <Button block transparent style={styles.button}>
            <Text style={{textDecorationLine: 'underline', color:"grey"}}>Forget your password?</Text>
          </Button> */}
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
  },
  button: {
    width:"80%",
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: 30,
    textAlign: 'center'
  }
});



