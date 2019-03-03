import {
    PLAYING,
    WON,
    LOST,
    OPEN_BLOCK,
    TOGGLE_FLAG,
    START_GAME,
    SET_NEW_RECORD,
    UPDATE_PROP,
} from "../actions/types";
import {AsyncStorage} from "react-native";
import {blockGen, openAround} from '../utils';

const INITIAL_STATE = {
    blocks:[],
    condition: PLAYING,
    startTime: 0,
    modalOpen: false,
    newRecord: 0,
    records: [],
    name: ""
};

export default (state = INITIAL_STATE, action) =>{
    switch (action.type){

        case OPEN_BLOCK:
            let id = action.payload;
            let blocks = [...state.blocks];
            if(state.condition !== PLAYING || blocks[id].isFlagged) return {...state};
            if(blocks[id].isBomb) return {...state, condition: LOST};
            blocks[id].isOpen = true;
            if(blocks[id].number === 0) {
                blocks = openAround(blocks, action.payload);
            }
            let playing = false;

            for(let block of blocks){
                if(!block.isOpen && !block.isBomb){
                    playing = true;
                    break;
                }
            }

            if(playing) return {...state, blocks};
            return {...state, blocks, condition: WON, newRecord: Date.now() - state.startTime, modalOpen: true};

        case TOGGLE_FLAG:
            blocks = [...state.blocks];
            blocks[action.payload].isFlagged = !blocks[action.payload].isFlagged;
            return {...state, blocks};

        case START_GAME:
            return {...state, startTime: Date.now(), condition: PLAYING, ...blockGen()};

        case SET_NEW_RECORD:
            const { newRecord, records, name} = state;
            let newRecords = [];
            if(records !== null){
                newRecords = [...records, {name, time: newRecord}];
            }else{
                newRecords = [{name, time: newRecord}];
            }
            AsyncStorage.setItem('records', JSON.stringify(newRecords));
            return {...state, records: newRecords, newRecord: 0, name: ""};

        case UPDATE_PROP:
            return {...state, [action.payload.key]: action.payload.value};

        default: return INITIAL_STATE;
    }
}