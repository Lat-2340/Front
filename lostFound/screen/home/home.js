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
  StatusBar
} from 'react-native';
// import {createStackNavigator} from "react-navigation-stack";
// import { createDrawerNavigator } from "react-navigation-drawer";
// import HomePage from "../home/home.js"
// import SideBar from "../sideBar/sidebar.js";
// import LostPage from '../lost/lost.js';
// const HomeScreenRouter = createDrawerNavigator(
//   {
//     HomePage: { screen: HomePage },
//     SideBar: {screen: SideBar}
//   },
//   {
//     contentComponent: props => <SideBar {...props} />
//   }
// );


export default class Home extends Component {
  // static navigationOptions = {
  //     header: null
  //   }
  
  render() {
    return (
      <Container style={styles.container}>
      <Header>
          <Left/>
          <Body>
            <Title>Home</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("SideBar")}
            >
              <Icon name="menu" />
            </Button>
          </Right>
        </Header>
        <View style={{alignItems: 'center',justifyContent: 'center', marginTop: 50}}>
          <Button block style={styles.button}
          onPress={() => this.props.navigation.navigate("LostPage")}>
            <Text>LOST</Text>
          </Button>
          <Button block bordered primary style={styles.button}
          onPress={() => this.props.navigation.navigate("FoundPage")}>
            <Text>FOUND</Text>
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
