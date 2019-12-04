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
  StatusBar,
  Image
} from 'react-native';
// import {createStackNavigator} from "react-navigation-stack";
// import { createDrawerNavigator } from "react-navigation-drawer";
// import HomePage from "../home/home.js"
// import SideBar from "../sidebar/sidebar.js";
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
          <Button block style={styles.button1}
          onPress={() => this.props.navigation.navigate("LostPage")}>
            <Text>Post my LOST item</Text>
          </Button>
          <Button block bordered primary style={styles.button1}
          onPress={() => this.props.navigation.navigate("FoundPage")}>
            <Text>Post the FOUND item</Text>
          </Button>
          <Button block iconleft style={styles.button2}
          onPress={() => this.props.navigation.navigate("ItemListPage")}>
            <Icon name='alert' />
            <Text style={{textDecorationLine: 'underline'}}>See my lost item status</Text>
          </Button>
        </View>

        <Image
            source={
              require('../../picture/build.jpg')
            }
            style={{
              bottom: 0,
              height: 150,
              width: 450,
              alignSelf: "center",
              position: "absolute"
            }}
          />

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
  },
  button1: {
    width:"80%",
    height:"10%",
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: 30,
    textAlign: 'center'
  },
  button2: {
    width:"80%",
    height:"10%",
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: 200,
    textAlign: 'center'
  }
});
