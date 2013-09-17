EmberBlacklight.Router.map(function() {
  this.resource('searches', {path: '/'});
});

EmberBlacklight.SearchesRoute = Ember.Route.extend({
  model: function() {
    return EmberBlacklight.SearchQuery.findAll();
  },
  actions: {
    // error: function() {
    //   console.log("Damn! An error occurred.");
    // }
  }
});
