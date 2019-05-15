import _ from 'lodash';
import fs from 'fs';
import path from 'path';

export const schemas = ()=> {
    let result = {};
    _.each(fs.readdirSync(__dirname), (fileName)=> {
        if(fileName != 'index.js') {
            let fileData = require(path.join(__dirname, fileName));
            Object.assign(result, fileData.default);
        }
    })
    return result;
};