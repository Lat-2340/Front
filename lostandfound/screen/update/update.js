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
import {createStackNavigator} from "react-navigation-stack";
import Login from "../login/login.js"

import {
  IP_PORT,
  USERS,
  UPDATE
} from '../../const.js';
// const url = "http://127.0.0.1:8000/users/update/";
const UPDATE_URL = IP_PORT + USERS + UPDATE


export default class Update extends Component {
    static name = null;
    static user_url = null;

    constructor(props) {
      super(props);
      this.state = {
        username: undefined,
        password: undefined,
        email: undefined,
        org: undefined,
        phone_number: undefined,
      };

      this.data = {};
      this.changedData = {};
    }


    onValueChange(value: string) {
      this.setState({ org: value});
      this.changedData["org"] = value;
    }

    onTextChange(key: string, value: string){
        this.changedData[key] = value;
    }

    combinedChange(key:string, value:string){
        this.changedData[key] = value;
        this.setState({password: value})
    }
    navigateToLogin = () => {
      console.log("update profile");
      this.props.navigation.navigate('Login');
    }

    fetchUserData = async () => {
      console.log("in fetch dat");
      console.log("Token");
      console.log(Login.getToken());
      try{
        const response = await fetch(user_url, {
          method: "GET",
          headers:{
              "Content-Type": "application/json",
              "Authorization": "Token " + Login.getToken()
          },
        })

        const content = await response.json();
        console.log("find something")
        console.log(Login.getToken())
        console.log(content)
        if (response.status == 200){
            this.setState({username: content.username});
            this.setState({password: content.password});
            this.setState({email: content.email});
            this.setState({org: content.org});


            //url += this.data["username"];
            if(content.hasOwnProperty("phone_number")){
                this.setState({phone_number: content.phone_number});
            }
            //this.componentWillMount();
        }
      }catch (error){
          console.error("Error:", error);
      }
   }

    componentWillMount() {
      // this.setState({username: this.data["username"]});
      // this.setState({password: this.data["password"]});
      // this.setState({email: this.data["email"]});
      // this.setState({state: this.data["org"]});
      // this.setState({phone_number: this.data["phone_number"]})
      name = Login.getName();
      user_url = UPDATE_URL+name;
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
            body: JSON.stringify(this.changedData),
        })

        if (response.status != 200) {
          Alert.alert("Failed to update user profile.")
          console.error(response)
          return
        }
        // const result = await response.json();
        // console.log(result)
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
          <Right/>
        </Header>

        <View>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input value={this.state.username}/>
            </Item>
            <Item floatingLabel last>
              <Label>Phone Number *</Label>
              <Input onChangeText={text => this.onTextChange("phone_number", text)}/>
            </Item>
            <Item floatingLabel last>
              <Label>Email *</Label>
              <Input onChangeText={text => this.onTextChange("email", text)}/>
            </Item>

            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down" />}
                style={{ width: "30%" ,marginTop: 30,}}
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

            {/* <Item floatingLabel last>
              <Label>Password *</Label>
              <Input  onChangeText={text => this.combinedChange("password", text)}/>
            </Item>
            <Item floatingLabel last>
              <Label>Confirm Password *</Label>
              <Input secureTextEntry />
            </Item> */}
          </Form>
        </View>
        <View style={{alignItems: 'center',justifyContent: 'center', marginTop: 50}}>
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
    width:"80%",
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: 30,
    textAlign: 'center'
  }
});