$(function(){
  function buildHTML(message){
    var content = message.content ? `${message.content} ` : ''
    var image = message.image ? `<img class ='lower-message__image' src=${message.image}> ` : ''
    var html = `<div class = "right__contents__messages" data-id=${message.id}>
                  <div class = "right__contents__messages__name">
                    ${message.user_name}
                  </div>
                  <div class = "right__contents__messages__data">
                    ${message.date}
                  </div>
                  <div class = "right__contents__messages__text">
                    ${content}
                    ${image}
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.right__contents').append(html);
      $('.right__contents').animate({scrollTop: $('.right__contents')[0].scrollHeight});
      $('form')[0].reset();
      $('.form__submit').attr('disabled', false);
    })
    .fail(function(){
      alert('error');
    })
  })

  var reloadMessages = function(){
    var last_message_id = $('.right__contents__messages').last().data('id');
    if (location.href.match(/\/groups\/\d+\/messages/)){
      $.ajax({
        url: 'api/messages/',
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        if (messages.length !== 0 ){
          messages.forEach(function(message){
          insertHTML = buildHTML(message);
          $('.right__contents').append(insertHTML)
          $('.right__contents').animate({scrollTop: $('.right__contents')[0].scrollHeight});
          });
        };
      })
      .fail(function() {
      });
    };
  };
  setInterval(reloadMessages, 5000);
});