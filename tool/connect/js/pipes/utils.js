
//helper functions, it turned out chrome doesn't support Math.sgn()
function signum(x) {
    return (x < 0) ? -1 : 1;
}


function absolute(x) {
    return (x < 0) ? -x : x;
}


var isAbs = function(conf) {
    let max = 5
    let c = conf//.coord
    let v = absolute(c.bx-c.ax)
    let vy = absolute(c.by-c.ay)
    return (vy < 5 || v < 5)
}


