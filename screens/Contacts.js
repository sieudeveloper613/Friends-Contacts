import React from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
} from 'react-native';

// import components
import ContactListItem from '../components/ContactListItem';

// import utils files
import { fetchContacts } from '../utils/api';
import colors from '../utils/colors';

// import state management
import store from '../store';

const keyExtractor = ({ phone }) => phone;

export default class Contacts extends React.Component {
    state = {
        contacts: store.getState().contacts,
        loading: store.getState().isFetchingContacts,
        error: store.getState().error,
    };

    async componentDidMount() {
        const { navigation: { setOptions } } = this.props;
        setOptions({
            title: 'Contacts',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: colors.blue
            }
        });

        this.unsubscribe = store.onChange(() => 
            this.setState({
                contacts: store.getState().contacts,
                loading: store.getState().isFetchingContacts,
                error: store.getState().error,
            })
        );

        const contacts = await fetchContacts();

        store.setState({ contacts, isFetchingContacts: false});


        // try {
        //     const contacts = await fetchContacts();

        //     this.setState({
        //         contacts,
        //         loading: false,
        //         error: false,
        //     });
        // } catch (e) {
        //     this.setState({
        //         loading: false,
        //         error: true,
        //     });
        // }
    };

    componentWillUnmount() {
        this.unsubscribe();
    }

    renderContact = ({ item }) => {
        const { id, name, avatar, phone } = item;
        // const { navigation } = this.props; or you can you this:
        const { navigation: { navigate } } = this.props;

        return <ContactListItem 
                    name={name} 
                    avatar={avatar} 
                    phone={phone}
                    onPress={() => navigate('Profile', { contact: item })} 
                />;
    };

    render() {
        const { loading, error, contacts } = this.state;

        const contactsSorted = contacts.sort((a, b) => 
        a.name.localeCompare(b.name));
        
        return (
            <View style={styles.container}>
                {loading && <ActivityIndicator size={'large'} />}
                {error && <Text>Error...</Text>}
                {!loading && 
                    !error && (
                        <FlatList
                            data={contactsSorted}
                            keyExtractor={keyExtractor}
                            renderItem={this.renderContact}
                        />
                    )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        flex: 1,
    }
})