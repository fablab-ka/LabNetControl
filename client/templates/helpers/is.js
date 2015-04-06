UI.registerHelper('is', function(value1,value2,options) {
  if(value1 === value2) {
    return this;
  } else {
    return null;
  }
});
