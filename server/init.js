Meteor.startup(function () {
      console.log("MONGO init start");

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
            "5": "",
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
});