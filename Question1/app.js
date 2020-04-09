

(function retrieveMostFrequentlyUsedWords(literatureText, wordsToExclude) {
    "use strict";
    console.log(literatureText);
    
    let r = /[^A-Za-z]/;
    let list = literatureText.split(r);
    list = list.map( word => word.toLowerCase() );
    console.log(list);
    
    let raw = list.reduce( 
        (previous, curent, index) => {
            previous.get(curent) ? 
                previous.set(curent, previous.get(curent)+1):
                previous.set(curent, 1);
            return previous;
        },
        new Map()
    );
    console.log(raw);
    
    let exclude = new Set(wordsToExclude.map( word => word.toLowerCase() ));
    exclude.add("");
    console.log(exclude);
    
    let result = new Array();
    let clean = new Map();
    let maxValue = 0;

    raw.forEach( (value, key) => {
        if( !exclude.has(key) ){
//            console.log(key, value);
            maxValue = value>maxValue?value:maxValue;
            clean.set(key, value);
        }
    }); 
    console.log(maxValue);
    console.log(clean);
    
    clean.forEach( (value, key) => {
        if( value === maxValue ){
            result.push(key);
        }
    }); 
    
    console.log(result);
    
    return result;
    
    
} ("Jack and Jill went to the market to buy bread and cheese. Cheese is Jack's and Jill's favourite food.",
 ["and",
  "he",
  "the",
  "to",
  "is",
  "Jack",
  "Jill"
 ])
)
