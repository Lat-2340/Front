import React from "react"
import { View, Alert, StyleSheet } from "react-native"
import {
  Button,
  Text,
  Container,
  Body,
  Header,
  Left,
  Right,
  Icon,
  Title,
  Input,
  Item,
  Form,
  Picker
} from "native-base"

import MyDatepicker from './datepicker.js'
import Login from '../user/login.js'

import {
  IP_PORT,
  LOST_AND_FOUND,
  ADD_ITEM,
} from '../../const.js'

const ADD_ITEM_URL = IP_PORT + LOST_AND_FOUND + ADD_ITEM


export default class Lost extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      item_name: undefined,
      features: {},
      location: undefined,
      description: undefined,
      date_time: undefined,
      image: undefined,
      pickup_address: undefined,
    }

    this.isCameraVisible = false
  }

  showCameraView = () => {
    this.isCameraVisible = true
  }

  closeCameraView = () => {
    this.sCameraVisible = false

    this.props.navigation.navigate("CameraPage", {
      image: null,
      callback: (data) => {
        this.setState({
          image: data,
        })
      }
    }
    )
    // console.log(this.state.image)
  }

  submitForm = async () => {
    var formData = new FormData()
    formData.append("is_lost", "") // is_lost is empty string <=> false for found items

    Object.keys(this.state).forEach(key => {
      let val = this.state[key]
      if (this.state.hasOwnProperty(key) && val !== undefined) {
        if (typeof(val) === 'object') {
          val = JSON.stringify(val)
        }
        formData.append(key, val)
      }
    })
    // console.log(formData)

    try {
      const response = await fetch(ADD_ITEM_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization": "Token " + Login.getToken()
        },
        body: formData,
      })

      if (response.status == 201) {
        const result = await response.json()
        console.log('Success:', result)
        this.props.navigation.navigate("HomePage")
      } else {
        Alert.alert("Failed to add lost item.")
        // console.error(response)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  onChangeState(key, value) {
    this.setState((state) => {
      if (key === "features") {
        let [ k, v ] = value
        state[key][k] = v
        return {
          [key]: state[key]
        }
      }
      return {
        [key]: value
      }
    })
  }

  render() {
    pickupLocations = Login.getPickUpLocations()
    let locationItems = pickupLocations.map((loc) => {
      return <Picker.Item key={1} value={loc} label={loc.address} />
    })

    let cam_bnt
    if (this.isCameraVisible) {
      cam_bnt = <Button title="Camera" onPress={this.showCameraView}>
        <Icon name='camera' />
      </Button>
    } else {
      cam_bnt = <Button title="Camera" onPress={this.closeCameraView}>
        <Icon name='camera' />
      </Button>
    }

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent transparent onPress={() => this.props.navigation.navigate("HomePage")}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Found</Title>
          </Body>
          <Right />
        </Header>

        <View style={styles.content}>


          <Item style={{ top: 10 }}>
            <Icon active name='bulb' />
            <Text style={{ paddingBottom: 2 }}> Name this item first: </Text>
          </Item>
          <Item regular style={{ top: 20, borderColor: 'gray', width: 250, height: 50 }}>
            <Input placeholder='Nickname' onChangeText={val => this.onChangeState("item_name", val)} />
          </Item>

          <Item style={{ top: 30 }}>
            <Icon active name='home' />
            <Text style={{ paddingBottom: 2 }}> Where did you find this lost item? </Text>
          </Item>
          <Item regular style={{ top: 40, borderColor: 'gray', width: 250, height: 50 }}>
            <Input placeholder='Grainger Library' onChangeText={val => this.onChangeState("location", val)} />
          </Item>

          <Item style={{ top: 55 }}>
            <Icon active name='time' />
            <Text style={{ paddingBottom: 2 }}> In which day did you find this lost item? </Text>
          </Item>
          <MyDatepicker handler={date => this.onChangeState("date_time", date)} style={styles.container} />

          <Item style={{ top: 80 }}>
            <Icon active name='ios-checkbox' />
            <Text style={{ paddingBottom: 2 }}> Pick one available drop-off location </Text>
          </Item>
          <Form style={{ top: 90 }}>
            <Picker
              mode="dropdown"
              iosHeader="Drop-off location"
              iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "white", fontSize: 25 }} />}
              style={{ width: 220, paddingLeft: 4, borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 1, borderColor: "lightslategrey", backgroundColor: "lightslategrey" }}
              placeholder="Drop-off place"
              placeholderStyle={{ color: 'white', paddingLeft: 4 }}
              selectedValue={this.state.pickup_address}
              onValueChange={(label) => this.onChangeState("pickup_address", label)}
            >
              {locationItems}
            </Picker>
          </Form>


          <Item style={{ top: 110 }}>
            <Icon active name='ios-add-circle-outline' />
            <Text style={{ paddingBottom: 2 }}> Describe your favoriate item </Text>
          </Item>

          <Form style={{ top: 120, flex: 0.9, flexDirection: "row", justifyContent: 'space-between' }}>
            <Picker
              mode="dropdown"
              iosHeader="Select Color"
              iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "white", fontSize: 25 }} />}
              style={{ width: 170, paddingLeft: 4, borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 1, borderColor: "goldenrod", backgroundColor: "goldenrod" }}
              placeholder="Select Color"
              placeholderStyle={{ color: 'white', paddingLeft: 4 }}
              selectedValue={this.state.features.color}
              onValueChange={(label) => this.onChangeState("features", ["color", label])}
            >
              <Picker.Item label="Black" value="Black" />
              <Picker.Item label="White" value="White" />
              <Picker.Item label="Green" value="Green" />
              <Picker.Item label="Yellow" value="Yellow" />
              <Picker.Item label="Orange" value="Orange" />
              <Picker.Item label="Silver" value="Silver" />
              <Picker.Item label="Transparent" value="Transparent" />
              <Picker.Item label="Purple" value="Purple" />

            </Picker>

            <Picker
              mode="dropdown"
              iosHeader="Select Size"
              iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "white", fontSize: 25 }} />}
              style={{ width: 170, paddingLeft: 4, borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 1, borderColor: "#007aff", backgroundColor: "#007aff" }}
              placeholder="Select Size"
              placeholderStyle={{ color: 'white', paddingLeft: 4 }}
              selectedValue={this.state.features.size}
              onValueChange={(label) => this.onChangeState("features", ["size", label])}
            >
              <Picker.Item label="< 10 cm" value="< 10 cm" />
              <Picker.Item label="< 20 cm" value="< 20 cm" />
              <Picker.Item label="< 30 cm" value="< 30 cm" />
              <Picker.Item label="< 40 cm" value="< 40 cm" />


            </Picker>
          </Form>

          <Form style={{ top: 170 }}>
            <Picker
              mode="dropdown"
              iosHeader="Select Category"
              iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "white", fontSize: 25 }} />}
              style={{ width: 200, paddingLeft: 4, borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 1, borderColor: "palevioletred", backgroundColor: "palevioletred" }}
              placeholder="Select Category"
              placeholderStyle={{ color: 'white', paddingLeft: 4 }}
              selectedValue={this.state.features.category}
              onValueChange={(label) => this.onChangeState("features", ["category", label])}
            >
              <Picker.Item label="Electronic Items" value="Electronic Items" />
              <Picker.Item label="Daily Items" value="Daily Items" />
              <Picker.Item label="Study Items" value="Study Items" />
              <Picker.Item label="Keys" value="Keys" />
              <Picker.Item label="Cards" value="Cards" />
              <Picker.Item label="Wallets" value="Wallets" />
              <Picker.Item label="Books" value="key6" />

            </Picker>
          </Form>

          <Item regular style={{ top: 180, height: 140 }}>
            <Input style={{ marginTop: 1 }} placeholder='Additional Description:' onChangeText={val => this.onChangeState("description", val)} />
          </Item>

          {/* <Button success style={{top: 210, width: 100, marginLeft: 270}} onPress={this.submitForm}>
            <Text> Submit</Text>
          </Button>


          <Icon active name='camera' style={{marginTop: 170, marginLeft: 20, width: 60}} /> */}

          <View style={{ top: 190, flex: 0.9, flexDirection: "column", justifyContent: 'space-between' }}>
            <View style={{ width: 100, marginLeft: 275 }}>
              <Button success onPress={this.submitForm}>
                <Text> Submit</Text>
              </Button>
            </View>

            <View style={{ width: 50, marginLeft: 5 }}>
              {/* {!isCameraVisible &&<Button title="Show me Camera" onPress={this.showCameraView} />}
              {isCameraVisible &&
              this.props.navigation.navigate("CameraPage")} */}
              {cam_bnt}

            </View>
          </View>


        </View>
      </Container>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    width: "90%",
    top: 30,
    marginTop: 30
  },
  content: {
    width: "90%",
    margin: 20
  },
})