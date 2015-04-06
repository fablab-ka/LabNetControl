Router.configure({
	layoutTemplate: 'layout',
	//loadingTemplate: 'loading',
	//notFoundTemplate: 'notFound'
  waitOn: function() {
    return Meteor.subscribe('mpd');
  }
});

Router.route('/', {
  name: 'indexPage'
});

Router.route('/hw/steckdosen', {
  name: 'hwSteckdosenPage',
});

Router.route('/settings', {
  name: 'settingsPage',
  waitOn: function() {
    return Meteor.subscribe('userData');
  }
});

Router.route('/mpd', {
  name: 'mpdPage'
});
