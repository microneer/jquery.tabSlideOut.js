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
      offsetReverse: true, // position the panel from the bottom of the page, rather than the top
      handleOffsetReverse: true, // position the tab from the bottom of the panel, rather than the top
      onLoadSlideOut: true, // open by default
	  /* don't close this tab if a button is clicked, or if the checkbox is set */
	  clickScreenToCloseFilters: [
			'button', // ignore button clicks
			function(event){ // custom filter
				// filters need to return true to filter out the click passed in the parameter
				return $('#keepTabOpen').is(':checked');
			}
	  ]
    });
    
    $('#top').tabSlideOut({
      tabLocation: 'top',
      action: 'hover',
      handleOffsetReverse: true,
      offsetReverse: true,
	  bounceTimes: 20,
	  bounceDistance: '10px',
	  bounceSpeed: 100
    });
    
    $('#bottom').tabSlideOut({
      tabLocation: 'bottom',  
      offset: '40px',
      otherOffset: '40px',
	  onBeforeClose: function() {
		  return confirm("Do you want to close the bottom slide out tab?");
	  }
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

	/* bounce every tab */
	$('#bounce').click(function(e){
		$('.ui-slideouttab-panel').each(function(i,n){
			var tab = $(n);
			tab.tabSlideOut('bounce');
		});
	});
    
    /* register event handler for every tab event, and show events on the page*/
    $(document).on('slideouttabopen slideouttabclose slideouttabbounce',function(event){
        var text = $(event.target).attr('id')+': '+event.type;
        $('#events').append(text+"\n");
    });
    
});
