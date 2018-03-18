const PubSub = require('@google-cloud/pubsub');
const config = require('../../config/config.json');

const topicName = 'projects/' + config.PROJECT_ID + '/topics/BeaconLog';


function publish(json, callback) {

    const dataBuffer = Buffer.from(JSON.stringify(json));

    const pubsub = new PubSub();
    pubsub
        .topic(topicName)
        .publisher({
            // batching: {
            //     maxMessages: maxMessages,
            //     maxMilliseconds: maxWaitTime,
            // },
        })
        .publish(dataBuffer)
        .then(results => {
            callback();
        })
        .catch(err => {
            callback(err);
        });
}


module.exports = {
    publish: publish
}
