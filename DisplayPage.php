<?php
/**
 * Created by PhpStorm.
 * User: antoinefarley
 * Date: 2019-06-19
 * Time: 11:05
 */

class displayPage
{
    public $head =
        "<!DOCTYPE html>
        <html lang='en'>    
        <head>
            <title>picterpret</title>
            <meta charset='utf-8'/>
            <link rel='stylesheet' href='picterpret.css' type='text/css'>
            <script src='picterpret.js'></script>
            <script src='imageBox.js'></script>
            <script src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js'></script>

        </head>
        <body>";

    public $body =
        "
        <div id='picterpretLogo' onclick=createImageGridBoxDiv('ImageBoxContainerFlexLeft')>PICTERPRET</div>
        <div id='container'>
            <div id='upperLeft'>
                <div class='TextBoxContainerFlex'>
                    <textarea class='fill-Width' type='text' name='tradleft'></textarea>
                </div>
            </div>
            <div id='upperRight'>
                <div class='TextBoxContainerFlex'>
                    <textarea class='fill-Width' type='text' name='tradright'></textarea>
                </div>
            </div>
            <div id='lowerLeft'>
                <div id='ImageBoxContainerFlexLeft' class='ImageBoxContainerFlex'>
                
                </div>
            </div>
            <div id='lowerRight'>
                <div id='ImageBoxContainerFlexRight' class='ImageBoxContainerFlex'>
                
                </div>
            </div>
            <div id='searchButtonContainer' onclick='retrieveString()'>
                <div id='searchButton'>
                    <strong>SEARCH</strong>
                </div>
            </div>
            
            <div id='resetButtonContainer'>
                <div id='resetButton'>
                    <strong>RESET</strong>
                </div>
            </div>
            
            
            
            
        </div>
        ";

    public $closing =
        "</body>
        </html>";

    function displayContent()
    {
        echo($this->head . $this->body . $this->closing);
    }
}