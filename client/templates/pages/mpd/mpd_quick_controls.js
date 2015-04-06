Template.mpdQuickControls.helpers({
  mpd: function() {
    return musicdb.findOne({_id: "mpd"});
  }
});

Template.mpdQuickControls.events({
  'click .mpd.pause': function(e){
    Meteor.call('mpdPause');
  },
  'click .mpd.unpause': function(e){
    Meteor.call('mpdUnPause');
  },
  'click .mpd.next': function(e){
    Meteor.call('mpdNext');
  },
  'click .mpd.previous': function(e){
    Meteor.call('mpdPrevious');
  },
  'click .mpd.volume.decrease': function(e){
    Meteor.call('mpdVolumeDecrease');
  },
  'click .mpd.volume.increase': function(e){
    Meteor.call('mpdVolumeIncrease');
  }
});
