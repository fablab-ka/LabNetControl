var mcPing = new Mongo.Collection("ping");
var ping = Meteor.npmRequire("ping");

// Pingt das FabLab nach Clients und archiviert. 
// Durch das Async wrapping läuft ein ping durchlauf seeeehr lange. grob etwa 7-8min.
// Das "feature" ist aber das alle 30s ein neuer Background Worker gestartet wird der anfängt zu pingen.
// Ein ping dauert ~3s, ist der erste Worker bei .10 angekommen fängt der 2te an und so weiter...
// Bis irgendwann 25 Worker laufen und jede IP alle 30s 1x gepingt wird.
// System Last muss noch geprüft werden!
// david.b

 function pingAll() {
    hosts = [];
    for (i = 1; i < 255; i++) {
        hosts[i] = "192.168.1."+i;
    }

    hosts.forEach(function (host) {
        var fut = new Future();
        var obj = ping.promise.probe(host, {
            timeout: 5
        }).then(function (res) {
            fut['return'](res);
        }).catch(function (error) {
            console.log(error);
        });
        var res = fut.wait();
        raw = mcPing.findOne({host:res.host}, {sort: {"date":-1}});
        if(raw["alive"] != res.alive){
            //console.log(raw);
            mcPing.insert({host: res.host, alive: res.alive, date: (new Date())}); 
            if(res.alive){
                console.log("host: " + res.host +" is alive");
            }else{
                console.log("host: " + res.host +" is dead");
            }
        }

	});
};

Meteor.startup(function () {
    Future = Npm.require('fibers/future');
    mcPing.remove({});
    for (i = 1; i < 255; i++) {
        mcPing.insert({host: "192.168.1." + i, alive: false, date: (new Date())});
    }
    //Meteor.setInterval(pingAll, 30000);
});

Meteor.publish("ping", function (){
    return [
        mcPing.find({})
    ];
});