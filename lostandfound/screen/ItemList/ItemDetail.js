import React, { Component } from './node_modules/react';
import { Image, Alert, StyleSheet } from 'react-native';
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
  Left,
  Right,
  Body
} from 'native-base';

import Login from "../user/login.js"

import {
  DELETE_ITEM_URL
} from '../../const.js';


class NHCardShowcase extends Component {

  deleteMatchItem = async (foundItemId, lostItemId) => {
    try {
      const response = await fetch(DELETE_ITEM_URL, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + Login.getToken()
        },
        body: JSON.stringify({id: foundItemId})
      })

      if (response.status != 204) {
        Alert.alert("Failed to delete found item.")
        console.error(response)
        return
      }

      matchCallback = this.props.navigation.state.params.matchHandler
      matchCallback(lostItemId)

      this.props.navigation.navigate("ItemListPage")

    } catch (error) {
      Alert.alert("deleteMatchItem failed");
      console.error(error);
    }
  }

  render() {
    const matchItem = this.props.navigation.state.params.matchItem;
    const lostItemId = this.props.navigation.state.params.lostItemId;

    console.log(matchItem)

    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Found Detail</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Card style={styles.mb}>
            <CardItem header bordered>
              <Left>
                <Body>
                  <Title>{matchItem.item_name}</Title>
                  {/* <Text note>{matchItem['date_time']['$date']}</Text> */}
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image
                  style={{
                    alignSelf: "center",
                    resizeMode: "cover",
                    width: '100%',
                    height: 400,
                    marginVertical: 5,
                  }}
                  source={{uri: matchItem.img}}
                />
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <Left>
                <Body>
                  <Text>
                    {matchItem.description}
                  </Text>
                </Body>
              </Left>
            </CardItem>
          </Card>

          <Card style={styles.mb}>
            <CardItem bordered>
              <Left>
                <Title>
                  Pickup Location
                </Title>
                <Text>
                  {matchItem.pickup_address}
                </Text>
              </Left>
            </CardItem>
          </Card>

          <Button
            block
            // style={{ margin: 25 }}
            onPress={() => this.deleteMatchItem(matchItem['_id']['$oid'], lostItemId)}
          >
            <Text>Match and Delete Item</Text>
          </Button>

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
