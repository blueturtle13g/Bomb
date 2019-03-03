import {AsyncStorage} from "react-native";

const getJustOpenPositives = ()=>{
    let justOpenPositives = [];
    for(let i = 0; i <=111; i=i+8){
        justOpenPositives.push(i);
    }
    return justOpenPositives;
};
const getJustOpenNegatives = ()=>{
    let justOpenNegatives = [];
    for(let i = 7; i <=111; i=i+8){
        justOpenNegatives.push(i);
    }
    return justOpenNegatives;
};

export const justOpenNegatives = getJustOpenNegatives();
export const justOpenPositives = getJustOpenPositives();

export const retrieveRecords = async ()=>{
    try {
        const retrievedItem =  await AsyncStorage.getItem('records');
        return JSON.parse(retrievedItem);
    } catch (error) {
        console.log(error.message);
    }
};

export const blockGen = ()=>{
    let blocks = [];

    for(let i = 0; i <= 111; i++){
        blocks.push({
            id: i,
            isBomb: ((Math.floor(Math.random() * 5) + 1) === 1),
            number: 0,
            isOpen: false,
            isFlagged: false,
        });
    }

    for(let i = 0; i <= 111; i++){
        if(!blocks[i].isBomb){
            if(!justOpenPositives.includes(i)){
                if(blocks[i-1]){
                    if(blocks[i-1].isBomb){
                        blocks[i].number++
                    }
                }

                if(blocks[i-9]){
                    if(blocks[i-9].isBomb){
                        blocks[i].number++
                    }
                }

                if(blocks[i+7]){
                    if(blocks[i+7].isBomb){
                        blocks[i].number++
                    }
                }
            }

            if(!justOpenNegatives.includes(i)){
                if(blocks[i+1]){
                    if(blocks[i+1].isBomb){
                        blocks[i].number++
                    }
                }

                if(blocks[i+9]){
                    if(blocks[i+9].isBomb){
                        blocks[i].number++
                    }
                }

                if(blocks[i-7]){
                    if(blocks[i-7].isBomb){
                        blocks[i].number++
                    }
                }
            }

            if(blocks[i+8]){
                if(blocks[i+8].isBomb){
                    blocks[i].number++
                }
            }

            if(blocks[i-8]){
                if(blocks[i-8].isBomb){
                    blocks[i].number++
                }
            }
        }
    }

    return { blocks};
};

export const openAround = (blocks, id)=>{
    if(!justOpenPositives.includes(id)){
        if(blocks[id-1]){
            if(!blocks[id-1].isOpen){
                blocks[id-1].isOpen = true;
                if(blocks[id-1].number === 0){
                    blocks = openAround(blocks, id-1)
                }
            }
        }

        if(blocks[id-9]){
            if(!blocks[id-9].isOpen){
                blocks[id-9].isOpen = true;
                if(blocks[id-9].number === 0){
                    blocks = openAround(blocks, id-9)
                }
            }
        }

        if(blocks[id+7]){
            if(!blocks[id+7].isOpen){
                blocks[id+7].isOpen = true;
                if(blocks[id+7].number === 0){
                    blocks = openAround(blocks, id+7)
                }
            }
        }
    }

    if(!justOpenNegatives.includes(id)){

        if(blocks[id+1]){
            if(!blocks[id+1].isOpen){
                blocks[id+1].isOpen = true;
                if(blocks[id+1].number === 0){
                    blocks = openAround(blocks, id+1)
                }
            }
        }

        if(blocks[id+9]){
            if(!blocks[id+9].isOpen){
                blocks[id+9].isOpen = true;
                if(blocks[id+9].number === 0){
                    blocks = openAround(blocks, id+9)
                }
            }
        }

        if(blocks[id-7]){
            if(!blocks[id-7].isOpen){
                blocks[id-7].isOpen = true;
                if(blocks[id-7].number === 0){
                    blocks = openAround(blocks, id-7)
                }
            }
        }
    }

    if(blocks[id+8]){
        if(!blocks[id+8].isOpen){
            blocks[id+8].isOpen = true;
            if(blocks[id+8].number === 0){
                blocks = openAround(blocks, id+8)
            }
        }
    }

    if(blocks[id-8]){
        if(!blocks[id-8].isOpen){
            blocks[id-8].isOpen = true;
            if(blocks[id-8].number === 0){
                blocks = openAround(blocks, id-8)
            }
        }
    }
    return blocks;
};

export const msToTime = s=> {
    // Pad to 2 or 3 digits, default is 2
    let pad = (n, z = 2) => ('00' + n).slice(-z);
    return pad(s/3.6e6|0) + ':' + pad((s%3.6e6)/6e4 | 0) + ':' + pad((s%6e4)/1000|0) + '.' + pad(s%1000, 3);
};