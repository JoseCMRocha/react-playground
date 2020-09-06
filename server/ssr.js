import express from "express";
import fs  from "fs";
import path from"path";
import React from "react";
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';

import App from "../src/App";
import routes from './routes';

const router = express.Router();

router.get("*", async (req, res) => {
    
    console.log("-- SSR request --");

    const app = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={{}}>
            <App />
        </StaticRouter>
    );
    

    const match = routes.reduce(
        (acc, route) => matchPath(req.url, { path: route.path, exact: route.exact }) || acc, null);

    if (!match) {
        return res.status(404).send("Not the page your are looking for!");
    }

    const rewriteHTML = (data, { title, body }) => {
        data = data.replace(
            /<title>.*?<\/title>/g,
            `<title>${title}</title>`
        );
        data = data.replace(
            '<div id="root"></div>',
            `<div id="root">${body}</div>`
        );        
        return data;
    };

    console.log("-- Reading index.html --");

    const indexFile = path.resolve('./dist/index.html');

    fs.readFile(indexFile, 'utf8', (err, data) => {
        
        if (err) {
            console.error('Something went wrong:', err);
            return res.status(500).send('Oops, better luck next time!');
        }
        console.log("-- Replacing html --");

        return res.send(rewriteHTML(data, {title: 'SSR React Starter', body: app}));
    });
});

export default router;