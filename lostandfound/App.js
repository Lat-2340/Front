import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation'

import Login from './screen/login/login.js'
import Signon from './screen/login/signon.js'
import UpdatePage from './screen/update/update.js'
import HomePage from './screen/home/index.js'
import LostPage from './screen/lost/lost.js'
import FoundPage from './screen/found/found.js'
import SideBar from './screen/sidebar/sidebar.js'
import ItemListPage from './screen/ItemList/ItemList.js'
import ItemDetailPage from './screen/ItemList/ItemDetail.js'
import CameraPage from './screen/lost/camera.js'

console.disableYellowBox = true;

const navigator = createStackNavigator(
  {
    Login: { screen: Login },
    Signon: { screen: Signon },
    UpdatePage: {screen: UpdatePage},
    SideBar: {screen: SideBar},
    LostPage: {screen: LostPage, navigationOptions: {
                    header: null,
                  }},
    FoundPage: {screen: FoundPage, navigationOptions: {
                    header: null,
                  }},
    HomePage: {screen: HomePage, navigationOptions: {
                    header: null,
                  }} ,
    ItemListPage: {screen: ItemListPage, navigationOptions: {
                    header: null,
                  }},
    ItemDetailPage: {screen: ItemDetailPage, navigationOptions: {
                    header: null,
                  }},
    CameraPage: {screen: CameraPage, navigationOptions: {
      header: null,
    }},
  },
  {
    initialRouteName: "Login"
  }
);

const App = createAppContainer(navigator)
export default App
