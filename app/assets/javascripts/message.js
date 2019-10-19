$(function() {

      function buildHTML(message){
        var image_url = message.image
        var image = `<img src=${message.image} class="lower-message__image">`;
        // var content = ``;
        image_url ? image : image = ``;
        var html = `<div class="messages__datamessage__id">
                      <div class="messages__upper__info">
                        <div class="messages__upper__info__talker">
                          ${message.name}
                        </div>
                        <div class="messages__upper__info__date">
                          ${message.created_at}
                        </div>
                      </div>
                      <div class="messages__lower__info">
                        <p class="messages__text">
                          ${message.content}
                          ${image}
                        </p>
                      </div>
                    </div>`
        return html;
      };
      
      
      
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
          $('.messages').append(html)
          $("#submit").prop("disabled", false);
        })
        .fail(function(data) {

        })
      });
  
});