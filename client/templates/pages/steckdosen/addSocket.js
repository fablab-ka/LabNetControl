Template.addSocketModal.events({
  'click button.add': function(event, template) {
    var id = template.$('.socket-id').val();

    Meteor.call("initSocket", id);

    $("#addSocketModal").modal('hide')
  }
})
