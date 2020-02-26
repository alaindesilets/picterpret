//handled by StringTranslator.js

<?php
/**
 * Created by PhpStorm.
 * User: antoinefarley
 * Date: 2019-07-16
 * Time: 12:25
 */

require_once("StringTranslator.php");

$tradString = $_POST['tradString'];
$sourceLang = $_POST['sourceLang'];
$targetLang = $_POST['targetLang'];


//Creating an instance of StringTranslator

$strTranslator = new StringTranslator($sourceLang, $targetLang);

    //Testing the class/function
    $returnData = $strTranslator ->translate($tradString);
    echo($returnData);