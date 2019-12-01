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
  Image
} from 'react-native';
// import styles from "./styles";

// const sankhadeep = require("../../../assets/contacts/sankhadeep.png");
// const supriya = require("../../../assets/contacts/supriya.png");
// const himanshu = require("../../../assets/contacts/himanshu.png");
// const shweta = require("../../../assets/contacts/shweta.png");
// const shruti = require("../../../assets/contacts/shruti.png");
// const shivraj = require("../../../assets/contacts/shivraj.png");
const test = require("./test.jpg");
const datas = [
  {
    name: "item1",
    img: test,
    items:[
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
    items:[
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
    items:[
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
    items:[
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
        data: null
      };

  }

  onPressDelete = async () =>{

  }

  componentWillMount() {
      this.fetchLostItem();
      console.log("show lost item");
      console.log(this.state.username);
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
            dataArray={datas}
            renderRow={data =>
            <List>
                <ListItem itemHeader>
                    <Image source={data.img} style={{width: '10%', height: '100%'}}  />
                    <Text 
                    style={{ 
                        margin: 5,
                        fontSize: 18,
                        fontWeight: 'bold', 
                        }} >
                        {data.name}
                    </Text>
                </ListItem>
                <List
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
                        <Button transparent onPress={() => this.props.navigation.navigate("DetailPage",{items})}>
                            <Text>Detail</Text>
                        </Button>
                        </Right>
                    </ListItem>}
                />
                <Button
                    block
                    danger
                    style={{ margin:10 }}
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