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
  AppRegistry, Alert
} from 'react-native';
import {createStackNavigator} from "react-navigation-stack";

const url = "http://127.0.0.1:8000/users/login";
const pickup_url =  "http://127.0.0.1:8000/users/pickup-locations";

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
      console.log(this.data);
      name = this.data["username"];
      return name;
    }

    static getPickUpLoc(){
      return this.pickUpLocArr;
    }
  fetchPickUpLoc = async() => {
    //console.log(token)
    try {
      const response = await fetch(pickup_url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Token " + token
          }
      })
      let content = await response.json();
      console.log(content)
      if (response.status == 200){
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
    console.log("postRegistration")
    try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.data),
      })
      let content = await response.json();
      console.log(content);
      console.log(response.status);
      if (response.status == 200){
        token = content.token;

        this.fetchPickUpLoc();
        this.props.navigation.navigate("HomePage");
      }
      else{
        console.error("Invalid Input!")
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
          <Form>
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



