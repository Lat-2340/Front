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
  Text,
  Picker
} from "native-base";
import {
  StyleSheet,
  View
} from 'react-native';
import Login from "../user/login.js"

import {
  IP_PORT,
  USERS,
  UPDATE
} from '../../const.js';

const UPDATE_URL = IP_PORT + USERS + UPDATE


export default class Update extends Component {
  static name = null;
  static user_url = null;

  constructor(props) {
    super(props);
    this.state = {
      username: undefined,
      email: undefined,
      org: undefined,
      phone_number: undefined,
    };
  }

  onChange(name, value) {
    this.setState({ [name]: value })
  }

  navigateToLogin = () => {
    this.props.navigation.navigate('Login');
  }

  fetchUserData = async () => {
    try {
      const response = await fetch(user_url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + Login.getToken()
        },
      })

      if (response.status == 200) {
        const content = await response.json();
        this.setState({
          username: content.username,
          email: content.email,
          phone_number: content.phone_number,
          org: content.org
        });
      } else {
        console.error(response)
      }
    } catch (error) {
      console.error(error);
    }
  }

  componentWillMount() {
    name = Login.getName();
    user_url = UPDATE_URL + name;
    this.fetchUserData();
  }

  postUpdate = async () => {
    try {
      const response = await fetch(user_url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Token " + Login.getToken()
        },
        body: JSON.stringify(this.state),
      })

      if (response.status != 200) {
        Alert.alert("Failed to update user profile.")
        console.error(response)
        return
      }
      this.navigateToLogin()
    } catch (error) {
      console.error('Error:', error);
    }
  }

  render() {
    return (
      <Container style={styles.container}>

        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Update Profile</Title>
          </Body>
          <Right />
        </Header>

        <View>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input value={this.state.username} />
            </Item>
            <Item floatingLabel last>
              <Label>Phone Number *</Label>
              <Input
                onChangeText={val => this.onChange("phone_number", val)}
              // value={this.state.phone_number}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Email *</Label>
              <Input
                onChangeText={val => this.onChange("email", val)}
              // value={this.state.email}
              />
            </Item>

            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down" />}
                style={{ width: undefined, marginTop: 30, }}
                placeholder="Select your Organization"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.org}
                onValueChange={val => this.onChange("org", val)}
              >
                <Item label="Undergrad" value="Undergrad" />
                <Item label="Stats" value="Stats" />
                <Item label="Physics" value="Physics" />
                <Item label="ECE" value="ECE" />
                <Item label="CS" value="CS" />
              </Picker>
            </Item>

          </Form>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
          <Button block style={styles.button}
            onPress={this.postUpdate}>
            <Text>Update Profile</Text>
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