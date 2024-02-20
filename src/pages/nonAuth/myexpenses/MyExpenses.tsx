/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';

import {
    SafeAreaView,
    Text
} from 'react-native';

import Toolbar from '../../../components/toolbar/Toolbar';

function MyExpenses(props: any) {

    return (
        <SafeAreaView style={{ flex: 1, padding: 16 }}>
            <Toolbar obj={{ title: 'My Expenses' }} />
        </SafeAreaView>
    );
}

export default MyExpenses;
