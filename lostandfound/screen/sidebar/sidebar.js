import React from "react";
import { AppRegistry, Image, StatusBar } from "react-native";
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon
} from "native-base";
// const routes = ["HomePage", "UpdatePage", "Login"];

routes = [
  {
    pageName:"Home Page",
    pageRoute:"HomePage"
  },
  {
    pageName:"Update Profile",
    pageRoute:"UpdatePage"
  },
  {
    pageName:"Log Out",
    pageRoute:"LoginPage"
  }
]
export default class SideBar extends React.Component {

  render() {
    let icons;


    return (
      <Container>
        <Content>
          <Image
            source={
              require('../../picture/icon.jpg')
            }
            style={{
              marginTop: 20,
              left: 10,
              height: 80,
              width: 80,
              alignSelf: "stretch",
              position: "absolute"
            }}
          />

          <List
            dataArray={routes}
            contentContainerStyle={{ marginTop: 120 }}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data["pageRoute"])}
                >
                  <Text>{data["pageName"]}</Text>
                </ListItem>
              );
            }}
            keyExtractor={(data,index) => index.toString()}
          />
        </Content>
      </Container>
    );
  }
}
