
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


$('body, svgContainer').on('mousemove', function(e){
    if(space.moving){
        moveDiv(e)
        render()
    }
})
