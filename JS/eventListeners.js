function showSelection(word, boxID){
    function listenForOutsideClickShowSelection(e){
        if(!(
            e.target.className == 'boxImage'
        ))
        {
            switchVisibility(selectionContainer, 0);
            switchVisibility(container, 0);

            document.getElementById(selectionContainer)
                .removeEventListener('click', listenForInsideClickShowSelection, false);
            document.removeEventListener('click', listenForOutsideClickShowSelection, false);
        }
    }
    function listenForInsideClickShowSelection(e){
        if (e.target.className == 'boxImage') {
            let chosenImage = e.target.src;
            let targetId = e.target.id;

            let containerLeft = document.getElementById('ImageBoxContainerFlexLeft');
            let containerRight = document.getElementById('ImageBoxContainerFlexRight');

            containerLeft.querySelector('#image' + e.target.title)
                .setAttribute('src', chosenImage);
            containerRight.querySelector('#image' + e.target.title)
                .setAttribute('src', chosenImage);


            switchVisibility(selectionContainer, 0);
            switchVisibility(container, 0);
        }
        document.getElementById(selectionContainer)
            .removeEventListener('click', listenForInsideClickShowSelection, false);
        document.removeEventListener('click', listenForOutsideClickShowSelection, false);

    }
    let rightLeft = (boxID=='ImageBoxContainerFlexLeft') ? "Left":"Right";
    let selectionContainer = "ImageBoxSelectionContainerFlex" + rightLeft + word;
    let container = 'ImageBoxContainerFlex' + rightLeft;

    switchVisibility(selectionContainer, 0);
    switchVisibility(container, 0);
    document.addEventListener('click', listenForOutsideClickShowSelection, false);
    document.getElementById(selectionContainer).addEventListener('click', listenForInsideClickShowSelection, false);
}




function showLanguageMenu(rightLeftNumericalValue){
    function listenForOutsideClick(e){
        console.log(e.target);
        if(!(e.target.className == 'menuItem' || e.target.className == 'menuItemContainer'))
        {


            console.log('entereda');
            switchVisibility(languageSelector, 1);
            switchVisibility(textBoxContainer, 1);
            document.addEventListener('click', listenForInsideClick, false);
            document.removeEventListener('click', listenForOutsideClick, false);
        }


    }
    function listenForInsideClick(e){
        console.log(e.target);
        if (e.target.className == 'menuItemContainer' || e.target.className == 'menuItem') {
            console.log(e.target);

            console.log('enteredb');
            let chosenLanguage = (e.target.id).substring(0,2);
            let targetId = e.target.id;

            if(rightLeftNumericalValue==0){
                currentLanguageLeft = [chosenLanguage,
                    eval('languageObjectInstance.'+chosenLanguage)[0]];
            }
            else {
                currentLanguageRight = [chosenLanguage,
                    eval('languageObjectInstance.'+chosenLanguage)[0]];
            }
            // eval('currentLanguage' + rightLeft + " = languageObjectInstance." + chosenLanguage + "[0];");


            console.log(currentLanguageLeft);
            console.log(currentLanguageRight);


            document.getElementsByClassName('currentLanguage')[rightLeftNumericalValue].innerHTML
                = (rightLeftNumericalValue==0) ? currentLanguageLeft[1]:currentLanguageRight[1];

            switchVisibility(languageSelector, 1);
            switchVisibility(textBoxContainer, 1);

            document.removeEventListener('click', listenForInsideClick, false);
            document.removeEventListener('click', listenForOutsideClick, false);

        }

    }

    let rightLeft = (rightLeftNumericalValue==0) ? "Left":"Right";
    let textBoxContainer = "TextBoxContainerFlex" + rightLeft;
    let languageSelector = "languageSelector" + rightLeft;

    // switchVisibility(languageSelector, 1);
    // switchVisibility(textBoxContainer, 1);
    document.addEventListener('click', listenForOutsideClick, false);
    document.addEventListener('click', listenForInsideClick, false);

}



function switchVisibility(id, pictureOrMenu) {
    let elem = document.getElementById(id);
    if(pictureOrMenu==0){
        if(elem.className=='ImageBoxContainerFlex' || elem.className=='ImageBoxSelectionContainerFlex'){
            elem.className = elem.className + 'Transition';
        }
        else{
            elem.className = elem.className.replace('Transition', "");
        }
    }
    else{
        if(elem.className=='TextBoxContainerFlex' || elem.className=='languageSelector'){
            elem.className = elem.className + 'Transition';
        }
        else{
            elem.className = elem.className.replace('Transition', "");
        }
    }

}


function resetFields() {
    resetVariables();
    function removeChilds(domNode) {
        while(domNode.lastChild){
            domNode.removeChild(domNode.lastChild);
        }
    }

    document.getElementsByClassName('fill-Width')[1].value = "";
    removeChilds(document.getElementsByClassName('ImageBoxContainerFlex')[0]);
    removeChilds(document.getElementsByClassName('ImageBoxContainerFlex')[1]);
}

function resetVariables(){
    localStringUpperLeft;
    stringAsArray = [];
    stringAsArrayTraduced = [];
    objLeft = [];
    objRight = [];
    objSelectionLeft = [];
    objSelectionRight = [];
}