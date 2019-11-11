$(function(){
  function buildHTML(message) {
    var image = message.image ? `<img class = lower-message__image, src=${message.image} >` : ' '
    
    var html = `<div class = message data-id=${message.id}>
                  <div class = upper-message >
                    <div class = upper-message__user-name>
                      ${message.user_name}
                    </div>
                    <div class = upper-message__date>
                    ${message.created_at}
                    </div>
                  </div>
                  <div clas =lower-message>
                    <p class = lower-message__content >
                      ${message.content}
                    </p>
                    ${image}
                  </div>
                </div>`

    return html;
  }

  $("#new_message").on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.messages').append(html);
      $("#new_message")[0].reset();
      $('.form__submit').prop('disabled', false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.form__submit').prop('disabled', false);
    });
  });

  $(window).on('load',function() {
    if(document.URL.match('/groups/', '/messages')){
      var reloadMessages = function() {
        var last_message_id = $('.message:last').data('id')
        // console.log(last_message_id)
        $.ajax({
          url: 'api/messages',
          type: 'GET',
          dataType: 'json',
          data: {id: last_message_id},
        })
        .done(function(messages) {
          // console.log(messages)
          var insertHTML = '';
          messages.forEach(function(message) {
            insertHTML = buildHTML(message);
            $('.messages').append(insertHTML);
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
          })
        })
        .fail(function() {
          console.log('error');
        });
      };
      setInterval(reloadMessages, 5000);
    }
  });
});