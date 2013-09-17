EmberBlacklight.SearchQuery = Ember.Object.extend({
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

function ajax(url){
  return Ember.Deferred.promise(function(promise){
    $.ajax(url, {
      data: { q: "Kubo"},
      dataType: "json"
    }).then(function(data){
      Ember.run(promise, promise.resolve, data);
    }, function(err){
      promise.reject(e);
    });
  });
}

EmberBlacklight.SearchQuery.reopenClass({
  searchUrl: '/catalog',
  findAll: function(data) {
    var array = createOrGetRecordArray(this);
    this.fetch(array);
    return array;
  },
  fetch: function(array){
    var model = this;

    ajax(this.searchUrl).then(function(data){
      console.log("got");
      console.log(data);
      model.materializeData(data.response.docs, array.get("docs"), array);
    }).then(null, function(err){
      console.error(err.message);
      console.error(err.stack);
      throw err;
    });
  }, 
  materializeData: function(data, cache, records){
    var model = this;

    var content = data.map(function(item){
      var record;
      console.log(item);

      if(cache.has(item.id)){
        record = cache.get(item.id);
      } else {
        record = model.create();
        cache.set(item.id, record);
      }
      record.setProperties(item);
      return record;
    });

    records.set("content", content);
    records.set("isLoaded", true);
  }


  //   var _this = this;
  //   return $.ajax({
  //     url: "/catalog",
  //     dataType: 'json',
  //     //data: data
  //   }).then(function(result){
  //     new EmberBlacklight.SearchResult
  //     _this.set('searchData', result);
  //   });
  // }
});
