$(document).ready(function() {

	//header 選單
	var menu = $('.mlmenu');
	
	menu.find('li.hasChild').hover(
		function(){$(this).children().stop().fadeIn(200);},
		function(){$(this).children('ul').stop().fadeOut(200);}
		);
	menu.find('li.hasChild').keyup(
		function(){
			$(this).children().show();
			$(this).siblings().focus(function(){
				$(this).hide()
			});
		});
	menu.find('li').keyup(	
		function(){
			$(this).siblings().children('ul').hide();
		});
	$('.mlmenu li:last>a').focusout(
		function(){
			$('.mlmenu li ul').hide();
	})


});