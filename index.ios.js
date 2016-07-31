// node modules
import React from 'react';
import {View, AppRegistry, MapView, StyleSheet, Text} from 'react-native';
// app modules
import Api from './src/api';

class Weather extends React.Component {
    constructor() {
        super();

        this.state = {
            pin: {
                latitude: 0,
                longitude: 0
            },
            name: '',
            temperature: '',
            description: ''
        };

        this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
        this.renderText = this.renderText.bind(this);
    }

    renderText(loading) {
        if (!loading) {
            return <Text style={styles.text}>Loading</Text>;
        }

        return (
            <View style={styles.textWrapper}>
                <Text style={styles.text}>{this.state.name}</Text>
                <Text style={styles.text}>{this.state.temperature}&deg;C</Text>
                <Text style={styles.text}>{this.state.description}</Text>
            </View>
        );
    }

    render() {

        return (
            <View style={styles.container}>
                <MapView style={styles.map}
                         onRegionChangeComplete={this.onRegionChangeComplete}
                         annotations={[this.state.pin]}
                ></MapView>
                <View style={styles.textWrapper}>
                    {this.renderText(this.state.name)}
                </View>
            </View>
        );
    }

    onRegionChangeComplete(region) {
        const {latitude, longitude} = region;
        this.setState({
            pin: {
                latitude,
                longitude
            }
        });
        Api(latitude, longitude).then(data => {
            this.setState(data);
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF'
    },
    map: {
        flex: 2,
        marginTop: 30
    },
    textWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 30
    }
});


AppRegistry.registerComponent('weather', () => Weather);

