presentingJSON
==============

Cleanly displays JSON with HTML and CSS.

- dependencies: jQuery

Simple usage
-------
$(".json").presentJson();

Options
-------
*toggleSpeed
*easing
*colors 
**all - changes the colors of all elements
**key - just the keys
**string
**null
**boolean
**number
**colon
**comma

$(".json2").presentJson({toggleSpeed: 0, colors: { colon: "pink", comma: "purple", string: "green", key: 'orange' }});
