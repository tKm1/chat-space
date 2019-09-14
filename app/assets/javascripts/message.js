$(function(){
  function buildHTML(message){
    var html = `<div class = "right__contents__messages">
                  <div class = "right__contents__messages__name">
                    ${message.name}
                  </div>
                  <div class = "right__contents__messages__data">
                    ${message.date}
                  </div>
                  <div class = "right__contents__messages__text">
                    ${message.comtent}
                    ${message.image}
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
    .done(function(data){
      var html = buildHTML(data);
      $('right__contents__messages').append(html)
      $('right__contents').animate({scrollTop:0});
    })
    .fail(function(){
      alert('error');
    })
  })
})