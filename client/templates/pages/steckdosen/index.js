Meteor.subscribe('rittal');


Template.hwSteckdosenPage.helpers({
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

Template.hwSteckdosenPage.events({
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
