//Functions
function checkScreenSizeStatus(){
    let innerWidth = window.innerWidth;
    let innerHeigth = window.innerHeight;

    let ratioWidthHeight = innerWidth/innerHeigth;
    console.log(ratioWidthHeight);

    if(ratioWidthHeight<1){
        changeImageBoxFormat(1);
    }
    else{
        changeImageBoxFormat(0);
    }
}

function changeImageBoxFormat(ratio){
    let elems = [];
    elems.push(document.getElementsByClassName('ImageBoxContainerFlex'));
    elems.push(document.getElementsByClassName('ImageBoxSelectionContainerFlex'));
    elems.push(document.getElementsByClassName('ImageBoxContainerFlexTransition'));
    elems.push(document.getElementsByClassName('ImageBoxSelectionContainerFlexTransition'));


    elems.forEach(element => {
        Array.from(element).forEach(obj => {obj.style.gridTemplateColumns =
            (ratio==1) ? "47% 47%":"23% 23% 23% 23%";});
    });
}

function changeColor() {
    
}


function createLanguageList() {
    Object.entries(languageObjectInstance).forEach(
        ([key, value]) => {
            console.log(key, value);
        });
}

function createListElement(){

}

// function makeList(leftRight){
//     Object.entries(languageObjectInstance).forEach(
//         ([key, value]) => {
//             console.log(
//                 "<div id='"
//                 + key.toString()+ "MenuItemContainer" + leftRight + "' class='menuItemContainer'>"
//                 + "\n    <div id='"
//                 + key.toString()+ "MenuItem" + leftRight + "' class='menuItem'>"
//                 + "" +value[0]
//                 + "</div>\n"
//                 + "</div>\n");
//         });
// }



//Runtime
checkScreenSizeStatus();

window.addEventListener('resize', function () {
    setTimeout(checkScreenSizeStatus, 100);
});
