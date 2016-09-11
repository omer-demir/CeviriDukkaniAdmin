// Frontend navigation


$(function () {
	var clock = $('.clock');

	clock.on('mouseenter', function (e) {

		$(this).addClass('z-depth-3');

	});

	clock.on('mouseleave', function (e) {

		$(this).removeClass('z-depth-3');

	});

});