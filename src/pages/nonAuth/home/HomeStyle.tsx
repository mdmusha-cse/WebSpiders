import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center'
    },
    toolbar: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    toolbar_logo_img: {
        width: 170,
        height: 30
    },
    toolbar_touchableOpacity: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0
    },
    toolbar_touchableOpacity_img: {
        width: 30,
        height: 30
    },
    check_in_out_view: {
        width: '90%',
        flexDirection: 'row',
        marginTop: 16,
        marginBottom: -30
    },
    touchableOpacity: {
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden'
    },

    in_out_img: {
        // flex: 1,
        height: 225
    },
    scrolling: {
        width: '100%'
    },
    card: {
        width: '100%',
        alignItems: 'center'
    },
    view: {
        width: '90%',
        backgroundColor: '#fff',
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 4,
        borderRadius: 15,
        flexDirection: 'row',
        flex: 10,
        overflow: 'hidden'
    },
    left_view: {
        flex: 8,
        padding: 16,
        justifyContent: 'center'
    },
    left_title: {
        color: '#4c535c',
        fontSize: 16,
        fontWeight: '600'
    },
    left_bottom_txt_section: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    left_bt_content: {
        color: '#4c535c',
        fontSize: 10,
        fontWeight: '500',
        marginTop: -5,
        marginLeft: 2
    },
    right_view: {
        padding: 10,
        flex: 2,
        backgroundColor: '#ffc000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    right_text: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600'
    }
})