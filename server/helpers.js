Meteor.wrapAsyncWithRetry = function (f, retries) {
  var retries = retries || 5;
  var asyncFunction = Meteor.wrapAsync(f);
  return function () {
    var data = false;
    for(var tries=0; !data && tries < retries; tries++) {
      try {
        data = asyncFunction.apply(this, arguments);
      } catch(e) { /*do nothing*/ }
    }
    return data;
  }
};
