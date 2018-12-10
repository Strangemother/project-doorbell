
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
