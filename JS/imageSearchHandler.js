//Sends a call to the node server and returns an array with image urls
async function getImage(string)
{
    const response = await fetch('https://picterpret.com/imagesearcher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imgTerm: string })
    });

    return await response.json();
}


//Processes the image request for one side/language: creates the necessary divs, and sends a request
// for each word/image. They are added to the grid asynchronously as soon as they arrive.
function sendImageRequest(div, wordArray) {
    checkScreenSizeStatus();

    for(let i = 0; i< wordArray.length; i++){
        createEmptyImageBoxContainerFlex(div, wordArray[i]);
        createEmptyImageBoxSelectionContainerFlex(div, wordArray[i], i);
        getImage(wordArray[i]).then(arr => {
            url[div==="Left" ? 0:1].push([wordArray[i], arr]);
            processImageArrayResponse(div, wordArray[i], arr, i)
        });
    }
}

//Enters the images in the previously created ImageBoxContainers
function processImageArrayResponse(leftRight, string, imageObj, arrayPos){
    getImageBoxObj(leftRight, 0)[arrayPos].imageBoxSetImages(imageObj[0]);
    populateImageBoxSelectionContainer(leftRight, string,  imageObj, arrayPos);
}

//Inserts the 8 images in each word's ImageBoxSelectionContainer
function populateImageBoxSelectionContainer(leftRight, word, imgObjArray, i){
    for(let y = 0; y<20; y++) {
        getImageBoxObj(leftRight, 1)[i][y].imageBoxSelectionSetImages(imgObjArray[y], word, y);
    }
}

//Initializes the ImageBox objects for the ImageBoxContainerFlex (the presentation) div
function createEmptyImageBoxContainerFlex(leftRight, divName){
    getImageBoxObj(leftRight, 0).push(new ImageBox(leftRight, divName));
}

//Initializes the ImageBox objects for the ImageBoxSelectionContainerFlex (the selection div) for all words
function createEmptyImageBoxSelectionContainerFlex(leftRight, word, arrayPos){
    let div = document.createElement('div');
    div.className = 'ImageBoxSelectionContainerFlex';
    div.id = 'ImageBoxSelectionContainerFlex' + leftRight + word;
    document.getElementById('ImageBoxContainer' + leftRight).appendChild(div);
    getImageBoxObj(leftRight, 1)[arrayPos] = [];
    for(let y = 0; y<20; y++) {
        getImageBoxObj(leftRight, 1)[arrayPos].push(new ImageBoxSelection(leftRight, word, getImageBoxObj(leftRight, 0)));
    }
}

//Returns the instance of the left of right object containing the ImageBox or ImageBoxSelection entities
function getImageBoxObj(leftright, selection) {
    if(selection===0) return (leftright==="Left") ? objLeft:objRight;
    else return (leftright==="Left") ? objSelectionLeft:objSelectionRight;
}