import React, { Component } from 'react';
import {
  Container,
  Header,
  Title,
  Button,
  Item,
  Label,
  Input,
  Body,
  Left,
  Right,
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
  LOGIN,
  PICKUP_LOCATIONS
} from '../../const.js';

const LOGIN_URL = IP_PORT + USERS + LOGIN
const PICKUP_LOCATIONS_URL = IP_PORT + USERS + PICKUP_LOCATIONS

export default class Login extends Component {
  static token = ""
  static name = ""
  static pickupLocations = []

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  static getToken(){
    return token;
  }
  static getName(){
    return name;
  }
  static getPickUpLocations() {
    return pickupLocations;
  }

  fetchPickUpLocations = async () => {
    try {
      const response = await fetch(PICKUP_LOCATIONS_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Token " + token
        }
      })

      if (response.status == 200) {
        pickupLocations = await response.json()
        console.log("pickup locations\n", pickupLocations)
      } else {
        console.error(response)
      }
    } catch (error) {
      console.error(error);
    }
  }

  postRegister = async () => {
    try {
      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state),
      })

      if (response.status == 200) {
        let content = await response.json();
        token = content.token;

        this.fetchPickUpLocations();
        this.props.navigation.navigate("HomePage");
      }
      else {
        Alert.alert("Invalid login credentials.")
        // console.error(response)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  onChange(name, value) {
    this.setState({ [name]: value })
  }

  static navigationOptions = {
    header: (
      <Header>
        <Left>
        </Left>
        <Body>
          <Title>Login</Title>
        </Body>
        <Right />
      </Header>
    )
  }
  render() {
    return (
      <Container style={styles.container}>
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
          <Form style={{ alignItems: 'center', justifyContent: 'center', marginTop: 150 }}>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input onChangeText={text => this.onChange("username", text)} />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input secureTextEntry onChangeText={text => this.onChange("password", text)} />
            </Item>
          </Form>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
          <Button block style={styles.button}
            onPress={this.postRegister}>
            <Text>Sign In</Text>
          </Button>
          <Button block bordered primary style={styles.button}
            onPress={() => this.props.navigation.navigate("SignonPage")}>
            <Text>Sign On</Text>
          </Button>
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
    width: "80%",
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: 30,
    textAlign: 'center'
  }
});



