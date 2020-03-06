module.exports = function onClose(client) {
  return (done) => {
    client.end(() => {
      client.removeAllListeners();
      done();
    });
  };
};
