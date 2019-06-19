<?php
//Starting session
session_start() or die();



//Requires the class library in "ImageSearcher.php"
require("DisplayPage.php");
require("ImageSearcher.php");
require("StringTranslator.php");

////Creating an instance of ImageSearcher
//$imgSearcher = new ImageSearcher("en");
//
////Testing the class/function and returning url array
//$urlQueryArray = $imgSearcher ->search('blue',  'en');
//print_r($urlQueryArray);

//Creating an instance of StringTranslator
$sourceLang = "en";
$targetLang = "fr";
$strTranslator = new StringTranslator($sourceLang, $targetLang);

//Testing the class/function
$toTranslate = "Hello, my name is not John and I like apples.";
$returnData = $strTranslator ->translate($toTranslate);
echo($returnData);



//Creating a display object to display the page, which for now is empty
$display = new displayPage();
$display ->displayContent();



?>