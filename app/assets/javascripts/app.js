EmberBlacklight = Ember.Application.create();
EmberBlacklight.ApplicationAdapter = DS.RESTAdapter.extend({
  //namespace: '/api/v1'
  pathForType: function(type) {
    if (type == 'search_query')
      return 'catalog.json';
    else 
      return this._super(type);
  }
});

