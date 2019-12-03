import React, { Component } from "react";
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
} from "native-base";
import {
  StyleSheet,
  Image,
  Alert,
} from 'react-native';

import Login from "../login/login.js"

import {
  IP_PORT,
  LOST_AND_FOUND,
  GET_USER_LOST_ITEMS
} from '../../const.js';

const GET_LOST_ITEMS_URL = IP_PORT + LOST_AND_FOUND + GET_USER_LOST_ITEMS

const test = require("./test.jpg");


const datas = [
  {
    name: "item1",
    img: test,
    items: [
      {
        img_match: test,
        text: "Sankhadeep",
        note: "Its time to build a difference . ."
      },
      {
        img_match: test,
        text: "Sankhadeep",
        note: "Its time to build a difference . ."
      },
      {
        img_match: test,
        text: "Sankhadeep",
        note: "Its time to build a difference . ."
      }
    ]
  },
  {
    name: "item2",
    img: test,
    items: [
      {
        img_match: test,
        text: "Sankhadeep",
        note: "Its time to build a difference . ."
      },
      {
        img_match: test,
        text: "Sankhadeep",
        note: "Its time to build a difference . ."
      },
      {
        img_match: test,
        text: "Sankhadeep",
        note: "Its time to build a difference . ."
      }
    ]
  },
  {
    name: "item3",
    img: test,
    items: [
      {
        img_match: test,
        text: "Sankhadeep",
        note: "Its time to build a difference . ."
      },
      {
        img_match: test,
        text: "Sankhadeep",
        note: "Its time to build a difference . ."
      },
      {
        img_match: test,
        text: "Sankhadeep",
        note: "Its time to build a difference . ."
      }
    ]
  },
  {
    name: "item4",
    img: test,
    items: [
      {
        img_match: test,
        text: "Sankhadeep",
        note: "Its time to build a difference . ."
      },
      {
        img_match: test,
        text: "Sankhadeep",
        note: "Its time to build a difference . ."
      },
      {
        img_match: test,
        text: "Sankhadeep",
        note: "Its time to build a difference . ."
      }
    ]
  },
];

class NHListThumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showToast: false,
      data: null,
      lostItems: [],
    };

  }

  onPressDelete = async () => {

  }

  fetchLostItems = async () => {
    try {
      const response = await fetch(GET_LOST_ITEMS_URL, {
        method: 'GET',
        headers: {
          "Authorization": "Token " + Login.getToken()
        },
      })
      const result = await response.json();
      // console.log('Success:', result);

      resLostItems = result['lost_items'].map(itemInfo => JSON.parse(itemInfo))
      result['lost_images'].forEach((img, i) => {
        resLostItems[i]['img'] = 'data:image/png;base64,' + img
      });

      this.setState({
        lostItems: resLostItems
      })

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
            renderRow={data =>
              <List>
                <ListItem itemHeader>
                  <Image source={{uri: data.img}} style={{ width: '10%', height: '100%' }} />
                  <Text
                    style={{
                      margin: 5,
                      fontSize: 18,
                      fontWeight: 'bold',
                    }} >
                    {data.name}
                  </Text>
                </ListItem>
                {/* <List
                  dataArray={data.items}
                  renderRow={items =>
                    <ListItem thumbnail>
                      <Left>
                        <Thumbnail square source={items.img_match} />
                      </Left>
                      <Body>
                        <Text>
                          {items.text}
                        </Text>
                        <Text numberOfLines={1} note>
                          {items.note}
                        </Text>
                      </Body>
                      <Right>
                        <Button transparent onPress={() => this.props.navigation.navigate("DetailPage", { items })}>
                          <Text>Detail</Text>
                        </Button>
                      </Right>
                    </ListItem>}
                /> */}
                <Button
                  block
                  danger
                  style={{ margin: 10 }}
                  onPress={this.onPressDelete}
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