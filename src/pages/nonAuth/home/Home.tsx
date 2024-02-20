import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput, Button, FlatList, TouchableOpacity, Image, Alert, BackHandler } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './HomeStyle';

import constants from "../../../helper/constants/Constants";
import { postApiWithHeader } from '../../../helper/api/Api';

import Toast from 'react-native-toast-message';
import Loader from '../../../components/loader/Loader';

import { useNavigation } from '@react-navigation/native';

//svg
import IconMenu from "../../../assets/svg/icon_menu.svg";
import IconChkOut from "../../../assets/svg/icon_check_out.svg";
import IconChkIn from "../../../assets/svg/icon_check_in.svg";
import IconPassword from "../../../assets/svg/password.svg";
import IconArrow from "../../../assets/svg/arrow_icon.svg";
import IconBackArrow from "../../../assets/svg/back_arrow_back_icon.svg";
import { ScrollView } from 'react-native-gesture-handler';

import moment from 'moment';

type ToastProps = {
  type: string,
  header: string,
  bodyMsg: string
};

type uId = {
  user_id: number,
}

var backHandler :any;

function Home(props: any) {

  const navigation = useNavigation();

  const [meetings, setMeetings] = useState([]);
  const [userCreds, setUserCreds] = useState();
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    try {
      AsyncStorage.getItem('user_credentials').then(res => {
        let data = JSON.parse(res);
        setUserCreds(data);
        get_meeting(data.user_id)
      })
    } catch (e) {
    }
  }, []);

  const show_toast = (obj: ToastProps) => {
    Toast.show({
      type: obj.type,
      text1: obj.header,
      text2: obj.bodyMsg
    });
  }
  const get_meeting = async (u_id: uId) => {

    let obj = {
      "user_id": u_id,
    }

    postApiWithHeader(constants.meeting_list, obj)
      .then(response => {

        setLoading(false);

        if (response.status == 0) {
          setMeetings(response.data);
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

  const RenderMeetings = (item: any) => {
    return (
      <View style={styles.card}>
        <View style={styles.view}>

          <View style={styles.left_view}>
            <View>
              <Text style={styles.left_title}>{item?.meetingdata?.customer_business_type_name}</Text>
              <View style={styles.left_bottom_txt_section}>
                <IconChkIn width={20} height={20} />
                <Text style={styles.left_bt_content}>{'Check In : ' + moment(item?.meetingdata?.checkin_date).local().format("DD MMM'YY hh:mm a")}</Text>
              </View>
            </View>
          </View>

          <View style={styles.right_view}>
            <View>
              <IconChkOut width={30} height={30} />
            </View>
            <Text style={styles.right_text}>Check-out</Text>
          </View>

        </View>
      </View>
    );
  }



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.toolbar}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            // props.navigation.navigate("User");
            navigation.toggleDrawer();
          }}
          style={styles.toolbar_touchableOpacity}>
          <IconMenu width={25} height={25} />
        </TouchableOpacity>
        <Image style={styles.toolbar_logo_img} source={require('../../../assets/imgs/company_logo.png')} />
      </View>

      <View style={styles.check_in_out_view}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            props.navigation.navigate("Check-Ins");
          }}
          style={styles.touchableOpacity}>
          <Image style={styles.in_out_img} source={require('../../../assets/imgs/checkin_bg.png')} resizeMode='contain' />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            props.navigation.navigate("My Expenses");
          }}
          style={styles.touchableOpacity}>
          <Image style={styles.in_out_img} source={require('../../../assets/imgs/expense_bg.png')} resizeMode='contain' />
        </TouchableOpacity>
        {/* <Image style={styles.in_out_img} source={require('../../../assets/imgs/checkin_bg.png')} resizeMode='contain' />
        <Image style={styles.in_out_img} source={require('../../../assets/imgs/expense_bg.png')} resizeMode='contain' /> */}
      </View>

      <ScrollView style={styles.scrolling}>
        <FlatList
          data={meetings}
          renderItem={({ item }) => <RenderMeetings meetingdata={item} />}
          keyExtractor={item => item.meeting_id}
        />
      </ScrollView>
      {loading ? <Loader></Loader> : null}
    </SafeAreaView>
  );
}

export default Home;
