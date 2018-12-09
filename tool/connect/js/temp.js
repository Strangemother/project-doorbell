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

var adaptDrawLayer = function(svg, coord, padding) {
    // check if the svg is big enough to draw the path, if not, set heigh/width
    if (svg.attr("height") <  coord.by)  {
        svg.attr("height", coord.by);
    }

    if (svg.attr("width" ) < (coord.ax + padding) ) {
        svg.attr("width", (coord.ax + padding));
    }

    if (svg.attr("width" ) < (coord.bx   + padding) ) {
        svg.attr("width", (coord.bx   + padding));
    }
}

function drawPath(svg, path, _path, coord) {
    // get the path's stroke width (if one wanted to be  really precize, one could use half the stroke size)

    var stroke =  parseFloat(path.css("stroke-width"));
    adaptDrawLayer(svg, coord, stroke, 100)
    //A${delta} ${delta} 0 0 ${arc1} ${(startX + delta*signum(deltaX))} ${startY + 2*delta}
    let l = _path.join(' ')
    path.attr("d", l)
}


var getDeltaVert = function(startX, startY, endX, endY, max){
    var deltaX = (endX - startX) * 0.05;
    var deltaY = (endY - startY) * 0.05;
    var val = max
    var valX = val
    var valY = val

    if(deltaX < 0) { valX = -val}
    if(deltaY < 0) { valY = -val}

    deltaX = Math.min(deltaX, valX)
    deltaY = Math.min(deltaY, valY)
    // for further calculations which ever is the shortest distance
    var delta  =  deltaY < absolute(deltaX) ? deltaY : absolute(deltaX);

    return {
        deltaX, deltaY, delta
    }
}

var getDeltaHoriz = function(startX, startY, endX, endY, max){
    var deltaX = (endX - startX) * 0.05;
    var deltaY = (endY - startY) * 0.05;
    var val = max
    var valX = val
    var valY = val

    if(deltaX < 0) { valX = -val}
    if(deltaY < 0) { valY = -val}

    deltaX = Math.min(deltaX, valX)
    deltaY = Math.min(deltaY, valY)
    // for further calculations which ever is the shortest distance
    var delta  =  deltaY < absolute(deltaX) ? deltaY : absolute(deltaX);

    return {
        deltaX, deltaY, delta
    }
}

var isAbs = function(c) {
    let max = 5
    let v = absolute(c.bx-c.ax)
    let vy = absolute(c.by-c.ay)
    return (vy < 5 || v < 5)
}

var vert2Pipe = function(c){
    /* A pipe from A (top) to B (bottom) with two joints*/

    if(isAbs(c)) {
        return verticalPipe(c)
    }

    let d3 =  getDeltaVert(c.ax, c.ay, c.bx, c.by, 12)
    // draw tha pipe-like path
    // 1. move a bit down, 2. arch,  3. move a bit to the right, 4.arch, 5. move down to the end
    let jointOffset = c.height / 3
    let arcA = arc({
        rx:d3.delta
        , ry:d3.delta
        // set sweep-flag (counter/clock-wise)
        // if start element is closer to the left edge,
        // draw the first arc counter-clockwise, and the second one clock-wise
        , sweep: c.ax > c.bx // left or right bool.
        , x: c.ax + d3.delta*signum(d3.deltaX)
        , y: c.ay + jointOffset + 2*d3.delta
    })

    let arcB = arc({
        rx:d3.delta
        , ry:d3.delta
        , sweep: c.ax <= c.bx // left or right bool.
        , x: c.bx
        , y: c.ay  + jointOffset+ 3*d3.delta
    })

    return [
        move(c.ax, c.ay)
        , vert(c.ay + d3.delta + jointOffset)
        , arcA
        , horiz(c.bx - d3.delta*signum(d3.deltaX))
        , arcB
        , vert(c.by)
    ]

}

var horiz2Pipe = function(c) {
    if(isAbs(c)) {
        return horizPipe(c)
    }


    // draw tha pipe-like path
    // 1. move a bit down, 2. arch,  3. move a bit to the right, 4.arch, 5. move down to the end

   //d3.delta = 10

    let split = c.bx - ((c.bx - c.ax)/2)

    let d3 =  getDeltaVert(c.ax, split, c.by, c.bx, 12)
   // jointOffset = c.height / 3
    let jointOffset = d3.delta
    let fromX = split - jointOffset

    let arcA = arc({
        rx: jointOffset
        , ry: jointOffset
        , sweep: c.ax < c.bx // left or right bool.
        // x pos of end
        , x: split
        , y: c.ay  + jointOffset //+ 3*d3.delta
    })

    let arcB = arc({
        rx: jointOffset
        , ry: jointOffset
        , sweep: c.ax > c.bx // left or right bool.
        // x pos of end
        , x: split - c.bx - jointOffset
        , y: c.by - jointOffset //+ 3*d3.delta
    })

    return [
        move(c.ax, c.ay)
        , horiz(fromX)
        , arcA
        , vert(c.by)
        , arcB
        //, vert(c.ay + d3.delta + jointOffset)


    ]
}

