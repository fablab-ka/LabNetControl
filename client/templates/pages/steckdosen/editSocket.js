Template.editSocketModal.helpers({
  socket: function() {
    var id = Session.get("editSocket");
    return mcRittal.findOne({_id: id});
  },
  modal_title: function() {
    return "Edit Socket " + Session.get("editSocket");
  }
})

Template.editSocketModal.events({
  'click button.save': function(event, template) {
    var id = template.$('.socket-id').val();
    var name = template.$('.socket-name').val();
    var description = template.$('.socket-description').val();

    Meteor.call("updateSocket", id, name, description);

    $("#editSocketModal").modal('hide')
  }
})

Template.editSocketButton.events({
  'click .edit-socket': function(event, template) {
    Session.set("editSocket", event.target.id);
    $("#editSocketModal").modal('show')
  }
})
