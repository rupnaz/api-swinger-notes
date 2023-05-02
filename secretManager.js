import * as fs from 'fs';

const getSecret = () =>{
    const dataFile = fs.readFileSync("./key.txt" )
    return dataFile.toString();
}


export {getSecret}