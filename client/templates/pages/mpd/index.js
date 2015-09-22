Template.mpdPage.helpers({
  mpd: function () {
    return musicdb.findOne({_id: "mpd"});
  }
});
