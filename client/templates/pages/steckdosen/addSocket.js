Template.addSocketModal.events({
  'click button.add': function(event, template) {
    var id = template.$('.socket-id').val();

    Meteor.call("initSocket", id, function(error,data) {
      if(error) {
        Flash.danger(error);
      } else {
        Flash.success("Socket " + data._id + " added!")
      }
    });

    $("#addSocketModal").modal('hide')
  }
})
