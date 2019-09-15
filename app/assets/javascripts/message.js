$(function(){
  function buildHTML(message){
    var content = message.content ? `${message.content} ` : ''
    var image = message.image ? `<img class ='lower-message__image' src=${message.image.url}> ` : ''
    var html = `<div class = "right__contents__messages">
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
      $('.right__contents').append(html)
      $('.right__contents').animate({scrollTop: $('.right__contents')[0].scrollHeight}),
      $('.form__message').reset('')
      $('.form__submit').attr('disabled', false);
    })
    .fail(function(){
      alert('error');
    })
  })
})