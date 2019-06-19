<?php
class StringTranslator
{
    // NOTE: Be sure to uncomment the following line in your php.ini file.
    // ;extension=php_openssl.dll

    private $key = '4b709d313c17489bbe2cc41dc664e0ae';
    private $host = "https://api.cognitive.microsofttranslator.com";
    private $path = "/translate?api-version=3.0";

    public $params;

    function __construct($sLang, $tLang)
    {$this->params = "&from=" . strtolower($sLang) . "&to=" . strtolower($tLang);}

    function translate($text)
    {
        if (!function_exists('com_create_guid')) {
            function com_create_guid() {
                return sprintf( '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
                    mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ),
                    mt_rand( 0, 0xffff ),
                    mt_rand( 0, 0x0fff ) | 0x4000,
                    mt_rand( 0, 0x3fff ) | 0x8000,
                    mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff )
                );
            }
        }

        function Translate ($host, $path, $key, $params, $content) {
            $headers = "Content-type: application/json\r\n" .
                "Content-length: " . strlen($content) . "\r\n" .
                "Ocp-Apim-Subscription-Key: $key\r\n" .
                "Ocp-Apim-Subscription-Region: canadacentral\r\n" .
                "X-ClientTraceId: " . com_create_guid() . "\r\n";

            $options = array (
                'http' => array (
                    'header' => $headers,
                    'method' => 'POST',
                    'content' => $content,
                    'ignore_errors' => true,
                )
            );
            $context  = stream_context_create ($options);
            $result = file_get_contents ($host . $path . $params, false, $context);
            return $result;
        }


        $requestBody = array (array ('Text' => $text,),);
        $content = json_encode($requestBody);
        $result = Translate ($this->host, $this->path, $this->key, $this->params, $content);

        //Decoding the json file into an array and returning only the translation as a string
        $jsonARRAY = json_decode($result, true);
        $jsonARRAY = $jsonARRAY[0]['translations'][0]['text'];
        return $jsonARRAY;
    }
}


?>