import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  BackHandler,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ImageBackground
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { postApiWithHeader } from '../../helper/api/Api';
import constants from '../../helper/constants/Constants';
import Loader from '../loader/Loader';
import Toast from 'react-native-toast-message';

//svg
import IconMail from "../../assets/svg/Icon_mail.svg";
import IconCall from "../../assets/svg/Icon_call.svg";
import IconLogout from "../../assets/svg/logout.svg";
import IconLogo from "../../assets/svg/we_app_logo.svg";


const CustomDrawer = (props) => {
  const [userInfo, setUserInfo] = useState();
  const [loader, setLoading] = useState(false);


  useEffect(() => {
    const focusListener = props.navigation.addListener('state', () => {

    });

    return focusListener;
  }, [props.navigation]);

  useEffect(() => {
    try {
      AsyncStorage.getItem('user_credentials').then(res => {
        let data = JSON.parse(res);
        get_user(data.user_id)
      })
    } catch (e) {
    }
  }, []);

  const get_user = async (u_id) => {
    console.log(u_id);
    let obj = {
      "user_id": u_id,
    }

    postApiWithHeader(constants.user_details, obj)
      .then(response => {

        setLoading(false);

        if (response.status == 0) {
          setUserInfo(response.data[0]);
        }
        else {
          show_toast({ type: 'error', header: response.msg, bodyMsg: '' });
        }
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        show_toast({ type: 'error', header: 'Unknown error has occurred.', bodyMsg: '' });
      });
  }

  const _user_logout = async () => {
    props.navigation.toggleDrawer();
    try {
      await AsyncStorage.clear();

      props.navigation.reset({
        index: 0,
        routes: [{ name: 'AuthStack' }],
      });
    } catch (e) {
      // remove error
    }
  }

  const showToast = (type, msg) => {
    Toast.show({
      type: type,
      //   text1: 'Hello',
      text2: msg
    });
  }


  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView
        {...props}

        contentContainerStyle={{ backgroundColor: 'transparent' }}>

        <ImageBackground source={require('../../assets/imgs/menu_bg_top.png')} resizeMode="cover" style={styles.bgImg}>
          <View style={styles.bgImgView}>
            <Image style={styles.profileImg} source={{ uri: 'https://media.assettype.com/TNIE%2Fimport%2F2019%2F6%2F26%2Foriginal%2FJiivi.jpg?w=480&auto=format%2Ccompress&fit=max' }} />
            {/* <Image style={styles.profileImg} source={{uri:userInfo?.profile_image}} /> */}

            <View style={styles.topBnrContentView}>
              <Text style={styles.name}>{userInfo?.first_name + ' ' + userInfo?.last_name}</Text>

              <View style={styles.rightCntView}>
                <IconMail width={23} height={23} />
                <View style={styles.contentTxtView}>
                  <Text style={styles.contText}>{userInfo?.email}</Text>
                </View>
              </View>

              <View style={styles.rightCntView}>
                <IconCall width={23} height={23} />
                <View style={styles.contentTxtView}>
                  <Text style={styles.contText}>{userInfo?.phone}</Text>
                </View>
              </View>

            </View>
          </View>

        </ImageBackground>

        <DrawerItemList {...props} />

      </DrawerContentScrollView>

      <View>
        <TouchableOpacity
          onPress={() => {
            Alert.alert("Logout", "Are you want to Logout?", [
              {
                text: "Cancel",
                onPress: () => { null },
                style: "cancel"
              },
              { text: "YES", onPress: () => { _user_logout() } }
            ]);
          }}
          style={styles.footerview}>
          <IconLogout width={25} height={25} />
          <View style={styles.footerTxtView}>
            <Text style={styles.logoutTxt}>Logout</Text>
            <Text style={styles.versionTxt}>Version 1.0</Text>
          </View>
        </TouchableOpacity>
        <IconLogo width={40} height={40} style={styles.appIcon} />
      </View>
      {loader ? <Loader></Loader> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
    marginTop: -5
  },
  bgImg: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
  },
  bgImgView: {
    flexDirection: 'row',
    padding: 8
  },
  profileImg: {
    height: 100,
    width: 100,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  topBnrContentView: {
    justifyContent: 'center',
    marginLeft: 8
  },
  name: {
    fontWeight: '800',
    fontSize: 16,
    color: '#fff'
  },
  rightCntView: {
    flexDirection: 'row',
    marginLeft: -4
  },
  contentTxtView: {
    justifyContent: 'center'
  },
  contText: {
    fontSize: 12,
    color: '#fff'
  },
  footerview: {
    flexDirection: 'row',
    padding: 16
  },
  footerTxtView: {
    justifyContent: 'center'
  },
  logoutTxt: {
    fontSize: 16,
    color: '#565d64',
    fontWeight: '600'
  },
  versionTxt: {
    fontSize: 10,
    color: '#565d64'
  },
  appIcon: {
    position: 'absolute',
    top: 16,
    right: 16
  }
});

export default CustomDrawer;