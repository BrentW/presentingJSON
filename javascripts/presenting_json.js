$(function() {  
  (function($){  
function PresentingJson(element, options){
  var self = $(element);
  var html = "";
  var easing = options.easing || 'linear'
  var toggleSpeed = options.toggleSpeed || 200;
  var colors = options.colors || {};

  if(options.toggleSpeed === 0){
    toggleSpeed = 0;
  }
  
  function image_collapsed(){
    return '<img src="images/collapsed.gif" />';
  }

  function image_expanded(){
    return '<img src="images/expanded.gif" />';    
  }

  function build_collapsed(){
     return '<span class="expand_or_collapse collapsed">' + image_collapsed() + '</span>';
  }

  function wrap_key(key_name){
    return '<span class="key">"' + key_name + '"</span>';
  }

  function add_wrapped_key(attribute){
    html += wrap_key(attribute) + ' <span class="json_colon">:</span> ';
  }

  function add_line_break(){
    html += '<span class="json_comma">,</span><br />';
  }

  function process_string_node(node, attribute, keyed){
    if(keyed){
      add_wrapped_key(attribute);
    }
  
    html += '<span class="json_string">"' + node[attribute] + '"</span>';    
  }

  function process_number_node(node, attribute, keyed){
    if(keyed){
      add_wrapped_key(attribute);
    }
  
    html += '<span class="json_number">' + node[attribute] + '</span>';    
  }

  function process_boolean_node(node, attribute, keyed){
    if(keyed){
      add_wrapped_key(attribute);
    }
  
    html += '<span class="json_boolean">' + node[attribute] + '</span>';    
  }

  function process_null_node(node, attribute, keyed){
    if(keyed){
      add_wrapped_key(attribute);      
    }
  
    html += '<span class="json_null">null</span>';
  }

  function process_object_node(node, attribute, keyed){
    if(keyed){
      add_wrapped_key(attribute);
    }
  
    process_node(node[attribute]);
  }

  function process_array_node(node){
    html += "[" + build_collapsed() + '<div>';

    for(attribute in node){
      eval('process_' + typeof(node[attribute]) + '_node').call(this, node, attribute, false);
      if(node.indexOf(attribute) + 1 != node.length){
        add_line_break();
      }
    }
    html += '</div> ]';    
  }

  function process_literal_node(node){
    html += "{" + build_collapsed() + '<div>';
    var node_length = 0;
    for(attribute in node){
      node_length += 1;
    }

    var iteration = 0;
    for(attribute in node){
      iteration += 1;
      eval('process_' + typeof(node[attribute]) + '_node').call(this, node, attribute, true);
      if(iteration != node_length){
        add_line_break();
      }
    }
    html += '</div> }';    
  }

  function process_node(node){
    if(node instanceof Array){
      process_array_node(node);
    } else if(node === null){
      process_null_node(node);
    } else {
      process_literal_node(node)
    }
  }

  function bind_events(){
    self.find('.expand_or_collapse img').live('click', function(){
      var span = $(this).parents('.expand_or_collapse');
      span.next('div').toggle(toggleSpeed, easing);
      if(span.hasClass('collapsed')){
        span.html(image_expanded());
        span.removeClass('collapsed');
      } else {
        span.addClass('collapsed');
        span.html(image_collapsed());
      }
    })
  }
  
  function set_colors(){
    for(element in colors) {
      var color = colors[element];
      
      if(element === 'wrapper') {
        self.find('span.presenting_json_wrap').css('color', color);
      } else if (element == 'key') {
        self.find('span.presenting_json_wrap span.key').css('color', color);
      } else if (element === 'all'){
        self.find('span.presenting_json_wrap, span.presenting_json_wrap *').css('color', color);
      } else {
        self.find('span.presenting_json_wrap span.json_' + element).css('color', color);
      }
    }
  }

   function initialize(element){   
     html += '<span class="presenting_json_wrap">';
     process_node($.parseJSON(self.html()));
     html += '</span>'
     self.html(html);
     set_colors();
     bind_events();
   }
   
  initialize();   
 }
 
   $.fn.presentJson = function(options) {
     var options = options || {};

     $(this).each(function(index, selectTag){
       PresentingJson($(selectTag), options);
     });
   };
 })( jQuery );
});