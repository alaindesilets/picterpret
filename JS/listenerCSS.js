//Functions
function checkScreenSizeStatus(){
    let innerWidth = window.innerWidth;
    let innerHeigth = window.innerHeight;
    let ratioWidthHeight = innerWidth/innerHeigth;

    if(ratioWidthHeight<1){ changeImageBoxFormat(1);}
    else{ changeImageBoxFormat(0); }
}

function changeImageBoxFormat(ratio){
    let elems = [];
    elems.push(document.getElementsByClassName('ImageBoxContainerFlex'));
    elems.push(document.getElementsByClassName('ImageBoxSelectionContainerFlex'));
    elems.push(document.getElementsByClassName('ImageBoxContainerFlexTransition'));
    elems.push(document.getElementsByClassName('ImageBoxSelectionContainerFlexTransition'));

    elems.forEach(element => {
        Array.from(element).forEach(obj => {obj.style.gridTemplateColumns =
            (ratio==1) ? "50% 50%":"25% 25% 25% 25%";});
    });
}

//Runtime
checkScreenSizeStatus();

window.addEventListener('resize', function () {
    setTimeout(checkScreenSizeStatus, 100);
});
