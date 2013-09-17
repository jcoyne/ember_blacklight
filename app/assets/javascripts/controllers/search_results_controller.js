EmberBlacklight.SearchResultsController = Ember.ArrayController.extend({
  actions: {
    runSearch: function() {
      this.set('content', EmberBlacklight.SearchResult.findAll(this.get('query')));
    }
  },
});

