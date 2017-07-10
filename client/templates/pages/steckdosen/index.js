Meteor.subscribe('rittal');

Template.hwSteckdosenPage.helpers({
    rittal: function () {
      return mcRittal.find({}).fetch();
    }
});

Template.hwSteckdosenPage.events({
  'click .plug_on': function(e){
    alert("plug on");
    var leiste = $(e.currentTarget).attr("leiste");
    var plug = $(e.currentTarget).attr("plug");
    Meteor.call('setPlug', leiste, plug, true);
  },
  'click .plug_off': function(e){
    alert("plug off");
    var leiste = $(e.currentTarget).attr("leiste");
    var plug = $(e.currentTarget).attr("plug");
    Meteor.call('setPlug', leiste, plug, false);
  },
  'click .plug_sw': function(e){
    var leiste = $(e.currentTarget).attr("leiste");
    var plug = $(e.currentTarget).attr("plug");
    var state = plug.state.current;
    Meteor.call('setPlug', leiste, plug, !state);
  }

});
