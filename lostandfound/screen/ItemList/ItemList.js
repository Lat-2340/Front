import React, { Component } from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Thumbnail,
  Left,
  Body,
  Right,
} from 'native-base';
import {
  StyleSheet,
  Image,
  Alert,
} from 'react-native';

import Login from "../login/login.js"

import {
  IP_PORT,
  LOST_AND_FOUND,
  GET_USER_LOST_ITEMS,
  GET_MATCHED_FOUND_ITEMS,
  DELETE_ITEM,
} from '../../const.js';

const GET_LOST_ITEMS_URL = IP_PORT + LOST_AND_FOUND + GET_USER_LOST_ITEMS
const GET_MATCHED_FOUND_ITEMS_URL = IP_PORT + LOST_AND_FOUND + GET_MATCHED_FOUND_ITEMS
const DELETE_ITEM_URL = IP_PORT + LOST_AND_FOUND + DELETE_ITEM


class NHListThumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showToast: false,
      lostItems: [],
      matchedFoundItems: {},
    };

  }

  deleteItem = async (itemId) => {
    try {
      const response = await fetch(DELETE_ITEM_URL, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + Login.getToken()
        },
        body: JSON.stringify({id: itemId})
      })

      if (response.status != 204) {
        Alert.alert("Failed to delete lost item.")
        console.error(response)
        return
      }

      this.setState((state) => ({
        lostItems: state.lostItems.filter(item => item['_id']['$oid'] !== itemId)
      }))
      // console.log(this.state.lostItems)

    } catch (error) {
      Alert.alert(error);
      console.error(error);
    }
  }

  fetchLostItems = async () => {
    try {
      const response = await fetch(GET_LOST_ITEMS_URL, {
        method: 'GET',
        headers: {
          "Authorization": "Token " + Login.getToken()
        },
      })

      if (response.status != 200) {
        Alert.alert("Failed to fetch lost items.")
        console.error(response)
        return
      }

      const result = await response.json();

      resLostItems = result['lost_items'].map(itemInfo => JSON.parse(itemInfo))
      result['lost_images'].forEach((img, i) => {
        resLostItems[i]['img'] = 'data:image/png;base64,' + img
      });

      this.setState({
        lostItems: resLostItems
      })

      // console.log(this.state.lostItems)

      this.state.lostItems.forEach(item => {
        this.fetchMatchedFoundItems(item['_id']['$oid'])
      })

    } catch (error) {
      Alert.alert(error);
      console.error(error);
    }
  }

  fetchMatchedFoundItems = async (itemId) => {
    try {
      url = GET_MATCHED_FOUND_ITEMS_URL + "?id=" + itemId
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "Authorization": "Token " + Login.getToken()
        },
      })

      if (response.status != 200) {
        Alert.alert("Failed to fetch matched found items.")
        console.error(response)
        return
      }

      const result = await response.json();

      matchedItems = result['matched_items'].map(itemInfo => JSON.parse(itemInfo))
      result['matched_images'].forEach((img, i) => {
        matchedItems[i]['img'] = 'data:image/png;base64,' + img
      });

      this.setState((state) => {
        state.matchedFoundItems[itemId] = matchedItems
        return {
          matchedFoundItems: state.matchedFoundItems
        };
      })
      // console.log(this.state.matchedFoundItems)

    } catch (error) {
      Alert.alert(error);
      console.error(error);
    }
  }

  componentWillMount() {
    this.fetchLostItems();
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Item status</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <List
            dataArray={this.state.lostItems}
            renderRow={lostItem =>
              <List>
                <ListItem itemHeader>
                  <Image source={{uri: lostItem.img}} style={{ width: '10%', height: '100%' }} />
                  <Text
                    style={{
                      margin: 5,
                      fontSize: 18,
                      fontWeight: 'bold',
                    }} >
                    {lostItem.item_name}
                  </Text>
                </ListItem>
                <List
                  dataArray={this.state.matchedFoundItems[lostItem['_id']['$oid']]}
                  renderRow={matchedItems =>
                    <ListItem thumbnail>
                      <Left>
                        <Thumbnail square source={{uri: matchedItems.img}} />
                      </Left>
                      <Body>
                        <Text>
                          {matchedItems.item_name}
                        </Text>
                        <Text numberOfLines={1} note>
                          {matchedItems.description}
                        </Text>
                      </Body>
                      <Right>
                        <Button transparent onPress={() => this.props.navigation.navigate("ItemDetailPage", { matchedItems })}>
                          <Text>Detail</Text>
                        </Button>
                      </Right>
                    </ListItem>}
                />
                <Button
                  block
                  danger
                  style={{ margin: 10 }}
                  onPress={() => this.deleteItem(lostItem['_id']['$oid'])}
                >
                  <Icon active name="trash" />
                  <Text>Already found this item? Delete it now.</Text>
                </Button>
              </List>}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
  },
});

export default NHListThumbnail;