Meteor.startup(function () {
  console.log("MONGO init start");

  mcLog.remove({});
  mcLog.insert({
    type: "system",
    message: "Meteor App startet",
    date: (new Date())
  });

  mcLabStatus.remove({});
  mcLabStatus.insert({
    status: "closed",
    source: "web",
    date: (new Date())
  });
});
