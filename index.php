<?php
//Starting session
session_start() or die();

//Requires the class library in "class_lib.php"
require("class_lib.php");
//require("imageSearch.php");

//Creating an instance of ImageSearcher
$bingImageAzureKey = "9c0cb000da5a418095ae0d653222baf8";
$imgSearcher = new ImageSearcher("en", $bingImageAzureKey);

//Testing the class/function and returning url array
$urlQueryArray = $imgSearcher ->search('blue',  'en');
print_r($urlQueryArray);

//Creating a display object to display the page, which for now is empty
$display = new displayPage();
$display ->displayContent();






?>