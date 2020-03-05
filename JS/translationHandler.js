//Sends a call to the node server and returns a string representing the translation
async function traduceString(string, inverseLang) {
    const response = await fetch('https://picterpret.com/stringtranslator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            tradString: string,
            sourceLang: currentLanguage[(inverseLang===false) ? 0:1][0],
            targetLang: currentLanguage[(inverseLang===false) ? 1:0][0]
        })
    });

    return await response.text();
}

//Processes the translation request: retrieves left string, traduces it, creates arrays ands calls the procedure
//to get the images.
function sendTranslationRequest()
{
    localStringUpperLeft = document.getElementsByClassName('fill-Width')[0].value.replace(/[\n]+/g, "");
    if(/^\s*$/.test(localStringUpperLeft)) {
        resetFields(true);
        return;
    }
    resetFields(false);

    console.log(localStringUpperLeft);

    stringAsArray = stringToArray(localStringUpperLeft, currentLanguage[0][0]);
    traduceString(localStringUpperLeft, false).then(res => processTranslationResponse(res));

    sendImageRequest("Left", stringAsArray, stringAsArray);

    addTranslatedWordstoLabel(stringAsArray, objLeft, false);
}

function addTranslatedWordstoLabel(wordarray, imageBoxObject, inverseLang) {
    wordarray.forEach((elem, index) => {
        traduceString(elem, inverseLang).then(res => {
            imageBoxObject[index].divTextContainer.innerHTML += (" / " + res.toLowerCase());
        });
    });
}

function processTranslationResponse(response) {
    localStringUpperRight = response;
    stringAsArrayTraduced = stringToArray(response, currentLanguage[1][0]);
    displayTraducedString(localStringUpperRight);
    addTranslatedWordstoLabel(stringAsArrayTraduced, objRight, true);
    sendImageRequest("Right", stringAsArrayTraduced, stringAsArrayTraduced);
}


//Displays the traduced string on upperLeft field
function displayTraducedString(string){ document.getElementsByClassName('fill-Width')[1].value = string; }

//Makes an array with sentences, removing punctuation
function stringToArray(stringUpperLeft, lang){
    let stringAsArray = stringUpperLeft.toLowerCase().replace(/[.,!?:;\n]+/g, "").split(new RegExp(/[\s-]+/g));
    return stringAsArray.filter(x => eval("!" + lang + ".includes(x)"));
}


