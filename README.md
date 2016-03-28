labNet
======

Our very fancy and awesome FabLab automation system.

## Startup
````
meteor --settings private/settings.json
````

## FAQ
### cant open rs485 device
add the following to '/etc/udev/rules.d/90-rs485.rules' and your user to the dialout group

````
SUBSYSTEMS=="usb", ATTRS{idProduct}=="1a86", ATTRS{idVendor}=="7523", MODE:="0660", GROUP:="dialout"
````
in vagrant add yourself to the vboxusers group (http://code-chronicle.blogspot.de/2014/08/connect-usb-device-through-vagrant.html)

### Error: unknown package: npm-container
Current Workaround: remove the line from .meteor/packages.
It will be automaticly installed and readded.

### Set user as admin
````
$ meteor shell
Roles.addUsersToRoles(Meteor.users.findOne({username: "myusername"}),"admin")
````
