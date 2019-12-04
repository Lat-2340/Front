import React from "react"
import Home from "../home/home.js"
import UpdatePage from "../user/update.js"
import SideBar from "../sidebar/sidebar.js"
import { createDrawerNavigator } from "react-navigation-drawer";

const HomeScreenRouter = createDrawerNavigator(
  {
    Home: { screen: Home},
    UpdatePage: { screen: UpdatePage}
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);

export default HomeScreenRouter;