var Future = Npm.require('fibers/future')

Meteor.startup(function () {
	musicdb.upsert({_id: "mpd"}, {$set: {connected: false}});
});
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
  var mpd_info = mpdAsync("status");
  if(mpd_info) {
    musicdb.update({_id: "mpd"}, {$set: {
      volume: parseInt(mpd_info.volume),
      state: mpd_info.state
    }});
  }

  var song_info = mpdAsync("playlistinfo " + mpd_info.song);
  if(song_info) {

    //creepy actions to get some decent song informations
    if( !song_info.Artist ) {
      if( song_info.Title ) {
        var temp = song_info.Title.split(" - ");
        if( temp.length === 2 ) {
          song_info.Artist = temp[0];
          song_info.Title = temp[1];
        } else {
          song_info.Artist = "Unknown";
        }
      } else {
        song_info.Artist = "Unknown";
        song_info.Title = song_info.file.split("/").pop();
      }
    }

    musicdb.update({_id: "mpd"}, {$set: {
      song: song_info
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
  musicdb.upsert({_id: "mpd"}, {$set: {connected: true}});
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
