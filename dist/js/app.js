// The namespace for this application
var app = {};

app.EtsyApi = function(spec) {
  if(!spec.apiKey) {
    throw console.log('you must enter an api');
  }

  var baseUrl = 'https://openapi.etsy.com/' + (spec.apiVersion || 'v2');



  self = {

    listings: function() {
      var url = baseUrl + '/listings/active.js?includes=MainImage&api_key=' + spec.apiKey + '&callback=?';
      var promise= $.Deferred();

      var req = $.getJSON(url).done(function(data){
        if(!data.ok) {

          promise.reject(req, 'Unknown Error', data);
        } else {
          promise.resolve(data);
        }
      });

      return promise;
    },
    userDetail: function(userID) {
      var url = baseUrl + 'users/' + userID + '/profile.js?api_key=' + apiKey.spec + '&callback=?';
      var promise= $.Deferred();

      var req = $.getJSON(url).done(function(data){
        if(!data.ok) {

          promise.reject(req, 'Unknown Error', data);
        } else {
          promise.resolve(data);
        }
      });

      return promise;
    }
  };

  return self;
};

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


$(function () {
  var page = $('body').data('page');
  app[page]();
});

//# sourceMappingURL=app.js.map