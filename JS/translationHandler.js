//Sends a call to the node server and returns a string representing the translation
async function traduceString(string) {
    const response = await fetch('https:///stringtranslator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            tradString: string,
            sourceLang: currentLanguage[1][0],
            targetLang: currentLanguage[1][0]
        })
    });

    return await response.text();
}

//Processes the translation request: retrieves left string, traduces it, creates arrays ands calls the procedure
//to get the images.
function sendTranslationRequest()
{
    localStringUpperLeft = document.getElementsByClassName('fill-Width')[0].value;
    if(/^\s*$/.test(localStringUpperLeft)) {
        resetFields(true);
        return;
    }
    resetFields(false);
    stringAsArray = stringToArray(localStringUpperLeft, currentLanguage[0][0]);
    traduceString(localStringUpperLeft).then(res => processTranslationResponse(res));
    sendImageRequest("Left", stringAsArray, stringAsArray);
}

function processTranslationResponse(response) {
    stringAsArray = stringToArray(localStringUpperLeft, currentLanguage[0][0]);

    stringAsArrayTraduced = stringToArray(response, currentLanguage[1][0]);
    localStringUpperRight = response;
    displayTraducedString(localStringUpperRight);
    sendImageRequest("Right", stringAsArrayTraduced, stringAsArrayTraduced);
}


//Displays the traduced string on upperLeft field
function displayTraducedString(string){ document.getElementsByClassName('fill-Width')[1].value = string; }

//Makes an array with sentences, removing punctuation
function stringToArray(stringUpperLeft, lang){
    let stringAsArray = stringUpperLeft.toLowerCase().replace(/[.,!?:;\n]+/g, "").split(" ");
    return stringAsArray.filter(x => eval("!" + lang + ".includes(x)"));
}


