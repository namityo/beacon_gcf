const beaconlog = require('../lib/pubsub/beaconlog')

beaconlog.publish(require('./test.json'), (err) => {
    if (err) {
        console.error("pubsub error.", err);
    } else {
        console.log("success.")
    }
});
