const pubsubBeaconLog = require('../../lib/pubsub/beaconlog')
const datastoreBeaconLog = require('../../lib/datastore/beaconlog')
const checkData = require('../../lib/helper/validator').checkData;


function registerBeaconLog(req, res) {
    json = req.body;

    if (checkData(json)) {
        pubsubBeaconLog.publish(json, (err) => {
            if (err) {
                console.log(err);
                res.status(500).send({ error: 'system error.'});
            } else {
                res.status(200).end()
            }
        });
    } else {
        res.status(500).send({ error: 'validate error.' });
    }
}


function handleGET(req, res) {
    let param = {};
    if (req.query['detector'] != null) param.detector = req.query['detector'];
    if (req.query['uuid'] != null)     param.uuid = req.query['uuid'];
    if (req.query['date_lt'] != null)  param.date_lt = new Date(req.query['date_lt']);
    if (req.query['date_gt'] != null)  param.date_gt = new Date(req.query['date_gt']);

    datastoreBeaconLog.get(param, (results) => {
        // Access-Control-Allow-Origin enable
        res.set('Access-Control-Allow-Origin', "*")
        res.set('Access-Control-Allow-Methods', 'GET')
        
        res.status(200).send(results);
    });
}

function handlePUT(req, res) {
    switch (req.get('content-type')) {
        case 'application/json':
            registerBeaconLog(req, res);
            break;
        default:
            res.status(500).send({ error: 'not support content-type.' });
            break;
    }
}


module.exports = (req, res) => {
    switch (req.method) {
        case 'GET':
          handleGET(req, res);
          break;
        case 'PUT':
          handlePUT(req, res);
          break;
        default:
          res.status(500).send({ error: 'not support.' });
          break;
    }
};

