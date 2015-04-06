var Future = Npm.require('fibers/future')

Meteor.publish("mpd", function (){
  return musicdb.find({});
});

var mpd = Meteor.npmRequire('mpd')

var mpdclient = mpd.connect({
  host: Meteor.settings.mpd.host,
  port: Meteor.settings.mpd.port
});

var mpdAsync = function(command) {
  var future = new Future;

  mpdclient.sendCommand(command, Meteor.bindEnvironment(function(err, msg) {
    if (err)
      return future.throw(err);
    future.return(mpd.parseKeyValueMessage(msg));
  }));

  return future.wait();
}


var mpdUpdateStatus = function() {
  var data = mpdAsync("status");
  if(data) {
    musicdb.update({_id: "mpd"}, {$set: {
      volume: parseInt(data.volume),
      state: data.state,
      song: data.song
    }});
  }
}

mpdclient.on('ready', Meteor.bindEnvironment(function() {
  musicdb.upsert({_id: "mpd"}, {$set: {connected: true}});
  mpdUpdateStatus();
}));

mpdclient.on('end', Meteor.bindEnvironment(function() {
  musicdb.upsert({_id: "mpd"}, {$set: {connected: false}});
}));

mpdclient.on('system', Meteor.bindEnvironment(function() {
  mpdUpdateStatus();
}));

Meteor.methods({
  'mpdPause': function() {
    mpdAsync("pause 1");
  },
  'mpdUnPause': function() {
    mpdAsync("pause 0");
  },
  'mpdNext': function() {
    mpdAsync("next");
  },
  'mpdPrevious': function() {
    mpdAsync("previous");
  },
  'mpdVolumeSet': function(value) {
    mpdAsync("setvol ".concat(value));
  },
  'mpdVolumeDecrease': function() {
    var volume = musicdb.findOne({_id: "mpd"}).volume;
    Meteor.call('mpdVolumeSet', volume - 5);
  },
  'mpdVolumeIncrease': function() {
    var volume = musicdb.findOne({_id: "mpd"}).volume;
    Meteor.call('mpdVolumeSet', volume + 5);
  }
});
