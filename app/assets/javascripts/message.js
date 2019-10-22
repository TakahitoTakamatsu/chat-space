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
  
      var reloadMessages = function () {
        if (window.location.href.match(/\/groups\/\d+\/messages/)){//今いるページのリンクが/groups/グループID/messagesのパスとマッチすれば以下を実行。
          var last_message_id = $('.message:last').data("message-id"); 
                  $.ajax({ 
                    url: "api/messages", //サーバを指定。今回はapi/message_controllerに処理を飛ばす
                    type: 'get', //メソッドを指定
                    dataType: 'json', //データはjson形式
                    data: {id: last_message_id} //飛ばすデータは先ほど取得したlast_message_id。またparamsとして渡すためlast_idとする。
      
                  })
                  .done(function(messages){ 
                    messages.forEach(function (message) {
                      var insertHTML = buildHTML(message); //メッセージが入ったHTMLを取得
                      $('.messages').append(insertHTML);//メッセージを追加
                      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
                    })
                  })
                  .fail(function () {
                    alert('自動更新に失敗しました');//ダメだったらアラートを出す
                  });
                }
              };
              setInterval(reloadMessages, 5000);//5000ミリ秒ごとにreloadMessagesという関数を実行し自動更新を行う。
      
});
