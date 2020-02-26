'use strict';
const request = require('request');
let https = require('https');

class ImageSearcher {
    //Instance variables
    key = "fd2d758f159e4132a378b8462d8b235f";
    host = "api.cognitive.microsoft.com";
    path = "/bing/v7.0/images/search";
    numberResults = '10';
    options;

    //Constructor
    constructor(term) {
        this.options = {
            method: 'GET',
            hostname: this.host,
            path: this.path + '?q=' + encodeURIComponent(term) + encodeURI("&size=medium&count=" + this.numberResults +"&offset=0"),
            headers: {
                'Ocp-Apim-Subscription-Key': this.key,
                "Ocp-Apim-Subscription-Region": "canadacentral",
                'Content-type': 'application/json',
            },
            json: true,
        };
    }

    //translate() function
    search(cb){
        let response_handler = function (response) {
            let body = '';
            let imgArray = [];
            response.on('data', function (d) {
                body += d;
            });
            response.on('end', function () {
                let imgResults = JSON.parse(body).value;
                imgResults.forEach(res => imgArray.push(res.contentUrl));
                cb(imgArray);
            });
        };

        let req = https.request(this.options, response_handler);
        req.end();
    }
}

module.exports.ImageSearcher = ImageSearcher;
