const eatApp = {};
eatApp.key = 'd34fb9a14e83abc4c246714692376c7d';

//anywhere that you are making an ajax call, consider this as your 'well'
eatApp.getEat = function(city) {
	var city_id = city;
	$.ajax({
		url: `https://developers.zomato.com/api/v2.1/search`,
		method: 'GET',
		dataType: 'json',
		data: {
			apikey: eatApp.key,
			format: 'json',
			entity_id: city_id,
			entity_type: 'city',
			collection_id: '1',
		}
	}).then(function(res){
		// console.log(res);
		eatApp.displayRest(res);
	});
}	

//write new function (randomizer, and display on screen) here
eatApp.displayRest = function(restInfo){
	// console.log(restInfo.restaurants);
	var restInfo = restInfo.restaurants;
	var random_index = Math.floor( Math.random() * restInfo.length )
	// console.log(random_index) 
	var randomRest = restInfo[random_index].restaurant;
	// console.log(randomRest)
	var name = randomRest.name;
	// console.log(randomRest.name);
	var location = randomRest.location.address;
	var foodType = randomRest.cuisines;
	var menu = randomRest.menu_url;
	var img = randomRest.featured_image;
	var rating = randomRest.user_rating.rating_text;
	var cost = randomRest.average_cost_for_two;
	var web = randomRest.url;
	$('#rest-name').text(name);
	$('#rest-location').text(location);
	$('#rest-type').text(foodType);
	$('#rest-rating').text(rating);
	$('#rest-image').attr('src', img);
	$('#rest-cost').text(cost);
	$('#rest-web').attr('src', web)
}
//Write new function so that a generic image will show if photo is not available



eatApp.init = function() {
	eatApp.events();
};

eatApp.events = function() {
	$('button').on('click', function(){
		var city_id = $(this).val();
		eatApp.getEat(city_id);
	});
//Write a smooth Scroll function so that it scrolls to the country chosen

	// SMOOTH SCROLL (code courtesy of https://paulund.co.uk/smooth-scroll-to-internal-links-with-jquery)

	$('a[href^="#"]').on('click',function (e) {
		e.preventDefault();
		var target = this.hash;
		var $target = $(target);	
		
		if($(window).width() > 739) {
			$('html, body').stop().animate({
			'scrollTop': $target.offset().top
			}, 900, 'swing', function () {
			window.location.hash = target;
			});
			} else if ($(window).width() > 650) {
				$('html, body').stop().animate({
			'scrollTop': $target.offset().top + 100
			}, 900, 'swing', function () {
			window.location.hash = target;
			});
			} else if( $(window).width() < 650) {
			$('html, body').stop().animate({
			'scrollTop': $target.offset().top + 50
			}, 900, 'swing', function () {
			window.location.hash = target;
			});
		}
	});
//Things I tried but didn't work..

	// ($'#can').on('click', function)(e){
	// 	e.preventDefault();
	// 	console.log(e.target.value);
	// 	const value = e.target.value;
	// 	if(value === 'canada'){
	// 		$('.container-can, button-can').addClass('show')
	// 	}
	// }
		// if($"#can").on(click, function) {
		// 	($'#canada", "rest__block')removeClass("invisible");

		// } else if($"#us").on(click, function) {
		// 	($"#usa", "rest__block")removeClass("invisible")
		// } 	
}

$(function(){
	eatApp.init();
});

