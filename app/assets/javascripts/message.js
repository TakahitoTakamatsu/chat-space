$(function() {
  
      function buildHTML(message){
        var content = message.content ? `${message.content}` : "";
        var imge = message.image ? `<img src= "${ message.image }">` : "";
          var html = `<div class="message" data-message-id="${message.id}">
                      <div class="messages__upper__info">
                        <div class="messages__upper__info__talker">
                          ${message.name}
                        </div>
                        <div class="messages__upper__info__date">
                          ${message.date}
                        </div>
                      </div>
                      <div class="messages__lower__info">
                        <div class="messages__text">
                          ${content}
                          </div>
                          <div class="imagebox">
                          ${image}
                          </div>
                      </div>
                    </div>`
        return html;
      }
      
    
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
  
      var reloadMessages = function () {
        if (window.location.href.match(/\/groups\/\d+\/messages/)){
          var last_message_id = $('.message:last').data("message-id"); 
                  $.ajax({ 
                    url: "api/messages", 
                    type: 'get', 
                    dataType: 'json', 
                    data: {id: last_message_id} 
      
                  })
                  .done(function(messages){ 
                    messages.forEach(function (message) {
                      var insertHTML = buildHTML(message); 
                      $('.messages').append(insertHTML);
                      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
                    })
                  })
                  .fail(function () {
                    alert('自動更新に失敗しました');
                  });
                }
              };
              setInterval(reloadMessages, 5000);
});
