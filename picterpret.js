// let imgURLArr =
//     [
//         [
//             "https://cdn.vox-cdn.com/thumbor/xuIWaMj1bBGS6jaa11_lryJDBQg=/0x0:2040x1360/1820x1213/filters:focal(857x517:1183x843):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/57358643/jbareham_170504_1691_0020.0.0.jpg",
//             "https://cdn.vox-cdn.com/thumbor/aN47kxxXVFnTgtMa021S2R6tiP4=/0x0:1000x604/1820x1213/filters:focal(420x222:580x382):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/58245867/GooglePay_Lockup.max_1000x1000.0.png",
//             "https://img.etimg.com/thumb/msid-68333505,width-643,imgsize-204154,resizemode-4/googlechrome.jpg",
//             "https://akm-img-a-in.tosshub.com/indiatoday/google-apps-thumb-559_120517104011_0.jpg"
//         ],
//         [
//             "https://www.fudzilla.com/media/k2/items/cache/9b9854f174d4e99ae0cda529ef19d08f_XL.jpg",
//             "https://img.etimg.com/thumb/msid-68333505,width-643,imgsize-204154,resizemode-4/googlechrome.jpg",
//             "https://akm-img-a-in.tosshub.com/indiatoday/google-apps-thumb-559_120517104011_0.jpg"
//         ]
//
//
//     ];
//
// let words = ["apple", "orange", "love"];





let obj = [];
let pos = 0;

function arrowListener(imageBox)
{
    function changeLeft() {
        if(imageBox.currentPOS!==0) {
            imageBox.img.setAttribute('src', imageBox.imgURL[eval(imageBox.currentPOS-1)]);
            imageBox.currentPOS--;
        }
    }

    function changeRight() {
        if(imageBox.currentPOS!==eval(imageBox.imgURL.length-1)) {
            imageBox.img.setAttribute('src', imageBox.imgURL[eval(imageBox.currentPOS+1)]);
            imageBox.currentPOS++;
        }
    }

    imageBox.leftArrContainer.addEventListener('click', changeLeft);
    imageBox.rightArrContainer.addEventListener('click', changeRight);

}


function createImageGridBoxDiv(boxID)
{
    obj.push(new imageBox(boxID, words[pos], imgURLArr[pos]));
    arrowListener(obj[pos]);
    pos++;
}