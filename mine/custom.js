(function ($) {
	'use strict';



	// 轮播图
	$('.main-banner').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		autoplay: true,
		autoplaySpeed: 2000,
		speed: 500,
		cssEase: 'linear',
		responsive: [{
			breakpoint: 768,
			settings: {
				arrows: false,
				dots: true,
				slidesToShow: 1
			}
		}]
	});

	// 小轮播图
	$('.resend-banner').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		autoplay: true,
		autoplaySpeed: 2000,
		speed: 500,
		cssEase: 'linear',
		responsive: [{
			breakpoint: 768,
			settings: {
				arrows: false,
				dots: false,
				slidesToShow: 1
			}
		}]
	});
	
})(jQuery);