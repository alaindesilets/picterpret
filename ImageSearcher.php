<?php
class ImageSearcher
{
    public $endpoint = 'https://api.cognitive.microsoft.com/bing/v7.0/search';
    public $accessKey = "fd2d758f159e4132a378b8462d8b235f";
    public $lang;

    function __construct($lang)
    {
        $this->lang=$lang;
    }

    function search($keyword)
    {

        function BingWebSearch ($url, $key, $query) {
            /*
             * Prepare the HTTP request.
             * NOTE: Use the key 'http' even if you are making an HTTPS request.
             * See: http://php.net/manual/en/function.stream-context-create.php.
             */
            $headers = "Ocp-Apim-Subscription-Key: $key\r\n";
            $options = array ('http' => array (
                'header' => $headers,
                'method' => 'GET'));


            // Perform the request and receive a response.
            $context = stream_context_create($options);
            $result = file_get_contents($url . "?q=" . urlencode($query), false, $context);


            // Extract Bing HTTP headers.
            $headers = array();
            foreach ($http_response_header as $k => $v) {
                $h = explode(":", $v, 2);
                if (isset($h[1]))
                    if (preg_match("/^BingAPIs-/", $h[0]) || preg_match("/^X-MSEdge-/", $h[0]))
                        $headers[trim($h[0])] = trim($h[1]);
            }
            return array($headers, $result);
        }


        //Process the results to get an array of urls in order of importance/query validity
        //Send the request and get the json file back
        $resultJSON = BingWebSearch($this->endpoint, $this->accessKey, $keyword);

        //Decode the json file
        $jsonARRAY = json_decode($resultJSON[1], true);

        //Extract the "images" json category from the more general file
        $imagesURL = $jsonARRAY['images']['value'];

        //Extract individual urls in an array
        $imagesURLString = [];
        foreach ($imagesURL as $num => $value)
        {
            array_unshift($imagesURLString, $imagesURL[$num]['contentUrl']);
        }

        print_r($imagesURLString);

        return $imagesURLString;
    }


}

?>



