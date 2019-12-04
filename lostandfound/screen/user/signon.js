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

import {
  IP_PORT,
  USERS,
  SIGNON
} from '../../const.js';

const SIGNON_URL = IP_PORT + USERS + SIGNON
// const url = "http://127.0.0.1:8000/users/register";
// this.data = {
//   username: 'example',
//   email: "ex@ex.com" ,
//   phone_number: "2173721046",
//   org: "UIUC CS",
//   password: "asdfg"};

export default class Signon extends Component {

   constructor(props) {
      super(props);
      this.state = {
        org: undefined,
      };
      this.data = {};
    }

    onValueChange(value: string) {
      this.setState({org:value});
      this.data["org"] = value;
    }

    onChangeText(key:string, value:string){
      this.data[key] = value;
    }

    navigateToLogin = () => {
      console.log("signon->login");
      this.props.navigation.navigate('Login');
    }

    postRegister = async () => {
      console.log(this.data)
      try {
        const response = await fetch(SIGNON_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.data),
        })

        let content = await response.json();
        console.log(content);
        if (response.status == 201){
          console.log("Signon Success!");
          console.log(content);
          this.props.navigation.navigate("LoginPage");
        }
        else{
          console.error("Invalid Input!")
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }


  render() {
    return (
      <Container style={styles.container}>
        <View>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input onChangeText={text => this.onChangeText("username", text)}/>
            </Item>
            <Item floatingLabel last>
              <Label>Phone Number *</Label>
              <Input onChangeText={text => this.onChangeText("phone_number", text)}/>
            </Item>
            <Item floatingLabel last>
              <Label>Email</Label>
              <Input onChangeText={text => this.onChangeText("email", text)}/>
            </Item>

            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down" />}
                style={{ width: undefined,marginTop: 30, }}
                placeholder="Select your Organization"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.org}
                onValueChange={(label)=> this.onValueChange(label)}
              >
                <Item label="Undergrad" value="Undergrad" />
                <Item label="Stats" value="Stats" />
                <Item label="Physics" value="Physics" />
                <Item label="ECE" value="ECE" />
                <Item label="CS" value="CS" />
              </Picker>
            </Item>

            <Item floatingLabel last>
              <Label>Password *</Label>
              <Input secureTextEntry onChangeText={text => this.onChangeText("password", text)}/>
            </Item>
            <Item floatingLabel last>
              <Label>Confirm Password *</Label>
              <Input secureTextEntry />
            </Item>
          </Form>
        </View>
        <View style={{alignItems: 'center',justifyContent: 'center', marginTop: 50}}>
          <Button block style={styles.button}
          onPress={this.postRegister}>
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
    width:"80%",
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: 30,
    textAlign: 'center'
  }
});



