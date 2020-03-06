module.exports = function onMessage(topic, message) {
  this.log('Plugin input');
  this.log(message);
  const strMess = message.toString();
  const parsedMess = JSON.parse(strMess);
  this.send(parsedMess);
};
