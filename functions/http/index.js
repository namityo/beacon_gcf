const pubsubBeaconLog = require('../../lib/pubsub/beaconlog')
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
    res.status(500).send({ error: 'not support GET.' });
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

