import {
    SET_NEW_RECORD,
    START_GAME,
    UPDATE_PROP,
    OPEN_BLOCK,
    TOGGLE_FLAG,
} from "./types";

export const startGame = ()=>{
    return{
        type: START_GAME
    }
};

export const updateProp = (keyVal)=>{
    return{
        type: UPDATE_PROP,
        payload: keyVal
    }
};

export const setNewRecord = ()=>{
    return{
        type: SET_NEW_RECORD
    }
};

export const openBlock = id=>{
    return{
        type: OPEN_BLOCK,
        payload: id
    }
};

export const toggleFlag = id=>{
    return{
        type: TOGGLE_FLAG,
        payload: id
    }
};