// import React from 'react';
// import { Text, View, TouchableOpacity } from 'react-native';
// import * as Permissions from 'expo-permissions';
// import { Camera } from 'expo-camera';
// import * as FileSystem from 'expo-file-system';

// export default class CameraExample extends React.Component {
  
//   constructor(props) {
//     super(props);
//     this.state = {
//         hasCameraPermission: null,
//         type: Camera.Constants.Type.back,
//         photoId: 0
//     };
//   }


//   async componentDidMount() {
//     const { status } = await Permissions.askAsync(Permissions.CAMERA);
//     this.setState({ hasCameraPermission: status === 'granted' });
//   }

//   render() {
//     const { hasCameraPermission } = this.state;
//     if (hasCameraPermission === null) {
//       return <View />;
//     } else if (hasCameraPermission === false) {
//       return <Text>No access to camera</Text>;
//     } else {
//       return (
//         <View style={{ flex: 1 }}>
//           <Camera style={{ flex: 1 }} type={this.state.type}>
//             <View
//               style={{
//                 flex: 1,
//                 backgroundColor: 'transparent',
//                 flexDirection: 'row',
//               }}>
//               <TouchableOpacity
//                 style={{
//                   flex: 0.1,
//                   alignSelf: 'flex-end',
//                   alignItems: 'center',
//                 }}
//                 onPress={() => {
//                   this.setState({
//                     type:
//                       this.state.type === Camera.Constants.Type.back
//                         ? Camera.Constants.Type.front
//                         : Camera.Constants.Type.back,
//                   });
//                 }}>
//                 <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                             style={{
//                             flex: 1,                    //flex为0.1改成flex为1
//                             alignSelf: 'flex-end',
//                             alignItems: 'center',
//                             }}
//                             //参照官网的Methods
//                             onPress={async () => {
                                
//                                     // let photo = await this.camera.takePictureAsync();
//                                     // console.log(photo)
//                                     let photo = await this.camera.takePictureAsync();
//                                     console.log(photo)
//                                     let resizedPhoto = await ImageManipulator.manipulate(
//                                         photo.uri,
//                                         [{ resize: { width: 108, height: 192 } }],
//                                         { compress: 0, format: "jpg", base64: false }
//                                     );
//                                     console.log(resizedPhoto.uri)
//                                     FileSystem.moveAsync({
//                                         from: resizedPhoto.uri,
//                                         to: `${FileSystem.documentDirectory}photos/Photo_${
//                                             this.state.photoId
//                                         }.jpg`
//                                     })
//                                         .then(({ uri }) => {
//                                             console.log('Finished downloading to ', uri);
//                                         })
//                                         .catch(error => {
//                                             console.error(error);
//                                         });
//                                     this.setState({ photoId: this.state.photoId + 1 });
//                                     Vibration.vibrate();                                
//                             }}>
//                             <Text
//                             style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
//                             {' '}开始拍照{' '}
//                             </Text>
//                         </TouchableOpacity>
//             </View>
//           </Camera>
//         </View>
//       );
//     }
//   }

    

// }



import * as React from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
    file: null
  };
  

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        /> */}
        {image &&
        <View>
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
          <Button
            title="Use this image"
            onPress={this.uploadImage}
            />
        </View>}
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
    console.log('hi');
    this._pickImage();
    if(this.state.image){
      this.uploadImage();
    }
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.001,
      base64: true
    });

    console.log(result);

    if (!result.cancelled) {
      console.log(result.base64)
      this.setState({ 
        image: result.uri,
        file: result.base64 });
    }

    if (result.cancelled) {
      this.props.navigation.goBack(); 
    }
  };

  uploadImage = async () =>{
    //   this.props.navigation.goBack("LostPage",{
    //       image: this.image
    //   });
    const {navigate,goBack,state} = this.props.navigation;
    // console.log(this.state);
    state.params.callback(this.state.file);
    this.props.navigation.goBack(); 
  };
}