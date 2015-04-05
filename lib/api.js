Router.route('methodLabOn', {
  path: '/api/lab/on',
  where: 'server',
  method: 'get',
  action: function() {
    var requestMethod = this.request.method;
    var requestData = this.request.body;
    var response = {message: "The Lab is going to boot!"};
    
    Meteor.call('setPlugsToLabOpen');

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

    Meteor.call('setPlugsToDefault');

    this.response.writeHead(200, {'Content-Type': 'application/json'});
    this.response.end(JSON.stringify(response));
  }
});
