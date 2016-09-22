$(document).ready(function() {
    
    var panel1 = $('#panel-1').tabSlideOut({
      tabLocation: 'left',
      clickScreenToClose: false,
      // handlers: enable and disable buttons when sliding open or closed
      onOpen: function(){
          $('#open').prop('disabled',true);
          $('#close').prop('disabled',false);
      },
      onClose: function(){
          $('#open').prop('disabled',false);
          $('#close').prop('disabled',true);
      }      
    });
    
    $('#panel-2').tabSlideOut({
      tabLocation: 'right',
      offsetReverse: true,
      handleOffsetReverse: true
    });
    
    $('#panel-3').tabSlideOut({
      tabLocation: 'top',
      action: 'hover',
      handleOffsetReverse: true,
      offsetReverse: true,
      offset: '20px',
      onLoadSlideOut: true
    });
    
    $('#panel-4').tabSlideOut({
      tabLocation: 'bottom',  
      offset: '40px',
      otherOffset: '40px'
    });
    
    /* programmatically drive the left tab */
    $('button').click(function(event){
        panel1.tabSlideOut( /*command*/$(event.target).attr('id') );
    });
    
});
