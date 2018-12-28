var cells = []

var bus = new Vue({});

var options = new Vue({
    el: '#options'
    , data: {
        viewOpts:{}
        , showPin: {}
        , subTag: {parent: {}}
        , showPinConfig: {}
    }
    , mounted(){
        bus.$on('config', this.setConfig.bind(this))
        bus.$on('show-pin', this.showPinEvent.bind(this))

    }

    , methods: {
        setConfig(config){
            Vue.set(this, 'viewOpts', config.config)
        }

        , showPinEvent(d) {

            Vue.set(this, 'showPin', d )
            Vue.set(this, 'showPinConfig', d.config)
            Vue.set(this, 'subTag', { parent: {}, } )
        }
        , toggleShow(d){
            d.show = !d.show
        }

        , showClick() {

        }

        , deepPin(subTag, pin) {
            Vue.set(this, 'subTag', subTag )

        }

        , addGroup(name, options){
            let content = {
                label: "Custom Label"
                , show: true
                , color: '#384697'
                , desc: "Custom Desc."
                , pins: [
                    , altPin(GPIO._26, 'TDI (Alt4)')
                ]
            }

            let group = Object.assign(content, options)
            Vue.set(this.viewOpts, name, group)
            return group
        }
    }
})


var app = new Vue({
    el: '#pi'
    , data: {
        cells
        , view: {}
    }

    , mounted(){
        let viewData = loadConfig(pi3)
        this.setView(viewData)
    }

    , methods: {

        setView(o) {
            this.view = o
            Vue.set(this, 'cells', o.pins)
            bus.$emit('config', o)
        }

        , createPins(o, arr){
            let r = []
            for (var i = 0; i < arr.length; i++) {
                if(arr[i]==undefined) continue;
                var pin = new Pin(o, arr[i])
                r.push(pin)
            }
            return r
        }

        , clickPin(pin) {
            console.log('clickPin', pin)
        }

        , clickPinLabel(pin) {
            console.log('clickPinLabel', pin)
            bus.$emit('show-pin', pin)
        }
    }
})

// var line = $('#line');
// var div1 = $('#one');
// var div2 = $('#two');

// var x1 = div1.offset().left + (div1.width()/2);
// var y1 = div1.offset().top + (div1.height()/2);
// var x2 = div2.offset().left + (div2.width()/2);
// var y2 = div2.offset().top + (div2.height()/2);

// line.attr('x1',x1).attr('y1',y1).attr('x2',x2).attr('y2',y2);