var verticalPipe = function(c){
    return movePipe(c, vert)
}

var horizPipe = function(c){
    return movePipe(c, horiz)
}

var movePipe = function(c, direction){
    return [
      move(c.ax, c.ay)
      , direction(c.by)
    ]
}

class Coords {
    constructor(ax,ay) {
        this.x = ax
        this.y = ay
    }
}

class Coords2 {
    constructor(ax,ay, bx, by) {
        this.ax = ax
        this.ay = ay
        this.bx = bx
        this.by = by
    }

    get a(){
        return new Coords(this.ax, this.ay)
    }

    get b(){
        return new Coords(this.bx, this.by)
    }

    get height(){
        return this.by - this.ay
    }

    get width(){
        return this.bx - this.by
    }
}

var getXY = function(elem, pos){
    var startCoord = elem.offset();
    var svgContainer= $("#svgContainer");
    // get (top, left) corner coordinates of the svg container
    var svgTop  = svgContainer.offset().top;
    var svgLeft = svgContainer.offset().left;

    let o = {
        x:startCoord.left + 0.5*elem.outerWidth() - svgLeft    // x = left offset + 0.5*width - svg's left offset
        , y:startCoord.top/*  + elem.outerHeight()*/ - svgTop        // y = top offset + height - svg's top offset
    }

    if(pos.indexOf('top') > -1 ) {
        o.y = startCoord.top/*  + elem.outerHeight()*/ - svgTop
    }

    if(pos.indexOf('bottom') > -1 ){
        o.y =startCoord.top + elem.outerHeight() - svgTop
    }

    if(pos.indexOf('right') > -1 ) {
        if(pos.indexOf('center') > -1) {
            o.y =startCoord.top + (elem.outerHeight() * .5) - svgTop
        }
        o.x =startCoord.left + (elem.outerWidth() * .94) - svgTop
    }

    if(pos.indexOf('left') > -1 ) {
        o.y =startCoord.top + (elem.outerHeight() * .5) - svgTop
        o.x =startCoord.left// - (elem.outerWidth())
    }

    return o
}

function getCoordsVertSpan(startElem, endElem, anchorA, anchorB){
    // get (top, left) coordinates for the two elements
    // calculate path's start (x,y)  coords
    // we want the x coordinate to visually result in the element's mid point
    var start = getXY(startElem, anchorA || 'bottom')
    var end = getXY(endElem, anchorB || 'top')
    return new Coords2(start.x, start.y, end.x, end.y)
}

function getCoordsHorizSpan(startElem, endElem, anchorA, anchorB){
    // get (top, left) coordinates for the two elements
    // calculate path's start (x,y)  coords
    // we want the x coordinate to visually result in the element's mid point
    var start = getXY(startElem, [anchorA || 'right', 'center'])
    var end = getXY(endElem, [anchorB || 'left'])
    return new Coords2(start.x, start.y, end.x, end.y)
}

function connectElements(svg, path, startElem, endElem, config) {

    // if first element is lower than the second, swap!
    if(startElem.offset().top > endElem.offset().top){
        var temp = startElem;
        startElem = endElem;
        endElem = temp;
    }

    // call function for drawing the path
    let name = config.direction || 'vert'
    let coord = getCoordsVertSpan(startElem, endElem)
    if(name == 'horiz') {
        coord = getCoordsHorizSpan(startElem, endElem)
    }
    let pipe = window[`${name}2Pipe`](coord);
    drawPath(svg, path, pipe, coord)
}

function resetSVGsize(){
  $("#svg1").attr("height", "0");
  $("#svg1").attr("width", "0");
}

var lines = [
    ["teal", "orange", { direction: ['vert']}]
    //, ["red", "orange"]
    // , ["teal", "aqua"]
    , ["red", "aqua", { direction:['horiz']}]
    // , ["purple", "teal"]
    // , ["orange", "green"]
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

        connectElements(svg, $path, $(`#${a}`),   $(`#${b}`), c);
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
        requestAnimationFrame(renderFrame)
       }, 100)
   }
})()


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



