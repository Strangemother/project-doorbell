//helper functions, it turned out chrome doesn't support Math.sgn()
function signum(x) {
    return (x < 0) ? -1 : 1;
}
function absolute(x) {
    return (x < 0) ? -x : x;
}

// https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Arcs
let arc = function(rx, ry, xrot, large, sweep, x, y){
        o = rx
        if(typeof(rx) != 'object') {
            o = { rx, ry, xrot, large, sweep, x, y}
        }
        return `A${o.rx} ${o.ry} ${o.xrot || 0} ${o.large?1: 0} ${o.sweep? 1: 0} ${o.x} ${o.y}`
    }

    let move = function(x, y){
        return `M${x} ${y}`
    }

    let vert = function(length) {
        return `V${length}`
    }

    let horiz = function(length) {
        return `H${length}`
    }

var adaptDrawLayer = function(svg, startX, startY, endX, endY, padding) {
    // check if the svg is big enough to draw the path, if not, set heigh/width
    if (svg.attr("height") <  endY)  {
        svg.attr("height", endY);
    }
    if (svg.attr("width" ) < (startX + padding) ) {
        svg.attr("width", (startX + padding));
    }
    if (svg.attr("width" ) < (endX   + padding) ) {
        svg.attr("width", (endX   + padding));
    }
}

function drawPath(svg, path, startX, startY, endX, endY) {
    // get the path's stroke width (if one wanted to be  really precize, one could use half the stroke size)

    var stroke =  parseFloat(path.css("stroke-width"));
    adaptDrawLayer(svg, startX, startY, endX, endY, stroke)

    var deltaX = (endX - startX) * 0.05;
    var deltaY = (endY - startY) * 0.05;
    var val = 12
    var valX = val
    var valY = val
    if(deltaX < 0) { valX = -val}
    if(deltaY < 0) { valY = -val}
    deltaX = Math.min(deltaX, valX)
    deltaY = Math.min(deltaY, valY)
    // for further calculations which ever is the shortest distance
    var delta  =  deltaY < absolute(deltaX) ? deltaY : absolute(deltaX);


    // draw tha pipe-like path
    // 1. move a bit down, 2. arch,  3. move a bit to the right, 4.arch, 5. move down to the end

    let arcA = arc({
        rx:delta
        , ry:delta
        // set sweep-flag (counter/clock-wise)
        // if start element is closer to the left edge,
        // draw the first arc counter-clockwise, and the second one clock-wise
        , sweep: startX > endX // left or right bool.
        , x: startX + delta*signum(deltaX)
        , y: startY + 2*delta
    })

    let arcB = arc({
        rx:delta
        , ry:delta
        , sweep: startX <= endX // left or right bool.
        , x: endX
        , y: startY + 3*delta
    })

    //A${delta} ${delta} 0 0 ${arc1} ${(startX + delta*signum(deltaX))} ${startY + 2*delta}
    let l = `${move(startX, startY)}
        ${vert(startY + delta)}
        ${arcA}
        ${horiz(endX - delta*signum(deltaX))}
        ${arcB}
        ${vert(endY)}`

    path.attr("d", l)
}

var down2Pipe = function(){
    /* A pipe from A (top) to B (bottom) with two joints*/
    drawPath(svg, path, startX, startY, endX, endY)
}

function connectElements(svg, path, startElem, endElem) {
    var svgContainer= $("#svgContainer");

    // if first element is lower than the second, swap!
    if(startElem.offset().top > endElem.offset().top){
        var temp = startElem;
        startElem = endElem;
        endElem = temp;
    }

    // get (top, left) corner coordinates of the svg container
    var svgTop  = svgContainer.offset().top;
    var svgLeft = svgContainer.offset().left;

    // get (top, left) coordinates for the two elements
    var startCoord = startElem.offset();
    var endCoord   = endElem.offset();

    // calculate path's start (x,y)  coords
    // we want the x coordinate to visually result in the element's mid point
    var startX = startCoord.left + 0.5*startElem.outerWidth() - svgLeft;    // x = left offset + 0.5*width - svg's left offset
    var startY = startCoord.top  + startElem.outerHeight() - svgTop;        // y = top offset + height - svg's top offset

        // calculate path's end (x,y) coords
    var endX = endCoord.left + 0.5*endElem.outerWidth() - svgLeft;
    var endY = endCoord.top  - svgTop;

    // call function for drawing the path
    drawPath(svg, path, startX, startY, endX, endY);
}

function resetSVGsize(){
  $("#svg1").attr("height", "0");
  $("#svg1").attr("width", "0");
}

var lines = [
    ["teal", "orange"]
    , ["red", "orange"]
    , ["teal", "aqua"]
    , ["red", "aqua"]
    , ["purple", "teal"]
    , ["orange", "green"]
]

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

    // connect all the paths you want!
    for (var i = 0; i < lines.length; i++) {
        let [a,b] = lines[i]

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

        connectElements(svg, $path, $(`#${a}`),   $(`#${b}`));
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


$(document).ready(function() {
    // reset svg each time
    resetSVGsize();
    connectAll();
    // resize simulation demo, comment it out to make it stop
    quick_demo();

});

$(window).resize(function () {
    // reset svg each time
    resetSVGsize();
    connectAll();
});

