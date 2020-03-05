//___________________________________________________VARIABLES______________________________________________________

//VARIABLES:
let currentView = {
    left: {
        status: false,
        selectDiv: null
    },
    right: {
        status: false,
        selectDiv: null,
    }
};

let viewModeObj = 0;



//___________________________________________________FUNCTIONS______________________________________________________

//FUNCTIONS:
//!!!!!!!!!!  ---  LANGUAGE SELECTION HANDLING --- !!!!!!!!!!!!!
//Toggle language selection menu
function toggleLanguageMenu(leftRight){
    switchVisibility(getLR("TextBoxContainerFlex", leftRight), getLR("languageSelector", leftRight));
}

//Selector event for a language button press -> updates the language using setLanguage and closes menu
function selectLanguage(leftRight, chosenLanguage){
    setLanguage(leftRight, chosenLanguage);
    switchVisibility(getLR("TextBoxContainerFlex", leftRight), getLR("languageSelector", leftRight));
}

//Changes the language and updates the UI
function setLanguage(leftRight, chosenLanguage) {
    let languageString = languageObjectInstance.getLangAsString(chosenLanguage);
    currentLanguage[leftRight] = [chosenLanguage, languageString];
    document.getElementsByClassName('currentLanguage')[leftRight].innerHTML = languageString;
}



//!!!!!!!!!!  ---  IMAGE SELECTION HANDLING --- !!!!!!!!!!!!!
//Toggles the ImageSelection View for the left or right ImageBox
function imageSelectionToggle(word, leftRight){
    let mainImgBoxDiv = "ImageBoxContainerFlex" + leftRight;
    let selectiondiv = "ImageBoxSelectionContainerFlex" + leftRight + word;
    setCurrentView(leftRight, true, selectiondiv);
    switchVisibility(mainImgBoxDiv, selectiondiv);
}

//Updates the Main ImageBox container with the chosen image and quit the Selection View
function setSelectionImage(leftRight, word, url) {
    document.getElementById("image" + leftRight + word).setAttribute("src", url);
    setCurrentView(leftRight, false, null);

    switchVisibility("ImageBoxContainerFlex" + leftRight, "ImageBoxSelectionContainerFlex" + leftRight + word);
}



