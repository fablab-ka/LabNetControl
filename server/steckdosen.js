var rittal_pdu = Meteor.npmRequire("rittal_pdu");
var rittal_init = Meteor.wrapAsync(rittal_pdu.init);
var rittal_getSocket = Meteor.wrapAsync(rittal_pdu.getSocket);
var rittal_setSocket = Meteor.wrapAsync(rittal_pdu.setSocket);
Meteor.startup(function () {
    rittal_init("/dev/ttyUSB0");
  });
Meteor.publish("rittal", function (){
  return [
    mcRittal.find({}),
    mcRittalStatus.find({})
  ];
});

Meteor.methods({
  'setPlug': function(socket_id, plug, state) {
    console.log("setplug invoked with: socket: %s, plug: %s, state: %s", socket_id, plug, state);
    var socket = mcRittalStatus.findOne({id: parseInt(socket_id)});
    socket.plug_states[plug] = state;
    var data = false;
    var versuche = 0;
    while(!data && versuche < 5){
        versuche++;
        try {
          data = rittal_setSocket({"name": "penis1234", "id": socket_id, "plug_states": socket.plug_states});
        } catch (e) {
          console.log("Slap morbi!");
        }
        //console.log(data);
    }
    if(data){
          mcLog.insert({type: "steckdosen",message: "Socket:" + socket_id + " | Plug: " + plug ,date: (new Date())});
          console.log("Versuche: " + versuche);
          mcRittalStatus.update(socket._id, {$set: { plug_states: socket.plug_states}});
    }
  }
});
