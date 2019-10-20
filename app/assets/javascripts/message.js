$(function() {

      function buildHTML(message){
        var content = message.content ? `${message.content}` : "";
        var image = message.image ? `<img src="${message.image}" class="lower-message__image">` : "";
        var html = `<div class="messages__datamessage__id">
                      <div class="messages__upper__info">
                        <div class="messages__upper__info__talker">
                          ${message.name}
                        </div>
                        <div class="messages__upper__info__date">
                          ${message.date}
                        </div>
                      </div>
                      <div class="messages__lower__info">
                        <p class="messages__text">
                          ${content}
                          </p>
                          <div class="imagebox">
                          ${image}
                          </div>
                      </div>
                    </div>`
        return html;
      };
      
    
      $('#new_message').on('submit', function(e) {
        e.preventDefault();
        
        var formData = new FormData(this);
        var href = $(this).attr('action');
        $.ajax({
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
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          $('form')[0].reset();
        })
        .fail(function() {
          alert('error');
        });
      return false;
      });
});
