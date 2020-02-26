//Variable handling the string input
let localStringUpperLeft;
let localStringUpperRight;
let stringAsArray = [];
let stringAsArrayTraduced = [];

//Variables handling the imageBox delivery
let objLeft = [];
let objRight = [];
let objSelectionLeft = [];
let objSelectionRight = [];

//LanguageSelector global object and variables
const languageObjectInstance = new languageObject();
let currentLanguageLeft = ['en', languageObjectInstance.en[0]];
let currentLanguageRight = ['fr', languageObjectInstance.fr[0]];
let previousRightTextBoxReturnValue = '';

async function retrieveString()
{
     localStringUpperLeft = document.getElementsByClassName('fill-Width')[0].value;
        resetFields();
        stringAsArray = stringToArray(localStringUpperLeft);
        stringAsArrayTraduced = await wordMatchTraduction(stringAsArray);
        displayTraducedString(localStringUpperLeft, 1);

    console.log("ja;mes");
    createLowerImageDivs( "Left", stringAsArray, stringAsArray);
    createLowerImageDivs("Right", stringAsArray, stringAsArrayTraduced);
    console.log("ja;mes");

    checkScreenSizeStatus();
    populateLowerImageDivs();

}

function populateLowerImageDivs(){
    console.log(stringAsArray);
    for(let i = 0; i< stringAsArray.length; i++){
        getImageUrlArrayForSpecificWord(stringAsArray[i], i);
    }
}

async function createLowerImageDivs(rightLeft, stringAsArrayDivNames, stringAsArrayDisplayNames) {
    for(let i = 0; i< stringAsArray.length; i++){
        createEmptyImageBoxWithNames_ImageBoxContainerFlex(stringAsArray[i],stringAsArrayDisplayNames[i], rightLeft);
        createEmptyImageBoxContainerFlex_words(stringAsArrayDivNames[i], rightLeft);
    }
}

function createEmptyImageBoxWithNames_ImageBoxContainerFlex(divName, displayName, rightLeft){
    let objSelectionChoiceRightLeft = (rightLeft=="Left") ? objLeft:objRight;
    objSelectionChoiceRightLeft.push(new imageBox('ImageBoxContainerFlex' + rightLeft, divName, displayName));
}

function createEmptyImageBoxContainerFlex_words(word, rightLeft){
    let imageBoxContainerRightLeft = (rightLeft=="Left") ? 0:1;
    let objSelectionChoiceRightLeft = (rightLeft=="Left") ? objSelectionLeft:objSelectionRight;
    let div = document.createElement('div');
    div.className = 'ImageBoxSelectionContainerFlex';
    div.id = 'ImageBoxSelectionContainerFlex' + rightLeft + word;
    document.getElementsByClassName('ImageBoxContainer')[imageBoxContainerRightLeft]
        .appendChild(div);
    for(let y = 0; y<8; y++) {
        objSelectionChoiceRightLeft.push(new imageBoxSelection(div.id, word));
    }
}



function populateImageBoxSelectionContainer(word, imgObjArray){
    let arrayPosIfImageCantLoad = 0;
    let targetDivLeft = document.getElementById('ImageBoxSelectionContainerFlexLeft' + word);
    let targetDivRight = document.getElementById('ImageBoxSelectionContainerFlexRight' + word);
    let elemsLeft = targetDivLeft.childNodes;
    let elemsRight = targetDivRight.childNodes;

    for(let y = 0; y<8; y++) {

        let nodeLeft = elemsLeft[y].firstChild.firstChild;
        let nodeRight = elemsRight[y].firstChild.firstChild;

        imageBoxSelectionSetImages(nodeLeft, imgObjArray[arrayPosIfImageCantLoad], word, y);
        imageBoxSelectionSetImages(nodeRight, imgObjArray[arrayPosIfImageCantLoad++], word, y);
    }
}


async function getImage(string)
{
    const response = await fetch('/imagesearcher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imgTerm: string })
    });

    return await response.json();
}


async function getImageUrlArrayForSpecificWord(string, arrayPos){
    let imageObj = await getImage(string);
    imageBoxSetImages(objLeft[arrayPos].divImgContainer.firstChild, imageObj[0], string);
    imageBoxSetImages(objRight[arrayPos].divImgContainer.firstChild, imageObj[0], string);
    populateImageBoxSelectionContainer(string, imageObj);

}

async function traduceString(string) {
    const response = await fetch('/stringtranslator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            tradString: string,
            sourceLang: currentLanguageRight[0],
            targetLang: currentLanguageRight[0]
        })
    });

    return await response.text();

}

async function displayTraducedString(string){
    traduceString(string).then(data => {
        document.getElementsByClassName('fill-Width')[1].value = data;
    });

}

function stringToArray(stringUpperLeft){
    let stringAsArray = stringUpperLeft.toLowerCase()
        .replace(/[.,!?:;]+/g, "").split(" ");
    return stringAsArray.filter(x => !en.includes(x));
}

async function wordMatchTraduction(wordArray){
    let tradWordArray = [];
    for(let i = 0; i<wordArray.length; i++){
        tradWordArray[i] = await traduceString(wordArray[i]);
    }
    return tradWordArray;
}