import React, { useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    BackHandler,
    Alert,
    ActivityIndicator,
    TouchableOpacity,
    Image
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import IconBackArrow from "../../assets/svg/back_arrow_back_icon.svg";

export default function Toolbar(props: any) {
    const navigation = useNavigation();

    useEffect(() => {

    });

    return (
        <View style={styles.toolbar_view}>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                    navigation.goBack();
                }}
                style={styles.btn_view}>
                <IconBackArrow width={25} height={25} />
            </TouchableOpacity>
            <Text style={styles.page_title}>{props?.obj?.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    toolbar_view: {
        flexDirection: 'row',
        width: '90%',
        height: 40,
        alignItems: 'center'
    },
    btn_view: {
        width: 35,
        height: 30,
        justifyContent: 'center'
    },
    page_title: {
        fontSize: 18,
        fontWeight: '800',
        color: '#565d64'
    },
});