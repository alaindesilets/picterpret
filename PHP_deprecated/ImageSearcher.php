<?php
class ImageSearcher
{
    public $endpoint = 'https://api.cognitive.microsoft.com/bing/v7.0/images/search';
    public $accessKey = "fd2d758f159e4132a378b8462d8b235f";
    public $lang;

    function __construct($lang)
    {
        $this->lang=$lang;
    }

    function search($keyword)
    {
        //Headers
        $headers = "Ocp-Apim-Subscription-Key: $this->accessKey\r\n";

        //Options
        $options = array ('http' => array (
            'header' => $headers,
            'method' => 'GET'));

        // Perform the request and receive a response.
        $context = stream_context_create($options);
        $result = file_get_contents($this->endpoint . "?q=" . urlencode($keyword) . "&count=10&offset=0", false, $context);

        // Extract Bing HTTP headers.
        $headers = array();
        foreach ($http_response_header as $k => $v) {
            $h = explode(":", $v, 2);
            if (isset($h[1]))
                if (preg_match("/^BingAPIs-/", $h[0]) || preg_match("/^X-MSEdge-/", $h[0]))
                    $headers[trim($h[0])] = trim($h[1]);
        }

        //Process the results to get an array of urls in order of importance/query validity
        //Send the request and get the json file back
        $resultJSON = array($headers, $result);

        //Decode the json file
        $jsonARRAY = json_decode($resultJSON[1], true);

        //Extract the "images" json category from the more general file
        $imagesURL = $jsonARRAY['value'];

        //Extract individual urls in an array
        $imagesURLString = [];
        foreach ($imagesURL as $num => $value)
        {array_push($imagesURLString, $imagesURL[$num]['contentUrl']);}

        return $imagesURLString;
    }
}




