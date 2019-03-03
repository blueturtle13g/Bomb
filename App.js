import React, {Component} from 'react';
import {View, StyleSheet } from 'react-native';
import {Provider} from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import Game from "./components/Game";

class App extends Component {
    render() {
        return (
            <Provider store={createStore(reducers)}>
                <View style={styles.container}>
                    <Game/>
                </View>
            </Provider>
        );
    }
}

export default App;

const styles = StyleSheet.create({
    container:{
        flex: 1
    }
});