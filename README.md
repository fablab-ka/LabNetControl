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

### Install as separate user (systemd)

* add user 'useradd -mrU labnet-meteor'
* install meteor as user `curl https://install.meteor.com/ | sh` (quit when they ask for sudo, we dont need ~/.meteor in our path)
* add systemd file


```` bash
# /etc/systemd/system/labnet-meteor.service

[Service]
WorkingDirectory=/home/labnet-meteor/LabNetControl
ExecStart=/home/labnet-meteor/.meteor/meteor --settings private/settings.json --port 3000
Restart=always
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=labnet-meteor
User=labnet-meteor
Group=labnet-meteor
Environment=NODE_ENV=production
Environment=MONGO_URL=mongodb://localhost:27017/meteor

[Install]
WantedBy=multi-user.target
````

### Configure Proxy (Apache)

```` bash
# apache-site.conf

ProxyRequests Off
ProxyPreserveHost On

# upgrade websocket connections, requires proxy_wstunnel
RewriteEngine on
RewriteCond %{HTTP:UPGRADE} ^WebSocket$ [NC]
RewriteCond %{HTTP:CONNECTION} ^Upgrade$ [NC]
RewriteRule .* ws://localhost:3000%{REQUEST_URI} [P]

ProxyPass / http://localhost:3000/ Retry=0
ProxyPassReverse / http://localhost:3000/
````
