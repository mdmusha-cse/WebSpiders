/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';

import {
    SafeAreaView,
    Text,
    Image,
    View,
    TouchableOpacity
} from 'react-native';

import styles from './SettingsStyle';

import constants from "../../../helper/constants/Constants";
import { postApiWithHeader } from '../../../helper/api/Api';

import Toast from 'react-native-toast-message';
import Loader from '../../../components/loader/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

//svg
import IconCamera from "../../../assets/svg/Camera.svg";
import IconMail from "../../../assets/svg/mail.svg";
import IconUser from "../../../assets/svg/user.svg";
import IconPassword from "../../../assets/svg/password.svg";
import IconArrow from "../../../assets/svg/arrow_icon.svg";
import IconBackArrow from "../../../assets/svg/back_arrow_back_icon.svg";

import Toolbar from '../../../components/toolbar/Toolbar';

type ToastProps = {
    type: string,
    header: string,
    bodyMsg: string
};

type uId = {
    user_id: number,
}

function Splash(props: any) {
    const [userCreds, setUserCreds] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            AsyncStorage.getItem('user_credentials').then(res => {
                let data = JSON.parse(res);
                get_user(data.user_id)
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
    const get_user = async (u_id: uId) => {
        console.log(u_id);
        let obj = {
            "user_id": u_id,
        }

        postApiWithHeader(constants.user_details, obj)
            .then(response => {

                setLoading(false);

                if (response.status == 0) {
                    setUserCreds(response.data[0]);
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

    return (
        <SafeAreaView style={styles.container}>

            <Toolbar obj={{ title: 'Settings' }} />

            <View style={styles.img_section}>
                <View style={styles.profile_img_view}>
                    <Image style={styles.img} source={{ uri: 'https://media.assettype.com/TNIE%2Fimport%2F2019%2F6%2F26%2Foriginal%2FJiivi.jpg?w=480&auto=format%2Ccompress&fit=max' }} />
                    {/* <Image style={styles.img} source={{ uri: userCreds?.profile_image }} /> */}
                    <View style={styles.camera}>
                        <IconCamera width={35} height={35} />
                    </View>
                </View>

                <View style={styles.img_content}>
                    <Text style={styles.name}>
                        {userCreds?.first_name + ' ' + userCreds?.last_name}
                    </Text>
                    <Text style={styles.designation}>
                        {userCreds?.designation}
                    </Text>
                </View>
            </View>

            <View>
                <Text style={styles.textTitle}>Username</Text>
                <View style={styles._input_view}>
                    <IconUser width={20} height={22} style={styles._input_view_img} />
                    <Text style={styles._input_view_text}>
                        {userCreds?.username}
                    </Text>
                </View>
            </View>

            <View style={styles.marginTop}>
                <Text style={styles.textTitle}>Email</Text>
                <View style={styles._input_view}>
                    <IconMail width={20} height={22} style={styles._input_view_img} />
                    <Text style={styles._input_view_text}>
                        {userCreds?.email}
                    </Text>
                </View>
            </View>

            <View style={styles.marginTop}>
                <View style={styles.reset}>
                    <IconPassword width={20} height={22} style={styles._input_view_img} />
                    <Text style={styles.resetTxt}>
                        Reset Password
                    </Text>
                    <View style={styles.arrow_svg}>
                        <IconArrow width={15} height={15} />
                    </View>
                </View>
            </View>

            {loading ? <Loader></Loader> : null}
        </SafeAreaView>
    );
}

export default Splash;
