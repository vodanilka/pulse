$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        // variableWidth: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icon/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icon/right.png"></button>',
      }
    );
    
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
  
  // function toggleSlide (item) {
  //   $(item).each(function(i){
  //     $(this).on('click', function(e){
  //     e.preventDefault();
  //     $('.catalog-item__content').eq(i).toggleClass('.catalog-item__content_active');
  //     $('.catalog-item__list').eq(i).toggleClass('.catalog-item__list_active');
  //     })
  //   });
  // };
  // toggleSlide('.catalog-item__link');
  // toggleSlide('.catalog-item__back');


  function toggleSlide(item){
  $(".catalog-item").each(function() {
    const container = $(this);
    container.find(item).click(function(e) {
      e.preventDefault();
      container.find(".catalog-item__content").toggleClass("catalog-item__content_active");
      container.find(".catalog-item__list").toggleClass("catalog-item__list_active");
    });
  });
};
toggleSlide ('.catalog-item__link');
toggleSlide ('.catalog-item__back');

    $('[data-modal="consultation"]').on('click', function(){
      $('.overlay, #consultation').fadeIn('slow');});
    $('.modal__close').on('click', function(){
      $('#consultation, #order, #thanks, .overlay').fadeOut('slow');});
  
  $('.button_mini').each(function(i){
    $(this).on('click', function(){
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.button_mini').on('click', function(){
          $('.overlay, #order').fadeIn('slow')});
    });
  });


 

function validateForm (form){
  $(form).validate({
    rules:{ 
      name: "required",
      phone: "required",
      email:{
        required: true,
        email: true
      }

    }
  })
};
validateForm('#consultation-form');
validateForm('#consultation form');
validateForm('#order form');

$('input[name="phone"]').mask("(999) 999-9999");

$('form').submit(function(e){
  e.preventDefault();

  if (!$(this).valid()){
    return;
  }

  $.ajax({
    type: "POST",
    url: "../mailer/smart.php",
    data: $(this).serialize()
  }).done(
    function(){
    $(this).find("input").val("");
    $('#consultation, #order').fadeOut();
    $('.overlay, #thanks').fadeIn('slow');

    $('form').trigger('reset');

  });
  return false;
});

// slow up

$(window).scroll(function () { 
  if ($(this).scrollTop() > 1600){
    $('.pageup').fadeIn();
  } else $('.pageup').fadeOut();
  
});

function scrollToPosition(target, duration) {
  if (duration <= 0) return;
  $('html, body').animate(
    {
      scrollTop: target.offset().top,
    },
    duration
  );
}
$('a[href^="#"]').on('click', function (event) {
  event.preventDefault();

  const target = $($(this).attr('href'));
  const duration = 1000; // Duration of the scroll animation in milliseconds

  scrollToPosition(target, duration);
});


})