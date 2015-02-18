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
