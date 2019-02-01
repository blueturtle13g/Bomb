import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { connect } from 'react-redux';

import { startGame, updateProp } from '../actions';
import {PLAYING} from "../actions/types";
import { msToTime } from '../utils';

let durationInterval = null;
const w = Dimensions.get('window');

class Bottom extends Component {
    state={
        duration: "00:00:00"
    };

    componentDidMount() {
        this.setDurationTimeOut();
    }

    setDurationTimeOut = ()=>{
        durationInterval = setInterval(()=>{
            if(this.props.store.condition !== PLAYING){
                clearInterval(durationInterval);
                return;
            }
            this.setState({duration: msToTime(Date.now() - this.props.store.startTime)})
        }, 1000)
    };

    render() {
        const { duration } = this.state;
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={()=>{
                        this.props.startGame();
                        this.setState({duration: "00:00:00"});
                        this.setDurationTimeOut();
                    }}
                >
                    <MaterialCommunityIcons name={"restart"} size={35} color={"#fff"}/>
                </TouchableOpacity>
                <Text style={styles.text}>{duration.split('.')[0]}</Text>
                <TouchableOpacity
                    onPress={()=> this.props.updateProp({key: "modalOpen", value: true})}
                >
                    <MaterialCommunityIcons name={"timer"} size={35} color={"#fff"}/>
                </TouchableOpacity>
            </View>
        );
    }
}

mapStateToProps = (store)=>{
    return {store}
};

export default connect(mapStateToProps, {startGame, updateProp})(Bottom);

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        height: w.height/14,
        width: "100%",
        backgroundColor: "purple",
        justifyContent: "space-around",
        alignItems: "center"
    },
    text: {
        color: "#fffb8b",
        fontSize: 20
    }
});