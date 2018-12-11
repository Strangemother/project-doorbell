

var adaptDrawLayer = function(conf) {
    // check if the svg is big enough to draw the path, if not, set heigh/width
    //conf = svg, coord, padding
    if (conf.svg.attr("height") <  conf.coord.by)  {
        conf.svg.attr("height", conf.coord.by + conf.padding);
    }

    if (conf.svg.attr("width" ) < (conf.coord.ax + conf.padding) ) {
        conf.svg.attr("width", (conf.coord.ax + conf.padding));
    }

    if (conf.svg.attr("width" ) < (conf.coord.bx   + conf.padding) ) {
        conf.svg.attr("width", (conf.coord.bx   + conf.padding));
    }
}

function drawPath(conf) {
    // get the path's stroke width (if one wanted to be  really precize, one could use half the stroke size)
    //svg, path, _path, coord
    conf.padding = 200
    adaptDrawLayer(conf)
    let l = conf.pipe.join(' ')
    conf.path.attr("d", l)
    conf.path.attr('class', conf.cls)
    //conf.stroke =  parseFloat(conf.path.css("stroke-width"));
    let $path = conf.path[0]
    let width = conf.width == undefined? parseFloat(conf.path.css("stroke-width")): conf.width

    if(typeof(conf.width) == 'number') {
        width =  `${conf.width}px`; //Set stroke width
    }

    $path.style.stroke = conf.color || "#000"; //Set stroke colour
    $path.style.strokeWidth = width
    return $path
}

function getCoordsSpan(startElem, endElem, anchorA, anchorB){
    // get (top, left) coordinates for the two elements
    // calculate path's start (x,y)  coords
    // we want the x coordinate to visually result in the element's mid point
    var start = getXY(startElem, [anchorA || 'bottom'])
    var end = getXY(endElem, [anchorB || 'top'])
    return new Coords2(start, end, startElem, endElem)
}


function connectElements(svg, path, startElem, endElem, config) {

    if(startElem == undefined || endElem == undefined) {
        return
    }

    let isReverse = $(startElem).offset().top > $(endElem).offset().top
        , name = config.direction || 'vert'
        , coordOptions = [startElem, endElem]
        , func = window[`${name}2Pipe`]

    if(name == 'horiz') {
        coordOptions.push('right', 'left')
    }

    let coord = getCoordsSpan.apply(this, coordOptions)
    let conf = Object.assign({}, config, {svg, isReverse, path, coord})

    if(func == undefined) {
        console.log('Function', name, 'does not exist')
        return
    }

    conf.pipe = func(conf);
    drawPath(conf)

    drawDecorations(conf)
    return conf
}

var drawDecorations = function(config){

    if(config.pulse){
        if(config.edgeDecor == undefined) {
            config.edgeDecor = {}
        }

        for (var i = 0; i < config.pulse.length; i++) {
            let trackerConfig = config.pulse[i]
            let namedTracker = config.edgeDecor[trackerConfig.name]
            if(namedTracker == undefined) {
                // generate new.
                let id =  `tracker_${trackerConfig.name}`
                if($(`#${id}`).length == 0) {
                    let $tracker = $('<div/>', {'class': 'tracker', id:id})
                    $tracker.prependTo('#nodes')
                }

                namedTracker = dynamicRule(`#${id}`, config.pipe)
                config.edgeDecor[trackerConfig.name] = namedTracker
            } else {
                // update existing.
                namedTracker.updatePath(path)
            }

        }
    }
}

var getXY = function(elem, pos){
    elem = $(elem)
    var startCoord = elem.offset();
    var svgContainer = svgContainerContext()
    var svgTop  = svgContainer.offset().top;
    var svgLeft = svgContainer.offset().left;

    let percentLeft = .5;
    let o = {
        percentLeft
        , x: startCoord.left + percentLeft * elem.outerWidth() - svgLeft
        , y:startCoord.top - svgTop
    }

    return o
}


