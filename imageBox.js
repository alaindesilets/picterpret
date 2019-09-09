function imageBox(boxID, word, imgURL)
{
        console.log('entered');
        this.boxID = boxID;
        this.word = word;
        this.imgURL = imgURL;
        this.currentPOS = 0;

        this.divContainer = document.createElement('div');
        this.divContainer.className = 'divContainer';
        this.divContainer.setAttribute('id', ('imgBox' + this.word).toString());
        this.divContainer.setAttribute('tabindex', '-1')

        this.divImgContainer = document.createElement('div');
        this.divImgContainer.className = 'divImgContainer';

        this.img = document.createElement('img');
        this.img.className = 'boxImage';

        this.img.setAttribute('src', this.imgURL[this.currentPOS]);
        this.img.setAttribute('title', this.word);
        this.img.setAttribute('alt', this.word);
        this.img.setAttribute('id', ('image' + this.word).toString());

        this.divArrowContainer = document.createElement('div');
        this.divArrowContainer.className = 'divArrowContainer';

        this.leftArrContainer = document.createElement('div');
        this.leftArrContainer.setAttribute('id', ('leftArrContainer' + this.word).toString());

        this.rightArrContainer = document.createElement('div');
        this.rightArrContainer.setAttribute('id', ('rightArrContainer' + this.word).toString());

        this.leftArrImg  = document.createElement('img');
        this.leftArrImg.tagName = 'leftarrow';
        this.leftArrImg.className = 'arrow';
        this.leftArrImg.setAttribute('src', 'leftarrow.png');

        this.rightArrImg  = document.createElement('img');
        this.rightArrImg.tagName = 'rightarrow';
        this.rightArrImg.className = 'arrow';
        this.rightArrImg.setAttribute('src', 'rightarrow.png');

        this.divTextContainer = document.createElement('div');
        this.divTextContainer.className = 'divTextContainer';

        this.textElem = document.createTextNode(this.word);

        //Appending
        this.divImgContainer.appendChild(this.img);
        this.leftArrContainer.appendChild(this.leftArrImg);
        this.rightArrContainer.appendChild(this.rightArrImg);
        this.divArrowContainer.appendChild(this.leftArrContainer);
        this.divArrowContainer.appendChild(this.rightArrContainer);
        this.divTextContainer.appendChild(this.textElem);
        this.divContainer.appendChild(this.divImgContainer);
        this.divContainer.appendChild(this.divArrowContainer);
        this.divContainer.appendChild(this.divTextContainer);


        document.getElementById(this.boxID).appendChild(this.divContainer);

}

