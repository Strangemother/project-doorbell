
var lines = [
    //["teal", "orange", { direction: 'vert'}]
    //, ["red", "orange"]
    ["teal", "aqua", { direction: 'auto'}]
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

function resetSVGsize(){
  $("#svg1").attr("height", "0");
  $("#svg1").attr("width", "0");
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
        lines.push([a,b])
    }
}

var svgContext = function(){

    let svg = $("#svg1")
    if (svg.length == 0){
         svg = $("<svg/>", {id: "svg1"})
         svg.appendTo('#svgContainer')
     }
     return svg
}

function connectAll() {
    let svg = svgContext()
    lines = nodes.lines
    // connect all the paths you want!
    for (var i = 0; i < lines.length; i++) {
        let a,b,c = {}
        if(lines[i].length == 2){
            [a,b] = lines[i]
        }
        if(lines[i].length == 3){
            [a,b,c] = lines[i]
        }

        let name = `path${i+1}`;
        let $path = $(`#${name}`)
        if($path.length == 0) {
            //$path = $('<path/>', { id:name})
            // $path.appendTo(svg)
            var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace
            newElement.id = name
            newElement.setAttribute("d","M 0 0 L 10 10"); //Set path's data
            newElement.style.stroke = "#000"; //Set stroke colour
            newElement.style.strokeWidth = "5px"; //Set stroke width
            svg[0].appendChild(newElement);
            $path = $(`#${name}`)
        }

        connectElements(svg, $path, $(`#${a}`)[0],   $(`#${b}`)[0], c);
    }

}

var space = {moving: undefined};

$('#outer').on('mousedown', 'div', function(e){
    e.preventDefault()
    e.stopPropagation()
    if(space.moving==undefined) {
        //console.log('Mouse down', this.id)
        let offset = $(this).offset()

        space.moving = {
            id: this.id
            , el: this
            //, x: this.offsetTop
            , offsetX: e.offsetX
            //, y: this.offsetLeft
            , offsetY: e.offsetY
        }
    }

    //console.log('Mouse down', space.moving)

})

var moveDiv = function(e){
    if(!space.moving) { return }
    let el = space.moving.el
    let stageY = e.clientY - space.moving.offsetY
    let stageX = e.clientX - space.moving.offsetX
    $(el).offset({left: stageX, top: stageY})

}

$('body, svgContainer').on('mouseup', function(e){
    moveDiv(e)
    space.moving = undefined
    render()
})

var render = function(){
  resetSVGsize();
    connectAll();
}

$('body, svgContainer').on('mousemove', function(e){
    if(space.moving){
        moveDiv(e)
        render()
    }
})


var i = -15;
function quick_demo(){
  i += 0.2;
  var outerW  = parseInt($("#outer").css('width'));
  $("#outer").css({'width': outerW+i});
  resetSVGsize();
  connectAll();

  if (i<14.7) requestAnimationFrame(quick_demo);
  else        $("#outer").css({'width': ''});

}

;(function(){
   var renderFrame = function(){
        window.setTimeout(function(){
            resetSVGsize();
            connectAll();
            requestAnimationFrame(renderFrame)
        }, 100)
   }
})()


$(document).ready(function() {
    // reset svg each time
    resetSVGsize();
    connectAll();
    // resize simulation demo, comment it out to make it stop
    //quick_demo();

});

$(window).resize(function () {
    // reset svg each time
    resetSVGsize();
    connectAll();
});





