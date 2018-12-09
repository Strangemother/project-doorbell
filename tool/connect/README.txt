A Pen created at CodePen.io. You can find this one at https://codepen.io/alojzije/pen/ndfrI.

 connections redraw on screen resize <br><br>
contains a javaScript file for connecting any two html elements with an SVG path in a pipe-like fashion.
It connects the bottom-middle point of the "higher" element with the top-middle point to the "lower" element


#### USAGE:

In odrer to connect any two elements, they need an ID. For the purposes of this demonstration, we shall id them as *"Mary"* and *"Tom"*. Style with *CSS* as you normally would.


     <div id="Mary"></div>
     <p id="Tom"></p>

<br>

Next, (*also in your .html*) we need to add a path with which to connect our Mary and Tom elements. We do that by appending a child `<path>` element to `<svg>`.

Note that they also have unique IDs, *"myNewPath"* and *"svg1"*, respectively .

    <svg id="svg1" width="0" height="0" >
       <path
            id="myNewPath"
            d="M0 0"             
            stroke-width="0.3em"
            style="stroke:#555; fill:none;  "/>
    </svg>

<br>

And now for the fun part. The actual connecting!
In the javaScript file locate function `connectAll()` and add your connection like so:


    function connectAll() {
        // connect all the paths you want!
        connectElements($("#svg1"), $("#myNewPath"),     $("#Mary"),  $("#Tom"));
        ...
        connectElements($("#svg1"), $("#someOtherPath"), $("#purple"), $("#teal")  );
        connectElements($("#svg1"), $("#yetAnotherPath"), $("#Tom"), $("#teal")  );
}

<br>

##### aand... you're done!
_You can repeat these steps any number of times connecting any number of different elements ( or  connecting any one element with any number of different elements, for that matter :))_