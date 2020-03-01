//HANDLED BY APP.JS

<?php
///**
// * Created by PhpStorm.
// * User: antoinefarley
// * Date: 2019-06-19
// * Time: 11:05
// */
//
//class displayPage
//{
//    public $head =
//        "<!DOCTYPE html>
//        <html lang='en'>
//        <head>
//            <title>picterpret</title>
//            <meta charset='utf-8'/>
//            <link rel='stylesheet' href='CSS/picterpret.css' type='text/css'>
//            <script src='JS/picterpret.js'></script>
//            <script src='JS/ImageBox.js'></script>
//            <script src=\"JS/languageObject.js\"></script>
//            <script src='JS/listenerCSS.js'></script>
//            <script src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js'></script>
//            <script src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js'></script>
//
//        </head>
//        <body>";
//
//    public $body =
//        "
//        <div id='picterpretLogo'>PICTERPRET</div>
//        <div id='container'>
//            <div id='upperLeft'>
//                <div class='languageSelector'>
//                    <div></div>
//                </div>
//                <div class='TextBoxContainerFlex'>
//                    <textarea class='fill-Width' type='text' name='tradleft'></textarea>
//                </div>
//            </div>
//            <div id='upperRight'>
//                <div class='TextBoxContainerFlex'>
//                    <textarea class='fill-Width' type='text' name='tradright'></textarea>
//                </div>
//            </div>
//            <div id='lowerLeft'>
//                <div class='ImageBoxContainer'>
//                    <div id='ImageBoxContainerFlexLeft' class='ImageBoxContainerFlex'></div>
//                </div></div>
//            <div id='lowerRight'>
//                <div class='ImageBoxContainer'>
//                    <div id='ImageBoxContainerFlexRight' class='ImageBoxContainerFlex'></div>
//                </div></div>
//            <div id='translateButtonContainer' onclick='retrieveString()'>
//                <div id='translateButton'>
//                    <strong>TRANSLATE</strong>
//                </div>
//            </div>
//            <div id='translateButtonContainer' onclick='retrieveString()'>
//                <div id='translateButton'>
//                    <strong>TRANSLATE</strong>
//                </div>
//            </div>
//
//            <div id='resetButtonContainer' onclick='resetFields()'>
//                <div id='resetButton'>
//                    <strong>RESET</strong>
//                </div>
//            </div>
//        </div>
//        ";
//
//    public $closing =
//        "</body>
//        </html>";
//
    function displayContent()
    {
//        echo($this->head . $this->body . $this->closing);
        readfile("../HTML/picterpret.html");
    }
//}

