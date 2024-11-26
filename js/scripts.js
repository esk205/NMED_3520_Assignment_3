$(document).ready(function() {
    $('.image-btn').on('click', function() {
      var imagePath = $(this).data('image');
      
      $('#displayed-image').attr('src', imagePath);
      
      $('.image-btn').removeClass('selected');
      
      $(this).addClass('selected');
    });
  });
  