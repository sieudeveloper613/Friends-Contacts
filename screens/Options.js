import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, View } from 'react-native';

// import components
import DetailListItem from '../components/DetailListItem';

// import utils files
import colors from '../utils/colors';

export default class Options extends React.Component {
    componentDidMount() {
        const { navigation: { goBack, setOptions } } = this.props;
        setOptions({
            title: 'Options',
            tabBarStyle: { display: 'none' },
            headerLeft: () => (
                <Icon
                    name="close"
                    size={24}
                    style={{ color: colors.black, marginLeft: 0, marginRight: 10 }}
                    onPress={() => goBack()}
                    />
            ),
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <DetailListItem title='Update Profile'/>
                <DetailListItem title='Change Language'/>
                <DetailListItem title='Sign out'/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
})