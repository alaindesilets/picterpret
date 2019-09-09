<?php
/**
 * Created by PhpStorm.
 * User: antoinefarley
 * Date: 2019-07-16
 * Time: 12:25
 */

require("StringTranslator.php");

$tradString = $_POST['tradString'];

//Creating an instance of StringTranslator
$sourceLang = "en";
$targetLang = "fr";
$strTranslator = new StringTranslator($sourceLang, $targetLang);

    //Testing the class/function
    $returnData = $strTranslator ->translate($tradString);
    echo($returnData);