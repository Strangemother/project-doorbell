
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
            , date: +(new Date)
        }
    }
})

var moveDiv = function(e){
    if(!space.moving) { return }
    let el = space.moving.el
    let stageY = e.clientY - space.moving.offsetY
    let stageX = e.clientX - space.moving.offsetX
    $(el).offset({left: stageX, top: stageY})

}

$('html, body').on('mouseup', function(e){
    moveDiv(e)
    let delta = space.moving && ((+new Date) - space.moving.date)

    if(space.moving && (delta < 270)) {
        clickNode(e.target)
    }

    space.moving = undefined
    render()
})


$('html, body').on('mousemove', function(e){
    if(space.moving){
        moveDiv(e)
        render()
    }
    trackLine()
})

$('.edge-connect-button').on('click', function(){
    console.log('New edge.')
    nodes_app.addEdge(..._selected, { color: 'grey'})
    _selected = []
    $('.trackable-line').remove()
    render()
    $('.selected').removeClass('selected')
})

var _selected = [];

var clickNode = function(node) {
    let index = _selected.indexOf(node)
    if(index == -1) {
        _selected.push(node)
    }else {
       _selected.splice(index, 1)
    }

    $(node)[`${_selected.indexOf(node) > -1? 'add': 'remove'}Class`]("selected")//`selected selected-${_selected.length}`)

    if(_selected.length == 2) {
        let $item = $('<div/>', { 'class': 'line trackable-line'}).appendTo('body')[0]
        space.track = _selected.concat([$item])
        adjustLine(...space.track)
        _trackLine = true
    } else if(_selected.length < 2){
        $('.line').remove()
        _trackLine = false
    }
}

var _trackLine
var trackLine = function(){
    if(_trackLine) {
        adjustLine(...space.track)
        $('.edge-connect-button').removeClass('hidden')
    }
    $('.edge-connect-button').addClass('hidden')
}


function adjustLine(from, to, line){

    var fT = from.offsetTop  + from.offsetHeight/2;
  var tT = to.offsetTop      + to.offsetHeight/2;
  var fL = from.offsetLeft + from.offsetWidth/2;
  var tL = to.offsetLeft     + to.offsetWidth/2;

  var CA   = Math.abs(tT - fT);
  var CO   = Math.abs(tL - fL);
  var H    = Math.sqrt(CA*CA + CO*CO);
  var ANG  = 180 / Math.PI * Math.acos( CA/H );

  if(tT > fT){
      var top  = (tT-fT)/2 + fT;
  }else{
      var top  = (fT-tT)/2 + tT;
  }
  if(tL > fL){
      var left = (tL-fL)/2 + fL;
  }else{
      var left = (fL-tL)/2 + tL;
  }

  if(( fT < tT && fL < tL) || ( tT < fT && tL < fL) || (fT > tT && fL > tL) || (tT > fT && tL > fL)){
    ANG *= -1;
  }
  top-= H/2;

  line.style["-webkit-transform"] = 'rotate('+ ANG +'deg)';
  line.style["-moz-transform"] = 'rotate('+ ANG +'deg)';
  line.style["-ms-transform"] = 'rotate('+ ANG +'deg)';
  line.style["-o-transform"] = 'rotate('+ ANG +'deg)';
  line.style["-transform"] = 'rotate('+ ANG +'deg)';
  line.style.top    = top+'px';
  line.style.left   = left+'px';
  line.style.height = H + 'px';
}

