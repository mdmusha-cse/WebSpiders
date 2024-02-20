import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: '#fff',
    },
    mian_view: {
        flex: 1,
        padding: 16,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        alignItems: 'center',
        backgroundColor: '#fff'
    },

    _input_view: {
        marginTop: 12,
        width: '90%',
        height: 50,
        borderColor: '#d0dae2',
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden'
    },

    _input_view_img: {
        height: 20,
        width: 20,
        marginLeft: 6
    },
    _input_view_hide_show_icon: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
    },
    _input_view_hide_show_icon_img: {
        height: 20,
        width: 20,
        tintColor: 'gray'
    },
    _input_view_text_input: {
        width: '90%',
        paddingLeft: 10,
        color: '#515b64'
    },

    _button: {
        backgroundColor: '#0048d1',
        marginTop: 25,
        borderRadius: 10,
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    _button_txt: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '800'
    },
    titleView: {
        width: '80%',
        marginTop: 16
    },
    textTitle: {
        fontSize: 12,
        fontWeight: '600',
        marginBottom: -2,
        color: '#565d64',
        textAlign: 'left'
    },
    forgot_pass_view:{
        width: '90%', 
        marginTop: 16 
    },
    forgot_txt:{
        fontSize: 16, 
        color: '#565d64', 
        textAlign: 'right', 
        fontWeight: '800'
    },

    header_view:{
        height: 300, 
        width: '100%', 
        flex: 2
    },
    view:{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    comp_logo:{
        width: 170,
        height: 30
    },
    text_view:{
        flex: 1
    },
    signin_txt:{
        textAlign: 'center', 
        color: '#565d64', 
        fontSize: 30, 
        fontWeight: '800' 
    }

});