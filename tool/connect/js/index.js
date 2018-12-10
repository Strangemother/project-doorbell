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
            ["red", "aqua", { direction: 'auto'}]
            , ["teal", "orange", { direction: 'vert'}]
            , ["red", "orange", { direction:'horiz'}]
            //, ["purple", "teal"]
            // , ["orange", "green"]
        ]

    }
})
