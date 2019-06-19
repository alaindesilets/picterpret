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
        </head>
        <body>";

    public $body =
        "
        <div id='container'>
            <div id='upperLeft'>
                <div id='leftTextBoxContainer'>
                    <textarea id='leftTextBox' cols='40' rows='3'></textarea>
                </div>
            </div>
            <div id='upperRight'></div>
            <div id='lowerLeft'></div>
            <div id='lowerRight'></div>
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

?>