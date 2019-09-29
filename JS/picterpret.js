//Variable handling the string input
let localStringUpperLeft;
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

async function retrieveString()
{
    resetFields();
    localStringUpperLeft = document.getElementsByClassName('fill-Width')[0].value;
    displayTraducedString(localStringUpperLeft);
    stringAsArray = stringToArray(localStringUpperLeft);
    stringAsArrayTraduced = await wordMatchTraduction(stringAsArray);

    createLowerImageDivs( "Left", stringAsArray, stringAsArray);
    createLowerImageDivs("Right", stringAsArray, stringAsArrayTraduced);
    checkScreenSizeStatus();
    populateLowerImageDivs();

}

function populateLowerImageDivs(){
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


function getImage(string)
{
        return $.ajax({
            url: "ajaxImgHandler.php",
            type: "POST",
            dataType: "json",
            data: {tradString: string},
            async: true,
        });
}


async function getImageUrlArrayForSpecificWord(string, arrayPos){
    let imageObj = (await getImage(string))[0][1];
    imageBoxSetImages(objLeft[arrayPos].divImgContainer.firstChild, imageObj[0], string);
    imageBoxSetImages(objRight[arrayPos].divImgContainer.firstChild, imageObj[0], string);
    populateImageBoxSelectionContainer(string, imageObj);

}


async function traduceString(string) {
        return $.ajax({
            url: "ajaxTradHandler.php",
            type: "POST",
            // dataType: "json",
            data: {
                tradString: string,
                sourceLang: currentLanguageLeft[0],
                targetLang: currentLanguageRight[0]
            },
            async: true,
        });
}

async function displayTraducedString(string){
    let traducedString = await traduceString(string);
    document.getElementsByClassName('fill-Width')[1].value = traducedString;
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