var wol = Meteor.npmRequire("wake_on_lan");
var wake = Meteor.wrapAsync(wol.wake);

var mac_schnitzel = "00:26:9e:c6:c7:14";

Meteor.startup(function () {
	wake(mac_schnitzel);
});


Meteor.methods({
	'wol': function(rechner) {
		if(rechner == "schnitzel"){
			wake(mac_schnitzel);
		}
	}
});