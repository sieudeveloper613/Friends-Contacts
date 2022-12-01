import React from 'react';
import { StyleSheet, View } from 'react-native';

// import components files
import DetailListItem from '../components/DetailListItem';
import ContactThumbnail from '../components/ContactThumbnail';

// import utils files
import { fetchRandomContact } from '../utils/api';
import colors from '../utils/colors';

export default class Profile extends React.Component {

    componentDidMount() {
        const { navigation, route: { params } } = this.props;
        const { contact: { name } } = params;
        
        navigation.setOptions({
            title: name.split(' ')[0] + `'s profile`,
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: colors.blue,
            },
        }) 
    }

    render() {
        
        const { route: { params } } = this.props;
        const { contact } = params;
        const { avatar, name, email, phone, cell } = contact;
        
        return (
            <View style={styles.container}>
                <View style={styles.avatarSection}>
                    <ContactThumbnail avatar={avatar} name={name} phone={phone} />
                </View>

                <View style={styles.detailsSection}>
                    <DetailListItem icon='mail' title='Email' subtitle={email}/>
                    <DetailListItem icon='phone' title='Work' subtitle={phone}/>
                    <DetailListItem icon='smartphone' title='Personal' subtitle={cell}/>
                </View>
            </View>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatarSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.blue,
    },
    detailsSection: {
        flex: 1,
        backgroundColor: 'white',
    }
})
