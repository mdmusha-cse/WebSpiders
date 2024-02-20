/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  LogBox
} from 'react-native';

LogBox.ignoreAllLogs();//Ignore all log notifications

import Toast from 'react-native-toast-message';

//Splash screen
import Splash from './src/pages/splash/Splash';

//Auth pages
import Login from './src/pages/auth/login/Login';

//Non-auth pages
import Home from './src/pages/nonAuth/home/Home';
import Settings from './src/pages/nonAuth/settings/Settings';
import CheckIn from './src/pages/nonAuth/checkin/CheckIn';
import MyExpenses from './src/pages/nonAuth/myexpenses/MyExpenses';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

import CustomDrawer from './src/components/customdrawer/CustomDrawer';

//svg
import HomeIcon from "./src/assets/svg/home_icon.svg";
import SettingsIcon from "./src/assets/svg/settings.svg";
import CheckInIcon from "./src/assets/svg/check_ins.svg";
import MyExpensesIcon from "./src/assets/svg/my_expenses.svg";

const AuthStack = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen
      name="Login"
      component={Login}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);


const NonAuthStack = () => (
  <Drawer.Navigator
    drawerContent={props => <CustomDrawer {...props} />}
    screenOptions={{
      headerShown: false,
      drawerLabelStyle: {
        marginLeft: -25,
        fontWeight: '600',
        color: '#565d64',
        fontSize: 16,
      },
      drawerActiveBackgroundColor: '#0095FF25',
      drawerActiveTintColor: '#000',
    }}
  >
    <Drawer.Screen
      name="Home"
      component={Home}
      options={{
        drawerIcon: ({ color }) => <View style={styles.drawerIcon}>
          <HomeIcon width={20} height={20} />
        </View>,
      }}
    />
    <Drawer.Screen
      name="Settings"
      component={Settings}
      options={{
        drawerIcon: ({ color }) => <View style={styles.drawerIcon}>
          <SettingsIcon width={20} height={20} />
        </View>,
      }}
    />
    <Drawer.Screen
      name="Check-Ins"
      component={CheckIn}
      options={{
        drawerIcon: ({ color }) => <View style={styles.drawerIcon}>
          <CheckInIcon width={20} height={20} />
        </View>,
      }}
    />
    <Drawer.Screen
      name="My Expenses"
      component={MyExpenses}
      options={{
        drawerIcon: ({ color }) => <View style={styles.drawerIcon}>
          <MyExpensesIcon width={20} height={20} />
        </View>,
      }}
    />

  </Drawer.Navigator>
);

function App() {

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{
          headerShown: false,
          gestureEnabled: false
        }}>
          <Stack.Screen
            name="Splash"
            component={Splash}
          />
          <Stack.Screen
            name="AuthStack"
            component={AuthStack}
          />
          <Stack.Screen
            name="NonAuthStack"
            component={NonAuthStack}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  drawerIcon: {
    backgroundColor: '#fff',
    padding: 6,
    height: 35,
    width: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 8
  }
});

export default App;
