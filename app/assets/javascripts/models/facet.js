EmberBlacklight.Facet = Ember.Object.extend({
  name: null,
  items: [], 
  items_size: function() {
    var items = this.get('items');
    console.log(items);
    return items.length;
  }.property('items'),

  hasItems: function() {
    return this.get('items_size') > 0;
  }.property('items_size')
});

