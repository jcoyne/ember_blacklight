EmberBlacklight.Router.map(function() {
  this.resource('search_results', {path: '/'});
});

EmberBlacklight.SearchResultsRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render('search_results');
    this.render('facets', {
        outlet: 'facets',
        into: 'search_results',
        controller: 'facets'
    });
  },
  // model: function() {
  //   return [];//new EmberBlacklight.SearchResult.findAll();
  // },
  actions: {
    // error: function() {
    //   console.log("Damn! An error occurred.");
    // }
  }
});
