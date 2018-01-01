$(document).ready(function() {
    var left = $('#left').tabSlideOut({
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
      handleOffsetReverse: true,
      onLoadSlideOut: true
    });
    
    $('#top').tabSlideOut({
      tabLocation: 'top',
      action: 'hover',
      handleOffsetReverse: true,
      offsetReverse: true
    });
    
    $('#bottom').tabSlideOut({
      tabLocation: 'bottom',  
      offset: '40px',
      otherOffset: '40px'
    });
	
    /* programmatically drive the left tab */
    $('button.lefty').click(function(event){
        left.tabSlideOut( /*extract command out of the id of the button`*/$(event.target).attr('id') );
    });
    
	/* expand the content in each tab */
	$('#expand').click(function(e){
		$('textarea').each(function(i,n){
			var ta = $(n);
			ta.attr('rows','10').attr('cols','60');
		});
	});

	/* expand the content in each tab */
	$('#bounce').click(function(e){
		$('.ui-slideouttab-panel').each(function(i,n){
			var tab = $(n);
			tab.tabSlideOut('bounce');
		});
	});
    
    /* register event handler */
    $(document).on('slideouttabopen slideouttabclose slideouttabbounce',function(event){
        var text = $(event.target).attr('id')+': '+event.type;
        $('#events').append(text+"\n");
    });
    
});
