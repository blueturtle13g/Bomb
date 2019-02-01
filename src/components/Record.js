import React, { Component } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ToastAndroid} from 'react-native';
import {connect} from 'react-redux';
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

import { msToTime } from '../utils';
import { updateProp, setNewRecord } from '../actions';

class Record extends Component {

    renderOldRecords = records=>{
        if(records){
            records.sort((a,b) => (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0));
            return(
                <ScrollView style={styles.oldRecordsCon}>
                    {records.map((record, i)=>{
                        return(
                            <View
                                key={record.time}
                                style={[styles.oldRecordCon]}
                            >
                                <Text style={[styles.texts, styles.rank]}>{i+1}</Text>
                                <Text style={styles.texts}>{record.name}</Text>
                                <Text style={[styles.texts]}>{msToTime(record.time)}</Text>
                            </View>
                        )
                    })}
                </ScrollView>
            )
        }

        return(
            <View style={[styles.oldRecordsCon, {justifyContent: "center", alignItems: "center"}]}>
                <Text style={[styles.texts, {fontSize: 25}]}>You have no record!</Text>
                <Entypo name={"emoji-happy"} size={100} color={"#fff"}/>
            </View>
        )
    };

    handleChangeText = value=>{
        if (value.length < 20) this.props.updateProp({key: "name", value});
        else ToastAndroid.showWithGravity(
            'No More Characters Are Allowed!',
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
        );
    };

    renderNewRecord = (newRecord)=>{
        if(!!newRecord){
            return(
                <View style={styles.newRecordCon}>
                    <TextInput
                        autoFocus
                        value={this.props.store.name}
                        onChangeText={this.handleChangeText}
                        style={styles.textInput}
                        placeholder={"Your Name"}
                        onSubmitEditing={this.props.setNewRecord}
                    />
                    <Text style={styles.texts}>
                        Save Your New Record: {msToTime(newRecord)}
                    </Text>
                </View>
            )
        }
    };

    render() {
        const { records, newRecord } = this.props.store;
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.closeModal}
                    onPress={()=> this.props.updateProp({key: "modalOpen", value: false})}
                >
                    <MaterialCommunityIcons name={"keyboard-backspace"} size={35} color={"#fff"}/>
                </TouchableOpacity>

                {this.renderOldRecords(records)}
                {this.renderNewRecord(newRecord)}

            </View>
        );
    }
}

function mapStateToProps(store) {
    return {store};
}

export default connect(
    mapStateToProps, { updateProp, setNewRecord }
)(Record);

const styles = StyleSheet.create({
    container:{
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        paddingHorizontal: 15,
        paddingTop: 50,
        backgroundColor: "#4a5a54",
        justifyContent: "center",
        alignItems: "center"
    },
    oldRecordsCon:{
        flex: 8,
        width: "100%",
    },
    oldRecordCon:{
        flex: 1,
        minHeight: 35,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginVertical: 2,
    },
    textInput:{
        borderWidth: 1,
        borderColor: "#aaa",
        width: 300,
        height: 40,
        padding: 3,
        fontSize: 18,
        color: "white"
    },
    texts:{
        fontSize: 17,
        fontStyle: "italic",
        textAlign: "center",
        color: "#fff"
    },
    newRecordCon:{
        marginTop: 15,
    },
    closeModal:{
        position: "absolute",
        top: 7,
        left: 7,
        zIndex: 2,
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 20
    },
    rank:{
        borderWidth: 1,
        borderRadius: 10,
        padding: 5
    }
});