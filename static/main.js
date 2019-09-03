$(document).ready(function($) {
    $(window).bind('scroll', function() {
         if ($(window).scrollTop() > 50) {
             $('body').addClass('navbar-fixed-top');
         }
         else {
             $('body').removeClass('navbar-fixed-top');
         }
    });

    /* ======= ScrollTo ======= */
    $('a.scrollto').on('click', function(e){
      //store hash
      var target = this.hash;
      e.preventDefault();

      $('body').scrollTo(target, 800, {offset: -70, 'axis':'y'});
      //Collapse mobile menu after clicking
      if ($('.navbar-collapse').hasClass('show')){
        $('.navbar-collapse').removeClass('show');
      }
	});
});
