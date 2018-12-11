var nodes= new Vue({
    el: '#nodes'
    , data: {
        inputV: 'purple'
        , items: [
           // "green"
            // , "red"
             "teal"
            , "red"
            , "aqua"
            , "orange"
        ]
        ,  lines: [
            //, ["red", "orange"]
            ["red", "aqua", {
                direction: 'auto'
                , cls: 'ants slow'
                , pulse: [
                    { name: 'bob' }
                    , { name: 'derek' }
                ]
            }]
            , ["teal", "orange", {
                direction: 'vert'
                , cls: 'ants slow'
                , color: 'green'
                , width: '3px'
            }]
            , ["red", "orange", { direction:'horiz', cls: 'ants slow'}]
            , ["purple", "teal"]
            // , ["orange", "green"]
        ]
    }
})


class DynamicSheet {
    constructor(selector){
        this.selector = selector
    }

    generate(initProps) {
        this.rules = addStylesheetRules([
          [this.selector, initProps]
        ]);
    }

    setPath(path){
        if(typeof(path) == 'string') {
            // no edits
        }

        if(Array.isArray(path)) {
            let pathStr = path.join(' ')
            path = `path('${pathStr}')`
        }

        if(this.rules == undefined){
            this.generate(['offset-path', path])
        } else {
            this.updatePath('offsetPath', path)
        }
    }

    updatePath(name, value) {
        //p[0].style.offsetPath = "path('M 126.094 10 V 86.28 A 9.951 9.95 0 0 0 136.044 96.23 H 708.347')"
        for (var i = 0; i < this.rules.length; i++) {
            this.rules[i].style[name] = value
        }
    }
}

var dynamicRuleCache = {}

var dynamicRule = function(selector, path) {
    let res = dynamicRuleCache[selector]

    if(dynamicRuleCache[selector] == undefined) {
        res = new DynamicSheet(selector)
        dynamicRuleCache[selector] = res
    }

    if(path!=undefined) {
        res.setPath(path)
    }

    return res
}

var styleEl
function addStylesheetRules (rules) {
    /*
    let v = addStylesheetRules([
        ['#ball',
            ['offset-path', 'path("M126.09375 10 V86.28 A9.951 9.950 0 0 0 136.04375 96.23 H708.3468750")']
        ]
    ]);
    */
    if(styleEl == undefined) {
        styleEl = document.createElement('style');
        document.head.appendChild(styleEl);
    }
  let res = []
  // Append <style> element to <head>

  // Grab style element's sheet
  var styleSheet = styleEl.sheet;

  for (var i = 0; i < rules.length; i++) {
    var j = 1,
        rule = rules[i],
        selector = rule[0],
        propStr = '';
    // If the second argument of a rule is an array of arrays, correct our variables.
    if (Array.isArray(rule[1][0])) {
      rule = rule[1];
      j = 0;
    }

    for (var pl = rule.length; j < pl; j++) {
      var prop = rule[j];
      //propStr += prop[0] + ': ' + prop[1] + (prop[2] ? ' !important' : '') + ';\n';
      propStr += `${prop[0]}: ${prop[1]} ${prop[2] ? ' !important' : ''};\n`;
    }

    // Insert CSS Rule
    let _rule = styleSheet.insertRule(`${selector} {${propStr}}`, styleSheet.cssRules.length);
    res.push(styleEl.sheet.rules[_rule])
  }

  return res
}

