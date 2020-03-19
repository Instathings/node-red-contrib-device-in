const onMessage = require('./onMessage');

module.exports = function onConnectFn(client, config) {
  return function onConnect() {
    this.log('Connected');
    const { friendly } = config;
    const topic = `zigbee2mqtt/${friendly}`;
    client.on('message', onMessage.bind(this));
    client.subscribe(topic, () => {
      this.log('Subscribed');
    });
  }.bind(this);
};
