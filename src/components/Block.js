import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { openBlock, toggleFlag} from "../actions";

import {LOST, PLAYING, WON} from "../actions/types";
const w = Dimensions.get('window');

class Block extends Component {

    renderContent = (isOpen)=>{
        const { condition } = this.props.store;
        const { isBomb, number, isFlagged } = this.props.block;
        if(!isOpen){
            return(
                <Text style={[styles.text, condition === LOST && {color: "#ff7869"}, condition === WON && {color: "#60ff6d"} ]}>
                    {isBomb ? <MaterialCommunityIcons name={"bomb"} size={30} color={"#ff7869"}/>
                    :
                        (!!number) && number}
                </Text>
            )
        }else if(isFlagged){
            return <MaterialCommunityIcons name={"flag-checkered"} size={30} color={"#60ff6d"}/>
        }
    };

    render() {
        const { condition } = this.props.store;
        const { block, openBlock, toggleFlag } = this.props;
        const isOpen = condition !== PLAYING || block.isOpen;
        return (
            <TouchableOpacity
                delayLongPress={200}
                onLongPress={()=> toggleFlag(block.id)}
                onPress={()=> openBlock(block.id)}
                activeOpacity={.7}
                style={[styles.container, block.isOpen && { backgroundColor: "#4a5a54"}]}
            >
                {this.renderContent(isOpen)}
            </TouchableOpacity>
        );
    }
}

function mapStateToProps(store) {
    return {store};
}

export default connect(
    mapStateToProps, { openBlock, toggleFlag}
)(Block);

const styles = StyleSheet.create({
    container:{
        width: w.width / 8,
        height: w.height/14,
        borderWidth: .3,
        backgroundColor: "#2b2b2b",
        borderColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
    },
    text:{
        color: "#fffb8b",
        fontSize: 18
    }
});