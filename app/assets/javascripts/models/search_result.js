EmberBlacklight.SearchResult = Ember.Object.extend({
});
EmberBlacklight.RecordArray = Ember.ArrayProxy.extend({
});

function createOrGetRecordArray(context) {
  var array = context._recordArray;
  if(array) { return array; }

  context._recordArray = array = EmberBlacklight.RecordArray.create();

  array.set("isLoaded", false);
  array.set("docs", Ember.Map.create());

  return array;
}

function createOrGetFacetArray(context) {
  var array = context._facetArray;
  if(array) { return array; }

  context._facetArray = array = EmberBlacklight.RecordArray.create();

  array.set("isLoaded", false);
  return array;
}

function ajax(url){
  return Ember.Deferred.promise(function(promise){
    $.ajax(url, {
      dataType: "json"
    }).then(function(data){
      Ember.run(promise, promise.resolve, data);
    }, function(err){
      promise.reject(e);
    });
  });
}

EmberBlacklight.SearchResult.reopenClass({
  searchUrl: '/catalog?q=',
  findAll: function(query) {
    var record_array = createOrGetRecordArray(this);
    var facet_array = createOrGetFacetArray(this);
    this.fetch(query, record_array, facet_array);
    return {records: record_array, facets: facet_array};
  },
  fetch: function(query, record_array, facet_array){
    var model = this;

    ajax(this.searchUrl + query).then(function(data){
      model.materializeData(data.response, record_array.get("docs"), record_array, facet_array);
    }).then(null, function(err){
      console.error(err.message);
      console.error(err.stack);
      throw err;
    });
  }, 
  materializeData: function(data, cache, result_records, facet_records){
    var model = this;
    var facets = data.facets.map(function(item){
      return EmberBlacklight.Facet.create(item);
    });
    var content = data.docs.map(function(item){
      var record;
      if(cache.has(item.id)){
        record = cache.get(item.id);
      } else {
        record = model.create();
        cache.set(item.id, record);
      }
      record.setProperties(item);
      return record;
    });

    result_records.set("content", content);
    facet_records.set("content", facets);
    result_records.set("isLoaded", true);
    facet_records.set("isLoaded", true);
  }
});

