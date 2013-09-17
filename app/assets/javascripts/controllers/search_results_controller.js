EmberBlacklight.SearchResultsController = Ember.ArrayController.extend({
  needs: ['facets'],
  actions: {
    runSearch: function() {
      var array = EmberBlacklight.SearchResult.findAll(this.get('query'));
      this.set('content', array.records);
      var facet_control = this.get('controllers.facets');        
      facet_control.set('content', array.facets);
    }
  },
});

