$(document).ready(function() {
    
    var panel1 = $('#left').tabSlideOut({
      tabLocation: 'left',
      clickScreenToClose: false,
      offset: '40px',
      offsetReverse: true, // offset from bottom, not top
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
    
    $('#right').tabSlideOut({
      tabLocation: 'right',
      offsetReverse: true,
      handleOffsetReverse: true
    });
    
    $('#top').tabSlideOut({
      tabLocation: 'top',
      action: 'hover',
      handleOffsetReverse: true,
      offsetReverse: true,
      onLoadSlideOut: true
    });
    
    $('#bottom').tabSlideOut({
      tabLocation: 'bottom',  
      offset: '40px',
      otherOffset: '40px'
    });
    
    /* programmatically drive the left tab */
    $('button').click(function(event){
        panel1.tabSlideOut( /*command*/$(event.target).attr('id') );
    });
    
    /* register event handler */
    $(document).on('slideouttabopen slideouttabclose slideouttabbounce',function(event){
        var text = $(event.target).attr('id')+': '+event.type;
        $('#events').append(text+"\n");
    });
    
});
