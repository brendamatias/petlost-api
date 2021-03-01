import PubNub from 'pubnub';
import pubnubConfig from '../../config/pubnub';

const pubnub = new PubNub(pubnubConfig);

module.exports = (channel, sender_id, message) => {
  const publishConfig = {
    channel,
    message: {
      sender_id,
      type: 'txt',
      body: { content: message },
    },
  };

  return new Promise((resolve, reject) => {
    pubnub.publish(publishConfig, (status, response) => {
      if (status.error) {
        console.log(status);
        reject(response);
      } else {
        console.log('[PUBNUB] - Nova mensagem publicada!');
        console.log(status, response);
        resolve(response);
      }
    });
  });
};
