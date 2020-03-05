import {StringTranslator} from "./StringTranslator.js";
import {ImageSearcher} from "./ImageSearcher.js"

import path from 'path';
const __dirname = path.resolve();

import express from "express";
const app = express();

app.use(express.static(__dirname + "/"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Route to render html file
app.get('/', (req, res) => { res.sendFile(__dirname + '/HTML/picterpret.html')});

//Route to handle StringTranslator requests
app.post('/stringtranslator', function (req, res) {
    console.log(req.body);
    let strTrans = new StringTranslator(req.body.tradString, req.body.sourceLang, req.body.targetLang);
    strTrans.translate(result => {
        res.send(result)
    });
});

//Route to handle ImageSearcher requests
app.post('/imagesearcher', function (req, res) {
    let imgSearch = new ImageSearcher(req.body.imgTerm);
    imgSearch.search(result => res.send(result));
});

app.listen(8080, () => console.log('Started on port 3000!'));
