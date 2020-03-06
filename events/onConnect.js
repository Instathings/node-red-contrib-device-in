const onMessage = require('./onMessage');

module.exports = function onConnectFn(client, config) {
  return () => {
    this.log('Plugin connected');
    const { friendly } = config;
    const topic = `zigbee2mqtt/${friendly}`;

    this.log(topic);

    client.on('message', onMessage);
    client.subscribe(`zigbee2mqtt/${friendly}`, () => {
      this.log('Plugin subscribed');
    });
  };
};
