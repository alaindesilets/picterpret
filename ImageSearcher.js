'use strict';
import https from "https";

class ImageSearcher {
    //Constructor
    constructor(term) {
        this.key = "fd2d758f159e4132a378b8462d8b235f";
        this.host = "api.cognitive.microsoft.com";
        this.path = "/bing/v7.0/images/search";
        this.numberResults = '20';
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

export {ImageSearcher}
