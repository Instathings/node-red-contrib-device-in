const onMessage = require('./onMessage');

module.exports = function onConnectFn(client, config) {
  return function onConnect() {
    let protocol;
    this.log('Connected');
    const splitted = config.friendly.split('|');
    const protocolId = splitted[0];
    const friendly = splitted[1];
    switch (protocolId) {
      case 'vRy6GTde': {
        protocol = 'zigbee';
        break;
      }
      default: {
        // usually protocolId is knx || modbus
        protocol = protocolId;
        break;
      }
    }
    const topic = `${protocol}2mqtt/${friendly}`;
    client.on('message', onMessage.bind(this));
    client.subscribe(topic, () => {
      this.log('Subscribed');
    });
  }.bind(this);
};
