const datastoreBeaconLog = require('../../lib/datastore/beaconlog')


function handleGET(req, res) {
    let param = {};

    datastoreBeaconLog.getDetectors(param, (results) => {
        // Access-Control-Allow-Origin enable
        res.set('Access-Control-Allow-Origin', "*")
        res.set('Access-Control-Allow-Methods', 'GET')
        
        res.status(200).send(results);
    });
}


module.exports = (req, res) => {
    switch (req.method) {
        case 'GET':
          handleGET(req, res);
          break;
        default:
          res.status(500).send({ error: 'not support.' });
          break;
    }
};

