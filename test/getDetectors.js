const beaconlog = require('../lib/datastore/beaconlog')

const param = {};

beaconlog.getDetectors(param, (results) => {
    results.forEach(result => {
        console.log(result);
    });
});
