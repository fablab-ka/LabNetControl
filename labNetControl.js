mcRittalStatus = new Mongo.Collection("rittal_status");
mcRittal = new Mongo.Collection("rittal");
mcLog = new Mongo.Collection("log");
mcLabStatus = new Mongo.Collection("lab_status");

if (Meteor.isClient) {
  Meteor.subscribe('rittal');

  Template.steckdosen.helpers({
      rittal: function() {
        var r = mcRittal.find({}).fetch();

        r.forEach(function(data){
          //console.log(mcRittalStatus.findOne({id: data.id}));
          raw = mcRittalStatus.findOne({id: data.id});//,{sort: {'_id': 1}, limit:1}).fetch();
          data.plug_status = raw["plug_states"];//,{sort: {'_id': 1}, limit:1}).fetch();
          data.plugs = [];
          for(i=0;i<Object.keys(data.plug_status).length;i++){
            data.plugs[i] = {status: data.plug_status[i+1], name: data.plug_name[i+1], leiste_id: data.id, plug_id: i+1};
            //console.log(data.plugs[i]);
          }
          console.log(Object.keys(data.plugs).length);
        });
        console.log(r);
        return r;
      }
  });

  Template.steckdosen.events({
    'click .plug_on': function(e){
      var leiste = $(e.currentTarget).attr("leiste");
      var plug = $(e.currentTarget).attr("plug");
      console.log("plug on" + leiste + " " + plug);
      Meteor.call('setPlug', leiste, plug, true);
    },
    'click .plug_off': function(e){
      var leiste = $(e.currentTarget).attr("leiste");
      var plug = $(e.currentTarget).attr("plug");
      console.log("plug off" + leiste + " " + plug);
      Meteor.call('setPlug', leiste, plug, false);
    }

  });

  Template.dashboard.events({
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
      mcRittalStatus.remove({});

      mcRittalStatus.insert({
          raw: "",
          id: 1,
          name: "defaults",
          plug_states: {
              "1": true,
              "2": true,
              "3": true,
              "4": true,
              "5": true,
              "6": true
          },
          power_consumption: 80,
          high_alarm: 15,
          low_alarm: 0
      });

      mcRittalStatus.insert({
          raw: "",
          id: 2,
          name: "defaults",
          plug_states: {
              "1": true,
              "2": false,
              "3": true,
              "4": false,
              "5": false,
              "6": false  
          },
          power_consumption: 80,
          high_alarm: 15,
          low_alarm: 0
      });
 
      mcRittalStatus.insert({
          raw: "",
          id: 7,
          name: "defaults",
          plug_states: {
              "1": false,
              "2": false,
              "3": true,
              "4": false,
              "5": false,
              "6": false  
          },
          power_consumption: 80,
          high_alarm: 15,
          low_alarm: 0
      });
 
       mcRittalStatus.insert({
         raw: "",
         id: 8,
         name: "defaults",
         plug_states: {
             "1": false,
             "2": false,
             "3": true,
             "4": false,
             "5": false,
             "6": false
         },
         power_consumption: 80,
         high_alarm: 15,
         low_alarm: 0
       });
       //var data = rittal_getSocket(1);
       //console.log(data);
       //mcRittalStatus.update({id:1},data);

      mcRittal.remove({});
      mcRittal.insert({
        id: 1,
        name: "Wand-Verteiler Server",
        plug_name: {
            "1": "",
            "2": "",
            "3": "Verstärker",
            "4": "", // 24V
            "5": "Schnitzel",
            "6": ""  // switch
        },
        plug_lock: {
            "1": false,
            "2": false,
            "3": false,
            "4": true,
            "5": false,
            "6": true   
        },
        plug_default: {
            "1": true,
            "2": true,
            "3": true,
            "4": true,
            "5": true,
            "6": true   
        },
      });
      mcRittal.insert({
        id: 2,
        name: "Eingangsbereich",
        plug_name: {
            "1": "Laserprinter",
            "2": "Labelprinter",
            "3": "LED Reklame",
            "4": "HP Plotter",
            "5": "Hexagon Printer",
            "6": "Lampe"   
        },
        plug_lock: {
            "1": false,
            "2": false,
            "3": false,
            "4": false,
            "5": false,
            "6": false   
        },
        plug_default: {
            "1": true,
            "2": false,
            "3": true,
            "4": false,
            "5": false,
            "6": false   
        }
      });
      mcRittal.insert({
        id: 7,
        name: "Wasserhahn",
        plug_name: {
            "1": "",
            "2": "",
            "3": "Licht mitte",
            "4": "",
            "5": "",
            "6": ""   
        },
        plug_lock: {
            "1": false,
            "2": false,
            "3": false,
            "4": false,
            "5": false,
            "6": false   
        },
        plug_default: {
            "1": false,
            "2": false,
            "3": true,
            "4": false,
            "5": false,
            "6": false   
        }
      });
      mcRittal.insert({
        id: 8,
        name: "Drehbank",
        plug_name: {
            "1": "",
            "2": "Beamer",
            "3": "Licht hinten",
            "4": "Led Strip",
            "5": "Drehmaschine",
            "6": ""   
        },
        plug_lock: {
            "1": false,
            "2": false,
            "3": false,
            "4": false,
            "5": false,
            "6": false   
        },
        plug_default: {
            "1": false,
            "2": false,
            "3": true,
            "4": false,
            "5": false,
            "6": false   
        }
      });

      mcLog.remove({});
      mcLog.insert({
        type: "system",
        message: "Meteor App startet",
        date: (new Date())
      });

      mcLabStatus.remove({});
      mcLabStatus.insert({
        status: "closed",
        source: "web",
        date: (new Date())
      });

  });

      //rittal_pdu.find
    //var response = rittal_init("/dev/ttyUSB0");
    //console.log("init: ", JSON.stringify(response));
    //var test = rittal_getSocket(1);
    //console.log("first get:", JSON.stringify(test));
    //test = rittal_setSocket({
    //  id:1, 
    //  name: "morbi",
    //  plug_states: {
    //    1: true,
    //    2: true,
    //    3: true,
    //    4: true,
    //    5: true,
    //    6: true
    //  }
    //});
  //});
  
  //console.log(data);
//  Meteor.setInterval(function() {
//    var data = rittal_getSocket(1);
//    console.log(data);
//  }, 500);

/* )  Meteor.setInterval(function(){
      var data = rittal_setSocket({"name": "penis1234", "id": socket_id, "plug_states": socket.plug_states});
      if (data) {
        mcRittalStatus.update(socket._id, {$set: { plug_states: socket.plug_states}});
      }
  },1000);
*/
  Meteor.publish("rittal", function (){
    return [
      mcRittal.find({}),
      mcRittalStatus.find({})
    ];
  });

}
