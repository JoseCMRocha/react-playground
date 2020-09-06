import express from 'express';
import path from "path";

import router from './ssr';

console.log("-- Initing Express app --");

const isDevelopment = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000;
const app = express();

if (isDevelopment) {
    console.log("-- Initing hmr in development mode --");

    const webpack = require('webpack');
    const config  = require('../webpack.config.js');

    const compiler = webpack(config);

    app.use(
        require('webpack-dev-middleware')(compiler, {
            serverSideRender: true,
            publicPath: config.output.publicPath,
            writeToDisk: (filePath) => {
                return /index\.html$/.test(filePath);
            },
        })
    );

    app.use(
        require('webpack-hot-middleware')(compiler, {
            log: false,
            path: '/__webpack_hmr',
            heartbeat: 10 * 1000,
        })
    );
} 

app.use(router);

app.use(express.static(path.join(__dirname, '../dist')));

app.listen(PORT, () => console.log('App is listening on port 3000!'));