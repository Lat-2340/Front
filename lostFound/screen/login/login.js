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

export default class Login extends Component {
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
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input secureTextEntry />
            </Item>
          </Form>
        </View> 
        <View style={{alignItems: 'center',justifyContent: 'center', marginTop: 50}}>
          <Button block style={styles.button}
          onPress={() => this.props.navigation.navigate("HomePage")}>
            <Text>Sign In</Text>
          </Button>
          <Button block bordered primary style={styles.button} 
          onPress={() => this.props.navigation.navigate("Signon")}>
            <Text>Sign On</Text>
          </Button>
          <Button block transparent style={styles.button}>
            <Text style={{textDecorationLine: 'underline', color:"grey"}}>Forget your password?</Text>
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


// try {
//   const response = await fetch(url, {
//     method: 'POST', // or 'PUT'
//     body: JSON.stringify(data), // data can be `string` or {object}!
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
//   const json = await response.json();
//   console.log('Success:', JSON.stringify(json));
// } catch (error) {
//   console.error('Error:', error);
// }