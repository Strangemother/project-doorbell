
let EDGE = {
    direction: 'auto'
    , cls: 'ants slow'
    , color: 'green'
    , width: '3px'
    , jointMin: 5
    , jointMax: 15
    // Due to reactive hooking - this must exist on the configuration
    // before the load.
    , pulse:[]
}

var nodes_app= new Vue({
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
            // ["red", "aqua", {
            //     direction: 'auto'
            //     , cls: 'ants slow'
            //     , pulse: [
            //         { name: 'bob' }
            //         , { name: 'derek' }
            //     ]
            // }]
             ["red", "orange", {
                direction:'horiz'
                , cls: 'ants slow'
                , jointMin: 5
                , jointMax: 15
                // Due to reactive hooking - this must exist on the configuration
                // before the load.
                , pulse:[]
            }]
            , ["teal", "orange", {
                direction: 'vert'
                , cls: 'ants slow'
                , color: 'green'
                , width: '3px'

            }]
            // , ["orange", "green"]
        ]
    }
    , methods: {
        addNodeEnter(){
            // You could simply push a new div to the view
            // and the rendering will occur -
            // but we call the internal function here to
            // reactive map the extra params
            // items.push(inputV); inputV=""
            this.items.push(this.inputV);
            this.inputV = ''
        }

        , addEdge(nameA, nameB, config){
            let conf = Object.assign(this.defaultEdge(), config)
            return lines.push([nameA, nameB, conf])
        }

        , removeEdge(edge) {
            if(this.lines[edge] != undefined ) {
                // is index
                return this._destroyEdges(this.lines.splice(edge, 1)[0])
            }

            for (var i = 0; i < this.lines.length; i++) {
                if(this.lines[i][2] != undefined) {
                    if(this.lines[i][2] == edge) {
                        // object match
                        return this._destroyEdges(this.lines.splice(i, 1)[0])
                    }

                    if(this.lines[i][2].id == edge) {
                        // ID Match
                        return this._destroyEdges(this.lines.splice(i, 1)[0])
                    }
                }
            }
        }

        , _destroyEdges(edge) {
            for(let pathname in connections) {
                if(connections[pathname].line == edge) {
                    // found in sub-ref
                   connections[pathname].path.remove()
                   let v = connections[pathname]
                   delete connections[pathname]
                   return v
                }
            }
        }

        , addPulse(line_index, config) {
            let item = this.lines[line_index][2]
            if(config == undefined) {config = {}}

            if(item == undefined) {
                console.warn('Line config does not exist for index', line_index)
                return
            }
            if(item.pulse == undefined) {
                console.warn('Config does not have a "pulse" attribute. Creating')
                item.pulse = []
            }
            item.pulse.push(config)
            refreshTrackers()
            render()
        }

        , defaultEdge(){
            return Object.assign({}, EDGE)
        }
    }



})


class DynamicSheet {
    constructor(selector, config){
        this.selector = selector
        this.config = config || {}
    }

    writeProps(attrs){
        attrs = attrs || this.attrs()
        for(let key in attrs) {
            Object.defineProperty(this, key, {
                get() { return this[`_${keys}`]; },
                set(newValue) {
                    this[`_${keys}`] = newValue
                    this.updateAttr(key, newValue)
                },
                enumerable: true,
                configurable: true
            });
            this.updateAttr(key, attrs[key])
        }
    }

    get $element(){
        if(this._element == undefined) {
            this._element = $(this.selector)
        }
        return this._element
    }

    get element(){
        return this.$element[0]
    }

    generate(initProps) {

        if(this.rules != undefined) {
            // regenerate?
            return this
        }

        this.rules = addStylesheetRules([
          [this.selector, initProps]
        ]);

        this.writeProps(this.attrs())
        return this
    }

    attrs(){
        let r = Math.ceil(Math.random() * 10)
        return Object.assign({}, {
            "animationDuration": `${r}s`
            , "animationDirection": "normal"
            , "animationTimingFunction": "linear"
            , "animationIterationCount": "infinite"
            , "animationPlayState": "running"
            , "animationFillMode": "unset"
            , "animationDelay": "0s"
            , "animationName": "red-ball"
            , "offsetPath": "path()"
            , "offsetDistance": '0%'
        }, this.config)
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
            this.updateAttr('offsetPath', path)
        }
    }

    updateAttr(name, value) {
        for (var i = 0; i < this.rules.length; i++) {
            this.rules[i].style[name] = value
        }
    }
}

var dynamicRuleCache = {}

var dynamicRule = function(selector, path, config) {
    let res = dynamicRuleCache[selector]

    if(dynamicRuleCache[selector] == undefined) {
        res = new DynamicSheet(selector, config)
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

