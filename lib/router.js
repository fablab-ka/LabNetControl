Router.configure({
	layoutTemplate: 'layout'
	//loadingTemplate: 'loading',
	//notFoundTemplate: 'notFound'
});

Router.route('/', {
	name: 'dashboard',
});

Router.route('/hw/steckdosen', {
	name: 'hwSteckdosen',
});

Router.route('/hw/wol', {
	name: 'hwWol',
});

Router.route('/logic/music', {
	name: 'logicMusic',
});