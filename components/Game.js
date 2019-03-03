import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet} from 'react-native';

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
        });
    }

    render() {
        const {blocks, modalOpen} = this.props.store;
        return (
            <View style={styles.container}>
                {blocks.map(block=>{
                    return(
                        <View style={styles.blockCon} key={block.id.toString()}>
                            <Block block={block}/>
                        </View>
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
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "#4a5a54"
    },
    blockCon:{
        height: "6.8%",
        width: "12.5%"
    }
});