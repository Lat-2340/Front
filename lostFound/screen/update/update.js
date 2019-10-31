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

this.url = "http://35.153.212.32:8000/users/register";
this.data = { 
  username: 'example',
  email: "ex@ex.com" ,
  phone_number: "2173721046",
  org: "UIUC CS",
  password: "asdfg"};

export default class Update extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        selected2: undefined
      };
    }
 
    onValueChange2(value: string) {
      this.setState({
        selected2: value
      });
    }

    navigateToLogin = () => {
      console.log("signon->login");
      this.props.navigation.navigate('Login');    
    }

    postRegister = async () => {
      try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const result = await response.json();
        console.log('Success:', JSON.stringify(result));
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
              <Input userName/>
            </Item>
            <Item floatingLabel last>
              <Label>Phone Number *</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Email</Label>
              <Input />
            </Item>
            
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select your Organization"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
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
              <Input secureTextEntry />
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



