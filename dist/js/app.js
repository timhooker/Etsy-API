// The namespace for this application
var app = {};

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

app.etsyShow = function() {
  var api = app.EtsyApi({ apiKey: 'j4t40f6swvekws6carlvptkh' });
  var listTemplate = _.template($('#etsyShow').html(), { variable: 'm' });
  api.listings()
    .done(function (data) {
      // Let's put the data in the console so we can
      // explore it...
      $.get('views/listings.html').done(function (html) {
        var template = _.template(html, { variable: 'm' });
        $('.etsy-content').html(template({ items: data.results }));
      });
    })
    .fail(function (req, status, err) {
      $('.etsy-content').text(err.error);
    });
};

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

app.routingPage = function () {

  // Our router
  var r = Rlite();

  // // Default route
  r.add('', app.etsyShow);

  // #users
  r.add('users', showUsers);

  // #users/chris -> r.params.name will equal 'chris'
  r.add('users/:name', function (r) {
    app.etsyUser(r.params.name);
  });

  function showUsers() {
    console.log('hey now');
    $.get('views/users.html').done(function (html) {
      $('.main-content').html(html);
    });
  }

  // Hash-based routing

  function processHash() {
    var hash = location.hash || '#';

    if (!r.run(hash.slice(1))) {
      $('.etsy-content').text('page not found');
    }
  }

  window.addEventListener('hashchange', processHash);
  processHash();

  // TODO: We could improve this in many ways.


  // One, every time we go to the #users or #users/foo route,
  // we are requesting the HTML again. We ought to cache them,
  // instead into an object (or hash table).
  //
  // Another thing, is we are recompiling the user.html template
  // every time we show a user... We could cache the compiled
  // templates, too, so they are compiled once they are downloaded
  // and never again!
};

$(function () {
  var page = $('body').data('page');
  app[page]();
});

//# sourceMappingURL=app.js.map