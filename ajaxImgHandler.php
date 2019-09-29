<?php
/**
 * Created by PhpStorm.
 * User: antoinefarley
 * Date: 2019-07-16
 * Time: 14:55
 */

require_once("StopWords.php");
require_once("ImageSearcher.php");
$tradString = $_POST['tradString'];

//$tradString = "The chair is red and blue.";

//Creating an instance of StopWords class
//$stopWords = new StopWords();
//$arrwords = $stopWords->remStopWordsArray($tradString);
$input = strtolower($tradString);
$arrwords = str_replace(str_split(',.!?'), "", $input);
$arrwords = preg_split("/[\s]+/", $arrwords);
$arrwords = array_values($arrwords);

$imgSearcher = new ImageSearcher('en');
$returnArr = [];

//
foreach ($arrwords as $value)
{array_push($returnArr, [$value, $imgSearcher->search($value)]);}

$encoded = json_encode($returnArr, JSON_PRETTY_PRINT, JSON_FORCE_OBJECT);

echo $encoded;
