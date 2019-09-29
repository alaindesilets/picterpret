function imageBox(boxID, divName, displayName)
{
        console.log(divName, displayName);
        this.boxID = boxID;
        this.divName = divName;
        this.displayName = displayName;

        this.divContainer = document.createElement('div');
        this.divContainer.className = 'divContainer';
        this.divContainer.setAttribute('id', ('imgBox' + this.divName.toString()));
        this.divContainer.setAttribute('tabindex', '-1');
        this.divContainer.setAttribute('onclick', ('showSelection(\"'+ this.divName +"\", \"" + this.boxID +"\");"));

        this.divImgContainer = document.createElement('div');
        this.divImgContainer.className = 'divImgContainer';

        this.img = document.createElement('img');
        this.img.className = 'boxImage';

        // // this.img.setAttribute('src', this.imgURL[0]);
        this.img.setAttribute('title', this.displayName);
        this.img.setAttribute('alt', this.displayName);
        this.img.setAttribute('id', ('image' + this.divName).toString());

        this.divTextContainer = document.createElement('div');
        this.divTextContainer.className = 'divTextContainer';

        this.textElem = document.createTextNode(this.displayName);

        //Appending
        this.divImgContainer.appendChild(this.img);
        this.divTextContainer.appendChild(this.textElem);
        this.divContainer.appendChild(this.divImgContainer);
        this.divContainer.appendChild(this.divTextContainer);

        document.getElementById(this.boxID).appendChild(this.divContainer);
}

function imageBoxSetImages(imageBox, imgObj) {

        imageBox.src = imgObj;
}



function imageBoxSelection(boxID, word)
{
        this.boxID = boxID;
        this.word = word;
        // this.imgURL = imgURL;

        this.divContainer = document.createElement('div');
        this.divContainer.className = 'divContainerSelection';
        this.divContainer.setAttribute('id', ('imgBox' + this.word).toString());
        this.divContainer.setAttribute('tabindex', '-1');

        this.divImgContainer = document.createElement('div');
        this.divImgContainer.className = 'divImgContainer';


        this.img = document.createElement('img');
        this.img.className = 'boxImage';

        // this.img.setAttribute('src', this.imgURL);
        // this.img.setAttribute('title', word);
        // this.img.setAttribute('alt', word);
        // this.img.setAttribute('id', ('imageSelection' + word + position).toString());

        //Appending
        this.divImgContainer.appendChild(this.img);
        this.divContainer.appendChild(this.divImgContainer);

        document.getElementById(this.boxID).appendChild(this.divContainer);
}

function imageBoxSelectionSetImages(imageBoxSelection, imgObj, word, position) {
        imageBoxSelection.src = imgObj;
        imageBoxSelection.title = word;
        imageBoxSelection.alt = word;
        imageBoxSelection.id = 'imageSelection' + word + position;
}