var getDelta = function(startX, startY, endX, endY, max){
    var deltaX = (endX - startX) * 0.05
        , deltaY = (endY - startY) * 0.05
        , val = max
        , valX = val
        , valY = val
        ;

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


var auto2Pipe = function(conf){
    let c= conf.coord;

    let above = c.ay < c.by

    if(above) return horiz2Pipe(conf)
    return vert2Pipe(conf)
}


var vert2Pipe = function(conf){
    /* A pipe from A (top) to B (bottom) with two joints*/
    let c = conf.coord

    if(isAbs(c)) { return verticalPipe(c) }

    let miniJointOffset = 30
        , d3 =  getDelta(c.ax, c.ay, c.bx, c.by, miniJointOffset/2)
        ;

    d3.delta = Math.max(-15, d3.delta)

    if(absolute(c.ax - c.bx) < miniJointOffset) {
           d3.delta =  d3.delta * .5
    }

    let aAboveB = c.ay > c.by
        , jointOffset = c.height / 3
        , rev = conf.isReverse
        , va = c.ax > c.bx ? jointOffset: jointOffset
        , offsetDelta = jointOffset + 2*d3.delta
        , tOffset = absolute(offsetDelta)
        , dY = absolute(c.ay - c.by)
        ;

    let arcA = {
        rx:d3.delta
        , ry:d3.delta
        , sweep: rev? c.ax < c.bx: c.ax > c.bx
        , x: c.ax + d3.delta*signum(d3.deltaX)
        , y: c.ay + tOffset
    }

    if(rev){
         arcA.x = c.ax - d3.delta * signum(d3.deltaX)
         arcA.y = c.ay + jointOffset + 2 * d3.delta
    }

    var arcB = {
        rx: d3.delta
        , ry:d3.delta
       , sweep: rev?c.ax > c.bx:c.ax < c.bx
        , x: c.bx
        , y: (c.ay + jointOffset + 3*d3.delta)
    }


    let horizLength = (c.bx + d3.delta*signum(d3.deltaX))

    if(!aAboveB) {
        arcB.y = (c.ay + jointOffset + 3*d3.delta)
        horizLength -= (d3.delta*signum(d3.deltaX))*2
    }

    if(dY < tOffset) {
        arcB.sweep = !arcB.sweep
        arcB.x = c.bx
        arcB.y += miniJointOffset
    }

    return [
        move(c.ax, c.ay)
        , vert(c.ay + d3.delta + jointOffset)
        , arc(arcA)
        , horiz(horizLength)
        , arc(arcB)
        , vert(c.by)
    ]

}

var horiz2Pipe = function(conf) {
    let c = conf.coord
    if(isAbs(c)) {  return horizPipe(c) }
    //fromX = split + jointOffset
   // jointOffset = c.height / 3
    let d3 =  getDelta(c.ax, c.ay, c.bx, c.by, 12)
        , split = c.bx - ((c.bx - c.ax)/2)
        , jointOffset = 10//-c.width / 3
        , directionJointOffset = jointOffset
        , fromX = split - jointOffset
        , flip = false
        , aBeforeB = c.bx < c.ax
        , aAboveB = c.ay > c.by
        , vertLength = c.by - jointOffset

    if(aBeforeB) {
        flip = true
    }

    if(flip) {
        directionJointOffset = jointOffset
        fromX = split + jointOffset
    }

    //let ds = (directionJointOffset * signum(d3.deltaX))

    let arcA = {
        rx: jointOffset
        , ry: jointOffset
        , sweep: c.ax < c.bx // left or right bool.
        // x pos of end
        , x: split
        , y: flip?c.ay + jointOffset:c.ay + jointOffset //+ 3*d3.delta
    }

    let arcB = {
        rx: jointOffset
        , ry: jointOffset
        , sweep: c.ax > c.bx // left or right bool.
        // x pos of end
        , x: flip? split - jointOffset:  split + jointOffset
        , y: c.by //+ 3*d3.delta
    }

    if(aAboveB) {
        arcA.y -= jointOffset * 2
        arcA.sweep = !arcA.sweep
        arcB.sweep = !arcB.sweep
        vertLength += jointOffset * 2
    }

    return [
        move(c.ax, c.ay)
        , horiz(fromX)
        , arc(arcA)
        , vert(vertLength)
        , arc(arcB)
        , horiz(c.bx)
    ]
}

var verticalPipe = function(conf){
    let c = conf//.coord;
    return movePipe(c, vert)
}

var horizPipe = function(conf){
    let c = conf//.coord;
    return [
      move(c.ax, c.ay)
      , horiz(c.bx)
    ]
}

var movePipe = function(c, direction){
    return [
      move(c.ax, c.ay)
      , direction(c.by)
    ]
}
