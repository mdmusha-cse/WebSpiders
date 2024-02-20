import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        margin: 5
    },
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
    img_section: {
        marginTop: '15%'
    },
    page_title: {
        fontSize: 18,
        fontWeight: '800',
        color:'#565d64'
    },
    profile_img_view: {
        backgroundColor: '#d9e7fd',
        borderRadius: 100,
        padding: 6
    },
    img: {
        height: 100,
        width: 100,
        borderRadius:50
    },
    camera: {
        backgroundColor: '#0058ed',
        height: 30,
        width: 30,
        position: 'absolute',
        bottom: 10,
        right: 0,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img_content: {
        alignContent: 'center',
        marginTop: 16,
        marginBottom: '15%'
    },
    name: {
        fontSize: 20,
        fontWeight: '800',
        textAlign: 'center',
        color:'#565d64'
    },
    designation: {
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
        color:'#565d64'
    },
    _input_view: {
        marginTop: 12,
        width: '90%',
        height: 50,
        borderRadius: 8,
        backgroundColor: '#eef3f7',
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden'
    },

    _input_view_img: {
        height: 20,
        width: 20,
        marginLeft: 8,
    },
    _input_view_text: {
        width: '90%',
        fontSize: 18,
        paddingLeft: 6,
        fontWeight: '400',
        color:'#565d64'
    },
    textTitle: {
        fontSize: 12,
        fontWeight: '600',
        marginBottom: -8,
        marginLeft: 16,
        color:'#565d64'
    },
    marginTop: {
        marginTop: 30,
    },
    reset: {
        marginTop: 12,
        width: '90%',
        height: 50,
        borderRadius: 8,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        borderBottomColor: '#d9e7fd',
        borderBottomWidth: 1
    },
    resetTxt: {
        width: '90%',
        fontSize: 17,
        paddingLeft: 6,
        fontWeight: '800',
        color:'#565d64'
    },
    arrow_svg: {
        width: 35,
        position: 'absolute',
        right: 0,
        justifyContent: 'center'
    }
});