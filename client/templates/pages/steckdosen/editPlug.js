Template.editPlugModal.helpers({
  socket: function() {
    var id = Session.get("editSocket");
    return mcRittal.findOne({_id: id});
  },

  plug: function() {
    var socket_id = Session.get("editSocket");
    var plug_id = Session.get("editPlug");
    var socket = mcRittal.findOne({_id: socket_id});

    if( socket ) {
      var plug = socket.plugs[plug_id];
      plug.id = plug_id;

      return plug;
    }

    return false
  },

  modal_title: function() {
    return "Edit plug " + Session.get("editPlug") + " at socket " + Session.get("editSocket");
  }
})

Template.editPlugModal.events({
  'click button.save': function(event, template) {
    var socket_id = template.$('.socket-id').val();

    var plug = {};
    plug.id = template.$('.plug-id').val();
    plug.name = template.$('.plug-name').val();
    plug.state_user_switchable = template.$('.plug-state-user_switchable').prop('checked');
    plug.state_default = template.$('.plug-state-default').prop('checked');
    plug.state_toggle_on_lab_open = template.$('.plug-state-toggle_on_lab_open').prop('checked');

    Meteor.call("updatePlug", socket_id, plug, function(error,data) {
      if(error) {
        Flash.danger(error);
      } else {
        Flash.success("Plug " + plug.id + " at socket " + socket_id + " updated!")
      }
    });

    $("#editPlugModal").modal('hide')
  }
})

Template.editPlugButton.events({
  'click .edit-plug': function(event, template) {
    var socket_id = $(event.target).attr('socket_id');
    var plug_id = $(event.target).attr('plug_id');

    Session.set("editSocket", socket_id);
    Session.set("editPlug", plug_id);

    $("#editPlugModal").modal('show')
  }
})
