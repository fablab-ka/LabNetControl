Meteor.wrapAsyncWithRetry = function (f, retries) {
  var retries = retries || 5;
  return function () {
    var data = false;
    for(var tries=0; !data && tries < retries; tries++) {
      try {
        data = Meteor.wrapAsync(f).apply(this, arguments);
      } catch(e) { /*do nothing*/ }
    }
    return data;
  }
};
