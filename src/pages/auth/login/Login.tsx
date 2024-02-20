import React, { useState, useEffect } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  BackHandler,
  Alert
} from 'react-native';

import styles from './LoginStyle';
import Toast from 'react-native-toast-message';
import Loader from '../../../components/loader/Loader';

import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from "../../../helper/constants/Constants";
import { postApiWithHeader } from '../../../helper/api/Api';

//svg
import IconPassword from "../../../assets/svg/password.svg";
import IconUser from "../../../assets/svg/user.svg";
import IconEyeOpen from "../../../assets/svg/icon_open_eye.svg";
import IconEyeClose from "../../../assets/svg/icon_closed_eye.svg";

type ToastProps = {
  type: string,
  header: string,
  bodyMsg: string
};

type userProps = {
  email: string,
  password: string
};

var backHandler:any;

const Login = (props: any) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Exit App", "Do you want to exit this application?", [
        {
          text: "Cancel",
          onPress: () => { null },
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    props.navigation.addListener('focus', () => {
      backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
    });

    props.navigation.addListener('blur', () => {
      backHandler.remove();
    });

    // return focusListener;
    return () => backHandler.remove();
  }, []);


  const form_validation = () => {

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (email == '') {
      show_toast({ type: 'error', header: 'Enter username', bodyMsg: '' });
    }
    // else if (reg.test(email) === false) {
    //   show_toast({ type: 'error', header: 'Invalid email address', bodyMsg: '' });
    // }
    else if (password == '') {
      show_toast({ type: 'error', header: 'Enter your password', bodyMsg: '' });
    }
    else {
      setLoading(true);
      login();
    }
  }

  const login = async () => {

    let obj = {
      "email": email,
      "password": password
    }

    postApiWithHeader(constants.user_login, obj)
      .then(response => {
        setLoading(false);

        if (response.status == 0) {
          // show_toast({ type: 'success', header: 'Login successful', bodyMsg: '' });
          storeData(response.data);
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

  const show_toast = (obj: ToastProps) => {
    Toast.show({
      type: obj.type,
      text1: obj.header,
      text2: obj.bodyMsg
    });
  }

  const storeData = async (obj: userProps) => {
    try {
      await AsyncStorage.setItem('user_credentials', JSON.stringify(obj));

      props.navigation.navigate("NonAuthStack");

    } catch (e) {
      // saving error
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ImageBackground source={require('../../../assets/imgs/bg.png')} resizeMode="cover">

          <View style={styles.header_view}>
            <View style={styles.view}>
              <Image style={styles.comp_logo} source={require('../../../assets/imgs/company_logo.png')} />
            </View>
            <View style={styles.text_view}>
              <Text style={styles.signin_txt}>Sign In</Text>
            </View>
          </View>

          <View style={styles.mian_view}>

            <View style={styles.titleView}>
              <Text style={styles.textTitle}>Username</Text>
            </View>

            <View style={styles._input_view}>
              <IconUser width={25} height={25} style={styles._input_view_img} />
              <TextInput
                style={styles._input_view_text_input}
                onChangeText={text => setEmail(text)}
                value={email}
                placeholder="Enter username"
                placeholderTextColor='#515b64'
              />
            </View>

            <View style={styles.titleView}>
              <Text style={styles.textTitle}>Password</Text>
            </View>

            <View style={styles._input_view}>
              <IconPassword width={25} height={25} style={styles._input_view_img} />
              <TextInput
                style={styles._input_view_text_input}
                onChangeText={text => setPassword(text)}
                value={password}
                placeholder="Enter password"
                placeholderTextColor='#515b64'
                secureTextEntry={passwordType ? true : false}
                maxLength={20}
              />
              <TouchableOpacity style={styles._input_view_hide_show_icon}
                activeOpacity={0.8}
                onPress={() => {
                  setPasswordType(!passwordType);
                }}

              >
                <>{passwordType ? <IconEyeOpen width={30} height={30} /> : <IconEyeClose width={30} height={30} />}</>

              </TouchableOpacity>
            </View>

            <View style={styles.forgot_pass_view}>
              <Text style={styles.forgot_txt}>Forgot password?</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                form_validation();
              }}
              style={styles._button}>
              <Text style={styles._button_txt}>Sign In</Text>
            </TouchableOpacity>

          </View>
        </ImageBackground>
      </ScrollView>
      {loading ? <Loader></Loader> : null}
    </SafeAreaView>
  );
};

export default Login;