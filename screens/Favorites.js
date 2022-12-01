import React from 'react';
import { StyleSheet,
         Text,
         View,
         FlatList,
         ActivityIndicator         
} from 'react-native'; 

// import utils files
import { fetchContacts } from '../utils/api';
import colors from '../utils/colors';

// import components
import ContactThumbnail from '../components/ContactThumbnail';

// import state management
import store from '../store';

const keyExtractor = ({ phone }) => phone;

export default class Favorites extends React.Component {
    state = {
        contacts: store.getState().contacts,
        loading: store.getState().isFetchingContacts,
        error: store.getState().error,
    };

    async componentDidMount() {
        const { navigation: { setOptions } } = this.props;
        setOptions({
            title: 'my Favorites',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: colors.blue,
            },
        });

        const { contacts } = this.state;

        this.unsubscribe = store.onChange(() => 
            this.setState({
                contacts: store.getState().contacts,
                loading: store.getState().isFetchingContacts,
                error: store.getState().error,
            })
        );

        if (contacts.length === 0) {
            const fetchedContacts = await fetchContacts();

            store.setState({ contacts: fetchedContacts, isFetchingContacts: true});
        }

        // try {
        //     const contacts = await fetchContacts();
        //     this.setState({
        //         contacts,
        //         loading: false,
        //         error: false,
        //     });
        // } catch (error) {
        //     this.setState({
        //         loading: false,
        //         error: true,
        //     })
        // }
    };

    componentWillUnmount() {
        this.unsubscribe();
    }
    
    renderFavoriteThumbnail = ({ item }) => {
        const { navigation: { navigate } } = this.props;
        const { avatar } = item;

        return (
            <ContactThumbnail
                avatar={avatar}
                onPress={ () => navigate('Profile', { contact: item })}
            />
        );
    };

    render() {
        const { loading, contacts, error } = this.state;
        const favorites = contacts.filter(contact => contact.favorite);

        return ( 
            <View style={styles.container}>
                {loading && <ActivityIndicator size="large" />}
                {error && <Text>Error...</Text>}

                {!loading &&
                    !error && ( 
                        <FlatList
                            data={favorites}
                            keyExtractor={keyExtractor}
                            numColumns={3}
                            contentContainerStyle={styles.list}
                            renderItem={this.renderFavoriteThumbnail}
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
    },
    list: {
        alignItems: 'center',
    },
});