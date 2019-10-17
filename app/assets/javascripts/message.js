$(function() {
  $('.form').on('submit', function(e) {
    e.preventDefault();
    todo = $('.form__message').val();
    console.log(todo);
    $("#submit").prop("disabled", false){
      
    };
  });
});