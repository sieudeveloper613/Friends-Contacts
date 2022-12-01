import React from 'react';
import { StyleSheet,
         Text,
         View, 
         ActivityIndicator        
        } from 'react-native';

// import components
import ContactThumbnail from '../components/ContactThumbnail';

// import state management
import store from '../store';


// import utils files
import colors from '../utils/colors';
import { fetchUserContact } from '../utils/api';

// import Icons
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class User extends React.Component {
    state = {
        user: store.getState().user,
        loading: store.getState().isFetchingUser,
        error: store.getState().error,
    };

    async componentDidMount() {
        const { navigation: { setOptions, navigate } } = this.props;
        setOptions({
            title: 'Me',
            headerTintColor: 'white',
            
            headerStyle: {
                backgroundColor: colors.blue,
            },
            headerRight: () => (
                <Icon 
                name='settings'
                size={24}
                style={{ color: 'white', marginRight: 10 }}
                onPress={ () => navigate('Options')}
            />
            )
        });

        this.unsubscribe = store.onChange(() =>
            this.setState({
                user: store.getState().user,
                loading: store.getState().isFetchingUser,
                error: store.getState().error,
            })
        );

        const user = await fetchUserContact();

        store.setState({ user, isFetchingUser: false});

        // try {
        //     const user = await fetchUserContact();

        //     this.setState({ 
        //         user,
        //         loading: false,
        //         error: false,
        //     });
        // } catch (error) {
        //     this.setState({
        //         loading: false,
        //         error: true,
        //     });
        // }
    };

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const { user, loading, error } = this.state;
        const { avatar, name, phone } = user;

        return (
            <View style={styles.container}>
                { loading && <ActivityIndicator size={'large'} color='white'/> }
                { error && <Text>Error...loading failed!</Text>}
                
                { !loading && (
                    <ContactThumbnail avatar={avatar} name={name} phone={phone}/>
                ) }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.blue,
    }
})