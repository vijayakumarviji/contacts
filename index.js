import DotEnv from 'dotenv';
DotEnv.config();

let app = require('./src/app');

Promise.resolve(app.main()).then((server) => {
    console.log(`Running..,`)
}).catch((e) => {
    console.log(e.message)
})