const POWER3 = 'PIN_POWER3'
const POWER5 = 'PIN_POWER5'
const GROUND = 'PIN_GROUND'
const GPIO_PIN = 'BCM_GPIO'
const ID_SD = 'PIN_ID_SD'
const SETUP = -1


GPIO = {}
PIN = {}
WPI = {}
DPI = {}


var inc = 0
    , topValue = 1

for (var i = 0; i < 40; i++) {
    WPI[`_${i}`] = { type: 'WPI', index: i }
    DPI[`_${i}`] = { type: 'DPI', index: i }
}

var pin = function(value){

    if(value == SETUP) {
        // start procedual record
        inc = 0
        topValue = arguments[1]
        for (var i = 0; i < topValue; i++) {
            GPIO[`_${i}`] = {alt:[], gpio: i, type: GPIO_PIN }
        }

        return
    }

    inc++
    let r = { alt:[], pin: inc, type: value }
    if(value.gpio != undefined) {
        r = value
        r.pin = inc
    }
    PIN[`_${inc}`] = r
    return r
}

var altPin = function(pin, altName) {
    let o = {
        for: pin
        , name: altName
        , parent: undefined
    }
   //pin.alt.push(o)
    return o
}


class Pin {
    constructor(o, base) {
        this.number = base.pin
        this.gpio = base.gpio
        this.type = base.type
        this._base = base
        this.parent = o
    }

    get config(){
        return this.parent.config[this.type] || {}
    }

    get tags(){
        return this._base.alt
    }

    get friendly(){
        return this.config.label
    }

    get icon(){
        return this.config.icon
    }
}

var loadConfig = function(entity){

    for(let name in entity.config) {
        if(entity.config[name].pins == undefined) {
            continue
        }

        for (var i = 0; i < entity.config[name].pins.length; i++) {
            let altPin = entity.config[name].pins[i]
            if(altPin == undefined) {
                console.log('undefined pin', name, i)
                continue
            }

            altPin.parent = entity.config[name]
            altPin.for.alt.push(altPin)
        }
    }

    let newPins = []
    for (var i = 0; i < entity.pins.length; i++) {
        if(entity.pins[i]==undefined) continue;
        //debugger
        var pin = new Pin(entity, entity.pins[i])
        newPins.push(pin)
    }

    entity.pins = newPins
    return entity
}
