$(function() {
  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { name : input },
      dataType: 'json'
    })

    .done(function(users) {
      if (users.length !== 0) {
        users.forEach(function(user){
          appendName(user);
        });
      }
      else {
        appendNoUserName("一致するメンバーはいません");
      }
    })
  });
});