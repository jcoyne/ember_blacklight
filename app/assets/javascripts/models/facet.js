EmberBlacklight.Facet = Ember.Object.extend({
  name: null,
  items: [], 
  items_size: function() {
    var items = this.get('items');
    return items.length;
  }.property('items')
});