//!!!!!!!!!!  ---  VIEW MODIFIER --- !!!!!!!!!!!!!
//Changes the format of the ImageBox
function changeViewSize(minmax) {
    if(objLeft.length===0){return;}
    let imageboxes = document.getElementsByClassName("ImageBoxContainerFlex");
    let currCol = document.getElementsByClassName("ImageBoxContainerFlex")[0].style.gridTemplateColumns;
    let currRow = window.getComputedStyle(document.getElementsByClassName("ImageBoxContainerFlex")[0], null).gridAutoRows;
    // console.log(currCol + "\n" + currRow);
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

//Changes the format of the app to focus on left or right ImageBox
function changeView() {
    if(objLeft.length===0){return;}
    let leftCont = document.getElementById("lowerLeft");
    let rightCont = document.getElementById("lowerRight");
    let upperLeft = document.getElementById("upperLeft");
    let upperRight = document.getElementById("upperRight");
    let leftSubCont = document.getElementById("ImageBoxContainerLeft");
    let rightSubCont = document.getElementById("ImageBoxContainerRight");


    function setParams(leftBgCol, rightBgCol, leftVis, rightVis, leftGrid, rightGrid, viewModel) {
        upperLeft.style.backgroundColor = leftBgCol;
        upperRight.style.backgroundColor = rightBgCol;

        leftCont.style.backgroundColor = (viewModel === 0) ? "#dcefff":"#2c90ff";
        rightCont.style.backgroundColor = (viewModel === 0) ? "#dcefff":"#2c90ff";

        leftCont.style.visibility = leftVis;
        leftSubCont.style.visibility = leftVis;
        rightCont.style.visibility = rightVis;
        rightSubCont.style.visibility = rightVis;
        leftCont.style.gridColumn = leftGrid;
        rightCont.style.gridColumn = rightGrid;
        if(currentView.left.status) {
            document.getElementById(currentView.left.selectDiv).style.visibility = leftVis;
        }
        if(currentView.right.status) {
            document.getElementById(currentView.right.selectDiv).style.visibility = rightVis;
        }
        viewModeObj = viewModel;
    }

    switch(viewModeObj){
        case 2:
            setParams("#2c90ff", "#2c90ff","visible", "visible", "2 / span 1", "4 / span 1", 0);

            break;

        case 0:
            setParams("#2c90ff", "#dcefff", "visible", "hidden","2 / span 3", "", 1);
            break;

        case 1:
            setParams("#dcefff", "#2c90ff", "hidden", "visible", "", "2 / span 3", 2);
            break;
    }


}

//Switches an element's visibility by id
function switchVisibility(...id) {
    let elem;
    id.forEach(value => {
        elem = document.getElementById(value);
        if(!(/Transition/).test(elem.className)){
            elem.className = elem.className + 'Transition';
        }
        else{
            elem.className = elem.className.replace('Transition', "");
        }
    });
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

    resetVariables(false);

    let left_urlswap = url[0];
    url[0] = url[1];
    url[1] = left_urlswap;

    // console.log(url);

    for(let i = 0; i<2; i++){
        let lr = ((i === 0) ? "Left":"Right");
        console.log(i);
        removeChilds(document.getElementById("lower" + lr), lr);
        url[i].forEach((item, index) => {
            createEmptyImageBoxContainerFlex(lr, item[0]);
            createEmptyImageBoxSelectionContainerFlex(lr, item[0], index);
            processImageArrayResponse(lr, item[0], item[1], index);
        });
            // createEmptyImageBoxSelectionContainerFlex(((1-i)===1 ? "Left" : "Right"), url[(1-i)][1][0], (1-i));
            // processImageArrayResponse(((1-i)===1 ? "Left" : "Right"), url[(1-i)][1][0], url[(1-i)][1][1], (1-i))

    }


}

//Function that changes the grid size from the hidden drag bar
function dragGrid(event) {
    let screenHeight = window.innerHeight;
    let currHieght = event.clientY;
    let uprow =  Math.floor((currHieght / screenHeight * 100)) - 8 ;
    let downrow = 100 - uprow - 18;

    if(uprow>20 && downrow>20){
        document.getElementById("container").style.gridTemplateRows = (
            "8% " + uprow.toString() + "% " + " 1% " + downrow.toString() + "% " + "8%"
        );
    }
}



//!!!!!!!!!!  ---  UTILITIES --- !!!!!!!!!!!!!
//Reset all fields in the DOM
function resetFields(clearUpperLeft) {
    resetVariables(true);

    if (clearUpperLeft) { document.getElementsByClassName('fill-Width')[0].value = ""; }
    document.getElementsByClassName('fill-Width')[1].value = "";
    removeChilds(document.getElementById("lowerLeft"), "Left");
    removeChilds(document.getElementById("lowerRight"), "Right");
}

//Remvovs all childs of target node
function removeChilds(domNode, leftRight) {

    domNode.removeChild(domNode.firstChild);

    let container = document.createElement("DIV");
    container.className = "ImageBoxContainer";
    container.id = "ImageBoxContainer" + leftRight;

    let containerFlex = document.createElement("DIV");
    containerFlex.className = "ImageBoxContainerFlex";
    containerFlex.id = "ImageBoxContainerFlex" + leftRight;

    container.appendChild(containerFlex);
    domNode.appendChild(container);
}

//Resets necessary variables
function resetVariables(urlSwitch){
    localStringUpperLeft;
    stringAsArray = [];
    stringAsArrayTraduced = [];
    objLeft = [];
    objRight = [];
    objSelectionLeft = [];
    objSelectionRight = [];
    if(urlSwitch) { url = [[],[]]; }

    // currentView = {
    //     left: {
    //         status: false,
    //         selectDiv: null
    //     },
    //     right: {
    //         status: false,
    //         selectDiv: null,
    //     }
    // };
}

//Returns the string + "Left" if index = 0 / "Right" if index = 1
function getLR(div, index) {
    return (div + ((index===0) ? "Left":"Right"));
}

//Sets the currentView objects
function setCurrentView(div, view, selectionDiv) {
    if (div==="Left") {
        currentView.left.status = view;
        currentView.left.selectDiv = selectionDiv;
    }
    else {
        currentView.right.status = view;
        currentView.right.selectDiv = selectionDiv;
    }
}

//Returns the appropriate currentView object
function getCurrentView(div) {
    return (div==="Left") ? currentView.left:currentView.right;
}



//!!!!!!!!!!  ---  USERINPUT EVENT HANDLING --- !!!!!!!!!!!!!
//Processes a keyPress for enter button
function processKey(e){
    if (e.keyCode === 13){
        e.preventDefault();
        sendTranslationRequest();
    }
}

//Processes all clicks to check if target is outside of ImageBox
function processExternalClickImageSelection(e) {
    let elem = e.toElement;
    while (elem.parentElement.tagName!=="BODY"){
        if(elem.id==="lowerLeft" || elem.id==="lowerRight" || elem.id==="imageControlContainer"){
            return;
        }
        elem = elem.parentElement;
    }
    closeAllSelection()
}

//Closes all ImageBox Selections if applicable
function closeAllSelection() {
    ["Left", "Right"].forEach(elem =>{
        if(getCurrentView(elem).status){
            switchVisibility("ImageBoxContainerFlex" + elem, getCurrentView(elem).selectDiv);
            setCurrentView(elem, 0, null);
        }
    });
}




//____________________________________________________RUNTIME_______________________________________________________

//RUNTIME
document.addEventListener("keypress", processKey);
document.addEventListener("click", (e) => { processExternalClickImageSelection(e) });


