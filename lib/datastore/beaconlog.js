const Datastore = require('@google-cloud/datastore');
const config = require('../../config/config.json');


function add(data, callback) {

    const datastore = new Datastore({
        projectId: config.PROJECT_ID,
    });

    const BeaconLog = {
        key: datastore.key('BeaconLog'),
        data: data
    };

    datastore.save(BeaconLog, (err) => {
        callback(err);
    });
};

function get(param, callback) {

    const datastore = new Datastore({
        projectId: config.PROJECT_ID,
    });

    // create query
    let query = datastore.createQuery('BeaconLog')
    // if (param.major != null)      query = query.filter('major', '=', param.major)    // 追加する場合はインデックスが必要
    // if (param.minor != null)      query = query.filter('minor', '=', param.minor)    // 追加する場合はインデックスが必要
    if (param.detector != null)   query = query.filter('detector', '=', param.detector)
    if (param.uuid != null)       query = query.filter('uuid', '=', param.uuid)
    if (param.date_gt != null)    query = query.filter('created', '>', param.date_gt)
    if (param.date_lt != null)    query = query.filter('created', '<', param.date_lt)
    query = query.order('created', { descending: true });

    datastore.runQuery(query).then(results => { callback(results[0]) });
}

module.exports = {
    add: add,
    get: get,
};
