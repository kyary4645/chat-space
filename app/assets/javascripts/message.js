$(function(){
  function buildHTML(message) {
    var html = `<div class = message>
                  <div class = upper-message >
                    <div class = upper-message__user-name>
                      ${message.user.name}
                    </div>
                    <div class = upper-message__date>
                      ${message.create_at.strftime("%Y/%m/%d %H:%M")}
                    </div>
                  </div>
                  <div clas =lower-message>
                    <p class = lower-message__content >
                      ${message.content}
                    </p>
                  </div>
                </div>`
    return html;
  }
  $("#new_message").on('submit', function(e){
    e.preventDefault()
    console.log(this)
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
      $('.message').append(html);
      $('.form__message').reset('');
      $('.form__submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});