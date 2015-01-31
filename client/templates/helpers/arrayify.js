Handlebars.registerHelper('arrayify',function(obj){
  return _.map(obj, function(value, key){ 
    value.key = key;
    return value; 
  });
});
