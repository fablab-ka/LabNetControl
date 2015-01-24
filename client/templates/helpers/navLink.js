Handlebars.registerHelper('navLink', function(link_text, path_name) {
  var ret = "<li ";
  if (Router.current().route.getName() == path_name) {
    ret += "class='active'";
  }
  ret += "><a href='" + Router.path(path_name) + "'>" + link_text + "</a></li>";
  return new Handlebars.SafeString(ret);
});
