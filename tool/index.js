var cells = []

var bus = new Vue({});

var options = new Vue({
    el: '#options'
    , data: {
        viewOpts:{}
    }
    , mounted(){
        bus.$on('config', this.setConfig.bind(this))
    }

    , methods: {
        setConfig(config){
            Vue.set(this, 'viewOpts', config.config)
        }
        , showClick() {
            
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
            debugger
        }

        , clickPinLabel(pin) {
            debugger
        }
    }
})
