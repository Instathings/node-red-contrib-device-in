const mqtt = require('mqtt');
const fs = require('fs');
const onConnect = require('./events/onConnect');
const onClose = require('./events/onClose');

module.exports = function deviceInFn(RED) {
  function DeviceInNode(config) {
    RED.nodes.createNode(this, config);
    const client = mqtt.connect('mqtt://localhost');
    client.on('connect', onConnect.call(this, client, config));
    this.on('close', onClose);
  }

  RED.nodes.registerType('device in', DeviceInNode);

  const configPath = process.env.IS_HOST ? '/home/pi/service/knownDevices.config' : '/home/node/node-red/service/knownDevices.config';

  RED.httpAdmin.get('/devices', (req, res) => {
    let deviceKeys = {};
    if (fs.existsSync(configPath)) {
      return fs.readFile(configPath, (err, content) => {
        if (err) {
          return res.status(500);
        }
        deviceKeys = JSON.parse(content);
        return res.json(deviceKeys);
      });
    }
    return res.json({});
  });
};
