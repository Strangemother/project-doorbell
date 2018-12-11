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
            ["red", "aqua", { direction: 'auto', cls: 'ants slow'}]
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



var styleEl
function addStylesheetRules (rules) {
    // addStylesheetRules([
    //     ['#ball',
    //         ['offset-path', 'path("M126.09375 10 V86.28 A9.951 9.950 0 0 0 136.04375 96.23 H708.3468750")']
    //     ]
    // ]);

  styleEl = document.createElement('style');
  let res = []
  // Append <style> element to <head>
  document.head.appendChild(styleEl);

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
      propStr += prop[0] + ': ' + prop[1] + (prop[2] ? ' !important' : '') + ';\n';
    }

    // Insert CSS Rule
    let _rule = styleSheet.insertRule(selector + '{' + propStr + '}', styleSheet.cssRules.length);
    res.push(styleEl.sheet.rules[_rule])
  }

  return res
}

