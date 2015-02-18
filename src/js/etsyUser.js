app.etsyUser = function(userID) {
  var api = app.EtsyApi({ apiKey: 'j4t40f6swvekws6carlvptkh' });
  var listTemplate = _.template($('#etsyShow').html(), { variable: 'm' });
  api.userDetail(userID)
    .done(function (data) {
      // Let's put the data in the console so we can
      // explore it...
      $.get('views/user.html').done(function (html) {
        var template = _.template(html, { variable: 'm' });
        console.log(data.results);
        $('.etsy-content').html(template({ users: data.results }));
      });
    })
    .fail(function (req, status, err) {
      $('.etsy-content').text(err.error);
    });
};
