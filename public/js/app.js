

var app = app || {};


// shortcut for document.ready
$(function(){

	$('a.scroll-link').scrollTo({
		easing:'easeOutQuint',
		speed:500
	});

	/* FIGLET */
	var $figletSelect	=	$('#figlet-select');
	var $figletInput	=	$('#figlet-input');
	var $figletDisplay	=	$('#figlet-display');

	function updateFiglet(e){
		figlet($figletInput.val(), $figletSelect.val(), function(err, text) {
			if (err) {
				console.log('something went wrong...');
				console.dir(err);
				return;
			}
			$figletDisplay.text(text);
			//console.log(text);
		});
	}

	$figletSelect.change(updateFiglet);
	$('#figlet-input:text').on('input',updateFiglet);

	updateFiglet();


});