const request = require("request");
const topdesign = require("../functions/topdesign.js");
exports.run = async(client, message, args, level) => { // eslint-disable-line no-unused-lets
  let postid = args[0];
  if (postid.startsWith("#")) postid = postid.substring(1, 20);
  postid = Number(postid);
  if (!postid) return message.channel.send("**TopDesign** | Nutze `!status #[Nr des Posts]` um einen Post zu deaktivieren oder aktivieren.");
  if (!Number.isInteger(postid)) return message.channel.send("**TopDesign** | Is " + postid + " ne Zahl? lol");
  let url = client.config.apiEndpoint + "/topdesign/posts/" + postid;
  request.put({
    url: url,
    json: true,
    headers: { 'Token': client.config.tokens.api},
  }, function (error, response, body) {
    if (!body) return message.channel.send("**TopDesign** | Uiih. hier scheint etwas nicht zu funktionieren, wie es sollte.. 😕");
    if (body == "Not found") return message.channel.send("**TopDesign** | Das Design mit der Nummer **#" + postid + "** konnte nicht gefunden werden.");
    if (body.action == "deactivate") return message.channel.send("**TopDesign** | Der Post von **" + body.posted_by + "** mit der Nummer **#" + postid + "** wurde erfolgreich deaktiviert. Er hatte **" + body.likes + " " + topdesign.voteOrVotes(body.likes) + "**.");
    if (body.action == "activate") return message.channel.send("**TopDesign** | Der Post von **" + body.posted_by + "** mit der Nummer **#" + postid + "** wurde erfolgreich aktiviert. Er hatte **" + body.likes + " " + topdesign.voteOrVotes(body.likes) + "**.");
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 9
};

exports.help = {
  name: "status",
  category: "Top Design",
  description: "Deaktivieren, nicht löschen, Lukas.",
  usage: "status #<postid>"
};