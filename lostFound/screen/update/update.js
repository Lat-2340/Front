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
const url = "http://35.153.212.32:8000/users/update/Asd";

export default class Update extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        org: undefined,
        username: "jialin"
      };
      //this.data = {"username": "jialin", "password": "asdf", "email": "jialin@gmail.com", "phone_number": "1234", "org": "UIUC"};
      this.changedData = {};
    }
  
    getUserName(){
      return this.data["username"];
    }
    onValueChange(value: string) {
      this.setState({ org: value});
      this.changedData["org"] = value;
    }

    onTextChange(key: string, value: string){
        this.changedData[key] = value;
    }
    navigateToLogin = () => {
      console.log("signon->login");
      this.props.navigation.navigate('Login');    
    }

  //   fetchUserData = async () => {
  //     try{
  //       const response = await fetch(url, {
  //         method: "GET",
  //         headers:{
  //             "Content-Type": "application/json",
  //             "Authorization: ": "Token " + Login.getToken() 
  //         },
  //       })
  //       const content = await response.json();
  //       if (response.status == 200){
  //           this.data["username"] = content.username;
  //           this.data["password"] = content.password;
  //           this.data["email"] = content.email;
  //           this.data["org"] = content.org;
            
  //           //url += this.data["username"];
  //           if(content.hasOwnProperty("phone_number")){
  //               this.data["phone_number"] = content.phone_number;
  //           }
  //       }
  //     }catch (error){
  //         console.error("Error:", error);
  //     }
  //  }
    postUpdate = async () => {
      try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": "Token " + Login.getToken()
            },
            body: JSON.stringify(this.changedData),
        })
        const result = await response.json();
        console.log(result)
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
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Phone Number *</Label>
              <Input onChangeText={text => this.onTextChange("phone_number", text)}/>
            </Item>
            <Item floatingLabel last>
              <Label>Email</Label>
              <Input onChangeText={text => this.onTextChange("email", text)}/>
            </Item>
            
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down" />}
                style={{ width: undefined }}
               
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.org}
                onValueChange={(label)=> this.onValueChange(label)}
              >
                <Item label="Computer Science" value="key0" />
                <Item label="Electrical Computer Engineering" value="key1" />
                <Item label="Finance" value="key2" />
                <Item label="Aerospace Engineering" value="key3" />
                <Item label="Civil Environmental Engineering" value="key4" />
              </Picker>
            </Item>
          
            <Item floatingLabel last>
              <Label>Password *</Label>
              <Input secureTextEntry onChangeText={text => this.onTextChange("password", text)}/>
            </Item>
            <Item floatingLabel last>
              <Label>Confirm Password *</Label>
              <Input secureTextEntry />
            </Item>
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