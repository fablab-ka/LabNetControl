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

Roles.getRolesAsArray = function() {
  var roles = Roles.getAllRoles().fetch();

  return _.map(roles, function(value, key){ 
    return value.name; 
  });
}

Roles.addRoleIfMissing = function(role) {
  var current_roles = Roles.getRolesAsArray();

  if( !_.isString(role) ) {
    throw new Meteor.error(400, "Role must be a string")
  }

  if( _.contains(current_roles, role) ) {
    return true;
  } else {
    Roles.createRole(role);
    return true;
  }
}

Roles.addRolesIfMissing = function (roles) {

  if( _.isString(roles) ) {
    Roles.addRoleIfMissing(roles);
    return true;
  }

  if( _.isArray(roles) ) {
    _.each(roles, function( role ) {
      Roles.addRoleIfMissing(role);
    })
    return true;
  }

  throw new Meteor.error(400, "Roles must be a string or array")
}
