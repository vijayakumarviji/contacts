import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const routes = (router)=> {
    _.each(fs.readdirSync(__dirname), (fileName)=> {
        if(fileName != 'index.js') {
            let appRoutes = require(path.join(__dirname, fileName));
            router = appRoutes.default(router)
        }
    })
    
    return router;
};

export default routes;