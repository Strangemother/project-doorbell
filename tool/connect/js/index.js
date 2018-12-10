var nodes= new Vue({
    el: '#nodes'
    , data: {
        inputV: 'purple'
        , items: [
           // "green"
            // , "red"
             "teal"
            , "red"
            , "aqua"
            , "orange"
        ]
        ,  lines: [
            //, ["red", "orange"]
            ["red", "aqua", { direction: 'auto', cls: 'ants slow'}]
            , ["teal", "orange", { direction: 'vert', cls: 'ants slow'}]
           // , ["red", "orange", { direction:'horiz', cls: 'ants slow'}]
            //, ["purple", "teal"]
            // , ["orange", "green"]
        ]

    }
})
