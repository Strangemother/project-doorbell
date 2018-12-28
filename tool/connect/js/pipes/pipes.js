
var connections = {}
var lines = [
    //["teal", "orange", { direction: 'vert'}]
    //, ["red", "orange"]
    //["teal", "aqua", { direction: 'auto'}]
    //, ["red", "aqua", { direction:'horiz'}]
    //, ["purple", "teal"]
    // , ["orange", "green"]
]


class Coords {
    constructor(ax,ay, _a, _b) {
        this.x = ax
        this.y = ay
        this._a = _a
        this._b = _b
    }
}

class Coords2 {
    constructor(a, b, _a, _b) {
        this.ax = a.x
        this.ay = a.y
        this.bx = b.x
        this.by = b.y
        this._a = _a
        this._b = _b
    }

    get a(){
        return new Coords(this.ax, this.ay, this._a, this._b)
    }

    get b(){
        return new Coords(this.bx, this.by, this._a, this._b)
    }

    get height(){
        return this.by - this.ay
    }

    get width(){
        return this.bx - this.by
    }
}


class Paths {
    constructor(lines){
        this.lines = lines
    }

    addNodes(a, b) {
        /* Add a left and right node with an edge.*/

        if($(a).length == 0) { $('<div/>', { id: a}).appendTo('#outer') };
        if($(b).length == 0) { $('<div/>', { id: b}).appendTo('#outer') };
        this.addEdge(a,b)
        render()

    }

    addEdge(a,b){
        lines.push([a,b, this.defaultEdge()])
    }

    defaultEdge(){
        return {
            direction: 'auto'
            , width: '3px'
            , color: 'red'
            , pulse: []
        }
    }
}

function resetSVGsize(){
  $("#svg1").attr("height", "0");
  $("#svg1").attr("width", "0");
}

var svgContainerContext = function(){
    return $('#svgContainer')
}

var svgContext = function(){

    let svg = $("#svg1")
    if (svg.length == 0){
         svg = $("<svg/>", {id: "svg1"})
         svg.appendTo(svgContainerContext())
     }
     return svg
}

function connectAll() {
    let svg = svgContext()
    lines = window.nodes_app? nodes_app.lines: []
    //connections = []
    // connect all the paths you want!
   
    for (var i = 0; i < lines.length; i++) {
        let a,b,c; 

        if(lines[i].length == 2){
            [a,b] = lines[i]
        }
        
        if(lines[i].length == 3){
            [a,b,c] = lines[i]
        }
        
        let _na = typeof(a) != 'string'? $(a)[0].id: a;
        let _nb = typeof(b) != 'string'? $(b)[0].id: b;
        let name = `path-${_na}-${_nb}`;

        c = c == undefined? connections[name] || {}: c
        
      //  debugger
        let $path = $( `#${c.name || name}`)
        let $a = typeof(a) == 'string'? $(`#${a}`)[0]: a;
        let $b = typeof(b) == 'string'? $(`#${b}`)[0]: b;
        if($a == undefined || $b == undefined) {
            continue
        }
        if($path.length == 0) {
            //$path = $('<path/>', { id:name})
            // $path.appendTo(svg)
            console.log('Generating new path', name)
            $path = newPath(svg, name)
            c.name = name
        }

        let con = connectElements(svg, $path, $a,   $b, c);
        if(con != undefined) {
            let v =Object.assign(connections[name] || {}, con)
            if(connections[name] == undefined) {
                connections[name] = v
            }
        }

        if(connections[name]) {
            connections[name].line = lines[i]
            connections[name].lineIndex = i
        }
    }
}


var newPath = function(svg, name){
    var $path = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace
    $path.id = name
    $path.setAttribute("d","M 0 0 L 10 10"); //Set path's data
    $path.style.stroke = "#000"; //Set stroke colour
    $path.style.strokeWidth = "5px"; //Set stroke width
    svg[0].appendChild($path);
    return $(`#${name}`)
}

var i = -15;
function quick_demo(){
    i += 0.2;
    var outerW  = parseInt($("#outer").css('width'));
    $("#outer").css({'width': outerW+i});
    render()

    if (i<14.7) {
        requestAnimationFrame(quick_demo)
    } else {
        $("#outer").css({'width': ''});
    }
}

;(function(){
   var renderFrame = function(){
        window.setTimeout(function(){
            render()
            requestAnimationFrame(renderFrame)
        }, 100)
   }
})();


var render = function(){
    resetSVGsize();
    connectAll();
}


$(document).ready(function() {
    render()
    //quick_demo();
});


$(window).resize(function () {
    render()
});





