//Variables
let viewObj = 0;

let opts = {
    lines: 13, // The number of lines to draw
    length: 38, // The length of each line
    width: 17, // The line thickness
    radius: 45, // The radius of the inner circle
    scale: 1, // Scales overall size of the spinner
    corners: 1, // Corner roundness (0..1)
    color: '#ffffff', // CSS color or array of colors
    fadeColor: 'transparent', // CSS color or array of colors
    speed: 1, // Rounds per second
    rotate: 0, // The rotation offset
    animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
    direction: 1, // 1: clockwise, -1: counterclockwise
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    className: 'spinner', // The CSS class to assign to the spinner
    top: '50%', // Top position relative to parent
    left: '50%', // Left position relative to parent
    shadow: '0 0 1px transparent', // Box-shadow for the lines
    position: 'absolute' // Element positioning
};

// let target = document.getElementById('foo');
// let spinner = new Spinner(opts).spin(target);


//Toggle language selection menu
function toggleLanguageMenu(leftRight){
    switchVisibility(getLR("TextBoxContainerFlex", leftRight), getLR("languageSelector", leftRight));
}

//Switch both languages and updates UI accordingly
function switchLanguage(){
    //Switch languages
    let leftLang = currentLanguage[0][0];
    setLanguage(0, currentLanguage[1][0]);
    setLanguage(1, leftLang);

    //Switch current text inputs
    let leftBox = document.getElementsByClassName('fill-Width')[0];
    let rightBox = document.getElementsByClassName('fill-Width')[1];
    let leftText = leftBox.value;
    leftBox.value = rightBox.value;
    rightBox.value = leftText;

    resetVariables();
    console.log(url);

    for(let i = 0; i<2; i++){
        removeChilds(document.getElementsByClassName('ImageBoxContainerFlex')[1-i]);
        for(let y = 0; y< url[i].length; y++){
            createEmptyImageBoxContainerFlex((i===1 ? "Left" : "Right"), url[i][y][0]);
            createEmptyImageBoxSelectionContainerFlex((i===1 ? "Left" : "Right"), url[i][y][0], y);
            processImageArrayResponse((i===1 ? "Left" : "Right"), url[i][y][0], url[i][y][1], y)
        }
    }

    let left_urlswap = url[0];
    url[0] = url[1];
    url[1] = left_urlswap;
    console.log(url);
}

//Changes the language and updates the UI
function setLanguage(leftRight, chosenLanguage) {
    let languageString = languageObjectInstance.getLangAsString(chosenLanguage);
    currentLanguage[leftRight] = [chosenLanguage, languageString];
    document.getElementsByClassName('currentLanguage')[leftRight].innerHTML = languageString;
}

//Selector event for a language button press -> updates the language using setLanguage and closes menu
function selectLanguage(leftRight, chosenLanguage){
    setLanguage(leftRight, chosenLanguage);
    switchVisibility(getLR("TextBoxContainerFlex", leftRight), getLR("languageSelector", leftRight));
}

//Returns the string + "Left" if index = 0 / "Right" if index = 1
function getLR(div, index) {
    return (div + ((index===0) ? "Left":"Right"));
}

//Switches an element's visibility by id
function switchVisibility(...id) {
    let elem;
    id.forEach(value => {
        console.log(value);
        elem = document.getElementById(value);
        if(!(/Transition/).test(elem.className)){
            elem.className = elem.className + 'Transition';
        }
        else{
            elem.className = elem.className.replace('Transition', "");
        }
    });
}

function selectImage(leftRight, word, url) {

    document.getElementById("image" + leftRight + word).setAttribute("src", url);
    switchVisibility("ImageBoxContainerFlex" + leftRight, "ImageBoxSelectionContainerFlex" + leftRight + word);

}



function imageSelectionToggle(word, leftright){
    switchVisibility("ImageBoxContainerFlex" + leftright, "ImageBoxSelectionContainerFlex" + leftright + word);
}


//Changes the format of the ImageBox
function changeViewSize(minmax) {
    let imageboxes = document.getElementsByClassName("ImageBoxContainerFlex");
    let currCol = document.getElementsByClassName("ImageBoxContainerFlex")[0].style.gridTemplateColumns;
    let currRow = window.getComputedStyle(document.getElementsByClassName("ImageBoxContainerFlex")[0], null).gridAutoRows;
    console.log(currCol + "\n" + currRow);
    Array.from(imageboxes).forEach(elem => {
        if(minmax===0){
            //Switch statements used in case other view formats were wanted in the future
            switch (currCol) {
                case "25% 25% 25% 25%":
                    elem.style.gridTemplateColumns = "50% 50%";
                    break;
            }
            switch (currRow){
                case "50%":
                    if(currCol!=="25% 25% 25% 25%") {elem.style.gridAutoRows = "100%"; }
            }
        }

        else {
            switch (currCol) {
                case "50% 50%":
                    if(currRow==="50%") elem.style.gridTemplateColumns = "25% 25% 25% 25%";
                    break;
            }
            switch (currRow){
                case "100%":
                    console.log(currCol);
                    elem.style.gridAutoRows = "50%";
            }
        }
    });
}

function changeView() {
    let leftCont = document.getElementById("lowerLeft");
    let rightCont = document.getElementById("lowerRight");
    let leftSubCont = document.getElementById("ImageBoxContainerLeft");
    let rightSubCont = document.getElementById("ImageBoxContainerRight");



    switch(viewObj){
        case 0:
            leftCont.style.gridColumn = "2 / span 2";
            rightCont.style.visibility = "hidden";
            rightSubCont.style.visibility = "hidden";

            viewObj = 1;
            break;

        case 1:
            leftCont.style.visibility = "hidden";
            leftSubCont.style.visibility = "hidden";
            rightCont.style.visibility = "visible";
            rightSubCont.style.visibility = "visible";
            rightCont.style.gridColumn = "0 / span 2";

            viewObj = 2;
            break;

        case 2:
            leftCont.style.visibility = "visible";
            leftSubCont.style.visibility = "hidden";
            leftCont.style.gridColumn = "2 / span 1";
            rightCont.style.gridColumn = "3 / span 1";
            viewObj = 0;
            break;
    }
}



//Reset all fields
function resetFields(clearUpperLeft) {
    resetVariables();

    if (clearUpperLeft) document.getElementsByClassName('fill-Width')[0].value = "";
    document.getElementsByClassName('fill-Width')[1].value = "";
    removeChilds(document.getElementsByClassName('ImageBoxContainerFlex')[0]);
    removeChilds(document.getElementsByClassName('ImageBoxContainerFlex')[1]);
}

function removeChilds(domNode) {
    while(domNode.lastChild){
        domNode.removeChild(domNode.lastChild);
    }
}

function resetVariables(){
    localStringUpperLeft;
    stringAsArray = [];
    stringAsArrayTraduced = [];
    url = [[],[]];
    objLeft = [];
    objRight = [];
    objSelectionLeft = [];
    objSelectionRight = [];
}

function processKey(e){
    if (e.keyCode === 13){
        sendTranslationRequest();
    }
}



//RUNTIME
document.addEventListener("keypress", processKey);
