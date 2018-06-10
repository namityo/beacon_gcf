const PubSub = require('@google-cloud/pubsub');

const topicName = 'projects/' + process.env["GCP_PROJECT"] + '/topics/BeaconLog';


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
