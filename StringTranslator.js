const request = require('request');
const uuidv4 = require('uuid/v4');

class StringTranslator {
    //Instance variables
    key = "4b709d313c17489bbe2cc41dc664e0ae";
    host = "https://api.cognitive.microsofttranslator.com";
    options;

    //Constructor
    constructor(tradString, sLang, tLang) {
        this.options = {
            method: 'POST',
            baseUrl: this.host,
            url: 'translate',
            qs: {
                'api-version': '3.0',
                'to': [sLang, tLang]
            },
            headers: {
                'Ocp-Apim-Subscription-Key': this.key,
                "Ocp-Apim-Subscription-Region": "canadacentral",
                'Content-type': 'application/json',
                'X-ClientTraceId': uuidv4().toString()
            },
            body: [{
                'text': tradString
            }],
            json: true,
        };
    }

    //translate() function
    translate(cb){ request(this.options, function(err, res, body){ cb(body[0]['translations'][1]['text']); });}
}

module.exports.StringTranslator = StringTranslator;
