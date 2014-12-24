Router.configure({
	layoutTemplate: 'layout'
	//loadingTemplate: 'loading',
	//notFoundTemplate: 'notFound'
});

Router.route('/', {
	name: 'dashboard',
});

Router.route('/steckdosen', {
	name: 'steckdosen',
});

Router.route('/wol', {
	name: 'wol',
});