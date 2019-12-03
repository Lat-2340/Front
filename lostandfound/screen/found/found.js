import React from "react";
import { View, StyleSheet } from "react-native";
//import { NavigationActions } from "react-navigation";
import { TextInput } from 'react-native';
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
} from "native-base";

import MyDatepicker from './datepicker.js'
import Login from '../login/login.js'
// import {user_token} from '../login/login.js';
//const token = Login.token
const url =  "http://127.0.0.1:8000/lostandfound/add-item";
const pickup_url = "http://127.0.0.1:8000/users/pickup-locations";

export default class Lost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: undefined,
      size: undefined,
      category: undefined,
      dropoffLoc: undefined,
      pickUpLocArr: [],
      image: undefined,
      isCameraVisiable: false
    };
    this.data = {
      "is_lost": false,
      "description":{},
      "features":{}
    }
  }

  onValueChange(key: string, value: string) {

    if(key == "feature_color")
      this.setState({color: value});
    else if(key == "feature_size")
      this.setState({size: value});
    else if(key == "feature_category")
      this.setState({category: value});

    this.data[key] = value;
    console.log(this.data)
  }

  onChangeText(key:string, value: string) {
    this.data[key]= value
    //console.log(this.data)
  }

  fetchPickUpLoc = async() => {
    //console.log(token)
    try {
      const response = await fetch(pickup_url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Token " + Login.getToken()
          }
      })
      let content = await response.json();
      console.log(content)
      if (response.status == 200){
        var place;
        for (index in content){
          console.log(index)
          let arr = this.state.pickUpLocArr;
          arr.push(content[index].office);
          this.setState({pickUpLocArr: arr});
          //this.pickUpLocArr.push(content[index].office)
        }
        // TODO: empty location
        console.log("show pickuplocation1");
        console.log(this.state.pickUpLocArr)
        // this.pickUpLocArr = content;
      }
      else{
        console.error("Something wrong!")
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  componentWillMount() {
      // this.setState({username: this.data["username"]});
      // this.setState({password: this.data["password"]});
      // this.setState({email: this.data["email"]});
      // this.setState({state: this.data["org"]});
      // this.setState({phone_number: this.data["phone_number"]})
      this.fetchPickUpLoc();
  }

  showCameraView = () => {
    this.setState({ isCameraVisible: true });
  }

  closeCameraView = () => {
    this.setState({ isCameraVisible: false });
    console.log(this.state.image)
    this.props.navigation.navigate("CameraPage", {
          image: null,
          callback: (data)=>{
              console.log(data);
              console.log("???");
                this.setState({
                  image:data,
                });
                this.data["image"]= data;
                console.log(this.data);
                 }
      }
       );
    console.log("back success");
    console.log(this.state.image);
    // this.data["image"]= this.state.image;
    console.log("back success?");
    console.log(this.data);
  }

//   handlePress = async () => {
//     console.log(this.data);
//     try {
//     const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           "Authorization": "Token " + Login.getToken()
//         },
//         body: JSON.stringify(this.data),
//     })
//     const result = await response.json();
//     console.log('Success:', JSON.stringify(result));
//     this.props.navigation.navigate("HomePage");
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

  handlePress = async () => {
    var formData = new FormData();
    formData.append("is_lost",this.data["is_lost"]);
    if(this.data.hasOwnProperty("date_time")){
      formData.append("date_time",this.data["date_time"]);
    }
    if(this.data.hasOwnProperty("pickup_addres")){
      formData.append("pickup_addres",this.data["pickup_addres"]);
    }
    console.log(JSON.stringify(this.data["description"]))
    formData.append("description",JSON.stringify(this.data["description"]));
    
    formData.append("features",JSON.stringify(this.data["features"]));
    if(this.data.hasOwnProperty("image")){
      formData.append("image",this.data["image"]);
    }
    console.log(formData);

    // console.log(this.data);
    try {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization": "Token " + Login.getToken()
        },
        body: formData,
    })
    const result = await response.json();
    console.log('Success:', JSON.stringify(result));
    this.props.navigation.navigate("HomePage");
  } catch (error) {
    console.error('Error:', error);
  }
}

  onChangeName(value: string) {
    this.data["item_name"]= value
    //console.log(this.data)
  }

  onChangeLocation(value: string) {
    this.data["location"]= value
    //console.log(this.data)
  }

  onChangeDate(value: string) {
    this.data["date_time"]= value
    //console.log(this.data)
  }

  onChangePickup(value: string) {
    this.data["pickup_address"]= value
    //console.log(this.data)
  }

  onChangeDescription(value: string) {
    this.data["description"]= value
    //console.log(this.data)
  }


  render() {
    console.log("display in render")
    console.log(this.state.pickUpLocArr)
    let locationItems = this.state.pickUpLocArr.map( (s) => {
      return <Picker.Item key={1} value={s} label={s} />
    });

    const { isCameraVisible } = this.state;
    let cam_bnt;
    if (isCameraVisible){
      cam_bnt = <Button title="Camera" onPress={this.showCameraView}>
                  <Icon name='camera' />
                </Button>;          
    }else{
      cam_bnt = <Button title="Camera" onPress={this.closeCameraView}>
                  <Icon name='camera' />
                </Button>; ;  
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
         
          
          <Item style={{top:10}}>
            <Icon active name='bulb' />
            <Text style = {{paddingBottom:2}}> Name this item first: </Text>
          </Item>
          <Item regular style={{top:20, borderColor: 'gray', width: 250, height:50}}>
            <Input placeholder='Nickname' onChangeText={text => this.onChangeName(text)}/>
          </Item>

          <Item style={{top:30}}>
            <Icon active name='home' />
            <Text style = {{paddingBottom:2}}> Where did you find this lost item? </Text>
          </Item>
          <Item regular style={{top:40, borderColor: 'gray', width: 250, height:50}}>
            <Input placeholder='Grainger Library' onChangeText={text => this.onChangeLocation(text)}/>
          </Item>

          <Item style={{top:55}}>
            <Icon active name='time' />
            <Text style = {{paddingBottom:2}}> In which day did you find this lost item? </Text>
          </Item>
          <MyDatepicker handler = {date => this.onChangeDate(date)} style={styles.container} />

          <Item style={{top:80}}>
            <Icon active name='ios-checkbox' />
            <Text style = {{paddingBottom:2}}> Pick one avaliable drop-off location </Text>
          </Item>
          <Form style={{top:90}}>
            <Picker
              mode="dropdown"
              iosHeader="Drop-off place"
              iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "white", fontSize: 25}}/>}
              style={{ width: 220, paddingLeft:4, borderBottomWidth: 1, borderLeftWidth:1, borderRightWidth:1, borderTopWidth:1, borderColor:"lightslategrey", backgroundColor:"lightslategrey"}}
              placeholder="Drop-off place"
              placeholderStyle={{color: 'white', paddingLeft:4}}
              selectedValue={this.state.dropoffLoc}
              onValueChange={(label)=> this.onChangePickup("dropoffLocation", label)}
            >
              {locationItems}
            </Picker>
          </Form>



          <Item style={{top:110}}>
            <Icon active name='ios-add-circle-outline' />
            <Text style = {{paddingBottom:2}}> Describe your favoriate item </Text>
          </Item>

          <Form style={{top:120, flex: 0.9, flexDirection:"row", justifyContent:'space-between'}}>
            <Picker
              mode="dropdown"
              iosHeader="Select Color"
              iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "white", fontSize: 25}}/>}
              style={{ width: 170, paddingLeft:4, borderBottomWidth: 1, borderLeftWidth:1, borderRightWidth:1, borderTopWidth:1, borderColor:"goldenrod", backgroundColor:"goldenrod"}}
              placeholder="Select Color"
              placeholderStyle={{ color: 'white', paddingLeft:4}}
              selectedValue={this.state.color}
              onValueChange={(label, value)=> this.onValueChange("feature_color", label)}
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
              iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "white", fontSize: 25}}/>}
              style={{ width: 170, paddingLeft:4, borderBottomWidth: 1, borderLeftWidth:1, borderRightWidth:1, borderTopWidth:1, borderColor:"#007aff", backgroundColor:"#007aff"}}
              placeholder="Select Size"
              placeholderStyle={{ color: 'white', paddingLeft:4}}
              selectedValue={this.state.size}
              onValueChange={(label, value)=> this.onValueChange("feature_size", label)}
            >
              <Picker.Item label="< 10 cm" value="< 10 cm" />
              <Picker.Item label="< 20 cm" value="< 20 cm" />
              <Picker.Item label="< 30 cm" value="< 30 cm" />
              <Picker.Item label="< 40 cm" value="< 40 cm" />


            </Picker>
          </Form>

          <Form style={{top:170}}>
            <Picker
              mode="dropdown"
              iosHeader="Select Category"
              iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "white", fontSize: 25}}/>}
              style={{ width: 200, paddingLeft:4, borderBottomWidth: 1, borderLeftWidth:1, borderRightWidth:1, borderTopWidth:1, borderColor:"palevioletred", backgroundColor:"palevioletred"}}
              placeholder="Select Category"
              placeholderStyle={{color: 'white', paddingLeft:4}}
              selectedValue={this.state.category}
              onValueChange={(label, value)=> this.onValueChange("feature_category", label)}
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

          <Item regular style={{top: 180, height: 140}}>
            <Input style={{marginTop:1}} placeholder='Additional Description:' onChangeText={text => this.onChangeDescription(text)}/>
          </Item>

          {/* <Button success style={{top: 210, width: 100, marginLeft: 270}} onPress={this.handlePress}>
            <Text> Submit</Text>
          </Button>


          <Icon active name='camera' style={{marginTop: 170, marginLeft: 20, width: 60}} /> */}

          <View style={{top:190, flex: 0.9, flexDirection:"column", justifyContent:'space-between'}}>
            <View style={{width: 100, marginLeft: 275}}>
            <Button success  onPress={this.handlePress}>
              <Text> Submit</Text>
            </Button>
            </View>

            <View style={{width: 50, marginLeft: 5}}>
              {/* {!isCameraVisible &&<Button title="Show me Camera" onPress={this.showCameraView} />}
              {isCameraVisible &&
              this.props.navigation.navigate("CameraPage")} */}
              {cam_bnt}

            </View>
          </View>


        </View>
      </Container>
    );
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
  });