import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from 'react-redux';

import { startGame, updateProp } from '../actions';
import {PLAYING} from "../actions/types";
import { msToTime } from '../utils';

let durationInterval = null;

class Bottom extends Component {
    state={ duration: "00:00:00" };

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
                    style={styles.button}
                    onPress={()=>{
                        this.props.startGame();
                        this.setState({duration: "00:00:00"});
                        this.setDurationTimeOut();
                    }}
                >
                    <MaterialCommunityIcons name={"restart"} size={28} color={"#28b3d5"}/>
                </TouchableOpacity>
                <Text style={styles.text}>{duration.split('.')[0]}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=> this.props.updateProp({key: "modalOpen", value: true})}
                >
                    <MaterialCommunityIcons name={"timer"} size={28} color={"#28b3d5"}/>
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
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#466380"
    },
    text: {
        color: "#fff",
        fontSize: 20
    },
    button:{
        width: "33.3%",
        justifyContent: "center",
        alignItems: "center",
    }
});