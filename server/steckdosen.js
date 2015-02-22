var rittal_pdu = Meteor.npmRequire("rittal_pdu");
var rittal_init = Meteor.wrapAsync(rittal_pdu.init);
var rittal_getSocket = Meteor.wrapAsyncWithRetry(rittal_pdu.getSocket);
var rittal_setSocket = Meteor.wrapAsyncWithRetry(rittal_pdu.setSocket);

var rittal_socket = function (id, name) {
  this._id = id.toString();
  this.name = name;
  this.description = "";
  this.active = true;
  this.last_update = Date.now();
  this.plugs = {
    "1": new rittal_plug,
    "2": new rittal_plug,
    "3": new rittal_plug,
    "4": new rittal_plug,
    "5": new rittal_plug,
    "6": new rittal_plug
  };
  this.power_consumption = "";
  this.high_alarm = 15;
  this.low_alarm = 0;
}

var rittal_plug = function() {
  this.name = "";
  this.state = {
    current: false,
    user_switchable: true,
    default: false,
    toggle_on_lab_open: false
  };
}

Meteor.startup(function () {
  rittal_init("/dev/ttyUSB0");
});
Meteor.publish("rittal", function (){
  return mcRittal.find({});
});

Meteor.methods({
  'setPlug': function(socket_id, plug, state) {
    console.log("setplug invoked with: socket: %s, plug: %s, state: %s", socket_id, plug, state);

    var socket = mcRittal.findOne({_id: socket_id.toString()});
    if (!socket) {
      throw new Meteor.Error(404, "The Socket is not initialized");
    }

    var plug_states = {};
    _.each(socket.plugs, function(value, key) {
      return plug_states[key] = value.state.current;
    });
    plug_states[plug] = state;

    var data = rittal_setSocket({"name": socket.name, "id": socket_id, "plug_states": plug_states});
    if(data){
      mcLog.insert({type: "steckdosen",message: "Socket:" + socket_id + " | Plug: " + plug ,date: (new Date())});
      socket.plugs[plug].state.current = state;
      socket.last_update = Date.now();
      mcRittal.update(socket._id, {$set: _.omit(socket, "_id")})
      return socket;
    }
    throw new Meteor.Error(504, "The Rittal PDU didnt answer");
  },

  'initSocket': function(socket_id) {
    var socket = mcRittal.findOne({_id: socket_id.toString()});
    if (socket) {
      throw new Meteor.Error(400, "The Socket is already initialized");
    }

    var data = rittal_getSocket(socket_id);

    if(data) {
      console.log(data.raw);
      var temp = new rittal_socket(data.id, data.name);
      _.each(data.plug_states, function(value, key) {
        temp.plugs[key].state.current = value;
      });
      temp.power_consumption = data.power_consumption;
      temp.high_alarm = data.high_alarm;
      temp.low_alarm = data.low_alarm;
      mcRittal.insert(temp);
      return temp;
    }

    throw new Meteor.Error(504, "The Rittal PDU didnt answer");
  },

  'updateSocket': function(id, name, description) {
    if( !_.isString(name) )
      throw new Meteor.Error(400, "Socket name should be a string");
    if( !_.isString(description) )
      throw new Meteor.Error(400, "Socket description should be a string");
    if( name.length == 0 )
      throw new Meteor.Error(400, "Socket name can't be empty");
    if( name.length > 10 )
      throw new Meteor.Error(400, "Socket name can't be longer then 10 characters");

    var socket = mcRittal.findOne({_id: id});
    if (!socket) {
      throw new Meteor.Error(404, "The Socket is not initialized");
    }

    var plug_states = {};
    _.each(socket.plugs, function(value, key) {
      return plug_states[key] = value.state.current;
    });

    var data = rittal_setSocket({"name": socket.name, "id": socket._id, "plug_states": plug_states});
    if(data){
      mcRittal.update(id, {$set: {name: name, description: description}});
      return "Socket name succesful updated"
    }

    throw new Meteor.Error(504, "The Rittal PDU didnt answer");
  },

  'deleteSocket': function(id) {
    var data = mcRittal.remove({_id: id});
    return data;
  },

  'updatePlug': function(socket_id, plug) {
    var socket = mcRittal.findOne({_id: socket_id.toString()});
    
    if ( !socket )
      throw new Meteor.Error(404, "The Socket is not initialized");
    if ( socket.plugs[plug.id] == undefined )
      throw new Meteor.Error(400, "Invalid value for plug id");
    if ( !_.isString(plug.name) )
      throw new Meteor.Error(400, "Plug name must be a string");
    if ( !_.isBoolean( plug.state_user_switchable ) )
      throw new Meteor.Error(400, "Plug user switchable must be a boolean");
    if ( !_.isBoolean( plug.state_default ) )
      throw new Meteor.Error(400, "Plug default state must be a boolean");
    if ( !_.isBoolean( plug.state_toggle_on_lab_open ) )
      throw new Meteor.Error(400, "Plug toggle on lab open must be a boolean");

    socket.plugs[plug.id].name = plug.name
    socket.plugs[plug.id].state.user_switchable = plug.state_user_switchable
    socket.plugs[plug.id].state.default = plug.state_default
    socket.plugs[plug.id].state.toggle_on_lab_open = plug.state_toggle_on_lab_open

    return mcRittal.update(socket._id, {$set: _.omit(socket, "_id")});
  }
});

