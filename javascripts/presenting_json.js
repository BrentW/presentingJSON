$(function() {  
  (function($){  
function PresentingJson(element, options){
  var self = $(element);
  
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
    html += wrap_key(attribute) + ' : ';
  }

  function add_line_break(){
    html += ',<br />';
  }

  function process_string_node(node, attribute, keyed){
    if(keyed){
      add_wrapped_key(attribute);
    }
  
    html += '"' + node[attribute] + '"';    
  }

  function process_non_quoted_type(node, attribute, keyed){
    if(keyed){
      add_wrapped_key(attribute);
    }
  
    html += node[attribute]; 
  }

  function process_number_node(node, attribute, keyed){
    process_non_quoted_type(node, attribute, keyed);
  }

  function process_boolean_node(node, attribute, keyed){
    process_non_quoted_type(node, attribute, keyed);
  }

  function process_null_node(node, attribute, keyed){
    if(keyed){
      add_wrapped_key(attribute);      
    }
  
    html += 'null';
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

  var html = "";
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
      span.next('div').toggle();
      if(span.hasClass('collapsed')){
        span.html(image_expanded());
        span.removeClass('collapsed');
      } else {
        span.addClass('collapsed');
        span.html(image_collapsed());
      }
    })
  }

   function initialize(element){
     parsed_json = $.parseJSON(self.html());     
   
     process_node(parsed_json);
     self.html(html);
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