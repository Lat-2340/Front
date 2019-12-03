import React, { Component } from "react";
import { Image, Dimensions, StyleSheet } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Text,
  Thumbnail,
  Left,
  Right,
  Body
} from "native-base";

const deviceWidth = Dimensions.get("window").width;
const logo = require("./test.jpg");
const cardImage = require("./test.jpg");

class NHCardShowcase extends Component {
  render() {
    const { matchedItem } = this.props.navigation.state.params.matchedItems;

    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Detail</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Card style={styles.mb}>
            <CardItem bordered>
              <Left>
                <Body>
                  <Text>{matchedItem.item_name}</Text>
                  <Text note>April 15, 2016</Text>
                </Body>
              </Left>
            </CardItem>

            <CardItem>
              <Body>
                <Image
                  style={{
                    alignSelf: "center",
                    resizeMode: "cover",
                    width: deviceWidth / 1.18,
                    marginVertical: 5
                  }}
                  source={matchedItem.img}
                />
                <Text>
                  {matchedItem.description}
                </Text>
              </Body>
            </CardItem>

          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
  },
  mb: {
    marginBottom: 15
  }
});


export default NHCardShowcase;
