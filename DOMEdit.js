$('head').append('<style> .selected { outline: solid 5px red !important; z-index:9999999999 !important;} </style>');
function calculatePerimeter(object){
  return $(object).width()*$(object).height();
}

$('*').delegate('*', 'mouseenter', function(){
    var $this = $(this);
    if (typeof $(this).data('styles') == 'undefined'){
       
      $this.data('styles',$this.attr('style')); 
    }

    $this.addClass('selected');
  
    selected =   $('.selected').map(function(i,o){ 
     var attr = $(o).attr('style');
     if (typeof attr !== 'undefined' && attr !== false)  return {object:$(o).get()[0], perimeter: calculatePerimeter(o)}; 
     });

    smallest_p = Number.MAX_VALUE,
        smallest = null;
    for (var i=0; i< selected.length; i++){
        var p = selected[i]['perimeter'];

        if (p<smallest_p && p>0) {
             smallest_p=p;
             smallest = selected[i]['object'];
        } 
 
    }
 $('.selected').not(smallest).removeClass('selected').off('keydown');


});
$('*').delegate('*', 'mouseleave', function(){
   $(this).removeClass('selected'); 
   if (typeof $(this).data('styles') != 'undefined'){
          if ($(this).data('styles')) $(this).css($(this).data('styles')); else $(this).attr('style','');
           
    } 
    else $(this).attr('style','');
})
stack = [];
 $(document).on('keydown',function(e){ console.log(e.originalEvent.keyCode); 
var selected = $('.selected');
if (e.originalEvent.keyCode == 89) { object = stack.pop(); $('.selected').after(object); }  
if (e.originalEvent.keyCode == 79) { object = stack.pop(); $('.selected').replaceWith(object); }  
if (e.originalEvent.keyCode == 85) { object = stack.pop(); $('.selected').append(object); } 
if (e.originalEvent.keyCode == 75) { stack.push($('.selected').removeClass('selected')); selected.remove(); } });