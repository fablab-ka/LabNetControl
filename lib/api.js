Router.route('methodLabOn', {
  path: '/api/lab/on',
  where: 'server',
  method: 'get',
  action: function() {
    var requestMethod = this.request.method;
    var requestData = this.request.body;
    var response = {message: "The Lab is going to boot!"};
    
    Meteor.call('setPlug', 1, 3, true);
    Meteor.call('setPlug', 2, 3, true);
    Meteor.call('setPlug', 2, 6, true);
    Meteor.call('setPlug', 7, 3, true);
    Meteor.call('setPlug', 8, 3, true);

    this.response.writeHead(200, {'Content-Type': 'application/json'});
    this.response.end(JSON.stringify(response));
  }
});

Router.route('methodLabOff', {
  path: '/api/lab/off',
  where: 'server',
  method: 'get',
  action: function() {
    var requestMethod = this.request.method;
    var requestData = this.request.body;
    var response = {message: "The Lab is going to shutdown!"};

    Meteor.call('setPlug', 1, 3, false);
    Meteor.call('setPlug', 2, 1, false);
    Meteor.call('setPlug', 2, 2, false);
    Meteor.call('setPlug', 2, 3, false);
    Meteor.call('setPlug', 2, 4, false);
    Meteor.call('setPlug', 2, 5, false);
    Meteor.call('setPlug', 2, 6, false);
    Meteor.call('setPlug', 7, 3, false);
    Meteor.call('setPlug', 8, 2, false);
    Meteor.call('setPlug', 8, 3, false);
    Meteor.call('setPlug', 8, 4, false);
    Meteor.call('setPlug', 8, 5, false);

    this.response.writeHead(200, {'Content-Type': 'application/json'});
    this.response.end(JSON.stringify(response));
  }
});
