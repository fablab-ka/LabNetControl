Roles.addRolesIfMissing(["admin"]);

Meteor.publish("userData", function () {
  if (Roles.userIsInRole(this.userId, "admin")) {
    return Meteor.users.find({},{fields: {_id:1, username: 1, roles: 1}});
  } else {
    this.ready();
  }
});

Meteor.publish(null, function (){
  return Meteor.roles.find({})
});

Meteor.methods({
  "addUserToRole": function (user_id, role) {
    if ( !Roles.userIsInRole(Meteor.user(), "admin") )
      throw new Meteor.Error(403, "Not authorized!");

    var user = Meteor.users.findOne(user_id);

    Roles.addUsersToRoles(user, role)
  },
  "remUserFromRole": function (user_id, role) {
    if ( !Roles.userIsInRole(Meteor.user(), "admin") )
      throw new Meteor.Error(403, "Not authorized!");

    var user = Meteor.users.findOne(user_id);

    Roles.removeUsersFromRoles(user,role)
  }
});
