class AbstractImageBoxTemplate {

        //Provides the code both ImageBox and ImageBoxSelection use in common to reduce total code length
        constructor(leftright, word) {
                //Instance variables
                this.leftRight = leftright;
                this.word = word;

                //Creating divContainer
                this.divContainer = document.createElement('div');
                this.divContainer.className = 'divContainer';
                this.divContainer.setAttribute('tabindex', '-1');

                //Creating divImgContainer
                this.divImgContainer = document.createElement('div');
                this.divImgContainer.className = 'divImgContainer';

                //Creating img
                this.img = document.createElement('img');
                this.img.className = 'boxImage';
        }
}

class ImageBox extends AbstractImageBoxTemplate{
        constructor(leftright , word){
                super(leftright, word);

                //Adding needed attriubutes to divContainer
                // this.divContainer.setAttribute('id', ('imgBox' + leftright + this.word.toString()));
                this.divContainer.setAttribute('onclick', ('imageSelectionToggle(\"'+ this.word +  "\", " +  "\"" + this.leftRight +  "\");"));

                //Creating img
                this.img.setAttribute('title', this.word);
                this.img.setAttribute('alt', this.word);
                this.img.setAttribute('id', ('image' + leftright + this.word));

                //Creating divTextContainer
                this.divTextContainer = document.createElement('div');
                this.divTextContainer.className = 'divTextContainer';

                //Appending parts
                this.divImgContainer.appendChild(this.img);
                this.divTextContainer.appendChild(document.createTextNode(this.word));
                this.divContainer.appendChild(this.divImgContainer);
                this.divContainer.appendChild(this.divTextContainer);

                //Appending to document
                document.getElementById("ImageBoxContainerFlex" + this.leftRight).appendChild(this.divContainer);
        }

        //Sets url of image
        imageBoxSetImages(imgObj) { this.img.src = imgObj; }
}


class ImageBoxSelection extends AbstractImageBoxTemplate{
        constructor(leftRight, word){
                super(leftRight, word, ImageBox);
                this.imageBoxInstance = ImageBox;
                this.divContainer.className += "Selection";
                // this.divContainer.setAttribute('id', ('imgBoxSelection' + leftRight + this.word).toString());
        }

        imageBoxSelectionSetImages(imgObj, word, position) {
                //Populating img
                this.img.src = imgObj;
                this.img.title = word;
                this.img.alt = word;
                this.img.id = 'imageSelection' + word + position;

                //Add direct function to select an image with the appropriate url
                this.divContainer.setAttribute(
                    'onclick', (
                        'selectImage(\"'+ this.leftRight + "\", \"" +
                        this.word + "\", \"" + this.img.src +  "\");"
                    )
                );


                //Appending parts
                this.divImgContainer.appendChild(this.img);
                this.divContainer.appendChild(this.divImgContainer);

                //Appending to document
                document.getElementById("ImageBoxSelectionContainerFlex" + this.leftRight + this.word).appendChild(this.divContainer);
        }

        selectImage(){
                this.imageBoxInstance.img.src = this.img.src;
        }
}

