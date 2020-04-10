var root = document.body;
const App = {
    initialLiteratureText: "Jack and Jill went to the market to buy bread and cheese. Cheese is Jack's and Jill's favourite food.",
    rawmap: "",
    makeMap: function(){
        let r = /[^A-Za-z]/;
        let list = literatureText.value.split(r);
        list = list.map( word => word.toLowerCase() );

        let raw = list.reduce( 
            (previous, curent, index) => {
                previous.get(curent) ? 
                    previous.set(curent, previous.get(curent)+1):
                    previous.set(curent, 1);
                return previous;
            },
            new Map()
        );
        App.rawmap = raw;
        
        let rawmapstr = "";
        App.rawmap.forEach( (value, key) => {
            rawmapstr += key;
            rawmapstr += '\t';
            rawmapstr += value;
            rawmapstr += '\n';
        }); 
        
        map.value = rawmapstr;
    },
    wordsToExclude: [
        "and",
        "he",
        "the",
        "to",
        "is",
        "Jack",
        "Jill"
    ],
    excludeWords: function(){
        let exclude = new Set(App.wordsToExclude.map( word => word.toLowerCase() ));
        exclude.add("");

        let result = new Array();
        let clean = new Map();
        let maxValue = 0;

        App.rawmap.forEach( (value, key) => {
            if( !exclude.has(key) ){
                maxValue = value>maxValue?value:maxValue;
                clean.set(key, value);
            }
        }); 

        clean.forEach( (value, key) => {
            if( value === maxValue ){
                result.push(key);
            }
        }); 

        resultText.value = result;
    }
};

m.render(root, [
    m("main", [
        m("h1", {class: "title"}, "Retrieve Most Frequently Used Words"),
        m("textarea[placeholder=Input the Text]#literatureText", {rows:2, cols:58, value:App.initialLiteratureText}),
        m("button", {onclick: App.makeMap}, "Make Map"),
        m("textarea[placeholder=Raw map of words and counts]#map", {rows:16, cols:58, value:App.rawmap}),
        m("button", {onclick: App.excludeWords}, "Exclude these words"),
        m("textarea[placeholder=Words to exclude]#wordsToExclude", {rows:2, cols:58, value:App.wordsToExclude,disabled:"disabled"}),
        m("textarea[placeholder=Result will be here]#resultText", {rows:2, cols:58, value:App.result}),
    ])
])
