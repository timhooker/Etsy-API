app.EtsyApi = function(spec) {
  if(!spec.apiKey) {
    throw console.log('you must enter an api');
  }

  var baseUrl = 'https://openapi.etsy.com/' + (spec.apiVersion || 'v2');



  self = {

    listings: function() {
      var url = baseUrl + '/listings/active.js?limit=25&includes=MainImage&api_key=' + spec.apiKey + '&callback=?';
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
      var url = baseUrl + '/users/' + userID + '/profile.js?api_key=' + spec.apiKey + '&callback=?';
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
