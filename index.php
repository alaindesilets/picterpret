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
require("DisplayPage.php");
require("ImageSearcher.php");
require("StringTranslator.php");
require("StopWords.php");

//Creating an instance of StringTranslator
$sourceLang = "en";
$targetLang = "fr";
$strTranslator = new StringTranslator($sourceLang, $targetLang);

    //Testing the class/function
    $toTranslate = "Hello, my name is John and I like apples.";
    $returnData = $strTranslator ->translate($toTranslate);
    echo($returnData);


//Creating an instance of ImageSearcher
//$imgSearcher = new ImageSearcher("en");
//$arrImg = $imgSearcher -> search('blue');
//print_r($arrImg);


////Creating an instance of StopWords class
//$stopWords = new StopWords();
//$arrwords = $stopWords->remStopWordsArray("I want to work in food services.");
//print_r($arrwords);


//function arrayImg($arrayStopWords)
//{
//    $imgSearcher = new ImageSearcher("en");
//    $returnArr = $imgSearcher->search('work', 'en');
//    print_r($returnArr);
////    foreach ($arrayStopWords as $value)
////    {
////        echo($value);
////        print_r($imgSearcher->search("work",'en'));
////    }
//}
//
//arrayImg($arrwords);


//Creating a display object to display the page, which for now is empty
//$display = new displayPage();
//$display ->displayContent();



?>