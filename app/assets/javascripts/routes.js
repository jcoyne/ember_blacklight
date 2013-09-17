EmberBlacklight.Router.map(function() {
  this.resource('searches', {path: '/'});
});

EmberBlacklight.SearchesRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('search_query');
  },
  actions: {
    error: function() {
      console.log("Damn! An error occurred.");
    }
  }
});
