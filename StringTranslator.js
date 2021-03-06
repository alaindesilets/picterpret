import v4 from "uuid/dist/v4.js"
import request from "request";
class StringTranslator {
    //Constructor
    constructor(tradString, sLang, tLang) {
        this.key = "4b709d313c17489bbe2cc41dc664e0ae";
        this.host = "https://api.cognitive.microsofttranslator.com";
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
                'X-ClientTraceId': v4().toString()
            },
            body: [{
                'text': tradString
            }],
            json: true,
        };

    }

    //translate() function
    translate(cb){
        request(this.options, function(err, res, body){
            cb(body[0]['translations'][1]['text']);
        });
    }
}

export {StringTranslator}
