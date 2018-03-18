const Datastore = require('@google-cloud/datastore');
const config = require('../../config/config.json');


const datastore = new Datastore({
    projectId: config.PROJECT_ID,
});


function add(data, callback) {

    const BeaconLog = {
        key: datastore.key('BeaconLog'),
        data: data
    };

    datastore.save(BeaconLog, (err) => {
        callback(err);
    });
};


module.exports = {
    add: add
};
