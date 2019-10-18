$(function() {
  function buildHTML(message){
    var html = `<div class="messages__datamessage__id">
                  <div class="messages__upper__info">
                    <p class="messages__upper__info__talker">
                      ${message.name}
                    </p>
                    <p class="messages__upper__info__date">
                      ${message.created_at}
                    </p>
                  </div>
                    <p class="messages__text">
                    ${message.content?
                      `<p class="lower-message__content">${message.content}</p>`:``}
                    ${message.image?
                      `<img src = ${message.image} class = "lower-message__image">`:``}
                    </p>
                </div>`
    return html;
  }




  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var href = $(this).attr('action');
    $.ajax({
      //jbuilderへ行った後にjsonを持ってcontrollerへ
      url: href,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message').append(html)
      $("#submit").prop("disabled", false);
    })
  })
});