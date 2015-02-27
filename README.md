labNet
======

Our very fancy and awesome FabLab automation system.

## Startup
````
npm install -g meteorite
mrt install
meteor
````

## FAQ
### Error: unknown package: npm-container
Current Workaround: remove the line from .meteor/packages.
It will be automaticly installed and readded.

### Set user as admin
````
$ meteor shell
Roles.addUsersToRoles(Meteor.users.findOne({username: "myusername"}),"admin")
````
