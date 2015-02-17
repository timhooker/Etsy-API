app.etsyShow = function() {
  var api = app.EtsyApi({ apiKey: 'j4t40f6swvekws6carlvptkh' });
  var listTemplate = _.template($('#etsyShow').html(), { variable: 'm' });
  api.listings()
    .done(function (data) {
      // Let's put the data in the console so we can
      // explore it...
      $('.etsy-content').html(listTemplate({ items: data.results }));
    })
    .fail(function (req, status, err) {
      $('.etsy-content').text(err.error);
    });
};
