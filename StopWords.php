<?php
class StopWords
{
    public $swords = ["i", "want", "me", "my", "myself", "we", "our", "ours", "ourselves",
        "you", "your", "yours", "yourself", "yourselves", "he", "him", "his", "himself",
        "she", "her", "hers", "herself", "it", "its", "itself", "they", "them", "their",
        "theirs", "themselves", "what", "which", "who", "whom", "this", "that", "these",
        "those", "am", "is", "are", "was", "were", "be", "been", "being", "have", "has",
        "had", "having", "do", "does", "did", "doing", "a", "an", "the", "and", "but",
        "if", "or", "because", "as", "until", "while", "of", "at", "by", "for", "with",
        "about", "against", "between", "into", "through", "during", "before", "after",
        "above", "below", "to", "from", "up", "down", "in", "out", "on", "off", "over",
        "under", "again", "further", "then", "once", "here", "there", "when", "where",
        "why", "how", "all", "any", "both", "each", "few", "more", "most", "other",
        "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too",
        "very", "s", "t", "can", "will", "just", "don", "should", "now"];

    function __construct()
    {

    }

    function isStopWord($input)
    {
        if(in_array(strtolower($input), $this->swords))
        {return true;}
        else{return false;}
    }

    function remStopWordsArray($input)
    {
        $input = strtolower($input);
        $wordarr = str_replace(str_split(',.!?'), "", $input);
        $wordarr = preg_split("/[\s]+/", $wordarr);
        $wordarr = array_diff($wordarr, $this->swords);
        return $wordarr;

    }





}

?>


