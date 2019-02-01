import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, StatusBar} from 'react-native';

import {startGame, updateProp} from "../actions";
import Record from './Record';
import Block from './Block';
import Bottom from './Bottom';
import {retrieveRecords} from "../utils";

class Game extends Component {
    componentDidMount() {
        this.props.startGame();
        retrieveRecords().then((records) => {
            this.props.updateProp({key: "records", value: records});
        })
    }

    render() {
        const {blocks, modalOpen} = this.props.store;
        return (
            <View style={styles.container}>
                <StatusBar hidden/>
                {blocks.map(block=>{
                    return(
                        <Block
                            block={block}
                            key={block.id.toString()}
                        />
                    )
                })}
                <Bottom/>
                {modalOpen && <Record/>}
            </View>
        );
    }
}

mapStateToProps = store=>{
    return {store}
};

export default connect(
    mapStateToProps, {startGame, updateProp}
)(Game);

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "white"
    },
});