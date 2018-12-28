

var adaptDrawLayer = function(conf) {
    // check if the svg is big enough to draw the path, if not, set heigh/width
    //conf = svg, coord, padding

    if ($(conf.svg).height()< $(window).height()) {
        //conf.svg.attr("height", $(window).height() - 10)
    }

    //conf.svg.attr("width", $(window).width() - 10)

    //console.log(conf.svg.attr("height") , conf.coord.by + conf.padding )
    if (conf.svg.attr("height") <  conf.coord.by + conf.padding )  {
        conf.svg.attr("height", conf.coord.by + conf.padding);
    }

    if (conf.svg.attr("height") <  conf.coord.ay + conf.padding)  {
        conf.svg.attr("height", conf.coord.ay + conf.padding);
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
    let connection = Object.assign({}, config, {svg, isReverse, path, coord})

    if(func == undefined) {
        console.log('Function', name, 'does not exist')
        return
    }

    connection.pipe = func(connection);
    drawPath(connection)

    drawDecorations(connection)
    return connection
}

var drawDecorations = function(connection){

    if(connection.pulse){
        refreshTrackers(connection)
    }
}

var addTracker = function(connection, config) {
    if(connection.pulse == undefined) {
        connection.pulse = []
    }
    connection.pulse.push(config)
    return refreshTrackers(connection)
}

var refreshTrackers = function(connection){
    let result = []
    if(connection == undefined) {
        console.warn('refreshTrackers received an undefined connection.')
        return []
    }
    if(connection.edgeDecor == undefined) {
        connection.edgeDecor = {}
    }

    for (var i = 0; i < connection.pulse.length; i++) {
        let trackerConfig = connection.pulse[i]
        if(trackerConfig == undefined) {
            console.warn('ignoring tracker', i, connection)
            continue
        }
        let namedTracker = connection.edgeDecor[trackerConfig.name]
        if(namedTracker == undefined) {
            namedTracker = createTracker(trackerConfig, connection)
            connection.edgeDecor[trackerConfig.name] = namedTracker
        } else {
            // update existing.
            namedTracker.updateAttr('path', connection.path)
        }
        result.push(namedTracker)
    }

    return result;
}

var createTracker = function(trackerConfig, connection){
    // generate new.
    let name = trackerConfig.name || (Math.random().toString().slice(2))
    let id =  `tracker_${trackerConfig.name}`
    if($(`#${id}`).length == 0) {
        let $tracker = $('<div/>', {
            'class': 'tracker ' + (trackerConfig['classes'] || '')
            , id:id
        })
        $tracker.prependTo('#nodes')
    }

    let namedTracker = dynamicRule(`#${id}`, connection.pipe, trackerConfig)
    return namedTracker
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

    //if(isAbs(c)) { return verticalPipe(c) }

    if(isAbs(c)) {
        if(Math.abs(c.bx - c.ax) < Math.abs(c.by - c.ay)) {
            return verticalPipe(c)
        }
        return horiz2Pipe(conf)

    }

    let miniJointOffset = 30
        , d3 =  getDelta(c.ax, c.ay, c.bx, c.by, miniJointOffset/2)
        ;

    d3.delta = Math.max(-15, d3.delta)

    if(absolute(c.ax - c.bx) < miniJointOffset) {
           d3.delta =  d3.delta * .5
    }

    let aBelowB = c.ay > c.by
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

    let ydelta =  (arcB.y - c.by)

    // The first node is below the second node
    // the horizontal delta is less than the arcB curve
    // (finish point) - Therefore the next draw will not
    // be smooth.
    // correct the arcB out Y.
    if(aBelowB && ydelta < 0 && ydelta+1 > arcB.ry){
        //console.log(ydelta)
        arcB.y -= ydelta
    }
    let horizLength = (c.bx + d3.delta*signum(d3.deltaX))

    if(!aBelowB) {
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
    if(isAbs(c)) {
        if(Math.abs(c.bx - c.ax) < Math.abs(c.by - c.ay)) {
            return vert2Pipe(conf)
        }
        return horizPipe(c)
    }
    //fromX = split + jointOffset
   // jointOffset = c.height / 3
    let d3 =  getDelta(c.ax, c.ay, c.bx, c.by, 12)
        , split = c.bx - ((c.bx - c.ax)/2)
        , jointOffset =Math.abs(d3.delta)//-c.width / 3
        , jointOffsetMin = conf.joinMin == undefined? 5: conf.joinMin
        , jointOffsetMax = conf.joinMax == undefined? 15: conf.joinMax

        ;

    if(jointOffset < jointOffsetMin) {
        jointOffset = jointOffsetMin
    }

    if(jointOffset > jointOffsetMax) {
        jointOffset = jointOffsetMax
    }

    let directionJointOffset = jointOffset
        , fromX = split - jointOffset
        , flip = false
        , aBeforeB = c.bx < c.ax
        , aAboveB = c.ay > c.by
        , vertLength = c.by - jointOffset
        , crackedJoint = Math.abs(c.ay - c.by) < jointOffset *2


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
    //console.log(Math.abs(c.ay - c.by), jointOffset * 2)
    if(crackedJoint) {
       arcA.y += ((c.ay - c.by) * .5)
       arcA.ry -= Math.abs(((c.ay - c.by) * .5))
       arcB.y += ((c.ay - c.by) * .5)
       arcB.ry -= Math.abs((c.ay - c.by) * .5)
       //vertLength = ((c.ay - c.by) * .5) -1
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
