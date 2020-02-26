<?php
//Image codes:
//9c0cb000da5a418095ae0d653222baf8
//fd2d758f159e4132a378b8462d8b235f

//Trad codes:
//4b709d313c17489bbe2cc41dc664e0ae
//4212aea97e7944848489f575b8a04a9e

//Starting session
session_start() or die();

//Requires the class library in "ImageSearcher.php"
require_once("DisplayPage.php");
require_once("HTML/picterpret.html");

//Creating a display object to display the page, which for now is empty
$display = new displayPage();
$display ->displayContent();

